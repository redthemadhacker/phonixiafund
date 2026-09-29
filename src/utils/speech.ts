/**
 * Web Speech API synthesizer for Multisensory UDL Redundancy
 */

class SpeechNarrator {
  private enabled: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  public setEnabled(val: boolean) {
    this.enabled = val;
    if (!val && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public speak(
    text: string, 
    force: boolean = false, 
    options?: { rate?: number; pitch?: number; volume?: number }
  ) {
    if (!this.enabled && !force) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      const cleanText = text.replace(/<[^>]*>?/gm, '').trim();
      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = options?.rate ?? 1.0;
      utterance.pitch = options?.pitch ?? 1.0;
      utterance.volume = options?.volume ?? 0.85;

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech synthesis error handling
    }
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const speech = new SpeechNarrator();
