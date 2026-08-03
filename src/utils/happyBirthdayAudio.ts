// Romantic Chime/Piano Web Audio Synthesizer fallback for Happy Birthday
export class HappyBirthdaySynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: any = null;

  private notes = [
    { note: 392.00, duration: 0.75 }, // G4
    { note: 392.00, duration: 0.25 }, // G4
    { note: 440.00, duration: 1.0  }, // A4
    { note: 392.00, duration: 1.0  }, // G4
    { note: 523.25, duration: 1.0  }, // C5
    { note: 493.88, duration: 2.0  }, // B4

    { note: 392.00, duration: 0.75 }, // G4
    { note: 392.00, duration: 0.25 }, // G4
    { note: 440.00, duration: 1.0  }, // A4
    { note: 392.00, duration: 1.0  }, // G4
    { note: 587.33, duration: 1.0  }, // D5
    { note: 523.25, duration: 2.0  }, // C5

    { note: 392.00, duration: 0.75 }, // G4
    { note: 392.00, duration: 0.25 }, // G4
    { note: 783.99, duration: 1.0  }, // G5
    { note: 659.25, duration: 1.0  }, // E5
    { note: 523.25, duration: 1.0  }, // C5
    { note: 493.88, duration: 1.0  }, // B4
    { note: 440.00, duration: 2.0  }, // A4

    { note: 698.46, duration: 0.75 }, // F5
    { note: 698.46, duration: 0.25 }, // F5
    { note: 659.25, duration: 1.0  }, // E5
    { note: 523.25, duration: 1.0  }, // C5
    { note: 587.33, duration: 1.0  }, // D5
    { note: 523.25, duration: 2.5  }, // C5
  ];

  public start() {
    if (this.isPlaying) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.isPlaying = true;
      this.playMelody();
    } catch (e) {
      console.log("AudioSynth error:", e);
    }
  }

  private playMelody() {
    if (!this.ctx || !this.isPlaying) return;

    const tempo = 120; // BPM
    const beatDuration = 60 / tempo;
    let currentTime = this.ctx.currentTime + 0.1;

    const playLoop = () => {
      if (!this.ctx || !this.isPlaying) return;

      this.notes.forEach((item) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(item.note, currentTime);

        gain.gain.setValueAtTime(0.001, currentTime);
        gain.gain.exponentialRampToValueAtTime(0.18, currentTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, currentTime + (item.duration * beatDuration) - 0.02);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(currentTime);
        osc.stop(currentTime + (item.duration * beatDuration));

        currentTime += item.duration * beatDuration;
      });

      const totalMelodyDuration = currentTime - this.ctx.currentTime;
      this.timerId = setTimeout(() => {
        if (this.isPlaying) {
          playLoop();
        }
      }, totalMelodyDuration * 1000);
    };

    playLoop();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) clearTimeout(this.timerId);
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch {}
      this.ctx = null;
    }
  }
}
