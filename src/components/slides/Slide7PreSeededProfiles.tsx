import React, { useState } from 'react';
import { 
  Key, 
  Copy, 
  Check, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  User, 
  Trophy, 
  FileCheck, 
  TrendingUp, 
  Activity,
  Layers,
  Heart
} from 'lucide-react';
import { sound } from '../../utils/audio';
import { TestProfile } from '../../types';

const PROFILES: TestProfile[] = [
  {
    id: 'profile-leo',
    name: 'Leo',
    avatarSeed: '⚔️',
    badge: 'Master of Phonixia (Grand Endgame)',
    level: 75,
    progressPercent: 100,
    literacyProgress: 100,
    dlcProgress: 100,
    accuracy: '98.4%',
    fluencyWPM: 165,
    statusBadge: '100% General Ed Mastery',
    highlights: [
      'Cleared all 5 Core Literacy Continents (Sound Shallows → Lexicon Empire)',
      '100% Complete on all 9 Multiverse DLC Expansion Realms',
      'Defended Doctoral Dialectic Thesis in Celestial Archives',
      'Earned the legendary title: Master of Phonixia'
    ],
    quote: '"I used to hate English class because they made us fill out worksheets. In Phonixia, I built an entire syntax fortress and flew with Greek root wings."'
  },
  {
    id: 'profile-maya',
    name: 'Maya',
    avatarSeed: '🌟',
    badge: 'Supported Learning Champion (IEP Complete)',
    level: 62,
    progressPercent: 100,
    literacyProgress: 100,
    dlcProgress: 94,
    accuracy: '96.2%',
    fluencyWPM: 138,
    statusBadge: '100% Supported Learning / UDL Complete',
    iepAccommodations: [
      'OpenDyslexic Dynamic Font Layer',
      'Color-Coded Syllable & Phoneme Highlighting',
      'Low-Stimulation Audio/Visual Dampener',
      'Extended Response Window & Zero-Loss Checkpoints'
    ],
    highlights: [
      '100% Game completion via adaptive UDL assessments',
      'Zero test anxiety flare-ups recorded in longitudinal logs',
      'Audited IEP accommodation trail ready for school psychologist signoff',
      'Transitioned from reluctant reader to voracious world builder'
    ],
    quote: '"The letters don\'t jump around or flip upside down anymore. The game changes how it looks so my brain can read without getting tired."'
  },
  {
    id: 'profile-toby',
    name: 'Toby',
    avatarSeed: '🐣',
    badge: 'Continent 1 Graduate (Early Explorer)',
    level: 18,
    progressPercent: 20,
    literacyProgress: 100, // For Continent 1
    dlcProgress: 15,
    accuracy: '99.1%',
    fluencyWPM: 48,
    statusBadge: '100% Pre-K Sound Shallows Complete',
    highlights: [
      'Sound Shallows 100% cleared (Auditory processing & phoneme mapping)',
      'Sandpaper letter voxel sculpting fully mastered (all 26 graphemes)',
      'Speech resonance crystals attuned for all consonants & short vowels',
      'Cleared to cross the sea bridge into Continent 2 (Builders Guild)'
    ],
    quote: '"I can hear the letter sounds when they sing! I made my own pet cat by mining the /k/, /æ/, and /t/ blocks!"'
  },
];

export const Slide7PreSeededProfiles: React.FC = () => {
  const [selectedProfileId, setSelectedProfileId] = useState<string>('profile-leo');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const activeProfile = PROFILES.find((p) => p.id === selectedProfileId) || PROFILES[0];

  const handleCopyBetaCredentials = () => {
    sound.playClick();
    navigator.clipboard.writeText('readingheroes / phonics123');
    setCopiedKey('beta');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleCopyFamilyCredentials = () => {
    sound.playClick();
    navigator.clipboard.writeText('demo.family@phonixia.internal | PhonixiaMaster2026!');
    setCopiedKey('family');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="relative min-h-[calc(100vh-8rem)] flex flex-col justify-center max-w-6xl mx-auto px-4 py-8">
      {/* Editorial Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-pink-400 mb-2">
          <span>SECTOR 07</span>
          <span aria-hidden="true">·</span>
          <span>EMPIRICAL VERIFICATION</span>
          <span aria-hidden="true">·</span>
          <span>PRE-SEEDED EVALUATION FAMILY & LIVE CREDENTIALS</span>
        </div>
        <h2 className="font-['Cinzel',serif] text-2xl sm:text-4xl font-black text-white tracking-tight">
          Verified Test Profiles & Live Access Credentials
        </h2>
        <p className="text-sm text-slate-300 max-w-3xl mt-1">
          I pre-seeded my engine with verified evaluation profiles and configured live credentials for both the public Heroku deployment and internal audit ledgers.
        </p>
      </div>

      {/* Dual Credentials Showcase Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Card 1: Live Public Heroku Beta Login */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-[#0e1627] to-[#12223a] border border-cyan-500/40 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 text-xs font-mono uppercase text-cyan-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Live Beta App Credentials (Heroku)
              </span>
              <a
                href="https://phonixia-7c9c93ef0d42.herokuapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-cyan-300 hover:text-white underline flex items-center gap-1"
              >
                <span>Launch App</span>
                <span>↗</span>
              </a>
            </div>

            <div className="p-2.5 rounded-lg bg-black/60 border border-cyan-500/20 text-xs font-mono space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Username:</span>
                <strong className="text-amber-300 select-all font-bold">readingheroes</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Password:</span>
                <strong className="text-emerald-300 select-all font-bold">phonics123</strong>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400">Public Live Beta Deployment</span>
            <button
              onClick={handleCopyBetaCredentials}
              className="px-2.5 py-1 text-[11px] font-mono text-cyan-300 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 rounded cursor-pointer transition-colors"
            >
              {copiedKey === 'beta' ? 'Copied!' : 'Copy Beta Login'}
            </button>
          </div>
        </div>

        {/* Card 2: Internal Multi-Child Family Evaluation Account */}
        <div className="p-4 rounded-xl bg-[#0e1627] border border-white/10 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-pink-400 font-bold">
                Internal Lifetime Family Tier
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                100% Unlocked
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-black/60 border border-white/5 text-xs font-mono space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Email:</span>
                <strong className="text-amber-300 select-all font-bold">demo.family@phonixia.internal</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Password:</span>
                <strong className="text-emerald-300 select-all font-bold">PhonixiaMaster2026!</strong>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400">Multi-Child Audit Ledger</span>
            <button
              onClick={handleCopyFamilyCredentials}
              className="px-2.5 py-1 text-[11px] font-mono text-pink-300 bg-pink-500/15 hover:bg-pink-500/25 border border-pink-500/30 rounded cursor-pointer transition-colors"
            >
              {copiedKey === 'family' ? 'Copied!' : 'Copy Family Login'}
            </button>
          </div>
        </div>
      </div>

      {/* 3 Profile Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {PROFILES.map((p) => {
          const isSelected = p.id === selectedProfileId;
          return (
            <button
              key={p.id}
              onClick={() => {
                sound.playClick();
                setSelectedProfileId(p.id);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-pink-950/20 border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.2)]'
                  : 'bg-[#090d16] border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{p.avatarSeed}</span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-slate-300">
                    Level {p.level}
                  </span>
                </div>
                <div className="font-['Outfit',sans-serif] text-base font-bold text-white">
                  {p.name}
                </div>
                <div className="text-[11px] font-mono text-pink-400 mt-0.5">
                  {p.statusBadge}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Accuracy: <strong className="text-white">{p.accuracy}</strong></span>
                <span className="text-slate-400">Fluency: <strong className="text-amber-400">{p.fluencyWPM} WPM</strong></span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Profile Detailed Dossier */}
      <div className="p-6 rounded-2xl bg-[#090d16] border border-white/10 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-4xl p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/30">
              {activeProfile.avatarSeed}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-['Cinzel',serif] text-xl font-bold text-white">
                  Profile Audit: {activeProfile.name}
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
                  Verified In-Engine
                </span>
              </div>
              <p className="text-xs font-mono text-pink-300">
                {activeProfile.badge}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono bg-black/40 px-4 py-2 rounded-xl border border-white/5">
            <div>
              <span className="text-slate-500 block text-[10px]">DECODING ACCURACY</span>
              <strong className="text-emerald-400 text-sm">{activeProfile.accuracy}</strong>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div>
              <span className="text-slate-500 block text-[10px]">READING FLUENCY</span>
              <strong className="text-amber-400 text-sm">{activeProfile.fluencyWPM} WPM</strong>
            </div>
          </div>
        </div>

        {/* Highlights & Verified Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-xs font-mono uppercase text-slate-400 mb-2 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Telemetry Highlights</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {activeProfile.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-black/30 border border-white/5">
                  <Check className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            {activeProfile.iepAccommodations && (
              <div>
                <div className="text-xs font-mono uppercase text-slate-400 mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Active IEP / 504 Accommodations</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeProfile.iepAccommodations.map((acc, i) => (
                    <div key={i} className="p-2 rounded bg-blue-950/20 border border-blue-500/20 text-[11px] text-blue-200">
                      {acc}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="text-xs font-mono uppercase text-slate-400 mb-2">
                Learner Testimonial
              </div>
              <blockquote className="p-3.5 rounded-xl bg-pink-500/5 border border-pink-500/20 text-xs text-slate-300 italic leading-relaxed">
                {activeProfile.quote}
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
