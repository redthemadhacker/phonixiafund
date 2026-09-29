import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Layers, 
  BookOpen, 
  Compass, 
  Crown, 
  CheckCircle2, 
  GraduationCap,
  Hammer,
  ArrowRight,
  Shield,
  Volume2,
  Award,
  Scroll,
  BookMarked
} from 'lucide-react';
import { sound } from '../../utils/audio';
import { speech } from '../../utils/speech';
import { RealmData } from '../../types';

const REALMS: RealmData[] = [
  {
    id: 'realm-1',
    number: 1,
    name: 'Sound Shallows',
    ageBracket: 'Ages 3–6',
    gradeEquivalent: 'Pre-K to Kindergarten',
    subtitle: 'Auditory Processing & Phonemic Resonance',
    lore: 'A bioluminescent coastal archipelago where every pebble echoes with fundamental acoustic frequencies. Young navigators sculpt phonetic sandbars and attune crystal chimes to phoneme resonance.',
    mechanics: [
      'Speech resonance crystal attunement',
      'Sandpaper letter voxel sculpting',
      'Phonemic sound isolation & rhyming bays',
      'Alliteration tide pool exploration'
    ],
    sampleQuest: 'Tide of the First Consonants: Align 3 tuning crystals to /m/, /s/, and /t/ to calm the Whispering Surf.',
    curriculumFocus: ['Phonemic Awareness', 'Oral Blending', 'Letter-Sound Formations', 'Auditory Discrimination'],
    biomeTheme: 'Bioluminescent Coral Lagoons & Sandstone Caves',
    color: '#06b6d4',
    runeIcon: '🌊',
  },
  {
    id: 'realm-2',
    number: 2,
    name: 'Builders Guild',
    ageBracket: 'Ages 6–9',
    gradeEquivalent: 'Early Elementary (Grades 1–3)',
    subtitle: 'Orthographic Forging & Syllable Slicing',
    lore: 'A bustling medieval quarry and foundry where raw consonant ores and molten vowel gems are smelted on magical anvils to forge structural tools and armor.',
    mechanics: [
      'Phonics Forge block smelting',
      'CVC mining & closed-syllable masonry',
      'Vowel team gem synthesizers (oa, ea, ai)',
      'Multisyllabic dungeon slicing blades'
    ],
    sampleQuest: 'The Molten Anvil: Smelt /k/ + /æ/ + /t/ to forge the Shadow Panther Mace, then slice compound words to breach the Gate of Frost.',
    curriculumFocus: ['Systematic Synthetic Phonics', 'Orthographic Mapping', 'Digraphs & Blends', 'Syllable Division (Rabbit/Tiger/Camel)'],
    biomeTheme: 'Voxel Stone Quarries & Molten Crystal Forges',
    color: '#10b981',
    runeIcon: '⚒️',
  },
  {
    id: 'realm-3',
    number: 3,
    name: 'Tricky Trails',
    ageBracket: 'Ages 8–11',
    gradeEquivalent: 'Upper Elementary (Grades 3–5)',
    subtitle: 'Irregular Heart-Words & Fluency Minecarts',
    lore: 'A treacherous labyrinth of twisting canyons and runaway railtracks. Rule-breaking words lurk in the mist; players must memorially anchor heart-words into their cognitive satchels to operate high-speed transit carts.',
    mechanics: [
      'Irregular heart-word labyrinth pathfinding',
      'Fluency pacing minecarts (timed decoding loops)',
      'Homophone mirror puzzles (there/their/they\'re)',
      'Rapid automatic naming (RAN) agility gauntlets'
    ],
    sampleQuest: 'The Runaway Heart-Cart: Read and unlock 20 sight-word switches before your minecart enters the Void Chasm.',
    curriculumFocus: ['Sight Recognition by Orthographic Mapping', 'Fluency Pacing (WPM)', 'High-Frequency Irregularities', 'Context Clues'],
    biomeTheme: 'Winding Redwood Canyons & Deep Rail Mines',
    color: '#f59e0b',
    runeIcon: '🛤️',
  },
  {
    id: 'realm-4',
    number: 4,
    name: 'Whispering Peaks',
    ageBracket: 'Ages 11–14',
    gradeEquivalent: 'Middle School (Grades 6–8)',
    subtitle: 'Linguistic Archaeology & Root Extraction',
    lore: 'Ancient cloud-piercing mountain sanctuaries built atop Greco-Roman foundations. Explorers unearth ancient petrified affixes and roots to enchant high-tier flight gear.',
    mechanics: [
      'Greek & Latin root extraction pickaxes (chron, tele, bio)',
      'Prefix & suffix transmutation sockets (un-, dis-, -ology)',
      'Morphological family tree reconstruction',
      'Etymological archaeology dungeons'
    ],
    sampleQuest: 'Excavation of Chronos: Extract the root CHRON- and fuse with SYN- and -IC to synthesize an artifact that slows boss combat time.',
    curriculumFocus: ['Morphology & Etymology', 'Greek & Latin Stems', 'Academic Vocabulary (Tier 2/3)', 'Connotative Analysis'],
    biomeTheme: 'Marble Cloud Temples & Ancient Voxel Obelisks',
    color: '#8b5cf6',
    runeIcon: '🏛️',
  },
  {
    id: 'realm-5',
    number: 5,
    name: 'Lexicon Empire',
    ageBracket: 'Ages 14–18',
    gradeEquivalent: 'High School Endgame (Grades 9–12)',
    subtitle: 'Clausal Architecture & Dialectic Arenas',
    lore: 'The apex imperial capital powered by intricate syntax grids. Citizens engage in real-time rhetorical combat, building clausal fortresses and identifying logical fallacies to govern city-states.',
    mechanics: [
      'Clausal power grid wiring (dependent/independent switches)',
      'Dialectic colosseum rhetoric battles',
      'Logical fallacy disarming mini-games',
      'Formal rhetorical essay fortress synthesis'
    ],
    sampleQuest: 'The Senate Debate: Disarm an opponent\'s Straw Man defense using a subordinate clause counter-shield to win the Golden Seal.',
    curriculumFocus: ['Advanced Syntax & Semantics', 'Rhetorical Analysis (Ethos/Pathos/Logos)', 'Logical Fallacies', 'Collegiate Writing Rigor'],
    biomeTheme: 'High-Tech Obsidian & Gold Imperial Citadels',
    color: '#ec4899',
    runeIcon: '👑',
  },
  // CLICKABLE POST-GRADUATION REALMS
  {
    id: 'realm-postgrad-academy',
    number: 'PG-1',
    name: 'Phonixia Academy',
    ageBracket: 'Collegiate & Adult',
    gradeEquivalent: 'Undergraduate & Pre-Law/Linguistics',
    subtitle: 'Collegiate Linguistics, IPA & Classical Rhetoric',
    isPostGrad: true,
    lore: 'The floating ivory towers above the imperial capital. Here, adult scholars dissect generative syntax trees, transcribe world speech in the International Phonetic Alphabet (IPA), and debate in formal parliamentary colosseums.',
    mechanics: [
      'IPA phonetic transcription soundboard puzzles',
      'Generative grammar syntax tree parsing engines',
      'Historical sound shift simulations (Grimm’s Law & Great Vowel Shift)',
      'Forensic parliamentary debate trials'
    ],
    sampleQuest: 'Acoustic Spectrography: Construct a complete generative syntax tree for a 40-word complex compound sentence to earn the Dean’s Laurel.',
    curriculumFocus: ['Phonetics & Phonology', 'Generative Syntax', 'Diachronic Linguistics', 'Aristotelian Forensic Rhetoric'],
    biomeTheme: 'Floating Marble Spires & Resonant Crystal Amphitheaters',
    color: '#3b82f6',
    runeIcon: '🎓',
    colleges: [
      {
        name: 'College of Linguistics',
        focus: 'Phonology, Syntax Trees, Morphology, and Historical Sound Shifts',
        courses: ['LIN-101: International Phonetic Alphabet', 'LIN-204: Indo-European Roots & Grimm’s Law', 'LIN-350: Generative Syntax & Tree Parsing', 'LIN-490: Acoustic Spectrography of Vowels'],
        deityDean: 'Dean Phonemius ("Vox Humana, Lux Mentis")',
        capstone: 'Constructing an entire reconstructed proto-language with phonemic laws.'
      },
      {
        name: 'College of Rhetoric',
        focus: 'Classical Rhetoric, Parliamentary Debate, Persuasion, Fallacy Deconstruction',
        courses: ['RHT-105: The Aristotelian Triad', 'RHT-220: Forensic Debate & Cross-Examination', 'RHT-340: Political Discourse & Propaganda Analysis', 'RHT-480: The Art of the Keynote Orator'],
        deityDean: 'Chancellor Demosthenes ("Veritas per Eloquentiam")',
        capstone: 'Live Parliamentary Oratorical Defense before the Senate of Lexicon Empire.'
      },
      {
        name: 'College of Storycraft',
        focus: 'Creative Writing, Narrative Architecture, Hero’s Journey, Character Psychology',
        courses: ['STR-102: Archetypes of the Underworld', 'STR-215: Prose Cadence & Sensory Texture', 'STR-330: Nonlinear Storytelling & Tension Arcs', 'STR-495: Epic Worldbuilding Workshop'],
        deityDean: 'Arch-Narrator Celine ("Fabulam Tessere Mundum Creare")',
        capstone: 'A full-length published manuscript exploring the mythos of the Golden Phonix.'
      }
    ]
  },
  {
    id: 'realm-postgrad-masters',
    number: 'PG-2',
    name: "Master's Pathways",
    ageBracket: 'Graduate & Professional',
    gradeEquivalent: "Master's Degree Specializations",
    subtitle: 'Clinical Pedagogy, Investigative Writing & Neuro-Research',
    isPostGrad: true,
    lore: 'The deep inner chambers where practitioners conduct clinical reading trials, draft high-stakes legal briefs, and mentor apprentice scribes in structured literacy.',
    mechanics: [
      'Clinical UDL reading intervention simulator',
      'Neuroimaging fMRI reading brain mapping puzzles',
      'Investigative journalism source forensics',
      'Endangered language phoneme preservation archives'
    ],
    sampleQuest: 'Clinical Intervention Practicum: Diagnose and resolve severe phonological dyslexia in 10 virtual apprentices using multisensory touch cues.',
    curriculumFocus: ['Structured Literacy Pedagogy', 'Universal Design for Learning (UDL)', 'Psycholinguistics RCTs', 'Diachronic Phonology'],
    biomeTheme: 'Subterranean Scribe Vaults & Illuminated Scriptoria',
    color: '#8b5cf6',
    runeIcon: '📜',
    masterPathways: [
      {
        title: 'Master Educator',
        thesis: 'Optimizing Multisensory Feedback in Early Alphabetic Orthographic Mapping',
        loreTitle: 'Illuminator of Minds (200 clinical intervention hours)'
      },
      {
        title: 'Master Researcher',
        thesis: 'Longitudinal Impact of Systematic Synthetic Phonics vs Balanced Literacy',
        loreTitle: 'Keeper of Empirical Truth (Multi-district RCT meta-study)'
      },
      {
        title: 'Master Author',
        thesis: 'Resonance of Archetypal Heroes in Children’s Decodable Literature',
        loreTitle: 'Weaver of Realities (Multi-volume literary saga publication)'
      },
      {
        title: 'Master Linguist',
        thesis: 'Phonological Drift and the Great Vowel Shift’s Impact on Modern English Orthography',
        loreTitle: 'Custodian of Tongues (Preservation of endangered dialects)'
      }
    ]
  },
  {
    id: 'realm-postgrad-archives',
    number: 'PG-3',
    name: 'The Celestial Archives',
    ageBracket: 'Doctoral Scholar (PhD)',
    gradeEquivalent: 'Doctor of Language & Master of Phonixia',
    subtitle: 'Doctoral Language Synthesis & Supreme Mastery',
    isPostGrad: true,
    lore: 'The cosmic apex of the universe, bathed in starlight. Only those who defend a peer-reviewed doctoral dissertation and demonstrate complete synthesis of the human linguistic faculty are granted entry and crowned Master of Phonixia.',
    mechanics: [
      'Dissertation defense before the Celestial Council',
      'Neurobiological visual word form area (VWFA) synaptic mapping',
      'AI & human linguistic symbiosis paradigm design',
      'Universal infant-to-adult language acquisition theorem construction'
    ],
    sampleQuest: 'Doctoral Defense: Defend your unified neurobiological thesis against 12 grand linguistic inquisitors to earn the Supreme Title: Master of Phonixia.',
    curriculumFocus: ['Stanislas Dehaene’s Neuronal Recycling', 'Scarborough’s Reading Rope Synthesis', 'Universal Grammar', 'Generative AI Linguistics'],
    biomeTheme: 'Starry Nebulae & Floating Celestial Monoliths',
    color: '#f59e0b',
    runeIcon: '🌌',
    doctoralArchiveTopics: [
      {
        title: 'Cognitive Science of Reading & The Reading Brain',
        subfields: ['Scarborough’s Reading Rope', 'Stanislas Dehaene’s Neuronal Recycling', 'The Four-Part Processing Model'],
        researchExpedition: 'Expedition to the Synaptic Labyrinth: Tracking how the visual word form area (VWFA) maps letters to sounds in milliseconds.',
        masterySeal: 'Seal of the Cognitive Luminary'
      },
      {
        title: 'Universal Language Acquisition & Neurolinguistics',
        subfields: ['Chomskyan Universal Grammar', 'Statistical Learning in Infancy', 'Critical Period Plasticity'],
        researchExpedition: 'Expedition to the Cradle of Tongues: Analyzing how 12-month-old human infants filter acoustic phonemes into native categories.',
        masterySeal: 'Seal of the Primordial Voice'
      },
      {
        title: 'Artificial Intelligence, LLMs & Human Literacy Symbiosis',
        subfields: ['Transformer Attention Mechanisms', 'Semantic Embedding Spaces', 'Human vs Machine Reading'],
        researchExpedition: 'Expedition to the Neural Horizon: Designing human empowerment paradigms in the era of generative AI models.',
        masterySeal: 'Seal of the Digital Oracle'
      }
    ]
  }
];

export const Slide3ContinentsLiteracy: React.FC = () => {
  const [selectedRealmId, setSelectedRealmId] = useState<string>('realm-1');
  const selectedRealm = REALMS.find((r) => r.id === selectedRealmId) || REALMS[0];

  return (
    <div className="relative min-h-[calc(100vh-8rem)] flex flex-col justify-center max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
          <span>SECTOR 03</span>
          <span aria-hidden="true">·</span>
          <span>CORE LITERACY UNIVERSE</span>
          <span aria-hidden="true">·</span>
          <span>5 SYSTEMATIC REALMS + 3 POST-GRADUATION REALMS</span>
        </div>
        <h2 className="font-['Cinzel',serif] text-2xl sm:text-4xl font-black text-white tracking-tight">
          The 5 Core Realms & Post-Graduation Archives
        </h2>
        <p className="text-sm text-slate-300 max-w-3xl mt-1">
          I mapped the entire Science of Reading—from early phonemic awareness (age 3) through collegiate rhetoric and doctoral language synthesis (adulthood)—directly into open-world, physics-driven voxel realms. Click any realm below to inspect its full curriculum and degree pathways.
        </p>
      </div>

      {/* Main 2-Zone Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Realm Selector List (Including Post-Grad) */}
        <div className="lg:col-span-5 space-y-2">
          <div className="text-xs font-mono uppercase text-slate-400 mb-1 flex items-center justify-between">
            <span>Select Any Realm (Ages 3–Adult)</span>
            <span className="text-emerald-400 font-bold">8 Master Sectors</span>
          </div>

          <div className="space-y-1.5 max-h-[520px] overflow-y-auto pr-1">
            {REALMS.map((realm) => {
              const isSelected = realm.id === selectedRealmId;
              return (
                <button
                  key={realm.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedRealmId(realm.id);
                    speech.speak(realm.name);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? realm.isPostGrad
                        ? 'bg-purple-950/40 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                        : 'bg-[#102324] border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                      : 'bg-[#0d1424]/80 hover:bg-[#131d33] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl p-1.5 rounded-lg bg-black/40 border border-white/5">
                      {realm.runeIcon}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
                          realm.isPostGrad ? 'text-purple-400' : 'text-emerald-400'
                        }`}>
                          {realm.isPostGrad ? `Post-Grad ${realm.number}` : `Realm ${realm.number}`}
                        </span>
                        <span className="text-slate-500 text-[10px]">·</span>
                        <span className="text-[11px] text-slate-300 font-medium">
                          {realm.ageBracket}
                        </span>
                      </div>
                      <div className="font-['Outfit',sans-serif] text-sm font-bold text-white">
                        {realm.name}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 block max-w-[110px] truncate">
                      {realm.gradeEquivalent.split('(')[0]}
                    </span>
                    {isSelected && (
                      <span className={`text-[10px] font-mono font-bold ${
                        realm.isPostGrad ? 'text-purple-300' : 'text-emerald-400'
                      }`}>
                        ● Viewing
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Realm Curriculum Inspector */}
        <div className="lg:col-span-7 bg-[#0b1220] border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
          {/* Top Banner */}
          <div className="flex items-start justify-between pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 rounded-xl bg-black/40 border border-white/10">
                  {selectedRealm.runeIcon}
                </span>
                <div>
                  <h3 className="font-['Cinzel',serif] text-xl font-bold text-white flex items-center gap-2">
                    <span>
                      {selectedRealm.isPostGrad
                        ? `${selectedRealm.name}`
                        : `Realm ${selectedRealm.number}: ${selectedRealm.name}`}
                    </span>
                    {selectedRealm.isPostGrad && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        POST-GRADUATE
                      </span>
                    )}
                  </h3>
                  <div className={`text-xs font-mono ${
                    selectedRealm.isPostGrad ? 'text-purple-400 font-semibold' : 'text-emerald-400'
                  }`}>
                    {selectedRealm.subtitle}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => speech.speak(`${selectedRealm.name}. ${selectedRealm.lore}`, true)}
              title="Read realm lore"
              className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Lore description */}
          <p className="text-xs text-slate-300 mt-4 leading-relaxed bg-black/20 p-3.5 rounded-xl border border-white/5 font-['Plus_Jakarta_Sans',sans-serif]">
            {selectedRealm.lore}
          </p>

          {/* IF STANDARD REALM: Show in-game mechanics and curriculum */}
          {!selectedRealm.isPostGrad && (
            <>
              {/* Key Game Mechanics */}
              <div className="mt-5 space-y-2">
                <div className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
                  <Hammer className="w-3.5 h-3.5 text-emerald-400" />
                  <span>In-Game Sandbox Mechanics</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedRealm.mechanics.map((mech, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-2.5 rounded-lg bg-[#0e1728] border border-white/5 text-xs text-slate-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{mech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum Focus & Sample Quest */}
              <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] font-mono uppercase text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Pedagogical Core</span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {selectedRealm.curriculumFocus.map((focus, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-cyan-400" />
                        <span>{focus}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-[11px] font-mono uppercase text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Sample Main Quest</span>
                  </div>
                  <p className="text-xs text-slate-300 bg-black/40 p-2.5 rounded-lg border border-amber-500/20 italic">
                    "{selectedRealm.sampleQuest}"
                  </p>
                </div>
              </div>
            </>
          )}

          {/* IF POST-GRAD REALM 6: Phonixia Academy Colleges */}
          {selectedRealm.id === 'realm-postgrad-academy' && selectedRealm.colleges && (
            <div className="mt-4 space-y-3">
              <div className="text-xs font-mono uppercase text-purple-300 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-purple-400" />
                <span>Collegiate Divisions & Degree Tracks</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {selectedRealm.colleges.map((col, i) => (
                  <div key={i} className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-1.5">
                    <div className="font-['Outfit',sans-serif] text-xs font-bold text-white">{col.name}</div>
                    <div className="text-[10px] font-mono text-purple-300 italic">{col.deityDean}</div>
                    <div className="text-[10px] text-slate-400">{col.focus}</div>
                    <div className="pt-1 border-t border-white/5 text-[9px] font-mono text-amber-300">
                      Capstone: {col.capstone}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* IF POST-GRAD REALM 7: Master's Pathways */}
          {selectedRealm.id === 'realm-postgrad-masters' && selectedRealm.masterPathways && (
            <div className="mt-4 space-y-3">
              <div className="text-xs font-mono uppercase text-purple-300 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-purple-400" />
                <span>Master's Degree Practicum Pathways</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedRealm.masterPathways.map((mp, i) => (
                  <div key={i} className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-1">
                    <div className="font-bold text-xs text-white">{mp.title}</div>
                    <div className="text-[10px] font-mono text-purple-300">{mp.loreTitle}</div>
                    <div className="text-[11px] text-slate-300 italic">Thesis: "{mp.thesis}"</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* IF POST-GRAD REALM 8: Celestial Archives (Doctoral) */}
          {selectedRealm.id === 'realm-postgrad-archives' && selectedRealm.doctoralArchiveTopics && (
            <div className="mt-4 space-y-3">
              <div className="text-xs font-mono uppercase text-amber-400 flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-400" />
                <span>Doctoral Archive Dissertations & Supreme Title</span>
              </div>
              <div className="space-y-2">
                {selectedRealm.doctoralArchiveTopics.map((doc, i) => (
                  <div key={i} className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">{doc.title}</span>
                      <span className="text-[10px] font-mono text-amber-300 font-bold">{doc.masterySeal}</span>
                    </div>
                    <div className="text-[10px] text-slate-400">{doc.researchExpedition}</div>
                  </div>
                ))}
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-400/40 text-center">
                <span className="text-xs font-['Cinzel',serif] font-black text-amber-300 tracking-wider">
                  DEFENSE COMPLETION CONFERS THE SUPREME TITLE: MASTER OF PHONIXIA
                </span>
              </div>
            </div>
          )}

          {/* Biome Theme footer */}
          <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Biome: <strong className="text-slate-200">{selectedRealm.biomeTheme}</strong></span>
            <span className={selectedRealm.isPostGrad ? 'text-purple-400 font-bold' : 'text-emerald-400'}>
              {selectedRealm.gradeEquivalent}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
