import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  ExternalLink, 
  Compass, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  ChevronRight,
  Volume2,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { sound } from '../../utils/audio';
import { speech } from '../../utils/speech';
import { ExpansionDLC } from '../../types';

const DLC_REALMS: ExpansionDLC[] = [
  {
    id: 'dlc-math',
    title: 'Number Nook & The Algoriddles™',
    subject: 'Mathematics & Spatial Computation',
    ageRange: 'Ages 3 to Adulthood',
    icon: '🔢',
    color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30',
    accentHex: '#f59e0b',
    tagline: 'From tactile counting quarries (age 3) to non-Euclidean topology and cryptography (adult).',
    pedagogyManifesto: 'Government math curricula drill mindless memorization without spatial intuition. I built Number Nook to repeat the Phonixia progression: players physically touch base-10 quantities before advancing to algebraic gear assemblies and higher calculus.',
    keyMechanics: [
      'Tactile base-10 block architectural stacking (Ages 3–6)',
      'Fraction smelting & ratio potion alchemy (Ages 6–10)',
      'Cartesian coordinate warp-gates & polynomial trajectory cannons (Ages 11–14)',
      'Multivariable calculus contour sculpting & RSA cryptography (Ages 15–Adult)'
    ],
    progressionTiers: [
      { tierName: 'Realm 1: Quantity Quarry', ageRange: 'Ages 3–6 (Pre-K/K)', curriculumFocus: 'Subitizing, 1-to-1 correspondence, base-10 voxel stacking', inGameMechanic: 'Pebble balance scales & number-line leaps' },
      { tierName: 'Realm 2: Arithmetic Foundry', ageRange: 'Ages 6–9 (Elem)', curriculumFocus: 'Multiplication arrays, division sharing, place-value smelting', inGameMechanic: 'Voxel block splitters & multiplier anvils' },
      { tierName: 'Realm 3: Rational Labyrinth', ageRange: 'Ages 8–11 (Upper Elem)', curriculumFocus: 'Fractions, decimals, percentages, geometric area', inGameMechanic: 'Fraction pie minecart switches' },
      { tierName: 'Realm 4: Algebraic Spire', ageRange: 'Ages 11–14 (Middle)', curriculumFocus: 'Linear equations, slope, negative vectors, polynomials', inGameMechanic: 'Variable balancing beam puzzles' },
      { tierName: 'Realm 5: Calculus Citadel', ageRange: 'Ages 14–18 (High School)', curriculumFocus: 'Derivatives, integrals, trigonometric contours, matrix algebra', inGameMechanic: 'Terrain slope rate-of-change flight glider' },
    ],
    postGradCapstone: 'Doctoral Topology & Cryptographic Quantum Proofs leading to the title: Master of Algorithms.',
    realWorldSkill: 'Mathematical Intuition, Cryptography, Algorithmic Engineering',
    loreDescription: 'A colossal clockwork world where mathematical harmony keeps floating fractal islands from collapsing. One arithmetic miscalculation shifts the gravitational axis of the entire realm.'
  },
  {
    id: 'dlc-geometry',
    title: 'Geometria & The Infinite Spire™',
    subject: 'Geometry, Spatial Topology & Physics',
    ageRange: 'Ages 3 to Adulthood',
    icon: '📐',
    color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30',
    accentHex: '#3b82f6',
    tagline: 'From 2D shape tactile puzzles to Riemannian geometry, relativistic space-time, and architectural CAD.',
    pedagogyManifesto: 'Institutional geometry is reduced to flat paper proofs. Geometria transforms geometry into an open-world spatial physics engine where learners construct to-scale structural bridges and navigate curved dimensions.',
    keyMechanics: [
      'Tangram & tactile polygon lockboxes (Ages 3–6)',
      'Angle vectoring & perimeter quarry surveying (Ages 6–10)',
      'Euclidean proof fortress blueprints & Pythagorean catapults (Ages 11–14)',
      'Non-Euclidean hyperbolic towers & 4D hypercube spatial puzzles (Ages 15–Adult)'
    ],
    progressionTiers: [
      { tierName: 'Realm 1: Shape Shallows', ageRange: 'Ages 3–6 (Pre-K/K)', curriculumFocus: 'Basic 2D/3D shapes, symmetry, spatial rotation', inGameMechanic: 'Polygon keyholes & mirror reflection pools' },
      { tierName: 'Realm 2: Builder Surveyor', ageRange: 'Ages 6–9 (Elem)', curriculumFocus: 'Perimeter, area, angles (acute/obtuse/right), tessellations', inGameMechanic: 'Surveyor measuring tape rail tools' },
      { tierName: 'Realm 3: Pythagorean Bastion', ageRange: 'Ages 8–11 (Upper Elem)', curriculumFocus: 'Triangles, coordinate geometry, volume calculations', inGameMechanic: 'Catapult angle alignment targeting' },
      { tierName: 'Realm 4: Proof Colosseum', ageRange: 'Ages 11–14 (Middle)', curriculumFocus: 'Formal geometric theorems, congruent transformations, circles', inGameMechanic: 'Deductive theorem bridge assembly' },
      { tierName: 'Realm 5: Dimensional Spire', ageRange: 'Ages 14–18 (High School)', curriculumFocus: 'Trigonometry, vectors, non-Euclidean manifolds', inGameMechanic: 'Hyperbolic space warp chambers' },
    ],
    postGradCapstone: 'Master Architectural Licensure & Relativistic Tensor Synthesis.',
    realWorldSkill: 'Structural Engineering, 3D Spatial Modeling, Architecture',
    loreDescription: 'An impossibly towering obelisk operating on non-Euclidean principles, requiring topological folds and trigonometric alignments to reach the celestial observatory.'
  },
  {
    id: 'dlc-chemistry',
    title: 'Curio Cosmos & Spark Spire™',
    subject: 'Chemistry & Classical Physics',
    ageRange: 'Ages 3 to Adulthood',
    icon: '🧪',
    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30',
    accentHex: '#10b981',
    tagline: 'From states of matter sandbox play to subatomic particle synthesis, thermodynamics, and quantum mechanics.',
    pedagogyManifesto: 'Memorizing the periodic table off a chart is an educational crime. In Curio Cosmos, players physically combine proton, neutron, and electron blocks to stabilize isotopes and power electromagnetic reactors.',
    keyMechanics: [
      'Solids, liquids, and gas state transformation vents (Ages 3–6)',
      'Density towers, buoyancy boats, and simple kinetic ramps (Ages 6–10)',
      'Periodic table element isotope fusion & molecular bonding (Ages 11–14)',
      'Thermodynamic heat engines & quantum electron orbital gates (Ages 15–Adult)'
    ],
    progressionTiers: [
      { tierName: 'Realm 1: Matter Meadows', ageRange: 'Ages 3–6 (Pre-K/K)', curriculumFocus: 'States of matter (solid/liquid/gas), melting, freezing, sinking/floating', inGameMechanic: 'Temperature slider vents & buoyancy docks' },
      { tierName: 'Realm 2: Kinetic Quarry', ageRange: 'Ages 6–9 (Elem)', curriculumFocus: 'Gravity, friction, simple machines (pulleys/levers/ramps)', inGameMechanic: 'Voxel roller-coaster momentum tracks' },
      { tierName: 'Realm 3: Molecular Foundry', ageRange: 'Ages 8–11 (Upper Elem)', curriculumFocus: 'Atoms, molecules (H2O/CO2), mixtures vs solutions, magnetism', inGameMechanic: 'Molecular magnet bonding anvils' },
      { tierName: 'Realm 4: Element Bastion', ageRange: 'Ages 11–14 (Middle)', curriculumFocus: 'Periodic table groups, ionic/covalent bonds, chemical reactions', inGameMechanic: 'Subatomic particle collider forge' },
      { tierName: 'Realm 5: Quantum Spire', ageRange: 'Ages 14–18 (High School)', curriculumFocus: 'Thermodynamics, stoichiometry, quantum orbitals, half-life', inGameMechanic: 'Electromagnetic plasma containment chamber' },
    ],
    postGradCapstone: 'Doctoral Materials Synthesis & Clean Nuclear Fusion Reactor Design.',
    realWorldSkill: 'Chemical Engineering, Thermodynamics, Materials Science',
    loreDescription: 'Alchemical laboratories floating among glowing nebulae where players combine pure subatomic matter to forge materials capable of withstanding planetary atmospheric re-entry.'
  },
  {
    id: 'dlc-biology',
    title: 'BioBloom Wilds™',
    subject: 'Biology, Genetics & Ecology',
    ageRange: 'Ages 3 to Adulthood',
    icon: '🌿',
    color: 'from-green-500/20 to-emerald-500/10 border-green-500/30',
    accentHex: '#22c55e',
    tagline: 'From animal habitats and plant life cycles to CRISPR gene editing, pathogen defense, and biome ecology.',
    pedagogyManifesto: 'BioBloom Wilds transforms biological science into a living, breathing ecosystem simulation where genetic traits are bred, cellular pathogens are fought, and food webs are balanced in real time.',
    keyMechanics: [
      'Creature classification & sensory tracking (Ages 3–6)',
      'Seed germination & trophic food-chain balance (Ages 6–10)',
      'Punnett-square Mendelian genetics & cellular organelles (Ages 11–14)',
      'CRISPR gene editing, synthetic biology & epidemiology (Ages 15–Adult)'
    ],
    progressionTiers: [
      { tierName: 'Realm 1: Critter Cove', ageRange: 'Ages 3–6 (Pre-K/K)', curriculumFocus: 'Animal traits, plant life cycles, basic senses and habitats', inGameMechanic: 'Creature camouflage tracker' },
      { tierName: 'Realm 2: Web of Life', ageRange: 'Ages 6–9 (Elem)', curriculumFocus: 'Herbivore/carnivore/omnivore, food chains, photosynthesis', inGameMechanic: 'Photosynthesis solar energy harvester' },
      { tierName: 'Realm 3: Cellular Citadel', ageRange: 'Ages 8–11 (Upper Elem)', curriculumFocus: 'Plant vs animal cells, organs, circulatory/skeletal systems', inGameMechanic: 'Mitochondria energy distribution grid' },
      { tierName: 'Realm 4: Gene Forge', ageRange: 'Ages 11–14 (Middle)', curriculumFocus: 'DNA double-helix, mitosis/meiosis, Punnett square inheritance', inGameMechanic: 'Allele selective breeding incubator' },
      { tierName: 'Realm 5: Biosphere Nexus', ageRange: 'Ages 14–18 (High School)', curriculumFocus: 'Evolutionary adaptation, synthetic biology, pathogen immunology', inGameMechanic: 'Antibody pathogen defense gauntlet' },
    ],
    postGradCapstone: 'Doctoral Genomics & Planetary Biosphere Engineering.',
    realWorldSkill: 'Genetics, Immunobiology, Ecological Management',
    loreDescription: 'A primordial continent of ancient alien flora and fauna, where altering a single apex predator shifts the real-time procedural vegetation of the entire world.'
  },
  {
    id: 'dlc-history',
    title: 'Chronos Clockwork™',
    subject: 'Global & Lost History',
    ageRange: 'Ages 3 to Adulthood',
    icon: '⏳',
    color: 'from-yellow-500/20 to-amber-500/10 border-yellow-500/30',
    accentHex: '#eab308',
    tagline: 'From day/night timelines to primary source archaeological forensics and to-scale historical reconstructions.',
    pedagogyManifesto: 'History classes force kids to memorize arbitrary dates for state tests. Chronos Clockwork drops students directly into ancient streets, interviewing historical figures and reconstructing civilizational architecture to scale.',
    keyMechanics: [
      'Past, present, and future timeline sorting (Ages 3–6)',
      'Ancient tool craft & world civilization maps (Ages 6–10)',
      'Primary source forensics & artifact translation (Ages 11–14)',
      'Geopolitical treaty simulations & historiographical analysis (Ages 15–Adult)'
    ],
    progressionTiers: [
      { tierName: 'Realm 1: Timekeeper Cradle', ageRange: 'Ages 3–6 (Pre-K/K)', curriculumFocus: 'Before/after, yesterday/today, generational families, ancient storytelling', inGameMechanic: 'Sundial shadow matching & heirloom sorting' },
      { tierName: 'Realm 2: Ancient Builder', ageRange: 'Ages 6–9 (Elem)', curriculumFocus: 'Early human tools, Nile valley agriculture, Mayan calendars, Silk Road', inGameMechanic: 'Papyrus making & irrigation ditch digging' },
      { tierName: 'Realm 3: Chronicle Archives', ageRange: 'Ages 8–11 (Upper Elem)', curriculumFocus: 'Greece, Rome, Medieval castles, Mesoamerican empires', inGameMechanic: 'Castle fortification architectural defense' },
      { tierName: 'Realm 4: Age of Revolutions', ageRange: 'Ages 11–14 (Middle)', curriculumFocus: 'Scientific revolution, industrialization, world wars, civil rights', inGameMechanic: 'Primary source printing press investigator' },
      { tierName: 'Realm 5: Historiography Apex', ageRange: 'Ages 14–18 (High School)', curriculumFocus: 'Comparative world history, diplomatic treaties, economic hegemony', inGameMechanic: 'Peace treaty negotiation chamber' },
    ],
    postGradCapstone: 'Doctoral Historiography & Primary Source Archival Restoration.',
    realWorldSkill: 'Historical Analysis, Forensic Verification, Cultural Diplomacy',
    loreDescription: 'A multi-dimensional chronosphere allowing students to walk the dusty avenues of ancient Alexandria and unearth the lost manuscripts of human civilization.'
  },
  {
    id: 'dlc-civics',
    title: 'Civic Citadel & Agora Plains™',
    subject: 'Philosophy, Civics & Economics',
    ageRange: 'Ages 3 to Adulthood',
    icon: '🏛️',
    color: 'from-rose-500/20 to-pink-500/10 border-rose-500/30',
    accentHex: '#f43f5e',
    tagline: 'From fairness and trade rules to player-run constitutional republics, macroeconomics, and moral philosophy.',
    pedagogyManifesto: 'Our youth are never taught how money works or how laws are drafted. In Civic Citadel, players form their own municipal towns, balance budgets against real supply and demand, and resolve ethical dilemmas.',
    keyMechanics: [
      'Sharing, turns, and fair trade pebble commerce (Ages 3–6)',
      'Community roles (firefighter, baker, mason) and civic duty (Ages 6–10)',
      'Constitutional voting charters & supply/demand market stalls (Ages 11–14)',
      'Macroeconomic monetary policy, taxation trials & moral philosophy (Ages 15–Adult)'
    ],
    progressionTiers: [
      { tierName: 'Realm 1: Sharing Shore', ageRange: 'Ages 3–6 (Pre-K/K)', curriculumFocus: 'Fairness, turn-taking, community helpers, simple barter', inGameMechanic: 'Toy & fruit trading stalls' },
      { tierName: 'Realm 2: Town Builder', ageRange: 'Ages 6–9 (Elem)', curriculumFocus: 'Goods vs services, currency, community rules, public safety', inGameMechanic: 'Town zoning & public park design' },
      { tierName: 'Realm 3: Market Bazaar', ageRange: 'Ages 8–11 (Upper Elem)', curriculumFocus: 'Supply and demand, profit/loss, banking, 3 branches of government', inGameMechanic: 'Commodity exchange trading desk' },
      { tierName: 'Realm 4: Senate Assembly', ageRange: 'Ages 11–14 (Middle)', curriculumFocus: 'Bill of Rights, court jury trials, local taxation, municipal charters', inGameMechanic: 'Supreme Court trial deliberation chamber' },
      { tierName: 'Realm 5: Leviathan Citadel', ageRange: 'Ages 14–18 (High School)', curriculumFocus: 'Macroeconomics, inflation/deflation, ethical philosophy (Utilitarianism/Kant)', inGameMechanic: 'Central bank interest rate simulator' },
    ],
    postGradCapstone: 'Doctoral Jurisprudence & Constitutional Design Fellowship.',
    realWorldSkill: 'Financial Literacy, Civic Leadership, Moral Philosophy',
    loreDescription: 'A dynamic, player-run city-state where laws are authored by players, dynamic currencies fluctuate with supply and demand, and ethical dilemmas challenge the governance of the realm.'
  },
  {
    id: 'dlc-cyber',
    title: 'CyberMatrix Bastion™',
    subject: 'Coding, Machine Learning & Cybersecurity',
    ageRange: 'Ages 3 to Adulthood',
    icon: '💻',
    color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30',
    accentHex: '#06b6d4',
    tagline: 'From sequential directional commands to full-stack TypeScript, neural-net training, and Zero-Trust firewalls.',
    pedagogyManifesto: 'Kids shouldn’t just consume digital content—they must own the machine. CyberMatrix teaches kids to program inside the voxel world: coding terminal bots, training neural networks, and building cryptographic defenses.',
    keyMechanics: [
      'Visual turtle directional arrow logic (Ages 3–6)',
      'Block-based loops, conditionals, and event listeners (Ages 6–10)',
      'Real Python & TypeScript terminal scripting for automated bots (Ages 11–14)',
      'Neural network gradient descent training & Zero-Trust network defense (Ages 15–Adult)'
    ],
    progressionTiers: [
      { tierName: 'Realm 1: Byte Bay', ageRange: 'Ages 3–6 (Pre-K/K)', curriculumFocus: 'Algorithmic sequences (step-by-step), bug fixing, pattern matching', inGameMechanic: 'Robot turtle tile programmer' },
      { tierName: 'Realm 2: Logic Foundry', ageRange: 'Ages 6–9 (Elem)', curriculumFocus: 'Loops (for/while), if-then conditions, variables, event listeners', inGameMechanic: 'Automated minecart sorting gates' },
      { tierName: 'Realm 3: Script Sanctum', ageRange: 'Ages 8–11 (Upper Elem)', curriculumFocus: 'Functions, arrays, parameters, basic Python syntax', inGameMechanic: 'Drone companion programming terminal' },
      { tierName: 'Realm 4: Terminal Bastion', ageRange: 'Ages 11–14 (Middle)', curriculumFocus: 'Data structures, APIs, algorithms (binary search/sorting), Git logic', inGameMechanic: 'Linux bash terminal hacking console' },
      { tierName: 'Realm 5: Neural Apex', ageRange: 'Ages 14–18 (High School)', curriculumFocus: 'Neural networks, computer vision, packet sniffing, Zero-Trust firewalls', inGameMechanic: 'Deep learning weight tuning simulator' },
    ],
    postGradCapstone: 'Doctoral AI Systems Architecture & Autonomous Cryptographic Protocol Design.',
    realWorldSkill: 'Software Engineering, Cybersecurity, AI / Machine Learning',
    loreDescription: 'A dark cyber-fantasy realm built out of raw glowing databuses, where cyber-mobs can only be defeated by writing automated algorithms and deploying hardened encryption keys.'
  },
  {
    id: 'dlc-asl',
    title: 'Hands In Motion™',
    subject: 'American Sign Language (ASL) & Visual Linguistics',
    ageRange: 'Ages 3 to Adulthood',
    icon: '🤟',
    color: 'from-purple-500/20 to-violet-500/10 border-purple-500/30',
    accentHex: '#a855f7',
    tagline: 'From handshape shapes and fingerspelling to spatial visual syntax, classifiers, and Deaf cultural literature.',
    pedagogyManifesto: 'ASL is a rich, 3-dimensional spatial language. Hands In Motion brings sign language into 3D voxel space, allowing learners to manipulate handshapes, understand facial grammar, and appreciate Deaf culture.',
    keyMechanics: [
      'Basic handshape animal & color mimicry (Ages 3–6)',
      'Fingerspelling obstacle courses & everyday sign mastery (Ages 6–10)',
      'Spatial 3D classifiers & directional verb conjugation (Ages 11–14)',
      'ASL poetry translation, historical archives & fluent conversational discourse (Ages 15–Adult)'
    ],
    progressionTiers: [
      { tierName: 'Realm 1: Handshape Cove', ageRange: 'Ages 3–6 (Pre-K/K)', curriculumFocus: 'Manual alphabet letters A-Z, numbers 1-10, family/food signs', inGameMechanic: 'Handshape mirror mimicry camera puzzle' },
      { tierName: 'Realm 2: Scribe Plaza', ageRange: 'Ages 6–9 (Elem)', curriculumFocus: 'Fingerspelling speed, basic conversational etiquette, emotion signs', inGameMechanic: 'Speed fingerspelling sprint gate' },
      { tierName: 'Realm 3: Visual Valley', ageRange: 'Ages 8–11 (Upper Elem)', curriculumFocus: 'Spatial grammar, non-manual signals (eyebrows/head tilt), indexing', inGameMechanic: '3D spatial classifier object placement' },
      { tierName: 'Realm 4: Discourse Arena', ageRange: 'Ages 11–14 (Middle)', curriculumFocus: 'Directional verbs, time indicators on spatial timeline, Deaf culture history', inGameMechanic: 'Conversational dialogue trial' },
      { tierName: 'Realm 5: Poetic Heights', ageRange: 'Ages 14–18 (High School)', curriculumFocus: 'ASL literature, visual poetry, high-speed legal & medical interpreting', inGameMechanic: 'ASL poetic rhythm translation' },
    ],
    postGradCapstone: 'Master Interpreter Certification & Deaf Cultural Linguistics Archiving.',
    realWorldSkill: 'ASL Fluency, Visual-Spatial Linguistics, Cultural Competence',
    loreDescription: 'A peaceful archipelago where physical acoustic sound does not exist; ancient stone ruins respond solely to the beauty of 3D spatial hand configurations and facial grammar.'
  },
  {
    id: 'dlc-arts',
    title: 'Atelier Arcana & SoundForge™',
    subject: 'Visual & Performing Arts, Acoustics & Design',
    ageRange: 'Ages 3 to Adulthood',
    icon: '🎨',
    color: 'from-fuchsia-500/20 to-rose-500/10 border-fuchsia-500/30',
    accentHex: '#d946ef',
    tagline: 'From finger-painting color mixing to polyphonic synthesis, acoustic engineering, and 3D master sculpting.',
    pedagogyManifesto: 'Public schools gut the arts first whenever budgets get tight. In Atelier Arcana, artistic and musical creation are foundational disciplines, giving learners tools to sculpt 3D worlds, blend pigments, and synthesize symphonies.',
    keyMechanics: [
      'Primary color pigment blending & rhythmic drum tapping (Ages 3–6)',
      'Perspective drawing, instrument families & melody crafting (Ages 6–10)',
      'Color harmony, polyphonic synthesizer step-sequencers (Ages 11–14)',
      'Acoustic physics, master voxel chisel sculpting & orchestrations (Ages 15–Adult)'
    ],
    progressionTiers: [
      { tierName: 'Realm 1: Color Cove', ageRange: 'Ages 3–6 (Pre-K/K)', curriculumFocus: 'Primary/secondary colors, shapes, rhythm, tempo (fast/slow)', inGameMechanic: 'Water puddle color mixing & tempo jump pads' },
      { tierName: 'Realm 2: Melody Forge', ageRange: 'Ages 6–9 (Elem)', curriculumFocus: 'Warm vs cool tones, 1-point perspective, instrument families, musical pitch', inGameMechanic: 'Pitch chime bridge assembly' },
      { tierName: 'Realm 3: Harmonic Studio', ageRange: 'Ages 8–11 (Upper Elem)', curriculumFocus: 'Color wheel complementary hues, chords, sheet music reading, sculpture', inGameMechanic: 'Step-sequencer minecart loop' },
      { tierName: 'Realm 4: Symphony Bastion', ageRange: 'Ages 11–14 (Middle)', curriculumFocus: 'Polyphonic harmony, acoustic resonance, 3D form sculpting, art movements', inGameMechanic: 'Polyphonic synthesizer anvil' },
      { tierName: 'Realm 5: Master Atelier', ageRange: 'Ages 14–18 (High School)', curriculumFocus: 'Master painting techniques, sound design, orchestral scoring, lighting theory', inGameMechanic: 'Full voxel museum exhibition curator' },
    ],
    postGradCapstone: 'Doctoral Conservatory Exhibition & Master Symphonic Composition.',
    realWorldSkill: 'Graphic Design, Musical Composition, 3D Modeling, Acoustics',
    loreDescription: 'An infinite creative sanctuary where musical frequencies physically sculpt voxel terrain and colored pigments alter the light reflection of entire biomes.'
  },
];

interface Slide4MultiverseExpansionsProps {
  onNextSlide?: () => void;
}

export const Slide4MultiverseExpansions: React.FC<Slide4MultiverseExpansionsProps> = ({ onNextSlide }) => {
  const [selectedDlcId, setSelectedDlcId] = useState<string>('dlc-math');
  const activeDlc = DLC_REALMS.find((d) => d.id === selectedDlcId) || DLC_REALMS[0];

  return (
    <div className="relative min-h-[calc(100vh-8rem)] flex flex-col justify-center max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400 mb-2">
          <span>SECTOR 04</span>
          <span aria-hidden="true">·</span>
          <span>THE MULTIVERSE EXPANSION PACKS</span>
          <span aria-hidden="true">·</span>
          <span>ALL SUBJECTS: AGES 3 TO ADULTHOOD</span>
        </div>
        <h2 className="font-['Cinzel',serif] text-2xl sm:text-4xl font-black text-white tracking-tight">
          Repeating Phonixia Across Every Subject
        </h2>
        <p className="text-sm text-slate-300 max-w-3xl mt-1">
          Reading is the absolute foundation of all learning—that is why Phonixia comes first. Once literacy is unlocked, I replicate the exact same 5-realm + collegiate master progression across math, physics, chemistry, biology, history, civics, code, ASL, and the arts. Each DLC follows the learner from age 3 through adulthood, replacing broken state curricula with comprehensive, real-world mastery.
        </p>
      </div>

      {/* Grid: 9 Multiverse DLC Realms */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {DLC_REALMS.map((dlc) => {
          const isSelected = dlc.id === selectedDlcId;
          return (
            <button
              key={dlc.id}
              onClick={() => {
                sound.playPortalWarp();
                setSelectedDlcId(dlc.id);
                speech.speak(dlc.title);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-purple-900/30 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.25)]'
                  : 'bg-[#0d1424]/80 hover:bg-[#121c32] border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">{dlc.icon}</span>
                  <span className="text-[10px] font-mono uppercase font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded">
                    {dlc.ageRange}
                  </span>
                </div>
                <div className="font-['Outfit',sans-serif] text-sm font-bold text-white line-clamp-1">
                  {dlc.title}
                </div>
                <div className="text-[11px] font-mono text-purple-300/80 mb-2">
                  {dlc.subject}
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {dlc.tagline}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                <span className={isSelected ? 'text-purple-300 font-bold' : 'text-slate-500'}>
                  {isSelected ? '● Portal Engaged' : 'Inspect 3–Adult Path'}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected DLC Inspection Drawer / Holographic Portal */}
      <div className="p-6 rounded-2xl bg-[#090d16] border border-purple-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30">
              {activeDlc.icon}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-purple-400 font-bold">
                  Modular Multiverse DLC Engine
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-xs font-mono text-amber-300 font-bold">{activeDlc.ageRange}</span>
              </div>
              <h3 className="font-['Cinzel',serif] text-xl font-bold text-white">
                {activeDlc.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end lg:self-auto">
            <button
              onClick={() => speech.speak(`${activeDlc.title}. ${activeDlc.loreDescription}`, true)}
              title="Narrate portal lore"
              className="p-2 text-slate-400 hover:text-purple-300 bg-white/5 rounded-lg transition-colors cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <div className="px-3 py-1.5 rounded-lg bg-purple-500/15 border border-purple-500/30 text-xs font-mono text-purple-300 font-bold">
              Target Discipline: {activeDlc.subject}
            </div>
          </div>
        </div>

        {/* Solo Founder Pedagogy Manifesto Callout */}
        <div className="p-4 rounded-xl bg-black/40 border border-amber-500/20 text-xs leading-relaxed space-y-1.5">
          <div className="font-mono text-[11px] text-amber-400 uppercase font-bold flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Why I Designed This To Replace Broken Institutional Curricula:</span>
          </div>
          <p className="text-slate-300 italic">
            "{activeDlc.pedagogyManifesto}"
          </p>
        </div>

        {/* 5-Tier Age 3 to Adulthood Progressive Ladder */}
        <div>
          <div className="text-xs font-mono uppercase text-purple-300 font-bold mb-3 flex items-center justify-between">
            <span>5 Developmental Age Tiers (Matching Phonixia Core Structure):</span>
            <span className="text-slate-400 text-[11px]">Lifelong Skill Progression</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {activeDlc.progressionTiers.map((tier, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#0e1627] border border-white/5 space-y-1.5 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                    {tier.tierName}
                  </div>
                  <div className="text-[11px] font-bold text-white">{tier.ageRange}</div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {tier.curriculumFocus}
                  </p>
                </div>
                <div className="pt-2 border-t border-white/5 text-[10px] font-mono text-cyan-300">
                  Mechanic: {tier.inGameMechanic}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Post-Grad Capstone & Real World Mastery */}
        <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <div className="font-mono uppercase text-purple-300 font-bold text-[10px]">
              Post-Graduation Endgame Capstone
            </div>
            <div className="text-slate-200 mt-0.5">{activeDlc.postGradCapstone}</div>
          </div>
          <div className="font-mono text-emerald-400 font-bold text-right shrink-0">
            Real Skill: {activeDlc.realWorldSkill}
          </div>
        </div>
      </div>

      {/* Slide 4 CTA footer note */}
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
            <span>Continue to Sector 05: Clinical UDL & Neurodivergent Engine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
