import React, { useState } from 'react';
import { 
  Copy, 
  ExternalLink, 
  Check, 
  Trophy, 
  Star, 
  Trash2, 
  UserPlus, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Home,
  Layers,
  Settings,
  Flame,
  Award
} from 'lucide-react';
import { sound } from '../../utils/audio';

export interface ExplorerData {
  id: string;
  name: string;
  gender: 'Boy' | 'Girl';
  active: boolean;
  realmStatus: string;
  stars: number;
  gamesCompleted: number;
  totalGames: number;
  accuracy: string;
  fluencyWPM: number;
  avatarBg: string;
  avatarEmoji: string;
  stageTitle: string;
  summary: string;
  skills: string[];
}

const EXPLORERS: ExplorerData[] = [
  {
    id: 'kam',
    name: 'Kam',
    gender: 'Boy',
    active: true,
    realmStatus: 'Sound Shallows: 0/10',
    stars: 0,
    gamesCompleted: 0,
    totalGames: 250,
    accuracy: 'Calibrating',
    fluencyWPM: 24,
    avatarBg: 'bg-gradient-to-br from-amber-600 to-red-600',
    avatarEmoji: '👦',
    stageTitle: 'Active Starting Explorer · Continent 1: Sound Shallows',
    summary: 'Kam is currently initializing the foundation curriculum in Sound Shallows. His game sessions focus on auditory phonemic awareness, isolating initial and terminal consonant sounds, and pairing acoustic tones with tactile voxel blocks.',
    skills: [
      'Auditory Speech Resonance Matching (/m/, /s/, /t/, /p/)',
      'Initial Sandpaper Letter Voxel Sculpting',
      'Short Vowel Discrimination (/æ/ in cat, /ɛ/ in bed)',
      'Baseline Phonological Loop Telemetry Logged'
    ]
  },
  {
    id: 'lani',
    name: 'Lani',
    gender: 'Girl',
    active: false,
    realmStatus: 'Sound Shallows: 50/10',
    stars: 774,
    gamesCompleted: 250,
    totalGames: 250,
    accuracy: '99.4%',
    fluencyWPM: 142,
    avatarBg: 'bg-gradient-to-br from-purple-600 to-amber-500',
    avatarEmoji: '👑',
    stageTitle: 'Graduated Master Explorer · Sound Shallows 100% Cleared',
    summary: 'Lani has achieved full mastery across all 250 game modules in Sound Shallows, banked 774 golden stars, and achieved 50/10 over-mastery milestone criteria. Her profile is cleared to cross the Sea Bridge into Continent 2: Builders Guild.',
    skills: [
      '100% Complete on all 250 Sound Shallows decodable modules',
      'Banked 774 Star Currency for Voxel Customization',
      'Complex Blend & Digraph Smelting (/ch/, /sh/, /th/, /wh/)',
      'Instant Orthographic Recall at 142 Words Per Minute'
    ]
  }
];

interface Slide7PreSeededProfilesProps {
  onNextSlide?: () => void;
}

export const Slide7PreSeededProfiles: React.FC<Slide7PreSeededProfilesProps> = ({ onNextSlide }) => {
  const [selectedExplorerId, setSelectedExplorerId] = useState<string>('kam');
  const [activeTab, setActiveTab] = useState<'explorers' | 'studio' | 'progress' | 'legends' | 'settings'>('explorers');
  const [copiedKey, setCopiedKey] = useState<boolean>(false);

  const selectedExplorer = EXPLORERS.find((e) => e.id === selectedExplorerId) || EXPLORERS[0];

  const handleCopyBetaCredentials = () => {
    sound.playClick();
    navigator.clipboard.writeText('readingheroes / phonics123');
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  return (
    <div className="relative min-h-[calc(100vh-8rem)] flex flex-col justify-center max-w-6xl mx-auto px-4 py-8">
      {/* Editorial Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
          <span>SECTOR 07</span>
          <span aria-hidden="true">·</span>
          <span>LIVE EVALUATION DATA</span>
          <span aria-hidden="true">·</span>
          <span>READING HEROES FAMILY PROFILES</span>
        </div>
        <h2 className="font-['Cinzel',serif] text-2xl sm:text-4xl font-black text-white tracking-tight">
          Home Hut: Reading Heroes Family
        </h2>
        <p className="text-sm text-slate-300 max-w-3xl mt-1">
          Direct verification of active student accounts from the live Heroku deployment. Test both the starting reader profile (Kam) and the completed master explorer profile (Lani) in the live engine.
        </p>
      </div>

      {/* Live Beta Credentials Bar (Heroku) */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#0e1627] via-[#101b30] to-[#0e1627] border border-cyan-500/40 shadow-lg mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-300 font-bold uppercase">Live Heroku Beta Login:</span>
          </div>

          <div className="flex items-center gap-3 bg-black/50 px-3 py-1.5 rounded-lg border border-white/10">
            <div>
              <span className="text-slate-400 mr-1.5">User:</span>
              <strong className="text-amber-300 font-bold select-all">readingheroes</strong>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div>
              <span className="text-slate-400 mr-1.5">Pass:</span>
              <strong className="text-emerald-300 font-bold select-all">phonics123</strong>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={handleCopyBetaCredentials}
            className="px-3 py-1.5 text-xs font-mono text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg cursor-pointer transition-colors flex items-center gap-1.5"
          >
            {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey ? 'Copied Login!' : 'Copy Credentials'}</span>
          </button>

          <a
            href="https://phonixia-7c9c93ef0d42.herokuapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="px-3 py-1.5 text-xs font-mono font-bold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          >
            <span>Launch Live App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* HOME HUT MODAL CONTAINER (Matching Live Heroku App UI) */}
      <div className="rounded-2xl bg-[#090e18] border-2 border-[#d97706] shadow-[0_0_40px_rgba(217,119,6,0.25)] overflow-hidden mb-6">
        {/* Home Hut Header */}
        <div className="px-5 py-4 bg-[#0d1524] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 border border-amber-400/50 flex items-center justify-center text-white shadow">
              <Home className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="font-['Cinzel',serif] text-lg font-black text-amber-400 tracking-wide flex items-center gap-2">
                <span>HOME HUT</span>
              </div>
              <div className="text-xs text-slate-400 font-sans">
                Family Hub · <strong className="text-slate-200">Reading Heroes Family</strong>
              </div>
            </div>
          </div>

          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 text-sm">
            ✕
          </div>
        </div>

        {/* Home Hut Navigation Tabs */}
        <div className="px-5 pt-3 border-b border-white/5 flex items-center gap-1 sm:gap-2 text-xs font-semibold overflow-x-auto">
          <button
            type="button"
            onClick={() => { sound.playClick(); setActiveTab('explorers'); }}
            className={`px-4 py-2 rounded-t-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'explorers'
                ? 'bg-[#d97706] text-black font-bold shadow'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>👥 Explorers</span>
          </button>
          <button
            type="button"
            onClick={() => { sound.playClick(); setActiveTab('studio'); }}
            className={`px-4 py-2 rounded-t-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'studio'
                ? 'bg-[#d97706] text-black font-bold shadow'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>🎨 Studio</span>
          </button>
          <button
            type="button"
            onClick={() => { sound.playClick(); setActiveTab('progress'); }}
            className={`px-4 py-2 rounded-t-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'progress'
                ? 'bg-[#d97706] text-black font-bold shadow'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>📊 Progress</span>
          </button>
          <button
            type="button"
            onClick={() => { sound.playClick(); setActiveTab('legends'); }}
            className={`px-4 py-2 rounded-t-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'legends'
                ? 'bg-[#d97706] text-black font-bold shadow'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>👑 Legends</span>
          </button>
          <button
            type="button"
            onClick={() => { sound.playClick(); setActiveTab('settings'); }}
            className={`px-4 py-2 rounded-t-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'settings'
                ? 'bg-[#d97706] text-black font-bold shadow'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>⚙️ Settings</span>
          </button>
        </div>

        {/* Home Hut Body: Active Explorers */}
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-amber-400 font-bold tracking-wider uppercase">
              ACTIVE EXPLORERS (2)
            </span>
            <button
              type="button"
              onClick={() => sound.playClick()}
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-amber-500/40 text-xs"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Add Explorer</span>
            </button>
          </div>

          {/* Explorer Cards: Kam and Lani */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EXPLORERS.map((exp) => {
              const isSelected = exp.id === selectedExplorerId;
              return (
                <div
                  key={exp.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedExplorerId(exp.id);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#131f36] border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)] ring-1 ring-amber-400'
                      : 'bg-[#0d1626] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar Badge */}
                    <div className={`w-12 h-12 rounded-xl ${exp.avatarBg} flex items-center justify-center text-2xl shadow-md border border-white/20 shrink-0`}>
                      {exp.avatarEmoji}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-['Outfit',sans-serif] text-base font-bold text-white">
                          {exp.name}
                        </span>
                        {exp.active && (
                          <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400 text-amber-300">
                            ACTIVE
                          </span>
                        )}
                        {!exp.active && (
                          <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-purple-500/20 border border-purple-400 text-purple-300">
                            GRADUATE
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-400 font-sans mt-0.5 flex items-center gap-1">
                        <span>{exp.gender === 'Boy' ? '👦' : '👧'} {exp.gender}</span>
                        <span>·</span>
                        <span className="text-slate-300 font-mono text-[11px]">{exp.realmStatus}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1 text-xs font-mono font-bold text-amber-300">
                        <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                        <span>{exp.stars}</span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        {exp.gamesCompleted}/{exp.totalGames} Games
                      </div>
                    </div>

                    <button
                      type="button"
                      title="Manage Profile"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-white/5 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playClick();
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Explorer Inspection Dossier */}
        <div className="p-5 bg-[#070b14] border-t border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
            <div>
              <div className="text-xs font-mono uppercase text-amber-400 font-semibold">
                Live Explorer Telemetry & Curriculum State:
              </div>
              <h3 className="font-['Cinzel',serif] text-lg font-black text-white mt-0.5">
                {selectedExplorer.name} — {selectedExplorer.stageTitle}
              </h3>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono bg-black/60 px-3.5 py-1.5 rounded-lg border border-white/10">
              <div>
                <span className="text-slate-500 block text-[10px]">ACCURACY</span>
                <strong className="text-emerald-400">{selectedExplorer.accuracy}</strong>
              </div>
              <div className="w-px h-5 bg-white/10" />
              <div>
                <span className="text-slate-500 block text-[10px]">READING SPEED</span>
                <strong className="text-amber-400">{selectedExplorer.fluencyWPM} WPM</strong>
              </div>
              <div className="w-px h-5 bg-white/10" />
              <div>
                <span className="text-slate-500 block text-[10px]">GAMES MASTERED</span>
                <strong className="text-cyan-400">{selectedExplorer.gamesCompleted} / {selectedExplorer.totalGames}</strong>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            {selectedExplorer.summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {selectedExplorer.skills.map((skill, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex items-start gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide 7 CTA Footer Navigation */}
      {onNextSlide && (
        <div className="mt-4 flex items-center justify-between gap-4 text-xs text-slate-400">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onNextSlide();
            }}
            onMouseEnter={() => sound.playHover()}
            className="inline-flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors font-medium cursor-pointer"
          >
            <span>Continue to Sector 08: Solo Founder Campaign ($50,000 Milestone)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
