export const CODEX = [
  {
    id: 'strength',
    name: 'Strength',
    durationOptions: [15, 30],
    virtue: 'Discipline',
    baseDelta: { body: 0.55, mind: 0.08, character: 0.27, recovery: -0.12 },
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
    baseDelta: { body: 0.12, mind: 0.18, character: 0.18, recovery: 0.48 },
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
    baseDelta: { body: 0.02, mind: 0.56, character: 0.24, recovery: 0.02 },
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
    baseDelta: { body: 0.24, mind: 0.24, character: 0.12, recovery: 0.25 },
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
    baseDelta: { body: 0, mind: 0.24, character: 0.28, recovery: 0.08, relationships: 0.58 },
    phases: [
      ['Choose', 30, 'Choose one person who matters.'],
      ['Connect', 600, 'Call, listen, play, or be fully present.'],
      ['Close', 30, 'End without rushing to the next thing.']
    ]
  }
];
