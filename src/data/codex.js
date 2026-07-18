export const CODEX = [
  {
    id: 'strength',
    name: 'Strength',
    durationOptions: [15, 30],
    virtue: 'Discipline',
    baseDelta: { body: 0.55, mind: 0.08, relationships: 0, purpose: 0.12, legacy: 0.02, agency: 0.27 },
    phases: [
      ['Prepare', 60, 'Breathe slowly. Set your posture.'],
      ['Push', 180, 'Controlled push-ups or incline push-ups.'],
      ['Pull', 180, 'Rows with a bar, table, or loaded bags.'],
      ['Legs', 180, 'Slow squats. Full control.'],
      ['Core', 120, 'Plank or dead bug.'],
      ['Close', 60, 'Stand still. Recover your breath.']
    ]
  },
  {
    id: 'recovery',
    name: 'Recovery',
    durationOptions: [5, 15, 30],
    virtue: 'Temperance',
    baseDelta: { body: 0.28, mind: 0.24, relationships: 0.02, purpose: 0.04, legacy: 0, agency: 0.16 },
    phases: [
      ['Downshift', 120, 'Inhale for four. Exhale for six.'],
      ['Mobility', 300, 'Move slowly through shoulders, hips, and spine.'],
      ['Walk', 360, 'Walk without your phone. Easy pace.'],
      ['Close', 60, 'Notice what changed.']
    ]
  },
  {
    id: 'focus',
    name: 'Focus',
    durationOptions: [15, 30, 60],
    virtue: 'Wisdom',
    baseDelta: { body: 0.02, mind: 0.56, relationships: 0, purpose: 0.24, legacy: 0.08, agency: 0.24 },
    phases: [
      ['Define', 60, 'Write the single outcome that matters.'],
      ['Deep Work', 720, 'One task. No switching.'],
      ['Close', 60, 'Record the next clear step.']
    ]
  },
  {
    id: 'walk',
    name: 'Walk',
    durationOptions: [5, 15, 30, 60],
    virtue: 'Balance',
    baseDelta: { body: 0.24, mind: 0.24, relationships: 0.02, purpose: 0.08, legacy: 0, agency: 0.12 },
    phases: [
      ['Begin', 60, 'Leave the screen behind.'],
      ['Walk', 720, 'Comfortable pace. Breathe through the nose when possible.'],
      ['Return', 60, 'Come back with one clear thought.']
    ]
  },
  {
    id: 'connection',
    name: 'Connection',
    durationOptions: [5, 15, 30],
    virtue: 'Justice',
    baseDelta: { body: 0, mind: 0.18, relationships: 0.58, purpose: 0.14, legacy: 0.08, agency: 0.18 },
    phases: [
      ['Choose', 30, 'Choose one person who matters.'],
      ['Connect', 600, 'Call, listen, play, or be fully present.'],
      ['Close', 30, 'End without rushing to the next thing.']
    ]
  }
];
