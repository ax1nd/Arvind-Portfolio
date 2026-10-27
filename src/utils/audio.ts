// Low-latency Web Audio API synthesizer with Ambient BGM and permanent sound FX
class AudioEngine {
  private ctx: AudioContext | null = null;
  private isAmbienceRunning: boolean = false;
  private ambienceGain: GainNode | null = null;
  private ambientOscs: OscillatorNode[] = [];
  private ambientFilter: BiquadFilterNode | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      // Auto-unlock AudioContext on first user interaction anywhere
      const unlock = () => {
        this.resume();
        this.startAmbience();
        window.removeEventListener('click', unlock);
        window.removeEventListener('keydown', unlock);
        window.removeEventListener('touchstart', unlock);
        window.removeEventListener('pointerdown', unlock);
      };

      window.addEventListener('click', unlock, { once: true });
      window.addEventListener('keydown', unlock, { once: true });
      window.addEventListener('touchstart', unlock, { once: true });
      window.addEventListener('pointerdown', unlock, { once: true });
    }
  }

  private getContext(): AudioContext | null {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    return this.ctx;
  }

  public resume() {
    const ctx = this.getContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  }

  // Generative atmospheric ambient BGM
  public startAmbience() {
    if (this.isAmbienceRunning) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      this.resume();
      const now = ctx.currentTime;

      // Master ambient gain node
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.linearRampToValueAtTime(0.045, now + 2.5); // Smooth fade-in
      masterGain.connect(ctx.destination);
      this.ambienceGain = masterGain;

      // Lowpass resonant filter for dark warmth
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, now);
      filter.Q.setValueAtTime(2.0, now);
      filter.connect(masterGain);
      this.ambientFilter = filter;

      // Filter LFO modulation
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.06, now); // Very slow 0.06Hz breath
      lfoGain.gain.setValueAtTime(140, now);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start(now);
      this.ambientOscs.push(lfo);

      // Drone Chord: A1 (55Hz) + E2 (82.4Hz) + A2 (110Hz) + subtle sub (27.5Hz)
      const freqs = [27.5, 55.0, 82.4, 110.0];
      const types: OscillatorType[] = ['sine', 'triangle', 'sine', 'sawtooth'];
      const gains = [0.4, 0.5, 0.35, 0.15];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = types[idx];
        osc.frequency.setValueAtTime(freq, now);

        // Subtle detune for slow phase chorus
        osc.detune.setValueAtTime((idx - 1.5) * 3, now);

        oscGain.gain.setValueAtTime(gains[idx], now);
        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start(now);
        this.ambientOscs.push(osc);
      });

      this.isAmbienceRunning = true;
    } catch {
      // Audio autoplay policy handled on next user click
    }
  }

  public isAmbienceActive(): boolean {
    return this.isAmbienceRunning;
  }

  // Sound FX (Always Active)
  public play(type: 'click' | 'switch' | 'bounce' | 'glitch' | 'pop' | 'heavy') {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      this.resume();
      if (!this.isAmbienceRunning) {
        this.startAmbience();
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1600, now);
        osc.frequency.exponentialRampToValueAtTime(160, now + 0.035);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
        osc.start(now);
        osc.stop(now + 0.035);
      } else if (type === 'switch') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(750, now);
        osc.frequency.setValueAtTime(1450, now + 0.02);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'glitch') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.setValueAtTime(680, now + 0.02);
        osc.frequency.setValueAtTime(130, now + 0.04);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'bounce') {
        osc.type = 'sine';
        const freq = 190 + Math.random() * 140;
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.045);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
        osc.start(now);
        osc.stop(now + 0.045);
      } else if (type === 'pop') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(980, now + 0.035);
        gain.gain.setValueAtTime(0.16, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
        osc.start(now);
        osc.stop(now + 0.035);
      } else if (type === 'heavy') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, now);
        osc.frequency.exponentialRampToValueAtTime(35, now + 0.14);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.start(now);
        osc.stop(now + 0.14);
      }
    } catch {
      // Fallback
    }
  }
}

export const sound = new AudioEngine();
