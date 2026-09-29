import React from 'react';
import { X, Sliders, CheckCircle2, Eye, Brain, Volume2, Shield } from 'lucide-react';
import { sound } from '../utils/audio';
import { speech } from '../utils/speech';
import { UDLSettings } from '../types';

interface UDLSettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  udlSettings: UDLSettings;
  onUpdateUDL: (settings: Partial<UDLSettings>) => void;
}

export const UDLSettingsDrawer: React.FC<UDLSettingsDrawerProps> = ({
  isOpen,
  onClose,
  udlSettings,
  onUpdateUDL,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#090d16] border border-emerald-500/30 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.2)] p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-['Cinzel',serif] text-base font-bold text-white">
                Clinical Accessibility & UDL
              </h3>
              <p className="text-[11px] text-slate-400">
                Live engine accommodations applied in real time
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Toggles List */}
        <div className="space-y-3">
          {/* Dyslexia */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5">
            <div>
              <div className="text-xs font-bold text-white">Dyslexia Engine</div>
              <div className="text-[11px] text-slate-400">OpenDyslexic typography & phoneme tint</div>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onUpdateUDL({ dyslexiaEngine: !udlSettings.dyslexiaEngine });
              }}
              className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors cursor-pointer ${
                udlSettings.dyslexiaEngine ? 'bg-blue-500' : 'bg-slate-700'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                  udlSettings.dyslexiaEngine ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Low Stim */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5">
            <div>
              <div className="text-xs font-bold text-white">Low-Stimulation Mode</div>
              <div className="text-[11px] text-slate-400">Dampened audio, soft palette, low particles</div>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onUpdateUDL({ lowStimulation: !udlSettings.lowStimulation });
              }}
              className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors cursor-pointer ${
                udlSettings.lowStimulation ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                  udlSettings.lowStimulation ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* ADHD */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5">
            <div>
              <div className="text-xs font-bold text-white">ADHD Micro-Quests</div>
              <div className="text-[11px] text-slate-400">Non-punitive chunking with 0 game over</div>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onUpdateUDL({ adhdMicroQuest: !udlSettings.adhdMicroQuest });
              }}
              className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors cursor-pointer ${
                udlSettings.adhdMicroQuest ? 'bg-amber-500' : 'bg-slate-700'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                  udlSettings.adhdMicroQuest ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Multisensory */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5">
            <div>
              <div className="text-xs font-bold text-white">Multisensory Narration</div>
              <div className="text-[11px] text-slate-400">Text-to-speech audio on interactive elements</div>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                const nextVal = !udlSettings.multisensoryAudio;
                onUpdateUDL({ multisensoryAudio: nextVal });
                speech.setEnabled(nextVal);
                if (nextVal) speech.speak('Narration enabled.');
              }}
              className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors cursor-pointer ${
                udlSettings.multisensoryAudio ? 'bg-purple-500' : 'bg-slate-700'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                  udlSettings.multisensoryAudio ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold text-xs rounded-lg transition-colors cursor-pointer"
        >
          Apply Accommodations
        </button>
      </div>
    </div>
  );
};
