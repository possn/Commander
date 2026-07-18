export const EXERCISES = {
  inclinePushup: {
    id: 'inclinePushup', name: 'Incline Push-up', pattern: 'push', equipment: ['chair'],
    purpose: 'Chest, shoulders and triceps.',
    position: 'Hands on a stable support. Keep head, trunk and legs in one straight line.',
    execution: 'Lower your chest under control, then push the support away.',
    avoid: 'Do not let the hips drop or the shoulders rise toward the ears.',
    easier: 'Use a higher support or reduce the repetitions.',
    harder: 'Use a lower support or slow the lowering phase.',
    cue: 'Body straight. Chest to support. Push away.',
    stop: 'Stop if you feel sharp pain in the shoulder, wrist or chest.'
  },
  pushup: {
    id: 'pushup', name: 'Push-up', pattern: 'push', equipment: [],
    purpose: 'Chest, shoulders, triceps and trunk control.',
    position: 'Hands slightly wider than shoulders. Body straight from head to heels.',
    execution: 'Lower until the chest approaches the floor. Press back up without losing alignment.',
    avoid: 'Do not flare the elbows excessively or let the lower back sag.',
    easier: 'Perform the movement with hands on a stable support.',
    harder: 'Use a three-second lowering phase or pause near the floor.',
    cue: 'Brace. Lower with control. Push the floor away.',
    stop: 'Stop if you feel sharp pain in the shoulder, wrist or chest.'
  },
  wallRow: {
    id: 'wallRow', name: 'Standing Towel Row', pattern: 'pull', equipment: ['towel'],
    purpose: 'Upper back, rear shoulders and arms.',
    position: 'Hold a towel firmly and create tension while standing tall.',
    execution: 'Pull the towel apart and draw the elbows back, squeezing the shoulder blades.',
    avoid: 'Do not shrug or arch the lower back.',
    easier: 'Use less tension and a smaller range.',
    harder: 'Hold each contraction for three seconds.',
    cue: 'Chest tall. Elbows back. Shoulder blades together.',
    stop: 'Stop if the movement causes shoulder or neck pain.'
  },
  tableRow: {
    id: 'tableRow', name: 'Table Row', pattern: 'pull', equipment: ['table'],
    purpose: 'Upper back, arms and trunk control.',
    position: 'Use only a very stable table. Hold the edge and keep the body rigid.',
    execution: 'Pull the chest toward the table, then lower slowly.',
    avoid: 'Never use unstable furniture. Do not drop the hips.',
    easier: 'Keep the knees bent and feet closer to the body.',
    harder: 'Straighten the legs or pause at the top.',
    cue: 'Rigid body. Pull chest to edge. Lower slowly.',
    stop: 'Stop immediately if the support moves or you feel shoulder pain.'
  },
  backpackRow: {
    id: 'backpackRow', name: 'Backpack Row', pattern: 'pull', equipment: ['backpack'],
    purpose: 'Upper back, arms and hip-hinge control.',
    position: 'Hold a securely closed backpack. Hinge at the hips with a neutral spine.',
    execution: 'Pull the load toward the lower ribs, pause, then lower under control.',
    avoid: 'Do not round the back or use momentum.',
    easier: 'Remove load from the backpack.',
    harder: 'Add load gradually or slow the lowering phase.',
    cue: 'Hips back. Spine long. Pull to ribs.',
    stop: 'Stop if you feel pain in the lower back.'
  },
  chairSquat: {
    id: 'chairSquat', name: 'Chair Squat', pattern: 'legs', equipment: ['chair'],
    purpose: 'Thighs, glutes and confidence in the squat pattern.',
    position: 'Stand in front of a stable chair with feet around shoulder width.',
    execution: 'Sit back under control, lightly touch the chair, then stand tall.',
    avoid: 'Do not collapse the knees inward or fall onto the chair.',
    easier: 'Use a higher chair or support the hands lightly.',
    harder: 'Use a slower descent or hover just above the chair.',
    cue: 'Hips back. Knees track over feet. Stand tall.',
    stop: 'Stop if knee or hip pain increases.'
  },
  squat: {
    id: 'squat', name: 'Bodyweight Squat', pattern: 'legs', equipment: [],
    purpose: 'Thighs, glutes and lower-body control.',
    position: 'Feet comfortable, chest tall and weight balanced through the whole foot.',
    execution: 'Sit down and back to a comfortable depth, then drive the floor away.',
    avoid: 'Do not let the knees collapse inward or rush the movement.',
    easier: 'Squat to a chair.',
    harder: 'Use a three-second descent or add a pause.',
    cue: 'Whole foot down. Knees track. Stand with control.',
    stop: 'Stop if the movement causes sharp knee, hip or back pain.'
  },
  deadBug: {
    id: 'deadBug', name: 'Dead Bug', pattern: 'core', equipment: [],
    purpose: 'Deep trunk control without loading the spine heavily.',
    position: 'Lie on your back with hips and knees bent. Gently press the lower back toward the floor.',
    execution: 'Slowly extend the opposite arm and leg, then return without losing trunk position.',
    avoid: 'Do not allow the lower back to arch away from the floor.',
    easier: 'Move one limb at a time or shorten the range.',
    harder: 'Extend farther or pause near the floor.',
    cue: 'Ribs down. Back quiet. Move slowly.',
    stop: 'Stop if you feel pain in the back or neck.'
  },
  plank: {
    id: 'plank', name: 'Forearm Plank', pattern: 'core', equipment: [],
    purpose: 'Trunk stiffness and whole-body control.',
    position: 'Elbows under shoulders. Body straight from head to heels.',
    execution: 'Brace gently and breathe while maintaining alignment.',
    avoid: 'Do not hold your breath or let the hips sag.',
    easier: 'Place the knees on the floor or use an elevated support.',
    harder: 'Increase the hold only while perfect form remains.',
    cue: 'Long body. Quiet breathing. Hips level.',
    stop: 'Stop if you feel back or shoulder pain.'
  }
};

const strengthPlans = {
  beginner: [
    { exerciseId: 'inclinePushup', sets: 3, reps: 6, rest: 50, tempo: '3 sec down · controlled up', rpe: '5–6/10' },
    { exerciseId: 'wallRow', sets: 3, reps: 8, rest: 45, tempo: '2 sec squeeze · slow release', rpe: '5–6/10' },
    { exerciseId: 'chairSquat', sets: 3, reps: 8, rest: 50, tempo: '3 sec down · stand smoothly', rpe: '5–6/10' },
    { exerciseId: 'deadBug', sets: 2, reps: 6, rest: 35, tempo: 'Slow alternating sides', rpe: '5/10' }
  ],
  intermediate: [
    { exerciseId: 'pushup', sets: 3, reps: '8–12', rest: 55, tempo: '3 sec down · 1 sec up', rpe: '6–7/10' },
    { exerciseId: 'backpackRow', sets: 3, reps: '10–12', rest: 55, tempo: '1 sec squeeze · 3 sec down', rpe: '6–7/10' },
    { exerciseId: 'squat', sets: 3, reps: '12–15', rest: 50, tempo: '3 sec down · controlled up', rpe: '6–7/10' },
    { exerciseId: 'plank', sets: 3, duration: 25, rest: 40, tempo: 'Steady breathing', rpe: '6/10' }
  ],
  advanced: [
    { exerciseId: 'pushup', sets: 4, reps: '10–15', rest: 60, tempo: '3 sec down · 1 sec pause · fast up', rpe: '7–8/10' },
    { exerciseId: 'tableRow', sets: 4, reps: '8–12', rest: 65, tempo: '1 sec hold · 3 sec down', rpe: '7–8/10' },
    { exerciseId: 'squat', sets: 4, reps: '15–20', rest: 55, tempo: '4 sec down · 1 sec pause', rpe: '7/10' },
    { exerciseId: 'plank', sets: 3, duration: 40, rest: 45, tempo: 'Full-body tension', rpe: '7/10' }
  ]
};

export const CODEX = [
  {
    id: 'strength', name: 'Strength', label: 'Strength Practice', durationOptions: [10, 15, 20, 30], virtue: 'Discipline',
    baseDelta: { body: 0.55, mind: 0.08, character: 0.27, recovery: -0.12 },
    plans: strengthPlans
  },
  {
    id: 'recovery', name: 'Recovery', label: 'Recovery Practice', durationOptions: [5, 10, 15, 20, 30], virtue: 'Temperance',
    baseDelta: { body: 0.12, mind: 0.18, character: 0.18, recovery: 0.48 },
    phases: [
      ['Downshift', 120, 'Inhale for four. Exhale for six.'],
      ['Mobility', 300, 'Move slowly through shoulders, hips and spine.'],
      ['Walk', 360, 'Walk without your phone at an easy pace.'],
      ['Close', 60, 'Notice what changed.']
    ]
  },
  {
    id: 'focus', name: 'Focus', label: 'Focus Practice', durationOptions: [10, 15, 20, 30, 60], virtue: 'Wisdom',
    baseDelta: { body: 0.02, mind: 0.56, character: 0.24, recovery: 0.02 },
    phases: [
      ['Define', 60, 'Write the single outcome that matters.'],
      ['Deep Work', 720, 'One task. No switching.'],
      ['Close', 60, 'Record the next clear step.']
    ]
  },
  {
    id: 'walk', name: 'Walk', label: 'Walking Practice', durationOptions: [5, 10, 15, 20, 30, 60], virtue: 'Balance',
    baseDelta: { body: 0.24, mind: 0.24, character: 0.12, recovery: 0.25 },
    phases: [
      ['Begin', 60, 'Leave the screen behind.'],
      ['Walk', 720, 'Comfortable pace. Breathe through the nose when possible.'],
      ['Return', 60, 'Come back with one clear thought.']
    ]
  },
  {
    id: 'connection', name: 'Connection', label: 'Connection Practice', durationOptions: [5, 10, 15, 20, 30], virtue: 'Justice',
    baseDelta: { body: 0, mind: 0.24, character: 0.28, recovery: 0.08, relationships: 0.58 },
    phases: [
      ['Choose', 30, 'Choose one person who matters.'],
      ['Connect', 600, 'Call, listen, play or be fully present.'],
      ['Close', 30, 'End without rushing to the next thing.']
    ]
  }
];
