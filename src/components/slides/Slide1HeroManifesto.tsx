import React from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  PlayCircle, 
  Code2, 
  Gamepad2, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Flame
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface Slide1Props {
  onOpenDemo: () => void;
  onNextSlide: () => void;
}

export const Slide1HeroManifesto: React.FC<Slide1Props> = ({ onOpenDemo, onNextSlide }) => {
  return (
    <div className="relative min-h-[calc(100vh-8rem)] flex flex-col justify-center max-w-6xl mx-auto px-4 py-8">
      {/* Editorial Category Kicker (No Pill) */}
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400/90 mb-4">
        <span>SECTOR 01</span>
        <span aria-hidden="true">·</span>
        <span>SOLO ARCHITECT MANIFESTO</span>
        <span aria-hidden="true">·</span>
        <span>AMARI JAMES (THE MAD HACKER)</span>
      </div>

      {/* High-Impact Headline with text-wrap balance */}
      <h1 className="font-['Cinzel',serif] text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.12] tracking-tight max-w-4xl text-balance">
        Dismantling Industrial Schooling Through{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 drop-shadow-[0_0_25px_rgba(245,158,11,0.4)]">
          Open-World Voxel Play.
        </span>
      </h1>

      {/* Core Manifesto Prose */}
      <div className="mt-6 max-w-3xl space-y-4 text-base sm:text-lg text-slate-300 leading-relaxed font-['Plus_Jakarta_Sans',sans-serif]">
        <p>
          The factory-model school system, rigid state curricula, and bureaucratic standardized tests have failed children, penalized neurodivergent minds, and bored accelerated learners into intellectual numbness.
        </p>
        <p className="text-slate-200 font-medium">
          I built <strong className="text-amber-300 font-semibold">Phonixia</strong> as a solo-architected, physics-driven voxel sandbox MMORPG where the gameplay <em className="italic text-white">is</em> the curriculum from age 3 to adulthood. No patronizing multiple-choice quizzes. No artificial digital worksheets disguised as games. Every sound mined, every block smelted, and every fortress engineered directly internalizes deep linguistics, mathematics, and science through genuine spatial interaction.
        </p>
      </div>

      {/* Solo Architect Proof Badges */}
      <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 border-y border-white/10 py-3.5 max-w-3xl">
        <div className="flex items-center gap-1.5 text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>100% Solo Developed & Designed</span>
        </div>
        <span className="text-white/20 hidden sm:inline">|</span>
        <div className="flex items-center gap-1.5 text-slate-300">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Full-Spectrum Literacy (Ages 3–18+)</span>
        </div>
        <span className="text-white/20 hidden sm:inline">|</span>
        <div className="flex items-center gap-1.5 text-slate-300">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>9 Modular Multiverse DLC Realms</span>
        </div>
      </div>

      {/* Glowing Portal Badges & Launch Gateways */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl">
        {/* Play Current Live Beta */}
        <div className="group relative p-4 rounded-xl bg-[#0e1627]/90 hover:bg-[#132039] border border-cyan-500/30 hover:border-cyan-400 transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.15)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-cyan-400 font-mono mb-2">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                LIVE PRODUCTION (IN PROGRESS)
              </span>
              <a
                href="https://phonixiaalpha.herokuapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-white"
                title="Open Live App"
              >
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
            <a
              href="https://phonixiaalpha.herokuapp.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="block font-['Outfit',sans-serif] text-base font-bold text-white group-hover:text-cyan-300 transition-colors"
            >
              Play Live Beta
            </a>
            
            {/* Live Beta Credentials Box */}
            <div className="mt-2 p-2 rounded-lg bg-black/60 border border-cyan-500/20 text-[11px] font-mono space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">User:</span>
                <span className="text-amber-300 font-bold selection:bg-amber-500/40">readingheroes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Pass:</span>
                <span className="text-emerald-300 font-bold selection:bg-emerald-500/40">phonics123</span>
              </div>
            </div>
          </div>
          <a
            href="https://phonixia-7c9c93ef0d42.herokuapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="mt-3 text-[11px] font-mono text-cyan-300 hover:text-white flex items-center justify-between pt-2 border-t border-white/5"
          >
            <span>Launch Heroku App</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Current Prototype Codebase */}
        <a
          href="https://github.com/redthemadhacker/phonixia"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => sound.playHover()}
          onClick={() => sound.playClick()}
          className="group relative p-4 rounded-xl bg-[#0e1627]/90 hover:bg-[#132039] border border-white/10 hover:border-amber-400/50 transition-all duration-200 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-amber-400 font-mono mb-2">
              <span className="flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5" />
                PROTOTYPE REPO
              </span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <div className="font-['Outfit',sans-serif] text-base font-bold text-white group-hover:text-amber-300 transition-colors">
              Prototype Codebase
            </div>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              github.com/redthemadhacker/phonixia
            </p>
          </div>
          <div className="mt-3 text-[11px] font-mono text-amber-300/80 flex items-center gap-1">
            <span>Inspect Voxel Architecture</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </a>

        {/* Clean-Slate Core Engine Repo */}
        <a
          href="https://github.com/redthemadhacker/phonixiaalpha"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => sound.playHover()}
          onClick={() => sound.playClick()}
          className="group relative p-4 rounded-xl bg-[#0e1627]/90 hover:bg-[#132039] border border-white/10 hover:border-purple-400/50 transition-all duration-200 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-purple-400 font-mono mb-2">
              <span className="flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" />
                CORE ENGINE
              </span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <div className="font-['Outfit',sans-serif] text-base font-bold text-white group-hover:text-purple-300 transition-colors">
              Clean-Slate Engine
            </div>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              github.com/redthemadhacker/phonixiaalpha
            </p>
          </div>
          <div className="mt-3 text-[11px] font-mono text-purple-300/80 flex items-center gap-1">
            <span>High-Speed Voxel Runtime</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </a>

        {/* Instant One-Click Demo Mode button */}
        <button
          onClick={() => {
            sound.playPortalWarp();
            onOpenDemo();
          }}
          onMouseEnter={() => sound.playHover()}
          className="group relative p-4 rounded-xl bg-gradient-to-br from-amber-500/20 via-yellow-500/10 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 border border-amber-400/60 hover:border-amber-400 transition-all duration-200 shadow-[0_0_30px_rgba(245,158,11,0.25)] flex flex-col justify-between text-left cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-amber-300 font-mono mb-2">
              <span className="flex items-center gap-1 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                INSTANT EVALUATION
              </span>
              <PlayCircle className="w-4 h-4 text-amber-300" />
            </div>
            <div className="font-['Outfit',sans-serif] text-base font-black text-white group-hover:text-amber-200 transition-colors">
              1-Click Demo Mode
            </div>
            <p className="text-xs text-slate-300 mt-1 line-clamp-2">
              Smelt phonemes & craft words in the interactive forge right now.
            </p>
          </div>
          <div className="mt-3 text-[11px] font-mono text-amber-200 font-bold flex items-center gap-1">
            <span>Launch In-Page Sandbox</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>

      {/* Slide 1 CTA footer note */}
      <div className="mt-8 flex items-center gap-4 text-xs text-slate-400">
        <button
          onClick={() => {
            sound.playClick();
            onNextSlide();
          }}
          onMouseEnter={() => sound.playHover()}
          className="inline-flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors font-medium cursor-pointer"
        >
          <span>Continue to Sector 02: Multimedia Showcase Theater</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
