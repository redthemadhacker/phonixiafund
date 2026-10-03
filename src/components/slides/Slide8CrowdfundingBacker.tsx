import React, { useState } from 'react';
import { 
  HeartHandshake, 
  CreditCard, 
  ShieldCheck, 
  Check, 
  ArrowRight,
  Target,
  PlusCircle,
  CheckCircle2,
  Clock,
  Briefcase,
  Layers,
  Flame,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { sound } from '../../utils/audio';
import { BackerTier } from '../../types';

// Clean SVG Apple Icon that renders reliably across all OS platforms
const AppleIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 170 170" fill="currentColor" aria-hidden="true">
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.92-3.26-7.89-8.08-11.91-14.47-5.74-9.08-10.36-19.81-13.85-32.19-3.49-12.38-5.24-23.72-5.24-34.02 0-14.13 3.6-25.79 10.8-34.98 7.2-9.19 16.32-13.85 27.36-13.98 4.79 0 10.3 1.25 16.54 3.75 6.24 2.5 10.32 3.81 12.24 3.93 1.63-.25 5.73-1.63 12.31-4.14 6.58-2.51 12.19-3.64 16.83-3.41 12.65.63 22.84 5.39 30.56 14.3-11.05 6.74-16.46 16.14-16.24 28.2.22 9.53 3.86 17.51 10.92 23.94 7.06 6.43 15.65 10.22 25.77 11.37-2.61 8.26-5.83 16.31-9.67 24.16zM119.22 31.95c0-7.39 2.65-14.16 7.95-20.31 5.3-6.15 11.83-10.38 19.59-12.69.22 1.09.33 2.18.33 3.26 0 7.39-2.77 14.3-8.31 20.73-5.54 6.43-12.14 10.35-19.8 11.76-.11-.98-.22-1.89-.22-2.75z"/>
  </svg>
);

// Map each backer dollar tier to its specific Stripe Payment Link
const STRIPE_TIER_LINKS: Record<number, string> = {
  25: 'https://buy.stripe.com/7sYdR81WpaV3gQD6m57Re01',
  50: 'https://buy.stripe.com/14AaEW44x8MV43RaCl7Re02',
  100: 'https://buy.stripe.com/bJecN458B6EN7g339T7Re03',
  250: 'https://buy.stripe.com/bJe9AS58B6ENasf9yh7Re04',
  500: 'https://buy.stripe.com/4gM7sKdF77IRcAn8ud7Re05',
  1000: 'https://buy.stripe.com/3cI4gyfNf9QZfMzeSB7Re06',
};

const TIERS: BackerTier[] = [
  {
    amount: 25,
    title: 'Supporter & Codex Backer',
    perks: ['Exclusive Backer Discord Role', 'Permanent Name in Celestial Archives Credits', 'Monthly Development Sprint Logs'],
  },
  {
    amount: 50,
    title: 'Beta Pioneer',
    perks: ['Immediate Private Beta Steam/Web Access', 'Exclusive Voxel Cloak & Hat in-game', 'All $25 Perks'],
    popular: true,
  },
  {
    amount: 100,
    title: 'Founding Family',
    perks: ['Lifetime Family Account (3 Learner Seats)', 'Exclusive Phonixia Flame Pet Companion', 'All $50 Perks'],
  },
  {
    amount: 250,
    title: 'Classroom Champion',
    perks: ['1-Year Classroom License (40 Seats)', 'Direct Curriculum Consulting Call with Amari James', 'All $100 Perks'],
  },
  {
    amount: 500,
    title: 'Master Architect',
    perks: ['Co-design a custom In-Game Voxel NPC or Quest with Amari', 'Physical Hardcover Phonixia Lore & Art Book', 'All $250 Perks'],
  },
  {
    amount: 1000,
    title: 'Legendary Guild Patron',
    perks: ['Permanent Named Monument Island in the Celestial Archives', 'Executive Advisory Board seat for 2026 Roadmap', 'All $500 Perks'],
  },
];

export const Slide8CrowdfundingBacker: React.FC = () => {
  const [goalTotal] = useState<number>(50000);
  const [currentRaised, setCurrentRaised] = useState<number>(300);
  const [backerCount, setBackerCount] = useState<number>(4);
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('50');
  const [customNote, setCustomNote] = useState<string>('Gift from Nana');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'google' | 'cashapp'>('card');
  
  // Transaction states
  const [pledgeComplete, setPledgeComplete] = useState<boolean>(false);
  const [lastPledgedAmount, setLastPledgedAmount] = useState<number>(0);
  const [postNotice, setPostNotice] = useState<string | null>(null);

  const effectiveAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;
  const percentage = Math.min(100, parseFloat(((currentRaised / goalTotal) * 100).toFixed(1)));

  // Resolves the link dynamically based on tier selection
  const activeStripeLink = STRIPE_TIER_LINKS[selectedAmount] || STRIPE_TIER_LINKS[100];
  const activeTier = TIERS.find((t) => t.amount === selectedAmount) || TIERS[2];

  const handleSelectTier = (amount: number) => {
    sound.playClick();
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
  };

  const handleInstantPostCustom = () => {
    const amt = parseFloat(customAmount);
    if (!amt || amt <= 0) return;

    sound.playQuestSuccess();
    setCurrentRaised((prev) => prev + amt);
    setBackerCount((prev) => prev + 1);
    setPostNotice(`✓ Added $${amt.toLocaleString()} (${customNote || 'Custom Contribution'}) to campaign total! New raised balance: $${(currentRaised + amt).toLocaleString()}`);

    setTimeout(() => {
      setPostNotice(null);
    }, 6000);
  };

  return (
    <div className="relative min-h-[calc(100vh-8rem)] flex flex-col justify-center max-w-6xl mx-auto px-4 py-8">
      {/* Editorial Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
          <span>SECTOR 08</span>
          <span aria-hidden="true">·</span>
          <span>SOLO FOUNDER DEVELOPMENT CAMPAIGN</span>
          <span aria-hidden="true">·</span>
          <span>$50,000 MILESTONE GOAL</span>
        </div>
        <h2 className="font-['Cinzel',serif] text-2xl sm:text-4xl font-black text-white tracking-tight">
          Fund the Solo Revolution: 6 Months to Full Launch
        </h2>
        <p className="text-sm text-slate-300 max-w-3xl mt-1">
          I am building Phonixia independently to preserve pedagogical purity and keep corporate ad-tech out of children's education. My timeline is securing this initial funding to cover dev tools, licensing, and personal living expenses so I can take time off work and devote 100% full-time focus to flushing out the entire game within 6 months. All I need is the funding and the time to focus—I can do this 100% myself.
        </p>
      </div>

      {/* Dynamic $50,000 Progress Bar */}
      <div className="p-6 rounded-2xl bg-[#090d16] border border-amber-500/30 mb-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase font-semibold flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-amber-400" />
              <span>Target: $50,000 Initial Solo Runway & Tools Milestone</span>
            </div>
            <div className="font-['Cinzel',serif] text-2xl sm:text-3xl font-black text-white">
              ${currentRaised.toLocaleString()}{' '}
              <span className="text-sm font-sans font-normal text-slate-400">
                raised of ${goalTotal.toLocaleString()} goal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div>
              <span className="text-slate-400 block text-[10px]">BACKERS</span>
              <strong className="text-cyan-400 text-base">{backerCount}</strong>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div>
              <span className="text-slate-400 block text-[10px]">PROGRESS</span>
              <strong className="text-amber-400 text-base">{percentage}%</strong>
            </div>
          </div>
        </div>

        {/* Progress track */}
        <div className="relative h-3 w-full bg-black/60 rounded-full overflow-hidden border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(245,158,11,0.5)] min-w-[1%]"
            style={{ width: `${Math.max(1.5, percentage)}%` }}
          />
        </div>

        {/* Instant Post Confirmation Toast */}
        {postNotice && (
          <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{postNotice}</span>
          </div>
        )}

        {/* Runway Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1">
            <div className="font-mono text-amber-300 font-bold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Full-Time Living Runway</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Covers bills & rent so Amari James can step away from unrelated work and build full-time 60+ hrs/wk.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1">
            <div className="font-mono text-cyan-300 font-bold flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Dev Engines & Tooling</span>
            </div>
            <p className="text-[11px] text-slate-400">
              High-performance voxel rendering engines, multiplayer networking clusters, audio synthesizers.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1">
            <div className="font-mono text-emerald-300 font-bold flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
              <span>Trademarks & Licensing</span>
            </div>
            <p className="text-[11px] text-slate-400">
              USPTO trademark filings for all 10 realms under All Nyte, All Byte, domains, and clinical trials.
            </p>
          </div>
        </div>

        {/* 6-Month Timeline Promise */}
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs font-mono text-amber-200">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span><strong>Solo Founder Timeline:</strong> Once the check hits, 100% flushed-out beta release shipped within 6 months.</span>
          </div>
        </div>
      </div>

      {/* Direct Donation, Custom Post & Checkout Module */}
      {!pledgeComplete ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Tier Buttons & Custom Post Deck */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-mono uppercase text-slate-400 flex items-center justify-between">
                <span>Select Your Backer Tier</span>
                <span className="text-amber-400">Immediate Perks & Early Access</span>
              </div>

              {/* Backer Tier Cards with Scrollable Full Perks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
                {TIERS.map((tier) => {
                  const isSelected = !customAmount && selectedAmount === tier.amount;
                  return (
                    <button
                      key={tier.amount}
                      onClick={() => handleSelectTier(tier.amount)}
                      onMouseEnter={() => sound.playHover()}
                      className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/50'
                          : 'bg-[#090d16] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-['Cinzel',serif] text-lg font-black text-amber-400">
                            ${tier.amount}
                          </span>
                          {tier.popular && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                              POPULAR
                            </span>
                          )}
                        </div>
                        <div className="font-['Outfit',sans-serif] text-sm font-bold text-white mb-2">
                          {tier.title}
                        </div>
                        {/* Scrollable perk list with no line-clamp truncation */}
                        <div className="max-h-36 overflow-y-auto pr-1 space-y-1.5 scrollbar-thin scrollbar-thumb-white/20">
                          {tier.perks.map((p, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-xs text-slate-300 leading-snug">
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="break-words">{p}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Custom Offline / Direct Contribution Box */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#0d1424] to-[#121c32] border border-cyan-500/30 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                    <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Direct Offline / Custom Contribution (Cash, Checks, Pledges)</span>
                  </span>
                  <span className="text-slate-400 text-[11px]">Instant Live Progress Update</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Custom Amount ($):</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">$</span>
                      <input
                        type="text"
                        placeholder="e.g. 50"
                        value={customAmount}
                        onChange={handleCustomChange}
                        className="w-full pl-7 pr-3 py-2 bg-black/60 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-400 font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Donor Note / Sponsor Tag:</label>
                    <input
                      type="text"
                      placeholder="e.g. Gift from Nana"
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                  <span className="text-[11px] text-slate-400">
                    Post <strong className="text-amber-300">${customAmount || 0}</strong> into the raised progress bar:
                  </span>
                  <button
                    type="button"
                    onClick={handleInstantPostCustom}
                    disabled={!parseFloat(customAmount)}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-mono font-bold text-xs shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all cursor-pointer whitespace-nowrap disabled:opacity-40"
                  >
                    + Post ${customAmount || 0} Directly to Goal Bar
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Direct Checkout Gateway with Expanded Perks Reader */}
            <div className="lg:col-span-5 bg-[#090d16] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
              <div>
                <div className="text-xs font-mono uppercase text-amber-400 mb-1">
                  Direct Backing Terminal
                </div>
                <h3 className="font-['Cinzel',serif] text-lg font-bold text-white">
                  Pledge ${selectedAmount} To Phonixia
                </h3>
              </div>

              {/* Dedicated Full Perks Reader for Active Selection */}
              {!customAmount && activeTier && (
                <div className="p-3.5 rounded-xl bg-black/60 border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-amber-300 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{activeTier.title} (${activeTier.amount})</span>
                    </span>
                    <span className="text-[10px] text-slate-400">Included Perks</span>
                  </div>
                  <div className="space-y-1.5 pt-1 border-t border-white/10">
                    {activeTier.perks.map((perk, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Method Selector */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => { sound.playClick(); setPaymentMethod('card'); }}
                  className={`flex-1 py-2 px-1 rounded-lg border text-xs font-medium flex items-center justify-center gap-1 cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-amber-500/20 border-amber-400 text-white font-bold'
                      : 'bg-black/30 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => { sound.playClick(); setPaymentMethod('apple'); }}
                  className={`flex-1 py-2 px-1 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    paymentMethod === 'apple'
                      ? 'bg-white text-black border-white font-bold'
                      : 'bg-black/30 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <AppleIcon className="w-3.5 h-3.5 fill-current" />
                  <span>Pay</span>
                </button>
                <button
                  type="button"
                  onClick={() => { sound.playClick(); setPaymentMethod('google'); }}
                  className={`flex-1 py-2 px-1 rounded-lg border text-xs font-medium flex items-center justify-center gap-1 cursor-pointer transition-all ${
                    paymentMethod === 'google'
                      ? 'bg-blue-600 border-blue-500 text-white font-bold'
                      : 'bg-black/30 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>G Pay</span>
                </button>
                <button
                  type="button"
                  onClick={() => { sound.playClick(); setPaymentMethod('cashapp'); }}
                  className={`flex-1 py-2 px-1 rounded-lg border text-xs font-medium flex items-center justify-center gap-1 cursor-pointer transition-all ${
                    paymentMethod === 'cashapp'
                      ? 'bg-[#00D632]/20 border-[#00D632] text-[#00D632] font-black shadow-[0_0_15px_rgba(0,214,50,0.25)]'
                      : 'bg-black/30 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-[#00D632] text-black font-black flex items-center justify-center text-[10px] leading-none">$</span>
                  <span>Cash App</span>
                </button>
              </div>

              {/* STRIPE DIRECT PAYMENT GATEWAY (Card, Apple Pay, Google Pay) */}
              {paymentMethod !== 'cashapp' && (
                <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 via-black/60 to-cyan-500/10 border border-amber-500/30 space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Secure Tier Checkout (${selectedAmount})
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 border border-white/10 px-2 py-0.5 rounded bg-black/40">
                      Stripe Protected
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    Complete your backing securely through our official Stripe portal for the <strong>${selectedAmount} tier</strong>. Accepts card, Apple Pay, and Google Pay.
                  </p>

                  <a
                    href={activeStripeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className={`w-full py-3.5 rounded-xl font-bold font-['Outfit',sans-serif] text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                      paymentMethod === 'apple'
                        ? 'bg-white text-black hover:bg-slate-200'
                        : paymentMethod === 'google'
                        ? 'bg-blue-600 text-white hover:bg-blue-500'
                        : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.35)]'
                    }`}
                  >
                    {paymentMethod === 'apple' ? (
                      <>
                        <span>Pay ${selectedAmount} with</span>
                        <AppleIcon className="w-4 h-4 fill-current inline-block" />
                        <span>Pay</span>
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </>
                    ) : paymentMethod === 'google' ? (
                      <>
                        <span>Pay ${selectedAmount} with</span>
                        <span className="font-black">GPay</span>
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </>
                    ) : (
                      <>
                        <HeartHandshake className="w-4 h-4" />
                        <span>Complete ${selectedAmount} Contribution on Stripe</span>
                        <ExternalLink className="w-4 h-4" />
                      </>
                    )}
                  </a>

                  <div className="pt-2 border-t border-white/5 space-y-2">
                    <div className="text-[11px] font-mono text-slate-400">
                      Finished paying on Stripe? Record your pledge to the goal bar:
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playQuestSuccess();
                        setCurrentRaised((prev) => prev + selectedAmount);
                        setBackerCount((prev) => prev + 1);
                        setLastPledgedAmount(selectedAmount);
                        setPledgeComplete(true);
                      }}
                      className="w-full py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white font-mono font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-white/10"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>I Paid on Stripe — Add ${selectedAmount} to Goal Bar!</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>256-Bit SSL Encrypted Direct Indie Backing</span>
                  </div>
                </div>
              )}

              {/* CASH APP INSTANT DIRECT PAYMENT PANEL */}
              {paymentMethod === 'cashapp' && (
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#00D632]/15 via-black/60 to-[#00D632]/5 border border-[#00D632]/40 space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#00D632] text-black font-black flex items-center justify-center text-sm shadow">
                        $
                      </span>
                      <div>
                        <div className="font-['Outfit',sans-serif] font-bold text-white text-sm">
                          Direct Cash App Payment
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Funds go directly to Amari James
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#00D632] bg-[#00D632]/10 px-2.5 py-1 rounded border border-[#00D632]/30 select-all">
                      $luvdinero
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Send <strong className="text-[#00D632]">${effectiveAmount}</strong> straight to <strong className="text-white">$luvdinero</strong> on Cash App. Works seamlessly from your phone or browser with zero wait time.
                  </p>

                  <a
                    href={`https://cash.app/$luvdinero/${effectiveAmount}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="w-full py-3 rounded-xl bg-[#00D632] hover:bg-[#00B82B] text-black font-black font-['Outfit',sans-serif] text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,214,50,0.35)] transition-all cursor-pointer"
                  >
                    <span>Open Cash App & Pay ${effectiveAmount} to$luvdinero</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <div className="pt-2 border-t border-white/5 space-y-2">
                    <div className="text-[11px] font-mono text-slate-400">
                      After sending on Cash App, click below to record your pledge:
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playQuestSuccess();
                        setCurrentRaised((prev) => prev + effectiveAmount);
                        setBackerCount((prev) => prev + 1);
                        setLastPledgedAmount(effectiveAmount);
                        setPledgeComplete(true);
                      }}
                      className="w-full py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white font-mono font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-white/10"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#00D632]" />
                      <span>I Sent ${effectiveAmount} on Cash App — Add to Goal Bar!</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Core Engine Technical Architecture & Runway */}
          <div className="mt-8 p-6 rounded-2xl bg-[#090d16]/90 border border-purple-500/20 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-purple-400" />
                  <span>Core Engine Backing & Architecture Roadmap</span>
                </div>
                <h3 className="font-['Cinzel',serif] text-xl font-bold text-white mt-0.5">
                  What Backing This Project Powers: The Clean-Slate Engine
                </h3>
              </div>
              <a
                href="https://github.com/redthemadhacker/phonixiaalpha"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-xs font-mono text-purple-300 hover:text-purple-200 transition-colors"
              >
                <span>Inspect phonixiaalpha</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <span className="font-mono text-purple-300 font-bold block flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  Clean-Slate Voxel Runtime
                </span>
                <p className="text-slate-400 leading-relaxed">
                  Zero third-party bloat. Built from scratch with custom chunk meshing, voxel lighting, and procedural web audio designed to run at 60 FPS on low-cost school Chromebooks and mobile devices.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <span className="font-mono text-cyan-300 font-bold block flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  Clinical Reading Parser
                </span>
                <p className="text-slate-400 leading-relaxed">
                  Orthographic mapping engine pairing acoustics with grapheme voxel tiles in real time. Your backing funds the complete clinical decodable dictionary across 14 phonetic regions from age 3 to adulthood.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <span className="font-mono text-amber-300 font-bold block flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  100% Solo Independence
                </span>
                <p className="text-slate-400 leading-relaxed">
                  No corporate publisher control, no data broker tracking, and no predatory ads. Backing directly ensures Amari James can focus full-time to bring the full game to launch within 6 months.
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Verified Backer Certificate */
        <div className="p-8 rounded-2xl bg-[#0e1627] border border-amber-400/60 shadow-[0_0_50px_rgba(245,158,11,0.25)] text-center max-w-2xl mx-auto space-y-4 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center mx-auto text-3xl">
            🏆
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              VERIFIED FOUNDING PATRON
            </div>
            <h3 className="font-['Cinzel',serif] text-2xl font-black text-white mt-1">
              Welcome to the Celestial Archives, Champion!
            </h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
              Your backing of <strong className="text-amber-300 font-bold">${lastPledgedAmount}</strong> directly funds my solo living runway and development tools. Your payment has posted to the master goal bar!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-slate-300 max-w-md mx-auto text-left space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-500">Backer Certificate ID:</span>
              <span className="text-cyan-400">PHONIX-PATRON-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Method:</span>
              <span className="text-amber-400 uppercase font-bold">{paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Allocated Runway:</span>
              <span className="text-emerald-400">6-Month Solo Production</span>
            </div>
          </div>

          <button
            onClick={() => setPledgeComplete(false)}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-white/5 rounded-lg transition-colors cursor-pointer"
          >
            Pledge Again or Log Another Donation
          </button>
        </div>
      )}
    </div>
  );
};