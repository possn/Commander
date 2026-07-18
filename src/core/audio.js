let audioContext = null;
let activeUtterance = null;

function context() {
  if (!audioContext) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioContext = new AudioContext();
  }
  if (audioContext?.state === 'suspended') audioContext.resume().catch(() => {});
  return audioContext;
}

export function unlockAudio() { context(); }

export function playTone(kind = 'phase', enabled = true) {
  if (!enabled) return;
  const ctx = context();
  if (!ctx) return;
  const presets = {
    begin: [[392, .00, .45], [523.25, .14, .60]],
    phase: [[440, .00, .24]],
    countdown: [[660, .00, .08]],
    finish: [[392, .00, .34], [523.25, .12, .48], [659.25, .26, .72]],
    pause: [[330, .00, .18]],
    resume: [[440, .00, .20]],
    reflection: [[523.25, .00, .40]]
  };
  (presets[kind] || presets.phase).forEach(([frequency, delay, duration]) => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    const start = ctx.currentTime + delay;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.055, start + .025);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain).connect(ctx.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + .03);
  });
}

export function speak(text, mode = 'minimal', enabled = true) {
  if (!enabled || mode === 'off' || !('speechSynthesis' in window) || !text) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = mode === 'guided' ? .88 : .94;
  utterance.pitch = .88;
  utterance.volume = .72;
  const voices = window.speechSynthesis.getVoices();
  utterance.voice = voices.find(v => /en-GB|en_US|Daniel|Samantha/i.test(`${v.lang} ${v.name}`)) || voices[0] || null;
  activeUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

export function stopVoice() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  activeUtterance = null;
}
