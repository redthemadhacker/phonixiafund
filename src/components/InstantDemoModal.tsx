import React, { useState } from 'react';
import { X, Sparkles, Hammer, RotateCcw, Volume2, Trophy } from 'lucide-react';
import { sound } from '../utils/audio';
import { speech } from '../utils/speech';

interface InstantDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface VoxelBlock {
  id: string;
  char: string;
  type: 'consonant' | 'vowel' | 'digraph';
  soundIpa: string;
  color: string;
}

const AVAILABLE_BLOCKS: VoxelBlock[] = [
  { id: 'b1', char: 'C', type: 'consonant', soundIpa: '/k/', color: 'bg-blue-600/30 border-blue-500/50 text-blue-300' },
  { id: 'b2', char: 'A', type: 'vowel', soundIpa: '/æ/', color: 'bg-amber-600/30 border-amber-500/50 text-amber-300' },
  { id: 'b3', char: 'T', type: 'consonant', soundIpa: '/t/', color: 'bg-blue-600/30 border-blue-500/50 text-blue-300' },
  { id: 'b4', char: 'SH', type: 'digraph', soundIpa: '/ʃ/', color: 'bg-purple-600/30 border-purple-500/50 text-purple-300' },
  { id: 'b5', char: 'I', type: 'vowel', soundIpa: '/ɪ/', color: 'bg-amber-600/30 border-amber-500/50 text-amber-300' },
  { id: 'b6', char: 'P', type: 'consonant', soundIpa: '/p/', color: 'bg-blue-600/30 border-blue-500/50 text-blue-300' },
  { id: 'b7', char: 'PH', type: 'digraph', soundIpa: '/f/', color: 'bg-purple-600/30 border-purple-500/50 text-purple-300' },
  { id: 'b8', char: 'ON', type: 'consonant', soundIpa: '/ɒn/', color: 'bg-blue-600/30 border-blue-500/50 text-blue-300' },
  { id: 'b9', char: 'IX', type: 'digraph', soundIpa: '/ɪks/', color: 'bg-emerald-600/30 border-emerald-500/50 text-emerald-300' },
];

export const InstantDemoModal: React.FC<InstantDemoModalProps> = ({ isOpen, onClose }) => {
  const [forgeSlots, setForgeSlots] = useState<VoxelBlock[]>([]);
  const [forgedItem, setForgedItem] = useState<{
    word: string;
    rarity: string;
    itemTitle: string;
    lore: string;
    statBoost: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleAddBlock = (block: VoxelBlock) => {
    if (forgeSlots.length >= 4) return;
    sound.playHover();
    speech.speak(block.char, true);
    setForgeSlots([...forgeSlots, block]);
    setForgedItem(null);
  };

  const handleRemoveBlock = (index: number) => {
    sound.playClick();
    const updated = [...forgeSlots];
    updated.splice(index, 1);
    setForgeSlots(updated);
    setForgedItem(null);
  };

  const handleClear = () => {
    sound.playClick();
    setForgeSlots([]);
    setForgedItem(null);
  };

  const handleSmelt = () => {
    if (forgeSlots.length === 0) return;
    sound.playForgeSmelt();

    const formedWord = forgeSlots.map((b) => b.char).join('');
    speech.speak(formedWord, true);

    // Dynamic reward generator
    if (formedWord.toUpperCase() === 'CAT') {
      sound.playQuestSuccess();
      setForgedItem({
        word: 'CAT',
        rarity: 'Common Companion',
        itemTitle: 'Feline Shadow Claws',
        lore: 'Basic CVC smelting mastered! The cat grants +15 Night Agility across Sound Shallows.',
        statBoost: '+15 Night Vision & Agility',
      });
    } else if (formedWord.toUpperCase() === 'SHIP') {
      sound.playQuestSuccess();
      setForgedItem({
        word: 'SHIP',
        rarity: 'Rare Vessel',
        itemTitle: 'Phonetic Corsair Skiff',
        lore: 'Digraph /ʃ/ merged with vowel /ɪ/ and stop /p/! Ocean navigation across Continent 2 unlocked.',
        statBoost: '+35 Nautical Velocity',
      });
    } else if (formedWord.toUpperCase().includes('PHONIX')) {
      sound.playQuestSuccess();
      setForgedItem({
        word: formedWord,
        rarity: 'Legendary Relic',
        itemTitle: 'Heart of the Phonix Sun',
        lore: 'Master tier language synthesis! Greek root extraction enables clausal flight in Lexicon Empire.',
        statBoost: '+100 Linguistics Fluency',
      });
    } else {
      sound.playQuestSuccess();
      setForgedItem({
        word: formedWord,
        rarity: 'Forged Rune Crystal',
        itemTitle: `${formedWord}-Stone Catalyst`,
        lore: `Syllable block fused! Acoustic resonance crystallized with ${forgeSlots.length} phoneme anchors.`,
        statBoost: `+${forgeSlots.length * 10} Orthographic Power`,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#090d16] border border-amber-500/30 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.2)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-amber-500/5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Hammer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-['Cinzel',serif] text-lg font-bold text-white tracking-wider flex items-center gap-2">
                <span>PHONICS FORGE MINI-SANDBOX</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                  LIVE INTERACTIVE ENGINE
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Mine sound runes, load the smelting anvil, and forge orthographic equipment.
              </p>
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

        {/* Sandbox Content */}
        <div className="p-6 space-y-6">
          {/* Anvil Slot Stage */}
          <div className="p-5 rounded-xl bg-black/40 border border-white/10 relative overflow-hidden">
            <div className="text-xs font-mono uppercase text-slate-400 mb-3 flex items-center justify-between">
              <span>Anvil Smelting Slots (Max 4 Phonemes)</span>
              <span className="text-amber-400 font-bold">{forgeSlots.length} / 4 Loaded</span>
            </div>

            <div className="flex items-center justify-center gap-3 min-h-[90px] p-2 bg-[#04060a]/60 rounded-lg border border-dashed border-white/20">
              {forgeSlots.length === 0 ? (
                <div className="text-center text-xs text-slate-500 py-3">
                  Click the mined vowel and consonant blocks below to place them on the anvil
                </div>
              ) : (
                forgeSlots.map((block, idx) => (
                  <button
                    key={`${block.id}-${idx}`}
                    onClick={() => handleRemoveBlock(idx)}
                    title="Click to remove from forge"
                    className={`relative px-4 py-3 rounded-lg border font-['Outfit',sans-serif] font-black text-xl shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer ${block.color}`}
                  >
                    <span>{block.char}</span>
                    <span className="block text-[10px] font-mono opacity-70">{block.soundIpa}</span>
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500/80 hover:bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center font-mono">
                      ×
                    </span>
                  </button>
                ))
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={handleClear}
                disabled={forgeSlots.length === 0}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 hover:bg-white/5 rounded-md transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Anvil</span>
              </button>

              <button
                onClick={handleSmelt}
                disabled={forgeSlots.length === 0}
                className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:hover:bg-amber-400 rounded-lg transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer"
              >
                <Hammer className="w-4 h-4" />
                <span>Smelt Phonemes</span>
              </button>
            </div>
          </div>

          {/* Mined Blocks Inventory */}
          <div>
            <div className="text-xs font-mono uppercase text-slate-400 mb-2 flex items-center justify-between">
              <span>Mined Voxel Blocks (Try "C" + "A" + "T" or "SH" + "I" + "P")</span>
              <span className="text-[11px] text-slate-500">Audio Preview Enabled</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {AVAILABLE_BLOCKS.map((block) => (
                <button
                  key={block.id}
                  onClick={() => handleAddBlock(block)}
                  onMouseEnter={() => sound.playHover()}
                  className={`p-3 rounded-lg border text-center transition-all hover:-translate-y-0.5 active:translate-y-0 shadow cursor-pointer ${block.color}`}
                >
                  <div className="font-['Outfit',sans-serif] font-bold text-lg">{block.char}</div>
                  <div className="text-[10px] font-mono opacity-80">{block.soundIpa}</div>
                  <div className="text-[9px] uppercase tracking-wider font-mono opacity-60 mt-1">
                    {block.type}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Smelt Result Box */}
          {forgedItem && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-purple-500/10 to-cyan-500/10 border border-amber-400/40 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-amber-400/20 text-amber-300">
                    <Trophy className="w-6 h-6 animate-bounce" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold">
                      {forgedItem.rarity} · Smelted Successfully
                    </div>
                    <div className="font-['Cinzel',serif] text-base font-bold text-white">
                      {forgedItem.itemTitle}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => speech.speak(forgedItem.word, true)}
                  title="Speak word again"
                  className="p-1.5 text-amber-400 hover:text-white bg-white/5 rounded-md transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {forgedItem.lore}
              </p>

              <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-bold">{forgedItem.statBoost}</span>
                <span className="text-slate-400">Phonixia Engine Verified</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Gameplay is the curriculum: phoneme synthesis crafts real in-game combat & travel items.</span>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-slate-300 hover:text-white underline cursor-pointer"
          >
            Close Sandbox
          </button>
        </div>
      </div>
    </div>
  );
};
