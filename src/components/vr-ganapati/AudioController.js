// Web Audio API Procedural Sound Engine & MP3 Player for VR Ganapati

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.ambienceGain = null;
    this.ambienceOscillators = [];
    this.isAmbiencePlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.ambienceGain) {
      this.ambienceGain.gain.setValueAtTime(
        this.isMuted ? 0 : 0.15,
        this.ctx ? this.ctx.currentTime : 0
      );
    }
    return this.isMuted;
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.ambienceGain && this.ctx) {
      this.ambienceGain.gain.setValueAtTime(
        this.isMuted ? 0 : 0.15,
        this.ctx.currentTime
      );
    }
  }

  // Play realistic temple brass bell using additive partials + decay envelopes
  playBell() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    // First try external audio file if available
    try {
      const audio = new Audio('/audio/bell.mp3');
      audio.volume = 0.7;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback to Web Audio synthesis
          this.synthesizeTempleBell();
        });
        return;
      }
    } catch {
      this.synthesizeTempleBell();
      return;
    }
    this.synthesizeTempleBell();
  }

  synthesizeTempleBell() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    // Temple bell frequencies: fundamental + resonant strike harmonics
    const fundamental = 587.33; // D5 note (sacred bell pitch)
    const partials = [
      { ratio: 0.5, amp: 0.4, decay: 4.5 },
      { ratio: 1.0, amp: 0.7, decay: 4.0 },
      { ratio: 1.35, amp: 0.5, decay: 3.2 },
      { ratio: 1.98, amp: 0.4, decay: 2.5 },
      { ratio: 2.65, amp: 0.25, decay: 1.8 },
      { ratio: 3.42, amp: 0.15, decay: 1.2 },
      { ratio: 4.15, amp: 0.1, decay: 0.8 },
    ];

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.6, now);
    masterGain.connect(this.ctx.destination);

    partials.forEach(({ ratio, amp, decay }) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(fundamental * ratio, now);

      // Bell envelope: sharp strike attack, lingering exponential decay
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(amp, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + decay);
    });

    // Metallic chime noise click at start
    this.playBellClapperClick(now, masterGain);
  }

  playBellClapperClick(now, destination) {
    try {
      const bufferSize = this.ctx.sampleRate * 0.04;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3200, now);
      filter.Q.setValueAtTime(5, now);

      const clickGain = this.ctx.createGain();
      clickGain.gain.setValueAtTime(0.15, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      noise.connect(filter);
      filter.connect(clickGain);
      clickGain.connect(destination);

      noise.start(now);
    } catch {
      // Ignore click error
    }
  }

  // Play warm soft flame chime when Diya is lit
  playDiyaSound() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.8);
  }

  // Play flower offering subtle chime
  playFlowerSound() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [659.25, 783.99, 987.77]; // E5, G5, B5 soft celestial arpeggio
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + idx * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.12, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 1.2);
    });
  }

  // Play sacred blessing resonant singing bowl / chord
  playBlessingSound() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const audio = new Audio('/audio/blessing.mp3');
      audio.volume = 0.8;
      const promise = audio.play();
      if (promise !== undefined) {
        promise.catch(() => this.synthesizeBlessingChord());
        return;
      }
    } catch {
      this.synthesizeBlessingChord();
      return;
    }
    this.synthesizeBlessingChord();
  }

  synthesizeBlessingChord() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    // Divine meditative singing bowl chord: Om frequencies (136.1 Hz planetary Om + harmonics)
    const frequencies = [136.1, 272.2, 408.3, 544.4, 816.6, 1088.8];

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.linearRampToValueAtTime(0.4, now + 1.5);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 6.0);
    masterGain.connect(this.ctx.destination);

    frequencies.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.3 / (i + 1), now);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 6.0);
    });
  }

  // Soothing sacred temple drone (Tanpura / ambient resonance)
  startAmbience() {
    if (this.isAmbiencePlaying) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      this.ambienceGain = this.ctx.createGain();
      this.ambienceGain.gain.setValueAtTime(0.001, now);
      this.ambienceGain.gain.linearRampToValueAtTime(
        this.isMuted ? 0 : 0.12,
        now + 3.0
      );
      this.ambienceGain.connect(this.ctx.destination);

      // Low frequency meditative drone (C#2 69.3Hz, G#2 103.8Hz, C#3 138.6Hz)
      const droneFreqs = [69.3, 103.8, 138.6, 207.65];
      this.ambienceOscillators = droneFreqs.map((freq, i) => {
        const osc = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        osc.type = i === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Subtle slow pitch modulation for realistic organic tanpura shimmer
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(0.2 + i * 0.1, now);
        lfoGain.gain.setValueAtTime(0.4, now);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start(now);

        subGain.gain.setValueAtTime(0.25 / (i + 1), now);
        osc.connect(subGain);
        subGain.connect(this.ambienceGain);
        osc.start(now);
        return { osc, lfo };
      });

      this.isAmbiencePlaying = true;
    } catch {
      // Audio autoplay blocked or unsupported
    }
  }

  stopAmbience() {
    if (!this.isAmbiencePlaying || !this.ambienceGain || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      this.ambienceGain.gain.linearRampToValueAtTime(0.0001, now + 1.5);
      setTimeout(() => {
        this.ambienceOscillators.forEach(({ osc, lfo }) => {
          try {
            osc.stop();
            lfo.stop();
          } catch {}
        });
        this.ambienceOscillators = [];
        this.isAmbiencePlaying = false;
      }, 1600);
    } catch {}
  }
}

export const soundEngine = new SoundEngine();
