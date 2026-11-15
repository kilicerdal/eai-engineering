/** Ideal first-class lever: vertical forces, massless rigid beam, no losses. SI units. */
export const LEVER_MODEL_VERSION = 'ideal-lever-v1';
export const GRAVITY = 9.81;
export const LOAD_LIFT = 0.1;
export const BEAM_LENGTH = 4;
export type LeverSettings = { mass: number; pivot: number; loadPosition: number; effortPosition: number };
export const leverControls = {
 mass: { label: 'Load mass', min: 1, max: 50, step: 1, unit: 'kg' },
 pivot: { label: 'Pivot position', min: 1, max: 3, step: 0.1, unit: 'm' },
 loadPosition: { label: 'Load position', min: 0.2, max: 0.8, step: 0.1, unit: 'm' },
 effortPosition: { label: 'Effort position', min: 3.2, max: 4, step: 0.1, unit: 'm' },
} as const;
export const defaultLever: LeverSettings = { mass: 10, pivot: 1.5, loadPosition: 0.5, effortPosition: 3.5 };
export const leverPresets: { id: string; label: string; settings: LeverSettings }[] = [
 { id: 'first', label: 'Start here', settings: defaultLever },
 { id: 'long', label: 'Long effort arm', settings: { mass: 10, pivot: 1, loadPosition: 0.5, effortPosition: 4 } },
 { id: 'equal', label: 'Equal arms', settings: { mass: 10, pivot: 2, loadPosition: 0.5, effortPosition: 3.5 } },
 { id: 'short', label: 'Short effort arm', settings: { mass: 10, pivot: 3, loadPosition: 0.5, effortPosition: 3.5 } },
];
export const leverSources = [
 { id: 'ideal-lever-model', label: 'This model: equations and assumptions', href: '#model-notes' },
 { id: 'openstax-simple-machines', label: 'OpenStax · College Physics 2e, Simple Machines', href: 'https://openstax.org/books/college-physics-2e/pages/9-5-simple-machines' },
];
const object = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);
export function parseLeverSettings(value: unknown): LeverSettings {
 if (!object(value)) throw new Error('Choose valid lever settings.');
 const result = {} as LeverSettings;
 for (const key of Object.keys(leverControls) as (keyof LeverSettings)[]) {
  const v = value[key], control = leverControls[key];
  if (typeof v !== 'number' || !Number.isFinite(v) || v < control.min - 1e-9 || v > control.max + 1e-9 || Math.abs((v - control.min) / control.step - Math.round((v - control.min) / control.step)) > 1e-7) throw new Error(`Choose a valid ${control.label.toLowerCase()}.`);
  result[key] = Math.round(v * 10) / 10;
 }
 return result;
}
export function calculateLever(value: LeverSettings) {
 const s = parseLeverSettings(value), loadArm = s.pivot - s.loadPosition, effortArm = s.effortPosition - s.pivot;
 const weight = s.mass * GRAVITY, mechanicalAdvantage = effortArm / loadArm, effortForce = weight / mechanicalAdvantage;
 const effortTravel = LOAD_LIFT * mechanicalAdvantage;
 return { loadArm, effortArm, weight, mechanicalAdvantage, effortForce, loadLift: LOAD_LIFT, effortTravel, outputWork: weight * LOAD_LIFT, inputWork: effortForce * effortTravel, torque: weight * loadArm };
}
export function formatLever(value: number, digits = 2) { return value.toLocaleString('en-US', { maximumFractionDigits: digits, minimumFractionDigits: 0 }); }
export function describeLever(s: LeverSettings, level: 'simple' | 'deeper', baseline: LeverSettings | null = null) {
 const m = calculateLever(s);
 const advantage = m.mechanicalAdvantage > 1.00001 ? 'The effort arm is longer than the load arm, so the required effort force is smaller than the load’s weight.' : m.mechanicalAdvantage < 0.99999 ? 'The effort arm is shorter than the load arm, so the required effort force is greater than the load’s weight.' : 'The two arms have equal length, so the required effort force equals the load’s weight.';
 let comparison = '';
 if (baseline) {
  const before = calculateLever(baseline), ratio = m.effortForce / before.effortForce;
  comparison = Math.abs(ratio - 1) < 1e-8 ? 'The required force is unchanged from your comparison setup.' : `Compared with your kept setup, the required force is ${formatLever(Math.abs(1 - ratio) * 100, 1)}% ${ratio < 1 ? 'lower' : 'higher'}. This compares all changed settings; it does not isolate a single cause.`;
 }
 return {
  title: m.mechanicalAdvantage > 1 ? 'Less force. More travel.' : m.mechanicalAdvantage < 1 ? 'A shorter effort arm needs more force.' : 'Equal arms. Equal forces.',
  explanation: `${advantage} At these settings, a ${formatLever(s.mass)} kg load needs ${formatLever(m.effortForce)} N of downward effort to balance it.`,
  tradeoff: `For the load to rise ${formatLever(LOAD_LIFT * 100)} cm, the effort point moves down ${formatLever(m.effortTravel * 100)} cm. In this ideal model, both sides transfer ${formatLever(m.outputWork)} J of work. No energy is created.`,
  detail: level === 'deeper' ? `Torque balance gives F × ${formatLever(m.effortArm)} m = ${formatLever(m.weight)} N × ${formatLever(m.loadArm)} m. Mechanical advantage is effort arm ÷ load arm = ${formatLever(m.mechanicalAdvantage)}. The calculated force is the balance threshold; a lift is an idealized quasi-static displacement, not a time-dependent motion simulation.` : '',
  comparison,
 };
}
export type LeverProposal = Partial<LeverSettings>;
export function parseLeverProposal(value: unknown, current: LeverSettings): LeverProposal | null {
 if (value === null) return null;
 if (!object(value) || !Object.keys(value).length || Object.keys(value).some(k => !Object.prototype.hasOwnProperty.call(leverControls,k))) throw new Error('The AI proposed an unsupported control change.');
 const combined = parseLeverSettings({ ...current, ...value });
 const result: LeverProposal = {};
 for (const key of Object.keys(value) as (keyof LeverSettings)[]) if (combined[key] !== current[key]) result[key] = combined[key];
 return Object.keys(result).length ? result : null;
}
export type ExploreAnswer = { explanation: string; experiment: string; proposal: LeverProposal | null; sources: string[] };
export function parseExploreAnswer(value: unknown, current: LeverSettings): ExploreAnswer {
 const v: unknown = typeof value === 'string' ? JSON.parse(value.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '')) : value;
 if (!object(v) || typeof v.explanation !== 'string' || !v.explanation.trim() || v.explanation.length > 2200 || typeof v.experiment !== 'string' || !v.experiment.trim() || v.experiment.length > 1000 || !Array.isArray(v.sources) || !v.sources.length || v.sources.length > 2 || v.sources.some(id => !leverSources.some(source => source.id === id))) throw new Error('The AI explanation could not be checked. Try a narrower question.');
 return { explanation: v.explanation, experiment: v.experiment, proposal: parseLeverProposal(v.proposal, current), sources: [...new Set(v.sources)] as string[] };
}
export const challengeLever: LeverSettings = { mass: 10, pivot: 2.5, loadPosition: 0.5, effortPosition: 3.2 };
export function checkLeverChallenge(current: LeverSettings) {
 const s = parseLeverSettings(current), baseline = calculateLever(challengeLever), now = calculateLever(s);
 if (s.mass !== challengeLever.mass || s.pivot !== challengeLever.pivot || s.loadPosition !== challengeLever.loadPosition) return { correct: false, message: 'Keep the load mass, load position and pivot at the challenge values. Change only the effort position.' };
 if (Math.abs(now.effortForce - baseline.effortForce / 2) > 1e-7) return { correct: false, message: 'Not quite. To halve the required force, try doubling the distance from the pivot to the effort point.' };
 return { correct: true, message: 'You doubled the effort arm and halved the required force. The effort point now travels twice as far for the same load lift.' };
}
