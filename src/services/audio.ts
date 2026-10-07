/**
 * Audio Engine for Clash of Champions : IPS Arena
 * Features:
 * - Separated Audio Channels (BGM vs SFX)
 * - Procedural Web Audio API Synthesizer (Cyber / Epic Esports dark fantasy theme)
 * - Fallback / Extensibility to HTML5 Audio files (/audio/bgm.mp3, etc.)
 * - Zero interruption of BGM when SFX plays
 * - Mute / Unmute and Volume controls
 */

class AudioManager {
  private audioCtx: AudioContext | null = null;
  private bgmGainNode: GainNode | null = null;
  private sfxGainNode: GainNode | null = null;
  private bgmTimer: number | null = null;
  private isBgmPlaying: boolean = false;
  private bgmEnabled: boolean = true;
  private bgmVolume: number = 0.32;
  private sfxVolume: number = 0.8;
  private stepIndex: number = 0;
  private nextNoteTime: number = 0;
  private activeBgmOscillators: OscillatorNode[] = [];

  // Optional HTML5 audio fallback elements
  private htmlBgmAudio: HTMLAudioElement | null = null;
  private htmlCorrectAudio: HTMLAudioElement | null = null;
  private htmlWrongAudio: HTMLAudioElement | null = null;
  private useHtmlAudio: boolean = false;

  constructor() {
    // Attempt to prepare HTML Audio if files exist
    if (typeof window !== 'undefined') {
      try {
        const testBgm = new Audio('/audio/bgm.mp3');
        testBgm.loop = true;
        testBgm.volume = this.bgmVolume;
        this.htmlBgmAudio = testBgm;

        this.htmlCorrectAudio = new Audio('/audio/correct.mp3');
        this.htmlCorrectAudio.volume = this.sfxVolume;

        this.htmlWrongAudio = new Audio('/audio/wrong.mp3');
        this.htmlWrongAudio.volume = this.sfxVolume;
      } catch {
        // Fallback to Web Audio API
      }
    }
  }

  private initAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();

      // Master Gain for BGM
      this.bgmGainNode = this.audioCtx.createGain();
      this.bgmGainNode.gain.value = this.bgmEnabled ? this.bgmVolume : 0;
      this.bgmGainNode.connect(this.audioCtx.destination);

      // Master Gain for SFX
      this.sfxGainNode = this.audioCtx.createGain();
      this.sfxGainNode.gain.value = this.sfxVolume;
      this.sfxGainNode.connect(this.audioCtx.destination);
    }

    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  /**
   * Starts BGM playback (invoked on user interaction like [ MASUK ARENA PERTANDINGAN ])
   */
  public async playBGM() {
    this.bgmEnabled = true;
    this.initAudioContext();

    if (this.isBgmPlaying) return;

    // Try HTML5 Audio file first if user provided an existing /audio/bgm.mp3
    if (this.htmlBgmAudio) {
      try {
        this.htmlBgmAudio.volume = this.bgmVolume;
        const playPromise = this.htmlBgmAudio.play();
        if (playPromise !== undefined) {
          await playPromise;
          this.useHtmlAudio = true;
          this.isBgmPlaying = true;
          return;
        }
      } catch {
        // Network/404 or autoplay prevented -> fallback to procedural Web Audio synthesizer
        this.useHtmlAudio = false;
      }
    }

    // Procedural Web Audio API Epic Esports Synthesizer
    if (this.audioCtx && this.bgmGainNode) {
      this.isBgmPlaying = true;
      this.stepIndex = 0;
      this.nextNoteTime = this.audioCtx.currentTime + 0.05;
      this.startSynthesizerLoop();
    }
  }

  /**
   * Procedural Epic Cyber Esports BGM Synthesizer
   * 120 BPM, Driving bassline, cyber arpeggio, dark fantasy chords (Am - F - Dm - Em)
   */
  private startSynthesizerLoop() {
    if (!this.isBgmPlaying || !this.audioCtx || !this.bgmGainNode) return;

    const tempo = 124;
    const sixteenthNoteDuration = 60 / tempo / 4; // 16th note timing
    const scheduleAheadTime = 0.2;

    const chords = [
      // Am
      { bass: 55, chord: [220, 261.63, 329.63, 440], arp: [220, 329.63, 440, 523.25, 440, 329.63] },
      // F
      { bass: 43.65, chord: [174.61, 220, 261.63, 349.23], arp: [174.61, 261.63, 349.23, 440, 349.23, 261.63] },
      // Dm
      { bass: 73.42, chord: [146.83, 220, 293.66, 349.23], arp: [146.83, 220, 293.66, 440, 293.66, 220] },
      // Em
      { bass: 82.41, chord: [164.81, 246.94, 329.63, 392.00], arp: [164.81, 246.94, 329.63, 493.88, 329.63, 246.94] },
    ];

    const scheduler = () => {
      if (!this.isBgmPlaying || !this.audioCtx || !this.bgmGainNode) return;

      while (this.nextNoteTime < this.audioCtx.currentTime + scheduleAheadTime) {
        const beat16 = this.stepIndex % 64; // 4 measures of 16th notes
        const measure = Math.floor(beat16 / 16);
        const chordInfo = chords[measure];
        const stepInMeasure = beat16 % 16;

        // 1. Driving Cyber Kick/Bass Pulse on quarter notes
        if (stepInMeasure % 4 === 0) {
          this.synthesizeDrumPulse(this.nextNoteTime, true);
        } else if (stepInMeasure % 4 === 2) {
          this.synthesizeDrumPulse(this.nextNoteTime, false);
        }

        // 2. Heavy Sub/Bassline
        if (stepInMeasure % 2 === 0) {
          const bassFreq = chordInfo.bass * (stepInMeasure === 6 || stepInMeasure === 14 ? 1.5 : 1.0);
          this.synthesizeBassNote(bassFreq, this.nextNoteTime, sixteenthNoteDuration * 1.8);
        }

        // 3. Cyber Esports Arpeggio Melody
        const arpNote = chordInfo.arp[stepInMeasure % chordInfo.arp.length];
        this.synthesizeArpNote(arpNote, this.nextNoteTime, sixteenthNoteDuration * 0.9);

        // 4. Epic Dark Pad Chord at start of each measure
        if (stepInMeasure === 0) {
          this.synthesizePadChord(chordInfo.chord, this.nextNoteTime, sixteenthNoteDuration * 15);
        }

        this.nextNoteTime += sixteenthNoteDuration;
        this.stepIndex++;
      }

      this.bgmTimer = window.setTimeout(scheduler, 50);
    };

    scheduler();
  }

  private synthesizeDrumPulse(time: number, isDownbeat: boolean) {
    if (!this.audioCtx || !this.bgmGainNode) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    const startFreq = isDownbeat ? 130 : 90;
    osc.frequency.setValueAtTime(startFreq, time);
    osc.frequency.exponentialRampToValueAtTime(32, time + 0.08);

    gain.gain.setValueAtTime(isDownbeat ? 0.35 : 0.18, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

    osc.connect(gain);
    gain.connect(this.bgmGainNode);

    osc.start(time);
    osc.stop(time + 0.13);
  }

  private synthesizeBassNote(freq: number, time: number, duration: number) {
    if (!this.audioCtx || !this.bgmGainNode) return;
    const osc = this.audioCtx.createOscillator();
    const filter = this.audioCtx.createBiquadFilter();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, time);
    filter.frequency.exponentialRampToValueAtTime(120, time + duration);

    gain.gain.setValueAtTime(0.18, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.bgmGainNode);

    osc.start(time);
    osc.stop(time + duration);
  }

  private synthesizeArpNote(freq: number, time: number, duration: number) {
    if (!this.audioCtx || !this.bgmGainNode) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 1.5, time);
    filter.Q.value = 3;

    gain.gain.setValueAtTime(0.06, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.bgmGainNode);

    osc.start(time);
    osc.stop(time + duration);
  }

  private synthesizePadChord(frequencies: number[], time: number, duration: number) {
    if (!this.audioCtx || !this.bgmGainNode) return;

    frequencies.forEach(freq => {
      const osc = this.audioCtx!.createOscillator();
      const gain = this.audioCtx!.createGain();
      const filter = this.audioCtx!.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, time);
      filter.frequency.linearRampToValueAtTime(900, time + duration * 0.5);
      filter.frequency.linearRampToValueAtTime(500, time + duration);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.03, time + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.bgmGainNode!);

      osc.start(time);
      osc.stop(time + duration);
    });
  }

  /**
   * Stops BGM (called ONLY on Game Over or when user toggles off)
   */
  public stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
    if (this.htmlBgmAudio && this.useHtmlAudio) {
      this.htmlBgmAudio.pause();
      this.htmlBgmAudio.currentTime = 0;
    }
    this.activeBgmOscillators.forEach(osc => {
      try { osc.stop(); } catch {}
    });
    this.activeBgmOscillators = [];
  }

  /**
   * Toggles music on / off without resetting anything
   */
  public toggleBGM(): boolean {
    this.bgmEnabled = !this.bgmEnabled;
    this.setBgmEnabled(this.bgmEnabled);
    return this.bgmEnabled;
  }

  public setBgmEnabled(enabled: boolean) {
    this.bgmEnabled = enabled;
    if (this.bgmGainNode && this.audioCtx) {
      const now = this.audioCtx.currentTime;
      this.bgmGainNode.gain.cancelScheduledValues(now);
      this.bgmGainNode.gain.linearRampToValueAtTime(enabled ? this.bgmVolume : 0, now + 0.2);
    }
    if (this.htmlBgmAudio && this.useHtmlAudio) {
      if (enabled) {
        this.htmlBgmAudio.play().catch(() => {});
      } else {
        this.htmlBgmAudio.pause();
      }
    }
  }

  public isMusicOn(): boolean {
    return this.bgmEnabled;
  }

  /**
   * Plays Correct Answer SFX (layered on top of BGM without interrupting it)
   */
  public playCorrectSFX() {
    this.initAudioContext();

    // Check HTML audio element fallback
    if (this.htmlCorrectAudio) {
      try {
        const clone = this.htmlCorrectAudio.cloneNode() as HTMLAudioElement;
        clone.volume = this.sfxVolume;
        clone.play().catch(() => this.synthesizeCorrectSound());
        return;
      } catch {
        // Fallback to synthesizer
      }
    }

    this.synthesizeCorrectSound();
  }

  private synthesizeCorrectSound() {
    if (!this.audioCtx || !this.sfxGainNode) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;
    // Triumphant ascending arpeggio C5, E5, G5, C6 with rich harmonics
    const notes = [523.25, 659.25, 783.99, 1046.50];

    notes.forEach((freq, index) => {
      const noteTime = now + index * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.001, noteTime);
      gain.gain.linearRampToValueAtTime(0.22, noteTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.6);

      osc.connect(gain);
      gain.connect(this.sfxGainNode!);

      osc.start(noteTime);
      osc.stop(noteTime + 0.65);
    });

    // Sub shimmer sparkle chime
    const sparkleOsc = ctx.createOscillator();
    const sparkleGain = ctx.createGain();
    sparkleOsc.type = 'sine';
    sparkleOsc.frequency.setValueAtTime(1567.98, now + 0.24); // G6
    sparkleGain.gain.setValueAtTime(0.12, now + 0.24);
    sparkleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    sparkleOsc.connect(sparkleGain);
    sparkleGain.connect(this.sfxGainNode);
    sparkleOsc.start(now + 0.24);
    sparkleOsc.stop(now + 0.85);
  }

  /**
   * Plays Wrong Answer SFX (layered on top of BGM without interrupting it)
   */
  public playWrongSFX() {
    this.initAudioContext();

    if (this.htmlWrongAudio) {
      try {
        const clone = this.htmlWrongAudio.cloneNode() as HTMLAudioElement;
        clone.volume = this.sfxVolume;
        clone.play().catch(() => this.synthesizeWrongSound());
        return;
      } catch {
        // Fallback to synthesizer
      }
    }

    this.synthesizeWrongSound();
  }

  private synthesizeWrongSound() {
    if (!this.audioCtx || !this.sfxGainNode) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    // Dramatic metallic deflection: low frequency thud + minor second dissonance
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(164.81, now); // E3
    osc1.frequency.exponentialRampToValueAtTime(98, now + 0.35); // downpitch

    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(174.61, now); // F3 (dissonant semitone)
    osc2.frequency.exponentialRampToValueAtTime(104, now + 0.35);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(700, now);
    filter.frequency.exponentialRampToValueAtTime(150, now + 0.35);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGainNode);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.42);
    osc2.stop(now + 0.42);
  }

  public setBgmVolume(val: number) {
    this.bgmVolume = Math.max(0, Math.min(1, val));
    if (this.bgmGainNode && this.audioCtx && this.bgmEnabled) {
      this.bgmGainNode.gain.setValueAtTime(this.bgmVolume, this.audioCtx.currentTime);
    }
    if (this.htmlBgmAudio) {
      this.htmlBgmAudio.volume = this.bgmVolume;
    }
  }

  public setSfxVolume(val: number) {
    this.sfxVolume = Math.max(0, Math.min(1, val));
    if (this.sfxGainNode && this.audioCtx) {
      this.sfxGainNode.gain.setValueAtTime(this.sfxVolume, this.audioCtx.currentTime);
    }
  }
}

export const audio = new AudioManager();
