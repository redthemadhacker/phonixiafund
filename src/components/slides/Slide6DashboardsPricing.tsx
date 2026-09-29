import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  ShieldCheck, 
  GraduationCap, 
  Building2, 
  Check, 
  PlayCircle, 
  Clock, 
  Activity, 
  FileText,
  UserCheck,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface Slide6Props {
  onOpenGuestSandbox: () => void;
}

type RoleType = 'student' | 'parent' | 'classroom' | 'district';

export const Slide6DashboardsPricing: React.FC<Slide6Props> = ({ onOpenGuestSandbox }) => {
  const [activeRole, setActiveRole] = useState<RoleType>('parent');

  return (
    <div className="relative min-h-[calc(100vh-8rem)] flex flex-col justify-center max-w-6xl mx-auto px-4 py-8">
      {/* Editorial Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
          <span>SECTOR 06</span>
          <span aria-hidden="true">·</span>
          <span>MULTI-TENANT ECOSYSTEM</span>
          <span aria-hidden="true">·</span>
          <span>ROLES & TRANSPARENT PRICING</span>
        </div>
        <h2 className="font-['Cinzel',serif] text-2xl sm:text-4xl font-black text-white tracking-tight">
          Role-Based Dashboards & Sustainable Licensing
        </h2>
        <p className="text-sm text-slate-300 max-w-3xl mt-1">
          I engineered Phonixia with dedicated views for every stakeholder. From a child's private Learner Lodge to a district superintendent's campus-wide telemetry grid, the platform scales effortlessly.
        </p>
      </div>

      {/* Prominent Free Instant Guest Sandbox Banner */}
      <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-emerald-500/10 to-cyan-500/15 border border-amber-400/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-300 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zero-Friction Evaluation Protocol</span>
          </div>
          <div className="font-['Outfit',sans-serif] text-base font-bold text-white">
            Free Instant Guest Sandbox
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            Bypass all paywalls, registration forms, and credit card gates. Test the entire voxel engine instantly.
          </p>
        </div>

        <button
          onClick={() => {
            sound.playPortalWarp();
            onOpenGuestSandbox();
          }}
          onMouseEnter={() => sound.playHover()}
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] whitespace-nowrap cursor-pointer shrink-0"
        >
          <PlayCircle className="w-4 h-4 text-slate-900" />
          <span>Launch Guest Sandbox Now</span>
        </button>
      </div>

      {/* Interactive Role Switcher Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        <button
          onClick={() => { sound.playClick(); setActiveRole('student'); }}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            activeRole === 'student'
              ? 'bg-[#121c32] border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
              : 'bg-[#090d16] border-white/10 text-slate-400 hover:text-white'
          }`}
        >
          <div className="text-[10px] font-mono text-cyan-400 uppercase">Self-Guided</div>
          <div className="font-bold text-sm text-white">Student Profile</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Learner Lodge & Quest Log</div>
        </button>

        <button
          onClick={() => { sound.playClick(); setActiveRole('parent'); }}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            activeRole === 'parent'
              ? 'bg-[#1b1c12] border-amber-400 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]'
              : 'bg-[#090d16] border-white/10 text-slate-400 hover:text-white'
          }`}
        >
          <div className="text-[10px] font-mono text-amber-400 uppercase">$9.99–$19.99/mo</div>
          <div className="font-bold text-sm text-white">Parent / Homeschool</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Multi-Child & Diagnostics</div>
        </button>

        <button
          onClick={() => { sound.playClick(); setActiveRole('classroom'); }}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            activeRole === 'classroom'
              ? 'bg-[#12221b] border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]'
              : 'bg-[#090d16] border-white/10 text-slate-400 hover:text-white'
          }`}
        >
          <div className="text-[10px] font-mono text-emerald-400 uppercase">$299–$499/yr</div>
          <div className="font-bold text-sm text-white">Classroom / Micro-School</div>
          <div className="text-[11px] text-slate-400 mt-0.5">40 Seats & RTI/MTSS</div>
        </button>

        <button
          onClick={() => { sound.playClick(); setActiveRole('district'); }}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            activeRole === 'district'
              ? 'bg-[#1e122b] border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]'
              : 'bg-[#090d16] border-white/10 text-slate-400 hover:text-white'
          }`}
        >
          <div className="text-[10px] font-mono text-purple-400 uppercase">$2,500–$5,000/yr</div>
          <div className="font-bold text-sm text-white">District Enterprise</div>
          <div className="text-[11px] text-slate-400 mt-0.5">SSO & Volume Licensing</div>
        </button>
      </div>

      {/* Role Dashboard Live Preview Container */}
      <div className="p-6 rounded-2xl bg-[#090d16] border border-white/10 shadow-2xl space-y-6">
        {/* STUDENT ROLE */}
        {activeRole === 'student' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-white/10 gap-2">
              <div>
                <h3 className="font-['Cinzel',serif] text-lg font-bold text-white">
                  Student Sanctuary: Private Learner Lodge
                </h3>
                <p className="text-xs text-slate-400">
                  Custom avatar voxel gear, phoneme trophy wall, and non-punitive quest trail.
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                Included with All Subscriptions
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="text-xs font-mono uppercase text-cyan-400">Avatar Equipment</div>
                <div className="text-sm font-bold text-white">Phonixia Flame Master Robes</div>
                <p className="text-xs text-slate-400">Earned by forging 50 multi-syllabic words in Builders Guild.</p>
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="text-xs font-mono uppercase text-cyan-400">Active Quest Trail</div>
                <div className="text-sm font-bold text-white">The Whispering Root Excavation</div>
                <p className="text-xs text-slate-400">Objective: Mine 3 Latin roots in Continent 4 without failing.</p>
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="text-xs font-mono uppercase text-cyan-400">Mastery Codex</div>
                <div className="text-sm font-bold text-white">142 Sound Runes Unlocked</div>
                <p className="text-xs text-slate-400">100% phonetic coverage across consonants, vowels, and digraphs.</p>
              </div>
            </div>
          </div>
        )}

        {/* PARENT / HOMESCHOOL ROLE */}
        {activeRole === 'parent' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-white/10 gap-2">
              <div>
                <h3 className="font-['Cinzel',serif] text-lg font-bold text-white">
                  Parent & Homeschooler Diagnostic Command
                </h3>
                <p className="text-xs text-slate-400">
                  Tier 1: $9.99–$14.99/mo (Core Literacy) | Multiverse Pass: $19.99/mo (All 9 DLCs Included)
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold">
                Most Popular for Families
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="text-xs font-mono uppercase text-amber-400 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>Multi-Child Switcher</span>
                </div>
                <div className="text-sm font-bold text-white">Leo (Age 10) & Toby (Age 5)</div>
                <p className="text-xs text-slate-400">Independent save states, difficulty scaling, and private badges.</p>
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="text-xs font-mono uppercase text-amber-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Screen-Time Scheduler</span>
                </div>
                <div className="text-sm font-bold text-white">45 Min Daily Educational Cap</div>
                <p className="text-xs text-slate-400">Auto-saves at natural narrative checkpoints without abrupt cutoffs.</p>
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="text-xs font-mono uppercase text-amber-400 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Portfolio Export</span>
                </div>
                <div className="text-sm font-bold text-white">State Homeschool Report</div>
                <p className="text-xs text-slate-400">One-click PDF generation with Lexile measures and standard alignments.</p>
              </div>
            </div>
          </div>
        )}

        {/* CLASSROOM ROLE */}
        {activeRole === 'classroom' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-white/10 gap-2">
              <div>
                <h3 className="font-['Cinzel',serif] text-lg font-bold text-white">
                  Classroom & Micro-School Command Center
                </h3>
                <p className="text-xs text-slate-400">
                  $299–$499/year per classroom (up to 40 active seats)
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
                Includes Automated RTI / MTSS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="text-xs font-mono uppercase text-emerald-400">Roster Management</div>
                <div className="text-sm font-bold text-white">32 / 40 Active Students</div>
                <p className="text-xs text-slate-400">Quick bulk CSV import, student PIN codes, and individual group assignments.</p>
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="text-xs font-mono uppercase text-emerald-400">Automated RTI / MTSS</div>
                <div className="text-sm font-bold text-white">Tier 2 Intervention Alerts</div>
                <p className="text-xs text-slate-400">Engine flags students struggling with vowel teams before quarterly exams.</p>
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="text-xs font-mono uppercase text-emerald-400">IEP / 504 Modification</div>
                <div className="text-sm font-bold text-white">Granular Accessibility</div>
                <p className="text-xs text-slate-400">Toggle text-to-speech, extra time, or low-contrast per student.</p>
              </div>
            </div>
          </div>
        )}

        {/* DISTRICT ENTERPRISE ROLE */}
        {activeRole === 'district' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-white/10 gap-2">
              <div>
                <h3 className="font-['Cinzel',serif] text-lg font-bold text-white">
                  District Enterprise & Campus-Wide Analytics
                </h3>
                <p className="text-xs text-slate-400">
                  $2,500–$5,000/year per campus · Volume site licenses available
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-purple-500/15 border border-purple-500/30 text-purple-300 font-bold">
                SSO & Compliance Ready
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="text-xs font-mono uppercase text-purple-400">Enterprise SSO</div>
                <div className="text-sm font-bold text-white">Clever · ClassLink · Google</div>
                <p className="text-xs text-slate-400">FERPA and COPPA compliant automated roster synchronization.</p>
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="text-xs font-mono uppercase text-purple-400">District Longitudinal Data</div>
                <div className="text-sm font-bold text-white">Superintendent Heatmap</div>
                <p className="text-xs text-slate-400">Track grade-level reading proficiency trajectories across 12 elementary campuses.</p>
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="text-xs font-mono uppercase text-purple-400">Dedicated Support</div>
                <div className="text-sm font-bold text-white">Direct Architect SLA</div>
                <p className="text-xs text-slate-400">Professional development webinars and custom state curriculum crosswalks.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
