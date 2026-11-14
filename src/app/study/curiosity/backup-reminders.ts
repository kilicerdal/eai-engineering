import type {PersonalCollection} from './collections';
export const BACKUP_REMINDER_KEY='dai.curiosity.backup-reminders.v1';
export type BackupHistory={lastRequestedAt:string|null;downloadedWork:string|null;dismissedWork:string|null};
export const emptyBackupHistory:BackupHistory={lastRequestedAt:null,downloadedWork:null,dismissedWork:null};
// This compact fingerprint is only a reminder comparison, never an integrity or
// security check. Catalog additions, reading history, and preferences do not nag.
export function workSignature(saved:string[],collections:PersonalCollection[]):string {
  const text=JSON.stringify({saved:[...new Set(saved)].sort(),collections:collections.map(item=>({id:item.id,name:item.name,ids:[...new Set(item.ids)].sort()})).sort((a,b)=>a.id.localeCompare(b.id))});
  let hash=BigInt('14695981039346656037');const prime=BigInt(1099511628211);for(let i=0;i<text.length;i++){hash^=BigInt(text.charCodeAt(i));hash=BigInt.asUintN(64,hash*prime);}return text.length+':'+hash.toString(16);
}
export function parseBackupHistory(raw:string|null):BackupHistory {
  if(!raw)return {...emptyBackupHistory};const value:unknown=JSON.parse(raw);
  if(!value||typeof value!=='object'||!('version' in value)||value.version!==1||!('history' in value)||!value.history||typeof value.history!=='object')throw Error('Invalid backup reminder history.');
  const h=value.history;
  for(const key of ['lastRequestedAt','downloadedWork','dismissedWork'] as const)if(!(key in h)||((h as BackupHistory)[key]!==null&&typeof (h as BackupHistory)[key]!=='string'))throw Error('Invalid backup reminder history.');
  const history=h as BackupHistory;
  if(history.lastRequestedAt!==null&&!Number.isFinite(Date.parse(history.lastRequestedAt)))throw Error('Invalid backup download date.');
  for(const signature of [history.downloadedWork,history.dismissedWork])if(signature!==null&&!/^\d{1,8}:[a-f0-9]{1,16}$/.test(signature))throw Error('Invalid backup reminder signature.');
  return {lastRequestedAt:history.lastRequestedAt,downloadedWork:history.downloadedWork,dismissedWork:history.dismissedWork};
}
export function readBackupHistory(){try{return {history:parseBackupHistory(localStorage.getItem(BACKUP_REMINDER_KEY)),warning:''};}catch{return {history:{...emptyBackupHistory},warning:'Backup reminder history is unavailable. Downloads still work; reminders apply for this visit only.'};}}
export function backupReminderDue(saved:string[],collections:PersonalCollection[],history:BackupHistory){if(!saved.length&&!collections.length)return false;const signature=workSignature(saved,collections);return signature!==history.downloadedWork&&signature!==history.dismissedWork;}
