const KEY = 'strategos.v040.state';
const defaults = {
  schemaVersion: 4,
  onboardingComplete: false,
  profile: {
    name: '', age: null, identity: '', experience: 'beginner',
    injuries: '', equipment: [], availableMinutes: 15,
    values: [], purpose: '', createdAt: null
  },
  settings: { voice: true, sounds: true, haptics: true, wakeLock: true, language: 'en', units: 'metric', appearance: 'dark' },
  humanModel: { body: {}, mind: {}, relationships: {}, purpose: {}, legacy: {}, updatedAt: null },
  current: null,
  history: [],
  deltaTotal: 0
};
export function loadState(){
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (!raw) return structuredClone(defaults);
    return {
      ...structuredClone(defaults), ...raw,
      profile: {...defaults.profile, ...(raw.profile||{})},
      settings: {...defaults.settings, ...(raw.settings||{})},
      humanModel: {...defaults.humanModel, ...(raw.humanModel||{})}
    };
  } catch { return structuredClone(defaults); }
}
export function saveState(state){ localStorage.setItem(KEY, JSON.stringify(state)); }
export function resetState(){ localStorage.removeItem(KEY); }
