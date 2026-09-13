// Web Audio API Procedural Spiritual Music & Sound Engine for VR Ganapati

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.masterMusicGain = null;
    this.isMusicPlaying = false;
    this.tanpuraTimer = null;
    this.fluteTimer = null;
    this.bowlTimer = null;
    this.fluteTimeouts = [];
    this.reverbInput = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.applyMuteState();
    return this.isMuted;
  }

  setMuted(muted) {
    this.isMuted = muted;
    this.applyMuteState();
  }

  applyMuteState() {
    if (this.masterMusicGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterMusicGain.gain.cancelScheduledValues(now);
      this.masterMusicGain.gain.setValueAtTime(this.masterMusicGain.gain.value, now);
      this.masterMusicGain.gain.linearRampToValueAtTime(
        this.isMuted ? 0.0001 : 0.26,
        now + 0.6
      );
    }
  }

  // Ancient Temple Stone Hall Reverb (Stereo feedback comb filter)
  setupTempleReverb() {
    if (this.reverbInput || !this.ctx) return;
    try {
      const delayL = this.ctx.createDelay();
      delayL.delayTime.value = 0.38;
      const delayR = this.ctx.createDelay();
      delayR.delayTime.value = 0.48;

      const feedback = this.ctx.createGain();
      feedback.gain.value = 0.36;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1600; // Warm acoustic stone absorption

      delayL.connect(delayR);
      delayR.connect(feedback);
      feedback.connect(filter);
      filter.connect(delayL);

      const wetGain = this.ctx.createGain();
      wetGain.gain.value = 0.5;
      filter.connect(wetGain);
      wetGain.connect(this.masterMusicGain);

      this.reverbInput = delayL;
    } catch {
      // Audio node fallback
    }
  }

  // -------------------------------------------------------------
  // 1. SACRED TANPURA DRONE (4-string cyclical continuous acoustic loop)
  // -------------------------------------------------------------
  pluckTanpuraString(freq) {
    if (!this.ctx || !this.isMusicPlaying || !this.masterMusicGain) return;
    const now = this.ctx.currentTime;

    // Harmonic overtones of the brass/bronze tanpura string with jawari buzzing
    const harmonics = [
      { mult: 1, gain: 0.55 },
      { mult: 2, gain: 0.45 },
      { mult: 3, gain: 0.32 },
      { mult: 4, gain: 0.22 },
      { mult: 5, gain: 0.15 },
      { mult: 6, gain: 0.10 },
    ];

    const stringGain = this.ctx.createGain();
    stringGain.gain.setValueAtTime(0.0001, now);
    stringGain.gain.linearRampToValueAtTime(0.18, now + 0.04);
    stringGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

    stringGain.connect(this.masterMusicGain);
    if (this.reverbInput) {
      stringGain.connect(this.reverbInput);
    }

    harmonics.forEach(({ mult, gain: hGain }) => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq * mult, now);

      // Subtle frequency modulation for authentic jawari silk thread buzz
      const lfo = this.ctx.createOscillator();
      const lfoG = this.ctx.createGain();
      lfo.frequency.setValueAtTime(4.2 + mult * 0.3, now);
      lfoG.gain.setValueAtTime(0.8, now);
      lfo.connect(lfoG);
      lfoG.connect(osc.frequency);
      lfo.start(now);
      lfo.stop(now + 3.8);

      g.gain.setValueAtTime(hGain * 0.25, now);
      osc.connect(g);
      g.connect(stringGain);

      osc.start(now);
      osc.stop(now + 3.8);
    });
  }

  startTanpuraCycle() {
    // Standard Pa-Sa tuning in Key of D:
    // String 1: Pancham 'Pa' (A2 = 110.0 Hz)
    // String 2: Tar Sa (D3 = 146.83 Hz)
    // String 3: Tar Sa (D3 = 146.83 Hz)
    // String 4: Mandra Sa (D2 = 73.41 Hz)
    const strings = [110.0, 146.83, 146.83, 73.41];
    let index = 0;

    const tick = () => {
      if (!this.isMusicPlaying) return;
      this.pluckTanpuraString(strings[index]);
      index = (index + 1) % strings.length;
      this.tanpuraTimer = setTimeout(tick, 1850);
    };

    tick();
  }

  // -------------------------------------------------------------
  // 2. SACRED BANSURI FLUTE (Bamboo Flute in Raga Bhupali)
  // -------------------------------------------------------------
  playBansuriNote(frequency, duration, glideFrom = null) {
    if (!this.ctx || !this.isMusicPlaying || !this.masterMusicGain) return;
    const now = this.ctx.currentTime;

    // Sweet sine fundamental + filtered triangle wave for bamboo resonance
    const oscSine = this.ctx.createOscillator();
    const oscTri = this.ctx.createOscillator();
    const triFilter = this.ctx.createBiquadFilter();
    triFilter.type = 'lowpass';
    triFilter.frequency.setValueAtTime(1350, now);

    const noteGain = this.ctx.createGain();

    // Portamento / Meend (devotional Indian classical pitch glide)
    if (glideFrom && glideFrom > 0) {
      oscSine.frequency.setValueAtTime(glideFrom, now);
      oscSine.frequency.exponentialRampToValueAtTime(frequency, now + 0.28);
      oscTri.frequency.setValueAtTime(glideFrom, now);
      oscTri.frequency.exponentialRampToValueAtTime(frequency, now + 0.28);
    } else {
      oscSine.frequency.setValueAtTime(frequency, now);
      oscTri.frequency.setValueAtTime(frequency, now);
    }

    // Devotional Vibrato LFO (natural delayed onset)
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    vibrato.frequency.setValueAtTime(4.8, now); // ~4.8 Hz gentle vibrato
    vibratoGain.gain.setValueAtTime(0.0001, now);
    vibratoGain.gain.setValueAtTime(0.0001, now + 0.35);
    vibratoGain.gain.linearRampToValueAtTime(2.2, now + 0.85); // Gentle 2.2 Hz depth
    vibrato.connect(vibratoGain);
    vibratoGain.connect(oscSine.frequency);
    vibratoGain.connect(oscTri.frequency);
    vibrato.start(now);
    vibrato.stop(now + duration + 0.6);

    // Natural flute breath envelope
    const attack = 0.35;
    const release = 0.6;
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(0.24, now + attack);
    noteGain.gain.setValueAtTime(0.22, now + Math.max(attack, duration - release));
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Connect nodes
    const triGain = this.ctx.createGain();
    triGain.gain.setValueAtTime(0.35, now);
    oscTri.connect(triFilter);
    triFilter.connect(triGain);
    triGain.connect(noteGain);

    oscSine.connect(noteGain);
    noteGain.connect(this.masterMusicGain);

    if (this.reverbInput) {
      const reverbSend = this.ctx.createGain();
      reverbSend.gain.setValueAtTime(0.48, now);
      noteGain.connect(reverbSend);
      reverbSend.connect(this.reverbInput);
    }

    oscSine.start(now);
    oscTri.start(now);
    oscSine.stop(now + duration);
    oscTri.stop(now + duration);
  }

  startBansuriMelody() {
    const N = {
      LowPa: 220.00,
      LowDha: 246.94,
      Sa: 293.66, // D4
      Re: 329.63, // E4
      Ga: 369.99, // F#4
      Pa: 440.00, // A4
      Dha: 493.88, // B4
      HighSa: 587.33, // D5
      HighRe: 659.25, // E5
      HighGa: 739.99, // F#5
    };

    // Traditional devotional Raga Bhupali (Mohanam) phrases
    const phrases = [
      // Phrase 1: Peaceful Alap invocation
      [
        { freq: N.LowDha, dur: 2.2 },
        { freq: N.Sa, dur: 3.4 },
        { freq: N.Re, dur: 1.8 },
        { freq: N.Ga, dur: 3.8 },
        { freq: N.Re, dur: 1.6 },
        { freq: N.Sa, dur: 4.5 },
      ],
      // Phrase 2: Ascending devotional prayer
      [
        { freq: N.Sa, dur: 1.5 },
        { freq: N.Re, dur: 1.5 },
        { freq: N.Ga, dur: 2.2 },
        { freq: N.Pa, dur: 3.0 },
        { freq: N.Dha, dur: 2.4 },
        { freq: N.HighSa, dur: 4.2 },
        { freq: N.Dha, dur: 2.0 },
        { freq: N.Pa, dur: 3.8 },
      ],
      // Phrase 3: High sanctum darshan
      [
        { freq: N.HighSa, dur: 2.0 },
        { freq: N.HighRe, dur: 2.4 },
        { freq: N.HighSa, dur: 3.2 },
        { freq: N.Dha, dur: 2.0 },
        { freq: N.Pa, dur: 2.4 },
        { freq: N.Ga, dur: 2.8 },
        { freq: N.Re, dur: 2.0 },
        { freq: N.Ga, dur: 2.0 },
        { freq: N.Sa, dur: 5.0 },
      ],
      // Phrase 4: Soothing meditative conclusion
      [
        { freq: N.Ga, dur: 2.6 },
        { freq: N.Pa, dur: 2.8 },
        { freq: N.Ga, dur: 2.4 },
        { freq: N.Re, dur: 2.2 },
        { freq: N.LowDha, dur: 2.6 },
        { freq: N.Sa, dur: 5.5 },
      ],
    ];

    let phraseIndex = 0;

    const playNextPhrase = () => {
      if (!this.isMusicPlaying) return;
      const phrase = phrases[phraseIndex];
      phraseIndex = (phraseIndex + 1) % phrases.length;

      let timeOffset = 0;
      let prevFreq = null;

      phrase.forEach((note) => {
        const tid = setTimeout(() => {
          if (!this.isMusicPlaying) return;
          this.playBansuriNote(note.freq, note.dur, prevFreq);
        }, timeOffset * 1000);
        this.fluteTimeouts.push(tid);

        prevFreq = note.freq;
        timeOffset += note.dur - 0.15; // Smooth legato overlap
      });

      // Natural meditative pause (3.8s) between flute phrases
      const phraseTotalTime = timeOffset + 3.8;
      this.fluteTimer = setTimeout(playNextPhrase, phraseTotalTime * 1000);
    };

    // Begin flute 1.5 seconds after Tanpura starts
    this.fluteTimer = setTimeout(playNextPhrase, 1500);
  }

  // -------------------------------------------------------------
  // 3. TIBETAN SINGING BOWL & OM RESONATOR (Gentle periodic resonance)
  // -------------------------------------------------------------
  startSingingBowlCycle() {
    const playBowl = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.masterMusicGain) return;
      const now = this.ctx.currentTime;
      // Sacred planetary Om fundamental 136.1 Hz + harmonics
      const bowlFreqs = [136.1, 272.2, 408.3];
      bowlFreqs.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        g.gain.setValueAtTime(0.0001, now);
        g.gain.linearRampToValueAtTime(0.07 / (i + 1), now + 1.2);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 9.0);

        osc.connect(g);
        g.connect(this.masterMusicGain);
        if (this.reverbInput) {
          g.connect(this.reverbInput);
        }

        osc.start(now);
        osc.stop(now + 9.0);
      });

      // Periodic chime every 18 to 25 seconds
      const nextDelay = (18 + Math.random() * 7) * 1000;
      this.bowlTimer = setTimeout(playBowl, nextDelay);
    };

    this.bowlTimer = setTimeout(playBowl, 5000);
  }

  // Start complete spiritual music ambience
  startSpiritualMusic() {
    if (this.isMusicPlaying) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      this.masterMusicGain = this.ctx.createGain();
      this.masterMusicGain.gain.setValueAtTime(0.0001, now);
      this.masterMusicGain.gain.linearRampToValueAtTime(
        this.isMuted ? 0.0001 : 0.26,
        now + 2.5
      );
      this.masterMusicGain.connect(this.ctx.destination);

      this.setupTempleReverb();
      this.isMusicPlaying = true;

      // Start harmonious spiritual layers
      this.startTanpuraCycle();
      this.startBansuriMelody();
      this.startSingingBowlCycle();
    } catch {
      // Autoplay policy handled on next user gesture
    }
  }

  stopSpiritualMusic() {
    if (!this.isMusicPlaying || !this.ctx) return;
    this.isMusicPlaying = false;
    clearTimeout(this.tanpuraTimer);
    clearTimeout(this.fluteTimer);
    clearTimeout(this.bowlTimer);
    this.fluteTimeouts.forEach((t) => clearTimeout(t));
    this.fluteTimeouts = [];

    if (this.masterMusicGain) {
      try {
        const now = this.ctx.currentTime;
        this.masterMusicGain.gain.cancelScheduledValues(now);
        this.masterMusicGain.gain.setValueAtTime(this.masterMusicGain.gain.value, now);
        this.masterMusicGain.gain.linearRampToValueAtTime(0.0001, now + 1.2);
      } catch {}
    }
  }

  // Ambience aliases
  startAmbience() {
    this.startSpiritualMusic();
  }

  stopAmbience() {
    this.stopSpiritualMusic();
  }

  // -------------------------------------------------------------
  // 4. INTERACTIVE TEMPLE SOUND EFFECTS
  // -------------------------------------------------------------

  // Play realistic temple brass bell using additive partials + decay envelopes
  playBell(pitch = 587.33) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    this.synthesizeTempleBell(pitch);
  }

  synthesizeTempleBell(fundamental = 587.33) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    // Temple bell frequencies: fundamental + resonant strike harmonics
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
      gain.gain.setValueAtTime(0.0001, now);
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
      clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

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
    this.playDiyaSequentialChime(0);
  }

  // Play ascending harmonic chime as each consecutive lamp ignites
  playDiyaSequentialChime(step = 0) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Ascending melodic frequencies: D5, F#5, A5, C#6, E6 (divine sacred pentatonic raga)
    const pitches = [587.33, 739.99, 880.0, 1108.73, 1318.51];
    const fundamental = pitches[Math.min(step, pitches.length - 1)];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(fundamental, now);
    osc.frequency.exponentialRampToValueAtTime(fundamental * 1.35, now + 0.15);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.85);
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

      gain.gain.setValueAtTime(0.0001, startTime);
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
    this.synthesizeBlessingChord();
  }

  synthesizeBlessingChord() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    // Divine meditative singing bowl chord: Om frequencies (136.1 Hz planetary Om + harmonics)
    const frequencies = [136.1, 272.2, 408.3, 544.4, 816.6, 1088.8];

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, now);
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

  // Play crisp camera shutter click with soft golden chime
  playCameraShutter() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Fast mechanical shutter snap
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.08);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);

    // Subtle golden chime resonance
    const bellOsc = this.ctx.createOscillator();
    const bellGain = this.ctx.createGain();
    bellOsc.type = 'sine';
    bellOsc.frequency.setValueAtTime(1046.5, now + 0.04); // C6 bell tone
    bellGain.gain.setValueAtTime(0.08, now + 0.04);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

    bellOsc.connect(bellGain);
    bellGain.connect(this.ctx.destination);

    bellOsc.start(now + 0.04);
    bellOsc.stop(now + 0.5);
  }

  // Sacred Aarti Ceremonial Music: Rhythmic temple ghanti + devotional drone
  startAartiMusic() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    this.stopAartiMusic();
    this.isAartiPlaying = true;

    // 1. Harmonium Sa-Pa devotional drone (D3 146.83Hz, A3 220Hz, D4 293.66Hz)
    const now = this.ctx.currentTime;
    const droneGain = this.ctx.createGain();
    droneGain.gain.setValueAtTime(0.0001, now);
    droneGain.gain.linearRampToValueAtTime(0.2, now + 1.5);
    droneGain.connect(this.masterMusicGain || this.ctx.destination);
    this.aartiDroneGain = droneGain;

    const freqs = [146.83, 220.0, 293.66];
    this.aartiOscs = freqs.map((f) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, now);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);

      osc.connect(filter);
      filter.connect(droneGain);
      osc.start(now);
      return osc;
    });

    // 2. Rhythmic Temple Aarti Ghanti / Bell chime (strikes every 700ms)
    const strikeAartiBell = () => {
      if (!this.isAartiPlaying) return;
      this.playBell(783.99); // G5 sacred Aarti pitch
      this.aartiBellTimer = setTimeout(strikeAartiBell, 700);
    };
    this.aartiBellTimer = setTimeout(strikeAartiBell, 500);
  }

  stopAartiMusic() {
    this.isAartiPlaying = false;
    if (this.aartiBellTimer) {
      clearTimeout(this.aartiBellTimer);
      this.aartiBellTimer = null;
    }
    if (this.aartiDroneGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.aartiDroneGain.gain.cancelScheduledValues(now);
      this.aartiDroneGain.gain.setValueAtTime(this.aartiDroneGain.gain.value, now);
      this.aartiDroneGain.gain.linearRampToValueAtTime(0.0001, now + 1.2);
      setTimeout(() => {
        if (this.aartiOscs) {
          this.aartiOscs.forEach((o) => {
            try { o.stop(); } catch {}
          });
          this.aartiOscs = null;
        }
      }, 1300);
    }
  }
}

export const soundEngine = new SoundEngine();
