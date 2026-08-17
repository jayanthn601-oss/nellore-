class TempleAudioEngine {
  private ctx: AudioContext | null = null;
  private tanpuraOscs: OscillatorNode[] = [];
  private tanpuraGains: GainNode[] = [];
  private masterGain: GainNode | null = null;
  private isTanpuraPlaying = false;

  private init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Play realistic metallic temple bell
  public playTempleBell(pitch = 1.0) {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const baseFreq = 587.33 * pitch; // D5 pitch
    const harmonics = [1.0, 1.6, 2.0, 2.74, 3.0, 4.07];
    const gains = [0.6, 0.4, 0.3, 0.25, 0.15, 0.1];
    const decayTime = 3.5;

    harmonics.forEach((harmonic, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq * harmonic, this.ctx.currentTime);

      gainNode.gain.setValueAtTime(gains[idx] || 0.2, this.ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + decayTime);

      osc.connect(gainNode);
      gainNode.connect(this.masterGain!);

      osc.start();
      osc.stop(this.ctx.currentTime + decayTime);
    });
  }

  // Play Divine Shankha (Conch) Sound
  public playShankha() {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = "sawtooth";
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(440, this.ctx.currentTime);
    filter.Q.setValueAtTime(5, this.ctx.currentTime);

    // Frequency swell
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(280, this.ctx.currentTime + 0.6);
    osc.frequency.linearRampToValueAtTime(270, this.ctx.currentTime + 2.5);

    // Gain envelope
    gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 0.4);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2.8);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 2.9);
  }

  // Play Camphor Harathi Flame sound
  public playHarathiSound() {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    // Bell ring followed by subtle crackle
    this.playTempleBell(1.2);

    // Buffer noise for soft fire crackle
    const bufferSize = this.ctx.sampleRate * 1.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.4));
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.5);

    noiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    noiseSource.start();
  }

  // Toggle Continuous Indian Tanpura Ambient Drone (Sa-Pa C#)
  public toggleTanpura(onState?: boolean): boolean {
    this.init();
    if (!this.ctx || !this.masterGain) return false;

    const targetState = onState !== undefined ? onState : !this.isTanpuraPlaying;

    if (targetState) {
      if (this.isTanpuraPlaying) return true;

      // Base pitch: C#3 ~ 138.59 Hz
      const rootFreq = 138.59;
      // Notes: Pa (G#3 - 207.65 Hz), Sa (C#4 - 277.18 Hz), Sa (277.18), Kharaj Sa (C#3 - 138.59)
      const freqs = [207.65, 277.18, 277.18, 138.59];

      this.tanpuraOscs = [];
      this.tanpuraGains = [];

      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // Low pass filter for warm organic resonance
        const filter = this.ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(800 + idx * 100, this.ctx.currentTime);

        // Gentle rhythmic swell
        lfo.type = "sine";
        lfo.frequency.setValueAtTime(0.25 + idx * 0.08, this.ctx.currentTime);
        lfoGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

        lfo.connect(gain.gain);
        gain.gain.setValueAtTime(0.06, this.ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);

        osc.start();
        lfo.start();

        this.tanpuraOscs.push(osc, lfo);
        this.tanpuraGains.push(gain);
      });

      this.isTanpuraPlaying = true;
      return true;
    } else {
      this.tanpuraOscs.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore
        }
      });
      this.tanpuraOscs = [];
      this.tanpuraGains = [];
      this.isTanpuraPlaying = false;
      return false;
    }
  }

  public getIsPlaying(): boolean {
    return this.isTanpuraPlaying;
  }
}

export const templeAudio = new TempleAudioEngine();
