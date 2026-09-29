import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Compass, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Sliders, 
  PlayCircle,
  HeartHandshake,
  Menu,
  X
} from 'lucide-react';
import { sound } from '../utils/audio';

interface NavigationHUDProps {
  currentSlide: number;
  totalSlides: number;
  onNavigate: (index: number) => void;
  onToggleMap: () => void;
  onToggleUDL: () => void;
  onOpenDemo: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  slideTitles: string[];
}

export const NavigationHUD: React.FC<NavigationHUDProps> = ({
  currentSlide,
  totalSlides,
  onNavigate,
  onToggleMap,
  onToggleUDL,
  onOpenDemo,
  soundEnabled,
  onToggleSound,
  isFullscreen,
  onToggleFullscreen,
  slideTitles,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handlePrev = () => {
    if (currentSlide > 0) {
      sound.playClick();
      onNavigate(currentSlide - 1);
    }
  };

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      sound.playClick();
      onNavigate(currentSlide + 1);
    }
  };

  const currentTitle = slideTitles[currentSlide] || 'Phonixia Codex';

  return (
    <>
      {/* Top Bar Contract: 3 zones */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#07090e]/95 backdrop-blur-md border-b border-white/5 px-4 md:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Zone 1: Brand Zone */}
            <button
              onClick={() => {
                sound.playClick();
                onNavigate(0);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
            >
              <span className="font-['Cinzel',serif] text-lg md:text-xl font-black tracking-widest text-amber-400 group-hover:text-amber-300 transition-colors drop-shadow-[0_0_12px_rgba(245,158,11,0.4)]">
                PHONIXIA
              </span>
              <span className="hidden sm:inline-block font-['Outfit',sans-serif] text-xs font-semibold tracking-wider text-slate-400 uppercase">
                Multiverse Engine
              </span>
            </button>

            {/* Zone 2: Desktop Nav Links (Hidden on mobile, accessible via mobile drawer) */}
            <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-300">
              <button
                onClick={() => { sound.playClick(); onNavigate(0); }}
                className={`hover:text-amber-400 transition-colors ${currentSlide === 0 ? 'text-amber-400 font-semibold underline underline-offset-8' : ''}`}
              >
                Manifesto
              </button>
              <button
                onClick={() => { sound.playClick(); onNavigate(1); }}
                className={`hover:text-amber-400 transition-colors ${currentSlide === 1 ? 'text-amber-400 font-semibold underline underline-offset-8' : ''}`}
              >
                Engine Code
              </button>
              <button
                onClick={() => { sound.playClick(); onNavigate(2); }}
                className={`hover:text-amber-400 transition-colors ${currentSlide === 2 ? 'text-amber-400 font-semibold underline underline-offset-8' : ''}`}
              >
                Core Realms
              </button>
              <button
                onClick={() => { sound.playClick(); onNavigate(3); }}
                className={`hover:text-amber-400 transition-colors ${currentSlide === 3 ? 'text-amber-400 font-semibold underline underline-offset-8' : ''}`}
              >
                Multiverse DLCs
              </button>
              <button
                onClick={() => { sound.playClick(); onNavigate(4); }}
                className={`hover:text-amber-400 transition-colors ${currentSlide === 4 ? 'text-amber-400 font-semibold underline underline-offset-8' : ''}`}
              >
                Clinical UDL
              </button>
              <button
                onClick={() => { sound.playClick(); onNavigate(5); }}
                className={`hover:text-amber-400 transition-colors ${currentSlide === 5 ? 'text-amber-400 font-semibold underline underline-offset-8' : ''}`}
              >
                Dashboards
              </button>
              <button
                onClick={() => { sound.playClick(); onNavigate(6); }}
                className={`hover:text-amber-400 transition-colors ${currentSlide === 6 ? 'text-amber-400 font-semibold underline underline-offset-8' : ''}`}
              >
                Evaluation Data
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenDemo();
                }}
                onMouseEnter={() => sound.playHover()}
                className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-slate-300"
              >
                <PlayCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Instant Demo</span>
              </button>
            </nav>

            {/* Zone 3: Actions + Mobile Menu Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate(7);
                  setMobileMenuOpen(false);
                }}
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-md transition-all shadow-[0_0_20px_rgba(245,158,11,0.35)] whitespace-nowrap cursor-pointer font-['Outfit',sans-serif]"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Back Project</span>
              </button>

              {/* Mobile Hamburger / Sector Menu Toggle Button */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="lg:hidden p-2 rounded-md bg-white/10 hover:bg-white/20 text-amber-400 hover:text-white border border-white/10 cursor-pointer flex items-center gap-1 text-xs font-mono font-bold"
                aria-label="Toggle all sectors navigation menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                <span className="hidden xs:inline">Sectors</span>
              </button>
            </div>
          </div>

          {/* Full Mobile Sector Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-3 border-t border-white/10 space-y-2 animate-in slide-in-from-top-2 duration-200">
              <div className="text-[10px] font-mono uppercase text-amber-400 font-bold px-1 flex items-center justify-between">
                <span>Jump Directly to Any Sector (1–8):</span>
                <span>Tap to Navigate</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 max-h-[60vh] overflow-y-auto pr-1">
                {slideTitles.map((title, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onNavigate(idx);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2 rounded-lg text-left text-xs font-mono transition-all flex flex-col justify-center cursor-pointer ${
                      currentSlide === idx
                        ? 'bg-amber-500/25 text-amber-300 border border-amber-400 font-bold shadow'
                        : 'bg-black/50 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    <span className="text-[10px] text-amber-400/80 font-bold">Sector 0{idx + 1}</span>
                    <span className="truncate font-sans font-semibold text-white text-[11px]">
                      {title.split('(')[0].replace('The ', '')}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onOpenDemo();
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 rounded-lg text-xs font-mono font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <PlayCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Instant Demo</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onToggleMap();
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 rounded-lg text-xs font-mono font-bold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  <span>World Map</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Slide Navigation HUD (Floating Bottom Dock) */}
      <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-4xl w-[94%] sm:w-auto">
        <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-3 px-3.5 py-2.5 bg-[#0b101b]/90 border border-white/10 rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          {/* World Map Navigator Trigger */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleMap();
            }}
            onMouseEnter={() => sound.playHover()}
            title="Open World Map & Codex Navigator"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-300 bg-white/5 hover:bg-cyan-500/15 border border-white/5 hover:border-cyan-500/30 rounded-lg transition-all cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline font-mono">World Map</span>
          </button>

          {/* Prev Slide */}
          <button
            onClick={handlePrev}
            disabled={currentSlide === 0}
            onMouseEnter={() => sound.playHover()}
            title="Previous Slide (ArrowLeft)"
            className="p-1.5 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 hover:bg-white/10 rounded-lg transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Slide Indicator & Title */}
          <div className="flex items-center gap-2 px-2">
            <span className="font-mono text-xs font-bold text-amber-400 tabular-nums">
              {String(currentSlide + 1).padStart(2, '0')}
            </span>
            <span className="text-slate-500 text-xs">/</span>
            <span className="font-mono text-xs text-slate-400 tabular-nums">
              {String(totalSlides).padStart(2, '0')}
            </span>
            <div className="hidden sm:flex items-center gap-1 ml-2">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    onNavigate(idx);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  title={slideTitles[idx]}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentSlide === idx
                      ? 'w-6 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]'
                      : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
            <span className="hidden lg:inline-block text-xs font-medium text-slate-300 max-w-[140px] truncate ml-2">
              · {currentTitle}
            </span>
          </div>

          {/* Next Slide */}
          <button
            onClick={handleNext}
            disabled={currentSlide === totalSlides - 1}
            onMouseEnter={() => sound.playHover()}
            title="Next Slide (ArrowRight or Spacebar)"
            className="p-1.5 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 hover:bg-white/10 rounded-lg transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-white/10 mx-0.5" />

          {/* UDL Quick Switch */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleUDL();
            }}
            onMouseEnter={() => sound.playHover()}
            title="Clinical Accessibility & UDL Settings"
            className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>

          {/* Audio Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleSound();
            }}
            onMouseEnter={() => sound.playHover()}
            title={soundEnabled ? 'Mute Procedural Game SFX' : 'Enable Procedural Game SFX'}
            className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            )}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleFullscreen();
            }}
            onMouseEnter={() => sound.playHover()}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen Presentation Mode'}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer"
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </footer>
    </>
  );
};
