// Lightweight WebAudio helper for the minigame. Keeps everything optional (mute toggle) and small.
let audioCtx = null;
let bgOsc = null;
let bgGain = null;
let matchBuffer = null;
let failBuffer = null;
let backgroundPlaying = false;

export function initAudio() {
  try {
    if (audioCtx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();

    // simple background tone as subtle ambience
    bgOsc = audioCtx.createOscillator();
    bgGain = audioCtx.createGain();
    bgOsc.type = 'sine';
    bgOsc.frequency.value = 220; // A3
    bgGain.gain.value = 0.000; // start silent
    bgOsc.connect(bgGain);
    bgGain.connect(audioCtx.destination);
    bgOsc.start();

    // Pre-generate short sound effects using oscillator -> buffer
    matchBuffer = _createToneBuffer(880, 0.08, 0.1);
    failBuffer = _createToneBuffer(220, 0.12, 0.05, 'triangle');
  } catch (e) {
    console.warn('Audio init failed', e);
  }
}

function _createToneBuffer(freq = 440, duration = 0.1, decay = 0.02, type = 'sine') {
  if (!audioCtx) return null;
  const sampleRate = audioCtx.sampleRate;
  const length = Math.floor(sampleRate * duration);
  const buffer = audioCtx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t / decay);
    data[i] = env * Math.sin(2 * Math.PI * freq * t);
  }
  return buffer;
}

export function playBuffer(buf, when = 0, gain = 0.2) {
  if (!audioCtx || !buf) return;
  const src = audioCtx.createBufferSource();
  const g = audioCtx.createGain();
  src.buffer = buf;
  g.gain.value = gain;
  src.connect(g);
  g.connect(audioCtx.destination);
  src.start(audioCtx.currentTime + when);
}

export function playMatch() {
  try {
    playBuffer(matchBuffer, 0, 0.25);
  } catch (e) { /* no-op */ }
}

export function playFail() {
  try {
    playBuffer(failBuffer, 0, 0.18);
  } catch (e) { /* no-op */ }
}

export function toggleBackground() {
  if (!audioCtx) return;
  if (backgroundPlaying) {
    // fade out and stop
    bgGain.gain.linearRampToValueAtTime(0.00001, audioCtx.currentTime + 0.6);
    backgroundPlaying = false;
  } else {
    // set gentle amplitude and detune a bit for movement
    bgGain.gain.cancelScheduledValues(audioCtx.currentTime);
    bgGain.gain.setValueAtTime(0.00001, audioCtx.currentTime);
    bgGain.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 0.8);
    backgroundPlaying = true;
  }
}

export function stopBackground() {
  try {
    if (!audioCtx) return;
    bgGain.gain.setValueAtTime(0.00001, audioCtx.currentTime);
    backgroundPlaying = false;
  } catch (e) { }
}

export function isBackgroundPlaying() {
  return !!backgroundPlaying;
}
