import React, { useState, useEffect, useRef } from 'react';
import { 
  Eye, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Zap, 
  CheckCircle2, 
  Heart, 
  Sliders, 
  Brain, 
  Layers,
  ArrowRight,
  ShieldAlert,
  Play
} from 'lucide-react';
import { sound } from '../../utils/audio';
import { speech } from '../../utils/speech';
import { UDLSettings } from '../../types';

interface Slide5Props {
  udlSettings: UDLSettings;
  onUpdateUDL: (settings: Partial<UDLSettings>) => void;
  onNextSlide?: () => void;
}

export const Slide5AccessibilityUDL: React.FC<Slide5Props> = ({
  udlSettings,
  onUpdateUDL,
  onNextSlide,
}) => {
  const [adhdStep, setAdhdStep] = useState<number>(1);
  const [isSpeakingSample, setIsSpeakingSample] = useState<boolean>(false);
  const soundwaveCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Soundwave canvas animation
  useEffect(() => {
    const canvas = soundwaveCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const renderWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLow = udlSettings.lowStimulation;
      const isAudioActive = udlSettings.multisensoryAudio || isSpeakingSample;

      const lines = isLow ? 2 : 4;
      const baseAmp = isAudioActive ? 22 : 6;

      ctx.lineWidth = 2;

      for (let l = 0; l < lines; l++) {
        ctx.beginPath();
        const strokeColor = isLow
          ? 'rgba(148, 163, 184, 0.4)'
          : l % 2 === 0
          ? 'rgba(6, 182, 212, 0.6)'
          : 'rgba(245, 158, 11, 0.6)';
        ctx.strokeStyle = strokeColor;

        for (let x = 0; x < canvas.width; x += 4) {
          const freq = (x * 0.03) + phase + l;
          const amp = baseAmp * Math.sin(x * 0.015 + phase * 0.5);
          const y = canvas.height * 0.5 + Math.sin(freq) * amp;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      phase += isLow ? 0.02 : 0.05;
      animId = requestAnimationFrame(renderWave);
    };

    renderWave();
    return () => cancelAnimationFrame(animId);
  }, [udlSettings.lowStimulation, udlSettings.multisensoryAudio, isSpeakingSample]);

  const toggleDyslexia = () => {
    sound.playClick();
    onUpdateUDL({ dyslexiaEngine: !udlSettings.dyslexiaEngine });
  };

  const toggleLowStimulation = () => {
    sound.playClick();
    onUpdateUDL({ lowStimulation: !udlSettings.lowStimulation });
  };

  const toggleAdhd = () => {
    sound.playClick();
    onUpdateUDL({ adhdMicroQuest: !udlSettings.adhdMicroQuest });
  };

  const toggleMultisensory = () => {
    sound.playClick();
    const nextVal = !udlSettings.multisensoryAudio;
    onUpdateUDL({ multisensoryAudio: nextVal });
    speech.setEnabled(nextVal);
    if (nextVal) {
      speech.speak('Multisensory narration and audio redundancy enabled.', true);
    }
  };

  const handleSpeakSample = () => {
    sound.playClick();
    setIsSpeakingSample(true);

    const passage = "The phonetic crystals resonate deep within the cavern. Each consonant anchor locks into place, allowing the young explorer to cross the chasm.";

    let speechRate = 0.95;
    let speechPitch = 1.0;
    let speechVolume = 0.9;

    // Apply exact acoustic modifications as requested:
    // Dyslexia: reads slower for phoneme decoding
    if (udlSettings.dyslexiaEngine) {
      speechRate = 0.68;
      speechPitch = 1.0;
    }
    // Low-Stimulation: dampens audio decibels significantly
    if (udlSettings.lowStimulation) {
      speechVolume = 0.25;
      speechPitch = 0.85;
      speechRate = Math.min(speechRate, 0.85);
    }
    // ADHD: brisk, energetic cadence
    if (udlSettings.adhdMicroQuest && !udlSettings.dyslexiaEngine) {
      speechRate = 1.15;
      speechPitch = 1.1;
    }

    speech.speak(passage, true, {
      rate: speechRate,
      pitch: speechPitch,
      volume: speechVolume,
    });

    const durationMs = (passage.length / (8 * speechRate)) * 1000;
    setTimeout(() => setIsSpeakingSample(false), Math.max(3500, durationMs));
  };

  return (
    <div className="relative min-h-[calc(100vh-8rem)] flex flex-col justify-center max-w-6xl mx-auto px-4 py-8">
      {/* Editorial Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-400 mb-2">
          <span>SECTOR 05</span>
          <span aria-hidden="true">·</span>
          <span>UNIVERSAL DESIGN FOR LEARNING</span>
          <span aria-hidden="true">·</span>
          <span>SPECIAL NEEDS CLINICAL ARCHITECTURE</span>
        </div>
        <h2 className="font-['Cinzel',serif] text-2xl sm:text-4xl font-black text-white tracking-tight">
          Clinical UDL & Sensory Inclusion
        </h2>
        <p className="text-sm text-slate-300 max-w-3xl mt-1">
          Special education is not an afterthought or retrofitted patch. I architected Phonixia from ground zero with Universal Design for Learning (UDL) principles, accommodating dyslexia, ADHD, autism spectrum sensory needs, and diverse processing styles.
        </p>
      </div>

      {/* 4 Interactive Toggles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Toggle 1: Dyslexia Engine */}
        <div className="p-4 rounded-xl bg-[#090d16] border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">📖</span>
              <button
                onClick={toggleDyslexia}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  udlSettings.dyslexiaEngine ? 'bg-blue-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    udlSettings.dyslexiaEngine ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="font-['Outfit',sans-serif] text-sm font-bold text-white">
              Dyslexia Engine
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              OpenDyslexic weighted typefaces, expanded kerning, and color-coded phoneme breakdown.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-white/5 text-[11px] font-mono text-blue-400">
            {udlSettings.dyslexiaEngine ? '● Active in Presentation' : '○ Disabled'}
          </div>
        </div>

        {/* Toggle 2: Low-Stimulation Mode */}
        <div className="p-4 rounded-xl bg-[#090d16] border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🛡️</span>
              <button
                onClick={toggleLowStimulation}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  udlSettings.lowStimulation ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    udlSettings.lowStimulation ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="font-['Outfit',sans-serif] text-sm font-bold text-white">
              Low-Stimulation Mode
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Sensory regulation for autism: lowers particles, dampens audio decibels, removes flashes.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-white/5 text-[11px] font-mono text-emerald-400">
            {udlSettings.lowStimulation ? '● Ambient Dampened' : '○ Standard Sensory'}
          </div>
        </div>

        {/* Toggle 3: ADHD Micro-Quest Mode */}
        <div className="p-4 rounded-xl bg-[#090d16] border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">⚡</span>
              <button
                onClick={toggleAdhd}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  udlSettings.adhdMicroQuest ? 'bg-amber-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    udlSettings.adhdMicroQuest ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="font-['Outfit',sans-serif] text-sm font-bold text-white">
              ADHD Micro-Quests
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Chunks objectives into 90-second dopamine milestones with zero punitive death states.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-white/5 text-[11px] font-mono text-amber-400">
            {udlSettings.adhdMicroQuest ? '● Non-Punitive Flow' : '○ Standard Questing'}
          </div>
        </div>

        {/* Toggle 4: Multisensory Redundancy */}
        <div className="p-4 rounded-xl bg-[#090d16] border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🔊</span>
              <button
                onClick={toggleMultisensory}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  udlSettings.multisensoryAudio ? 'bg-purple-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    udlSettings.multisensoryAudio ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="font-['Outfit',sans-serif] text-sm font-bold text-white">
              Multisensory Redundancy
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Dual-coded visual soundwaves, text-to-speech cues on hover, and alternative input mapping.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-white/5 text-[11px] font-mono text-purple-400">
            {udlSettings.multisensoryAudio ? '● Narration Active' : '○ Silent Visuals'}
          </div>
        </div>
      </div>

      {/* Live Interactive UDL Preview Stage */}
      <div className="p-6 rounded-2xl bg-[#0b101c] border border-blue-500/20 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <h3 className="font-['Cinzel',serif] text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-400" />
              <span>Live UDL Transformation Simulator</span>
            </h3>
            <p className="text-xs text-slate-400">
              Observe how the text and interaction patterns respond in real time to the toggles above.
            </p>
          </div>

          <button
            onClick={handleSpeakSample}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer shadow-lg ${
              isSpeakingSample
                ? 'bg-amber-400 text-slate-900 animate-pulse'
                : 'text-slate-900 bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>
              {isSpeakingSample
                ? 'Speaking Passage...'
                : udlSettings.dyslexiaEngine
                ? 'Read Passage (Slow Dyslexia Pace)'
                : udlSettings.lowStimulation
                ? 'Read Passage (Dampened Decibels)'
                : 'Read Passage Aloud'}
            </span>
          </button>
        </div>

        {/* Dynamic Transformed Text Box */}
        <div
          className={`p-5 rounded-xl border transition-all duration-300 ${
            udlSettings.dyslexiaEngine
              ? 'font-["OpenDyslexic",sans-serif] tracking-wider text-base bg-blue-950/20 border-blue-500/40'
              : 'font-["Plus_Jakarta_Sans",sans-serif] text-sm bg-black/40 border-white/10'
          }`}
        >
          <div className="text-xs font-mono uppercase text-slate-400 mb-2">
            Dynamic Reading Passage Simulation:
          </div>

          <div className="space-y-3 leading-relaxed">
            <p>
              "The <span className="text-blue-400 font-bold bg-blue-500/10 px-1 rounded">pho</span>
              <span className="text-amber-400 font-bold bg-amber-500/10 px-1 rounded">net</span>
              <span className="text-purple-400 font-bold bg-purple-500/10 px-1 rounded">ic</span> crystals resonate deep within the cavern. Each consonant anchor locks into place, allowing the young explorer to cross the chasm."
            </p>
            {udlSettings.dyslexiaEngine && (
              <div className="text-xs text-blue-300 font-sans border-t border-blue-500/20 pt-2 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>OpenDyslexic baseline weighting prevents letter rotation and visual crowding.</span>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic ADHD Micro-Quest Simulator */}
        {udlSettings.adhdMicroQuest && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-amber-300 font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>ADHD Micro-Quest: Non-Punitive Step Gauntlet</span>
              </span>
              <span className="text-xs font-mono text-amber-400 font-bold">
                Step {adhdStep} of 3 Complete
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  sound.playQuestSuccess();
                  setAdhdStep((s) => (s < 3 ? s + 1 : 1));
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-900 font-bold text-xs hover:bg-amber-300 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Complete Step {adhdStep}</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs text-slate-300">
                {adhdStep === 1 && 'Step 1: Mine 1 Vowel Gem (/æ/) — Zero timer, zero failure risk.'}
                {adhdStep === 2 && 'Step 2: Place on Smelting Anvil — Immediate acoustic chime reward.'}
                {adhdStep === 3 && 'Step 3: Forge Completed! Dopamine star burst unlocked.'}
              </span>
            </div>
          </div>
        )}

        {/* Visual Soundwave Canvas */}
        <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Volume2 className="w-4 h-4 text-cyan-400" />
            <span>Dual-Coded Visual Soundwave Feedback (Real-time Web Audio Telemetry):</span>
          </div>
          <canvas
            ref={soundwaveCanvasRef}
            width={240}
            height={36}
            className="rounded bg-black/60 border border-white/10"
          />
        </div>
      </div>

      {/* Slide 5 CTA footer note */}
      {onNextSlide && (
        <div className="mt-8 flex items-center justify-between gap-4 text-xs text-slate-400">
          <button
            onClick={() => {
              sound.playClick();
              onNextSlide();
            }}
            onMouseEnter={() => sound.playHover()}
            className="inline-flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors font-medium cursor-pointer"
          >
            <span>Continue to Sector 06: Roles, Dashboards & Pricing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
