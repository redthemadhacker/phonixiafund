import React from 'react';
import { X, Sparkles, Compass, MapPin, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

interface WorldMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSlide: (index: number) => void;
  currentSlide: number;
}

interface MapNode {
  slideIndex: number;
  title: string;
  codename: string;
  category: string;
  description: string;
  x: number; // percentage
  y: number; // percentage
  icon: string;
  color: string;
}

const NODES: MapNode[] = [
  {
    slideIndex: 0,
    title: 'The Portal Gateway',
    codename: 'SECTOR-01: MANIFESTO',
    category: 'Core Genesis',
    description: 'Dismantling industrial schooling. The solo architect manifesto & live demo gateways.',
    x: 15,
    y: 22,
    icon: '⚡',
    color: '#f59e0b',
  },
  {
    slideIndex: 1,
    title: 'Live Engine & Beta Code',
    codename: 'SECTOR-02: BETA_REPO_EVAL',
    category: 'Live Mechanics',
    description: 'Evaluating redthemadhacker/phonixia: live voxel arcade mining, MTSS telemetry & TypeScript code.',
    x: 38,
    y: 18,
    icon: '⚡',
    color: '#06b6d4',
  },
  {
    slideIndex: 2,
    title: '5 Core & Post-Grad Realms',
    codename: 'SECTOR-03: PHONICS_REALMS',
    category: 'Core Curriculum',
    description: 'From Sound Shallows (age 3) through Lexicon Empire to Collegiate IPA, Master\'s Pathways & Celestial Archives.',
    x: 65,
    y: 24,
    icon: '🗺️',
    color: '#10b981',
  },
  {
    slideIndex: 3,
    title: 'Multiverse DLCs (3–Adult)',
    codename: 'SECTOR-04: MODULAR_DLC',
    category: 'STEM & Humanities',
    description: '9 expansive sandbox realms repeating the Phonixia 3-to-adulthood progression for Math, Physics, Code & ASL.',
    x: 85,
    y: 40,
    icon: '🌌',
    color: '#8b5cf6',
  },
  {
    slideIndex: 4,
    title: 'Clinical UDL Architecture',
    codename: 'SECTOR-05: ACCESSIBILITY',
    category: 'Universal Design',
    description: 'Live Dyslexia Engine, Low-Stimulation, ADHD micro-quests, and multisensory audio.',
    x: 75,
    y: 72,
    icon: '🧠',
    color: '#3b82f6',
  },
  {
    slideIndex: 5,
    title: 'Roles & Pricing Ecosystem',
    codename: 'SECTOR-06: LICENSING',
    category: 'Multi-Tenant Architecture',
    description: 'Student, Homeschool ($9.99-$19.99), Classroom ($299), District Enterprise & Free Guest Sandbox.',
    x: 48,
    y: 78,
    icon: '🏛️',
    color: '#eab308',
  },
  {
    slideIndex: 6,
    title: 'Pre-Seeded Family Test Data',
    codename: 'SECTOR-07: VERIFIED_PROFILES',
    category: 'Clinical Verification',
    description: 'Audit records for Leo (100% Gen Ed), Maya (100% IEP Supported), and Toby (Pre-K).',
    x: 24,
    y: 68,
    icon: '🛡️',
    color: '#ec4899',
  },
  {
    slideIndex: 7,
    title: 'Solo Campaign ($50k Goal)',
    codename: 'SECTOR-08: SOLO_CAMPAIGN',
    category: 'Indie Backing Terminal',
    description: '$300 raised of $50k goal to fund living runway, dev engines, and trademark filings for 6-month delivery.',
    x: 18,
    y: 45,
    icon: '💎',
    color: '#f97316',
  },
];

export const WorldMapModal: React.FC<WorldMapModalProps> = ({
  isOpen,
  onClose,
  onSelectSlide,
  currentSlide,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#04060a]/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[88vh] bg-[#090d16] border border-cyan-500/20 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Compass className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="font-['Cinzel',serif] text-base md:text-lg font-bold text-white tracking-wider">
                WORLD MAP & CODEX NAVIGATOR
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Interactive Realm Cartography</span>
                <span aria-hidden="true">·</span>
                <span className="text-cyan-400 font-mono">8 Core Sectors Ready</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Map Visual Stage */}
        <div className="relative flex-1 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0f1d32] via-[#080d17] to-[#04060a] p-4 sm:p-8 overflow-y-auto">
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          {/* Holographic Radial Orbit Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-cyan-500/10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-amber-500/10 pointer-events-none" />

          {/* Constellation Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block">
            <polyline
              points="150,140 380,120 650,150 820,240 730,420 480,450 240,400 180,260 150,140"
              fill="none"
              stroke="rgba(6, 182, 212, 0.2)"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
          </svg>

          {/* Nodes Grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto h-full items-stretch">
            {NODES.map((node) => {
              const isCurrent = currentSlide === node.slideIndex;
              return (
                <button
                  key={node.slideIndex}
                  onClick={() => {
                    sound.playPortalWarp();
                    onSelectSlide(node.slideIndex);
                    onClose();
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`group relative text-left p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                    isCurrent
                      ? 'bg-amber-500/10 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                      : 'bg-[#0d1424]/80 hover:bg-[#131d33] border-white/10 hover:border-cyan-400/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{node.icon}</span>
                      <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-slate-300">
                        {node.category}
                      </span>
                    </div>

                    <div className="text-[10px] font-mono text-cyan-400/90 mb-1">
                      {node.codename}
                    </div>

                    <h3 className="font-['Outfit',sans-serif] text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {node.title}
                    </h3>

                    <p className="text-xs text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                      {node.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold">
                    <span className={isCurrent ? 'text-amber-400' : 'text-slate-400 group-hover:text-cyan-300'}>
                      {isCurrent ? '● Current Sector' : 'Warp to Sector'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Click any sector card to instantaneously warp directly into that proposal node.</span>
          </div>
          <span className="font-mono text-slate-500 hidden sm:inline">Amari James · Solo Architect</span>
        </div>
      </div>
    </div>
  );
};
