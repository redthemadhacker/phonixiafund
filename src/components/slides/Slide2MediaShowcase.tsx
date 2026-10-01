import React, { useState, useEffect, useRef } from 'react';
import { 
  Gamepad2, 
  Activity, 
  Code2, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  Maximize, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  ShieldCheck, 
  Server,
  FileCode,
  Users,
  ArrowRight
} from 'lucide-react';
import { sound } from '../../utils/audio';
import { speech } from '../../utils/speech';

type ShowcaseTab = 'gameplay-sandbox' | 'mtss-telemetry' | 'code-eval' | 'video-player';

interface VoxelGem {
  id: number;
  x: number;
  y: number;
  phoneme: string;
  ipa: string;
  mined: boolean;
  color: string;
}

interface Slide2MediaShowcaseProps {
  onNextSlide?: () => void;
}

export const Slide2MediaShowcase: React.FC<Slide2MediaShowcaseProps> = ({ onNextSlide }) => {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>('gameplay-sandbox');
  
  // Interactive Gameplay Canvas State (Evaluating ShellshoreArcade & WorldCanvas from repo)
  const [playerPos, setPlayerPos] = useState<{ x: number; y: number }>({ x: 120, y: 120 });
  const [minedPhonemes, setMinedPhonemes] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isMining, setIsMining] = useState<boolean>(false);
  
  // Interactive MTSS Telemetry State (Evaluating TeacherMTSSDashboard from repo)
  const [selectedStudent, setSelectedStudent] = useState<string>('leo');
  const [activeRtiTier, setActiveRtiTier] = useState<number>(1);

  // Active Code Snippet Inspector
  const [selectedCodeFile, setSelectedCodeFile] = useState<string>('curriculum');

  // Gems placed on canvas
  const [gems, setGems] = useState<VoxelGem[]>([
    { id: 1, x: 60, y: 50, phoneme: 'B', ipa: '/b/', mined: false, color: '#3b82f6' },
    { id: 2, x: 220, y: 60, phoneme: 'A', ipa: '/æ/', mined: false, color: '#f59e0b' },
    { id: 3, x: 180, y: 170, phoneme: 'T', ipa: '/t/', mined: false, color: '#3b82f6' },
    { id: 4, x: 300, y: 130, phoneme: 'SH', ipa: '/ʃ/', mined: false, color: '#8b5cf6' },
    { id: 5, x: 90, y: 180, phoneme: 'EE', ipa: '/i:/', mined: false, color: '#10b981' },
  ]);

  const handleMove = (dx: number, dy: number) => {
    sound.playHover();
    setPlayerPos((prev) => {
      const nextX = Math.max(20, Math.min(360, prev.x + dx));
      const nextY = Math.max(20, Math.min(220, prev.y + dy));
      
      // Check collision with unmined gems
      gems.forEach((gem) => {
        if (!gem.mined) {
          const dist = Math.hypot(nextX - gem.x, nextY - gem.y);
          if (dist < 34) {
            gem.mined = true;
            sound.playMiningDing();
            setMinedPhonemes((m) => [...m, gem.phoneme]);
            setScore((s) => s + 50);
          }
        }
      });

      return { x: nextX, y: nextY };
    });
  };

  const handleMineGemDirect = (gem: VoxelGem) => {
    if (gem.mined) return;
    gem.mined = true;
    sound.playMiningDing();
    setPlayerPos({ x: gem.x, y: gem.y });
    setMinedPhonemes((m) => [...m, gem.phoneme]);
    setScore((s) => s + 50);
  };

  const handleResetSandbox = () => {
    sound.playClick();
    setPlayerPos({ x: 120, y: 120 });
    setMinedPhonemes([]);
    setScore(0);
    setGems((prev) => prev.map((g) => ({ ...g, mined: false })));
  };

  return (
    <div className="relative min-h-[calc(100vh-8rem)] flex flex-col justify-center max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
            <span>SECTOR 02</span>
            <span aria-hidden="true">·</span>
            <span>IN-ENGINE GAMEPLAY & TELEMETRY</span>
            <span aria-hidden="true">·</span>
            <span>SHELLSHORE MINING DEMO</span>
          </div>
          <h2 className="font-['Cinzel',serif] text-2xl sm:text-4xl font-black text-white tracking-tight">
            Voxel Mining & Multi-Tier Telemetry
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mt-1">
            Experience the tactile core gameplay: mine acoustic phoneme crystals in real time, inspect continuous MTSS diagnostic monitoring, and review the underlying full-stack engine.
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#0e1627] border border-white/10 rounded-lg self-start sm:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => { sound.playClick(); setActiveTab('gameplay-sandbox'); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'gameplay-sandbox' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Voxel Mining Arcade</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('mtss-telemetry'); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'mtss-telemetry' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Live MTSS Telemetry</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('code-eval'); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'code-eval' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Engine Architecture</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('video-player'); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'video-player' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Raw MP4 Stream</span>
          </button>
        </div>
      </div>

      {/* Live Beta Direct Access Banner */}
      <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-cyan-950/40 via-[#0e1627] to-amber-950/30 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            LIVE BETA CREDENTIALS:
          </span>
          <span className="text-slate-400">User:</span>
          <strong className="text-amber-300 font-bold bg-black/40 px-2 py-0.5 rounded select-all">readingheroes</strong>
          <span className="text-slate-400">Password:</span>
          <strong className="text-emerald-300 font-bold bg-black/40 px-2 py-0.5 rounded select-all">phonics123</strong>
        </div>

        <a
          href="https://phonixia-7c9c93ef0d42.herokuapp.com/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playClick()}
          className="flex items-center gap-1 px-3 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 hover:text-white border border-cyan-500/40 transition-colors shrink-0"
        >
          <span>Open Live Heroku Beta</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Main Interactive Stage */}
      <div className="bg-[#090d16] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        {/* TAB 1: LIVE BETA GAMEPLAY SANDBOX (WorldCanvas / ShellshoreArcade) */}
        {activeTab === 'gameplay-sandbox' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-['Cinzel',serif] text-lg font-bold text-white">
                    Sound Shallows: Shellshore Voxel Mining
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Phoneme Ore Extraction
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Walk your avatar into crystals using Arrow/D-Pad controls or click any crystal directly to mine sound runes.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="font-mono text-xs text-slate-300 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                  SCORE: <strong className="text-amber-400">{score} PTS</strong>
                </div>
                <button
                  onClick={handleResetSandbox}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Field</span>
                </button>
              </div>
            </div>

            {/* Interactive Canvas Simulation Box */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Voxel 2D/3D Playground */}
              <div 
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const clickY = e.clientY - rect.top;
                  setPlayerPos({ x: clickX, y: clickY });
                  sound.playHover();
                }}
                className="lg:col-span-8 bg-[#04060a] border border-cyan-500/30 rounded-xl relative h-[280px] overflow-hidden flex items-center justify-center select-none shadow-inner cursor-crosshair"
              >
                {/* Voxel Grid Texture */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                {/* Ambient Biome Landmarks */}
                <div className="absolute top-4 left-6 text-[10px] font-mono text-cyan-400/60 uppercase">
                  🌊 Bioluminescent Shoreline
                </div>
                <div className="absolute bottom-4 right-6 text-[10px] font-mono text-emerald-400/60 uppercase">
                  ⚒️ Builders Smelting Quarry
                </div>

                {/* Gems to mine */}
                {gems.map((gem) => (
                  <button
                    key={gem.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMineGemDirect(gem);
                    }}
                    style={{ left: `${gem.x}px`, top: `${gem.y}px` }}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer ${
                      gem.mined ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
                    }`}
                  >
                    <div
                      style={{ backgroundColor: `${gem.color}30`, borderColor: gem.color }}
                      className="w-11 h-11 rounded-lg border-2 flex flex-col items-center justify-center text-xs font-bold text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:scale-110 active:scale-95 transition-transform"
                    >
                      <span className="font-['Outfit',sans-serif]">{gem.phoneme}</span>
                      <span className="text-[9px] font-mono opacity-80">{gem.ipa}</span>
                    </div>
                  </button>
                ))}

                {/* Player Avatar */}
                <div
                  style={{ left: `${playerPos.x}px`, top: `${playerPos.y}px` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-150 flex flex-col items-center pointer-events-none"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-400 border-2 border-white text-slate-900 font-black text-xs flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.8)]">
                    ⛏️
                  </div>
                  <span className="text-[9px] font-mono font-bold text-amber-300 mt-1 bg-black/60 px-1 rounded">
                    AVATAR
                  </span>
                </div>
              </div>

              {/* Controls Deck & Mined Satchel */}
              <div className="lg:col-span-4 space-y-4">
                {/* D-Pad Navigator */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                  <div className="text-[11px] font-mono uppercase text-slate-400 mb-2">
                    Keyboard / D-Pad Movement:
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <button
                      onClick={() => handleMove(0, -30)}
                      className="w-12 h-10 bg-white/5 hover:bg-cyan-500/20 border border-white/10 rounded-lg text-white font-mono text-sm flex items-center justify-center cursor-pointer transition-colors"
                    >
                      ▲
                    </button>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleMove(-30, 0)}
                        className="w-12 h-10 bg-white/5 hover:bg-cyan-500/20 border border-white/10 rounded-lg text-white font-mono text-sm flex items-center justify-center cursor-pointer transition-colors"
                      >
                        ◀
                      </button>
                      <button
                        onClick={() => handleMove(0, 30)}
                        className="w-12 h-10 bg-white/5 hover:bg-cyan-500/20 border border-white/10 rounded-lg text-white font-mono text-sm flex items-center justify-center cursor-pointer transition-colors"
                      >
                        ▼
                      </button>
                      <button
                        onClick={() => handleMove(30, 0)}
                        className="w-12 h-10 bg-white/5 hover:bg-cyan-500/20 border border-white/10 rounded-lg text-white font-mono text-sm flex items-center justify-center cursor-pointer transition-colors"
                      >
                        ▶
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mined Phonemes Satchel */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2">
                  <div className="text-[11px] font-mono uppercase text-slate-400 flex items-center justify-between">
                    <span>Mined Sound Satchel</span>
                    <span className="text-cyan-400">{minedPhonemes.length} / 5</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 min-h-[36px] items-center p-2 rounded bg-[#04060a] border border-white/5">
                    {minedPhonemes.length === 0 ? (
                      <span className="text-[11px] text-slate-600">Walk into glowing crystals to mine</span>
                    ) : (
                      minedPhonemes.map((ph, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold"
                        >
                          {ph}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE MTSS / RTI TELEMETRY DASHBOARD */}
        {activeTab === 'mtss-telemetry' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-['Cinzel',serif] text-lg font-bold text-white">
                    Multi-Tiered System of Supports (RTI / MTSS)
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Automated Telemetry
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Continuous zero-anxiety diagnostic monitoring without interrupting student gameplay.
                </p>
              </div>

              {/* Student Switcher */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Student:</span>
                <select
                  value={selectedStudent}
                  onChange={(e) => { sound.playClick(); setSelectedStudent(e.target.value); }}
                  className="px-2.5 py-1 bg-black/60 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-purple-400 font-mono"
                >
                  <option value="leo">Leo (Gen Ed Complete)</option>
                  <option value="maya">Maya (IEP Accommodation)</option>
                  <option value="toby">Toby (Pre-K Foundation)</option>
                </select>
              </div>
            </div>

            {/* MTSS Data Grids */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="text-[11px] font-mono uppercase text-emerald-400">Tier 1: Core Curriculum</div>
                <div className="text-2xl font-bold text-white font-mono">
                  {selectedStudent === 'leo' ? '98.4%' : selectedStudent === 'maya' ? '96.2%' : '99.1%'}
                </div>
                <p className="text-xs text-slate-400">Universal benchmark mastery across phonemic awareness.</p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="text-[11px] font-mono uppercase text-amber-400">Tier 2: Targeted Remediation</div>
                <div className="text-2xl font-bold text-white font-mono">
                  {selectedStudent === 'leo' ? '0 Alerts' : selectedStudent === 'maya' ? '1 Auto-Resolved' : 'Vowel Team Prep'}
                </div>
                <p className="text-xs text-slate-400">Procedurally generates bonus vowel cavern quests when difficulty spikes.</p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="text-[11px] font-mono uppercase text-purple-400">Tier 3: Intensive UDL Support</div>
                <div className="text-2xl font-bold text-white font-mono">
                  {selectedStudent === 'maya' ? '4 IEP Flags' : 'Standard Baseline'}
                </div>
                <p className="text-xs text-slate-400">OpenDyslexic font layer, extra time, and acoustic feedback engaged.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs text-slate-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                <span>
                  All RTI tiers in Phonixia write directly to FERPA-compliant encrypted progress ledgers, saving teachers 10+ hours of manual testing paperwork every week.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CODE EVALUATION & ARCHITECTURE */}
        {activeTab === 'code-eval' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-['Cinzel',serif] text-base font-bold text-white">
                    Full-Stack Engine Architecture & Source Modules
                  </span>
                  <a
                    href="https://github.com/redthemadhacker/phonixia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] font-mono text-amber-400 hover:underline"
                  >
                    <span>View Public Repo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-slate-400">
                  Full-stack TypeScript architecture powering both the client SPA and Express server.
                </p>
              </div>

              {/* Code File Switcher */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => { sound.playClick(); setSelectedCodeFile('curriculum'); }}
                  className={`px-2.5 py-1 text-xs font-mono rounded cursor-pointer ${
                    selectedCodeFile === 'curriculum' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  lifelongCurriculum.ts
                </button>
                <button
                  onClick={() => { sound.playClick(); setSelectedCodeFile('server'); }}
                  className={`px-2.5 py-1 text-xs font-mono rounded cursor-pointer ${
                    selectedCodeFile === 'server' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  server.ts
                </button>
                <button
                  onClick={() => { sound.playClick(); setSelectedCodeFile('arcade'); }}
                  className={`px-2.5 py-1 text-xs font-mono rounded cursor-pointer ${
                    selectedCodeFile === 'arcade' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ShellshoreArcade.tsx
                </button>
              </div>
            </div>

            {/* Code Block Display */}
            <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-slate-300 overflow-x-auto max-h-[300px] leading-relaxed">
              {selectedCodeFile === 'curriculum' && (
                <pre>{`// Evaluated from src/data/lifelongCurriculumData.ts in repo
export interface GradeMilestone {
  grade: GradeLevel; // 'PreK3' -> 'Doctoral Scholar (PhD)'
  ageRange: string;
  focusDomain: string;
  targetWCPM: number;
  phonemicMilestones: string[];
  scienceOfReadingAnchor: string;
}

export const PHONIXIA_COLLEGES: CollegeDefinition[] = [
  {
    id: 'linguistics',
    name: 'College of Linguistics',
    deityDean: 'Dean Phonemius',
    motto: 'Vox Humana, Lux Mentis',
    courses: ['LIN-101: International Phonetic Alphabet', 'LIN-350: Generative Syntax'],
    capstoneProject: 'Constructing reconstructed proto-language with phonemic laws.'
  }
];`}</pre>
              )}

              {selectedCodeFile === 'server' && (
                <pre>{`// Evaluated from server.ts in repo
import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/api/health', (req, res) => res.json({ status: 'Phonixia MMO Cluster Active' }));

app.listen(PORT, () => {
  console.log(\`Phonixia Engine serving on port \${PORT}\`);
});`}</pre>
              )}

              {selectedCodeFile === 'arcade' && (
                <pre>{`// Evaluated from src/components/ShellshoreArcade.tsx
export const ShellshoreArcade: React.FC = () => {
  // Acoustic Speech Recognition & Voxel Sound Mapping
  const handlePhonemeMine = (phoneme: string, ipa: string) => {
    synthesizeResonance(ipa);
    dispatchInventory({ type: 'ADD_PHONEME_ORE', payload: phoneme });
    triggerRtiTelemetry({ tier: 1, accuracy: 1.0 });
  };
  return <div className="arcade-canvas">{/* Orthographic Mining Loop */}</div>;
};`}</pre>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: RAW VIDEO ASSET STREAM (Fallback Player) */}
        {activeTab === 'video-player' && (
          <div className="space-y-4">
            <div className="text-xs font-mono text-slate-400">
              Direct Root Video Streams (<code className="text-amber-300">./gameplay-clip.mp4</code> & <code className="text-purple-300">./app-features-clip.mp4</code>):
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden bg-black/60 border border-white/10 aspect-video flex items-center justify-center relative">
                <video src="./gameplay-clip.mp4" poster="./gameplay-poster.jpg" controls className="w-full h-full object-cover">
                  Video not supported
                </video>
                <div className="absolute top-2 left-2 text-[10px] font-mono bg-black/70 px-2 py-0.5 rounded text-amber-400">
                  gameplay-clip.mp4
                </div>
              </div>
              <div className="rounded-xl overflow-hidden bg-black/60 border border-white/10 aspect-video flex items-center justify-center relative">
                <video src="./app-features-clip.mp4" poster="./features-poster.jpg" controls className="w-full h-full object-cover">
                  Video not supported
                </video>
                <div className="absolute top-2 left-2 text-[10px] font-mono bg-black/70 px-2 py-0.5 rounded text-purple-400">
                  app-features-clip.mp4
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Slide 2 CTA footer note */}
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
            <span>Continue to Sector 03: The 5 Core Realms & Literacy Continents</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
