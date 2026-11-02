"use client";
import { studyAccountClient } from "./study-account";
import { canonicalJSON, collectStudyValues, snapshotSignature, validateStudySnapshot, replaceStudyValues, type StudySnapshot } from "./study-cloud-snapshot";
import { loadMaterialLibrary, saveMaterialLibrary } from "./study-material-files";
import { normalizeMaterialLibrary } from "./study-materials";
export const SYNC_KEY = "dai-cloud-session-v1";
export type CloudRecord = { revision: string; updated_at: string; snapshot: StudySnapshot };
export type SyncBinding = { userId: string; revision: string; signature: string };
export async function captureStudy(): Promise<StudySnapshot> {
  return validateStudySnapshot({version:1, values:collectStudyValues(localStorage), library:await loadMaterialLibrary()});
}
export function exportStudy(snapshot: StudySnapshot) {
  const url=URL.createObjectURL(new Blob([JSON.stringify(snapshot,null,2)],{type:"application/json"}));
  const anchor=document.createElement("a"); anchor.href=url; anchor.download=`dai-learning-${new Date().toISOString().slice(0,10)}.json`; anchor.click(); setTimeout(()=>URL.revokeObjectURL(url),1000);
}
async function verifiedClient(userId: string) {
  const client=studyAccountClient(); if(!client) throw new Error("Account saving is not available yet.");
  const {data,error}=await client.auth.getUser();
  if(error || data.user?.id!==userId) throw new Error("Your account changed or your session expired. Sign in again before saving.");
  return client;
}
export async function readCloud(userId:string):Promise<CloudRecord|null> {
  const client=await verifiedClient(userId);
  const {data,error}=await client.from("study_learning_records").select("revision,updated_at,snapshot").eq("user_id",userId).maybeSingle();
  if(error) throw new Error("Your account record could not be opened. Your browser work is still here.");
  return data ? {...data,snapshot:validateStudySnapshot(data.snapshot)} : null;
}
export async function writeCloud(userId:string,snapshot:StudySnapshot,revision:string|null):Promise<CloudRecord> {
  const safe=validateStudySnapshot(snapshot), client=await verifiedClient(userId);
  const table=client.from("study_learning_records");
  const query=revision===null ? table.insert({user_id:userId,snapshot:safe}) : table.update({snapshot:safe}).eq("user_id",userId).eq("revision",revision);
  const {data,error}=await query.select("revision,updated_at").maybeSingle();
  if(error?.code==="23505" || (!error && !data)) throw new Error("Another tab or device changed your account record. Automatic saving is paused. Open Account to review the saved version before continuing.");
  if(error || !data) throw new Error("Cloud saving failed. Your browser work is still here; export a copy or try again.");
  return {...data,snapshot:safe};
}
export function bindCloud(userId:string,record:CloudRecord) {
  sessionStorage.setItem(SYNC_KEY,JSON.stringify({userId,revision:record.revision,signature:snapshotSignature(record.snapshot)}));
  window.dispatchEvent(new Event("dai-cloud-change"));
}
export function pauseCloud() { sessionStorage.removeItem(SYNC_KEY); window.dispatchEvent(new Event("dai-cloud-change")); }
export function cloudBinding():SyncBinding|null {
  try { const value=JSON.parse(sessionStorage.getItem(SYNC_KEY)||"null"); return value && typeof value.userId==="string" && typeof value.revision==="string" && /^[0-9a-f-]{36}$/i.test(value.revision) && typeof value.signature==="string" ? value : null; } catch { return null; }
}
export async function restoreCloud(snapshot:StudySnapshot) {
  const safe=validateStudySnapshot(snapshot), previous=await captureStudy();
  const library=normalizeMaterialLibrary(safe.library);
  // Refuse a restore that would silently drop malformed material.
  if(canonicalJSON(library)!==canonicalJSON(safe.library)) throw new Error("This record contains materials this version cannot restore. Nothing was replaced.");
  try { await saveMaterialLibrary(library); replaceStudyValues(localStorage,safe.values); }
  catch(error) { await saveMaterialLibrary(normalizeMaterialLibrary(previous.library)); throw error; }
}
export async function deleteCloud(userId:string,revision:string) {
  const client=await verifiedClient(userId);
  const {data,error}=await client.from("study_learning_records").delete().eq("user_id",userId).eq("revision",revision).select("user_id");
  if(error || !data?.length) throw new Error("The account record changed or could not be deleted. Refresh it and try again.");
  pauseCloud();
}
