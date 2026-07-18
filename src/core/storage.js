const KEY = 'onearete.strategos.v03';
const initial = { profile: null, history: [], current: null, deltaTotal: 0 };
export function loadState() {
  try { return { ...initial, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; }
  catch { return structuredClone(initial); }
}
export function saveState(state) { localStorage.setItem(KEY, JSON.stringify(state)); }
export function resetState() { localStorage.removeItem(KEY); }
