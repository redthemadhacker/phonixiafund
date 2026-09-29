import React from 'react';
import { ShieldAlert, Copyright, Lock, Award } from 'lucide-react';

export const LegalTrademarksFooter: React.FC = () => {
  return (
    <section className="mt-16 border-t border-amber-500/20 bg-[#04060a]/90 backdrop-blur-md py-8 px-4 text-slate-400">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Trademark Notice Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2 text-amber-400">
            <Lock className="w-4 h-4 text-amber-400" />
            <span className="font-['Cinzel',serif] text-sm font-bold tracking-wider text-white">
              INTELLECTUAL PROPERTY & TRADEMARK REGISTRATION (IN PROGRESS)
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-300/80 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Sole Proprietary Ownership: Amari James</span>
          </div>
        </div>

        {/* Registered & In-Progress Trademarks Badges */}
        <div>
          <div className="text-[11px] font-mono uppercase text-slate-400 mb-2">
            Protected Titles & Engine Trademarks (All Nyte, All Byte):
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {[
              'PHONIXIA™',
              'THE MULTIVERSE ADVENTURE ENGINE™',
              'RED THE MAD HACKER™',
              'ALL NYTE, ALL BYTE™',
              'NUMBER NOOK & THE ALGORIDDLES™',
              'GEOMETRIA & THE INFINITE SPIRE™',
              'CURIO COSMOS & SPARK SPIRE™',
              'BIOBLOOM WILDS™',
              'CHRONOS CLOCKWORK™',
              'CIVIC CITADEL & AGORA PLAINS™',
              'CYBERMATRIX BASTION™',
              'HANDS IN MOTION™',
              'ATELIER ARCANA & SOUNDFORGE™',
            ].map((tm, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded bg-[#0b101c] border border-white/10 text-slate-300 font-semibold tracking-wide"
              >
                {tm}
              </span>
            ))}
          </div>
        </div>

        {/* Legal Text & Anti-Theft Protection Notice */}
        <div className="text-[11px] leading-relaxed text-slate-400 space-y-2 font-['Plus_Jakarta_Sans',sans-serif]">
          <p>
            © {new Date().getFullYear()} <strong className="text-slate-200">Amari James (Red The Mad Hacker)</strong> / <strong className="text-slate-200">All Nyte, All Byte</strong>. All Rights Reserved.
          </p>
          <p>
            All game design concepts, voxel mechanics, multi-continent literacy architecture, lifelong 3-to-adulthood curriculum frameworks, source code repositories, and branding elements showcased in this proposal are the exclusive intellectual property of Amari James. Trademark filings and copyright registrations are actively in progress.
          </p>
          <p className="text-slate-400 italic">
            Notice: No portion of this engine architecture, pedagogical sequence, or proprietary terminology may be scraped, reproduced, distributed, incorporated into corporate AI training pipelines, or adopted by state educational institutions without a formal, written licensing contract executed directly with Amari James.
          </p>
        </div>
      </div>
    </section>
  );
};
