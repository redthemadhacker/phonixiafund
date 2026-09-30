import React, { useState, useEffect, useCallback } from 'react';
import { VoxelCanvas } from './components/VoxelCanvas';
import { NavigationHUD } from './components/NavigationHUD';
import { WorldMapModal } from './components/WorldMapModal';
import { InstantDemoModal } from './components/InstantDemoModal';
import { UDLSettingsDrawer } from './components/UDLSettingsDrawer';

import { Slide1HeroManifesto } from './components/slides/Slide1HeroManifesto';
import { Slide2MediaShowcase } from './components/slides/Slide2MediaShowcase';
import { Slide3ContinentsLiteracy } from './components/slides/Slide3ContinentsLiteracy';
import { Slide4MultiverseExpansions } from './components/slides/Slide4MultiverseExpansions';
import { Slide5AccessibilityUDL } from './components/slides/Slide5AccessibilityUDL';
import { Slide6DashboardsPricing } from './components/slides/Slide6DashboardsPricing';
import { Slide7PreSeededProfiles } from './components/slides/Slide7PreSeededProfiles';
import { LegalTrademarksFooter } from './components/LegalTrademarksFooter';

import { sound } from './utils/audio';
import { speech } from './utils/speech';
import { UDLSettings } from './types';

const SLIDE_TITLES = [
  'Portal Gateway & Solo Manifesto',
  'Live Engine & Beta Code Evaluation',
  'The 5 Core Realms & Post-Grad Archives',
  'Multiverse DLCs (Ages 3–Adult)',
  'Clinical UDL & Accessibility',
  'Roles, Dashboards & Pricing',
  'Pre-Seeded Test Profiles',
  'Solo Campaign ($50k Milestone)',
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  const [isDemoOpen, setIsDemoOpen] = useState<boolean>(false);
  const [isUDLOpen, setIsUDLOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // UDL Global Accessibility State
  const [udlSettings, setUdlSettings] = useState<UDLSettings>({
    dyslexiaEngine: false,
    lowStimulation: false,
    adhdMicroQuest: false,
    multisensoryAudio: false,
    fontSizeMultiplier: 1,
    highContrast: false,
  });

  // Sync sound engine with low-stim state
  useEffect(() => {
    sound.lowStimulation = udlSettings.lowStimulation;
  }, [udlSettings.lowStimulation]);

  // Navigate to slide
  const navigateToSlide = useCallback((index: number) => {
    if (index >= 0 && index < SLIDE_TITLES.length) {
      setCurrentSlide(index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (currentSlide < SLIDE_TITLES.length - 1) {
          sound.playClick();
          navigateToSlide(currentSlide + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentSlide > 0) {
          sound.playClick();
          navigateToSlide(currentSlide - 1);
        }
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        sound.playPortalWarp();
        setIsMapOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsMapOpen(false);
        setIsDemoOpen(false);
        setIsUDLOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, navigateToSlide]);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  const handleUpdateUDL = (changes: Partial<UDLSettings>) => {
    setUdlSettings((prev) => ({ ...prev, ...changes }));
  };

  return (
    <div
      className={`min-h-screen relative text-slate-100 flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200 ${
        udlSettings.dyslexiaEngine ? 'font-["OpenDyslexic",sans-serif]' : 'font-["Plus_Jakarta_Sans",sans-serif]'
      } ${udlSettings.lowStimulation ? 'bg-[#06080e]' : 'bg-[#07090e]'}`}
    >
      {/* Dynamic Ambient Voxel Particle Background */}
      <VoxelCanvas
        lowStimulation={udlSettings.lowStimulation}
        slideIndex={currentSlide}
      />

      {/* Top Bar & Bottom Navigation HUD */}
      <NavigationHUD
        currentSlide={currentSlide}
        totalSlides={SLIDE_TITLES.length}
        onNavigate={navigateToSlide}
        onToggleMap={() => setIsMapOpen(true)}
        onToggleUDL={() => setIsUDLOpen(true)}
        onOpenDemo={() => setIsDemoOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        slideTitles={SLIDE_TITLES}
      />

      {/* Main Slide Presentation Stage with Smooth Fade Transitions */}
      <main className="relative z-10 flex-1 pt-16 pb-24 transition-opacity duration-300">
        <div key={currentSlide} className="animate-in fade-in duration-300">
          {currentSlide === 0 && (
            <Slide1HeroManifesto
              onOpenDemo={() => setIsDemoOpen(true)}
              onNextSlide={() => navigateToSlide(1)}
            />
          )}
          {currentSlide === 1 && (
            <Slide2MediaShowcase onNextSlide={() => navigateToSlide(2)} />
          )}
          {currentSlide === 2 && (
            <Slide3ContinentsLiteracy onNextSlide={() => navigateToSlide(3)} />
          )}
          {currentSlide === 3 && (
            <Slide4MultiverseExpansions onNextSlide={() => navigateToSlide(4)} />
          )}
          {currentSlide === 4 && (
            <Slide5AccessibilityUDL
              udlSettings={udlSettings}
              onUpdateUDL={handleUpdateUDL}
              onNextSlide={() => navigateToSlide(5)}
            />
          )}
          {currentSlide === 5 && (
            <Slide6DashboardsPricing
              onOpenGuestSandbox={() => setIsDemoOpen(true)}
              onNextSlide={() => navigateToSlide(6)}
            />
          )}
          {currentSlide === 6 && (
            <Slide7PreSeededProfiles onNextSlide={() => navigateToSlide(7)} />
          )}
          {currentSlide === 7 && <Slide8CrowdfundingBacker />}
        </div>

        {/* Official Trademark and Intellectual Property Protection Footer */}
        <LegalTrademarksFooter />
      </main>

      {/* Interactive Modals */}
      <WorldMapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onSelectSlide={navigateToSlide}
        currentSlide={currentSlide}
      />

      <InstantDemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />

      <UDLSettingsDrawer
        isOpen={isUDLOpen}
        onClose={() => setIsUDLOpen(false)}
        udlSettings={udlSettings}
        onUpdateUDL={handleUpdateUDL}
      />
    </div>
  );
}
