app.enable('trust proxy');

app.use((req, res, next) => {
  if (req.secure) {
    return next();
  }
  res.redirect('https://' + 
req.headers.host + req.url);  
});

export interface RealmData {
  id: string;
  number: number | string;
  name: string;
  ageBracket: string;
  gradeEquivalent: string;
  subtitle: string;
  lore: string;
  mechanics: string[];
  sampleQuest: string;
  curriculumFocus: string[];
  biomeTheme: string;
  color: string;
  runeIcon: string;
  isPostGrad?: boolean;
  colleges?: {
    name: string;
    focus: string;
    courses: string[];
    deityDean: string;
    capstone: string;
  }[];
  masterPathways?: {
    title: string;
    thesis: string;
    loreTitle: string;
  }[];
  doctoralArchiveTopics?: {
    title: string;
    subfields: string[];
    researchExpedition: string;
    masterySeal: string;
  }[];
}

export interface DlcProgressionTier {
  tierName: string;
  ageRange: string;
  curriculumFocus: string;
  inGameMechanic: string;
}

export interface ExpansionDLC {
  id: string;
  title: string;
  subject: string;
  ageRange: string; // "Ages 3 to Adulthood"
  icon: string;
  color: string;
  accentHex: string;
  tagline: string;
  pedagogyManifesto: string;
  keyMechanics: string[];
  progressionTiers: DlcProgressionTier[];
  postGradCapstone: string;
  realWorldSkill: string;
  loreDescription: string;
}

export interface UDLSettings {
  dyslexiaEngine: boolean;
  lowStimulation: boolean;
  adhdMicroQuest: boolean;
  multisensoryAudio: boolean;
  fontSizeMultiplier: number;
  highContrast: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  targetAudience: string;
  priceTag: string;
  billingPeriod: string;
  featured?: boolean;
  description: string;
  features: string[];
  ctaLabel: string;
}

export interface TestProfile {
  id: string;
  name: string;
  avatarSeed: string;
  badge: string;
  level: number;
  progressPercent: number;
  literacyProgress: number;
  dlcProgress: number;
  accuracy: string;
  fluencyWPM: number;
  statusBadge: string;
  iepAccommodations?: string[];
  highlights: string[];
  quote: string;
}

export interface BackerTier {
  amount: number;
  title: string;
  perks: string[];
  popular?: boolean;
}

