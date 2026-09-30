/**
 * ============================================================================
 * DURGA PUJA CONTENT CREATION COMPETITION 2026
 * Official Contest & Prize Configuration
 * Strategic Collaboration: Government of West Bengal × @ig_calcutta
 * ============================================================================
 */

export interface ContestCategory {
  id: number;
  name: string;
  lead?: string | null;
  format: string;
  description: string;
}

export interface PrizeTier {
  rank: number;
  title: string;
  amount: number;
  winnersPerCategory: number;
  citation: string;
}

export interface ContestConfig {
  officialName: string;
  tagline: string;
  window: {
    startDate: string;
    endDate: string;
    closeTime: string;
    text: string;
  };
  partners: {
    authority: string;
    collaborator: string;
    leadOrganizers: string;
  };
  supportEmail: string;
  jurisdiction: string;
  categories: ContestCategory[];
}

export interface PrizesConfig {
  totalAmount: number;
  currency: string;
  totalWinners: number;
  categoriesCount: number;
  perCategoryAmount: number;
  tiers: PrizeTier[];
}

export const CONTEST: ContestConfig = {
  officialName: "Durga Puja Content Creation Competition 2026",
  tagline: "10 Hands. 10 Powers. One Bengal.",
  window: {
    startDate: "1 October 2026",
    endDate: "23 October 2026",
    closeTime: "11:59 PM IST",
    text: "1–23 Oct 2026"
  },
  partners: {
    authority: "Government of West Bengal",
    collaborator: "@ig_calcutta",
    leadOrganizers: "Govt of West Bengal × @ig_calcutta"
  },
  supportEmail: "support@durgapujawb.com",
  jurisdiction: "High Court at Calcutta",
  categories: [
    {
      id: 1,
      name: "10 Hands Thematic Content",
      lead: "@ig_calcutta",
      format: "Reel (9:16, 30–60s) or Static Image Post (3:4 / 3:2)",
      description: "Visual storytelling capturing Maa Durga's 10 sacred weapons or an open thematic Puja narrative."
    },
    {
      id: 2,
      name: "Swachhata & Civic Consciousness",
      lead: "@storiesbyaradhana",
      format: "Reel (9:16, 30–60s) or Static Image Post (3:4 / 3:2)",
      description: "Documenting clean pandal precincts, plastic-free drives, and crowd discipline."
    },
    {
      id: 3,
      name: "Shankhadhwani (Conch Blowing)",
      lead: null,
      format: "Video Only (20–60s, continuous single-take, face visible)",
      description: "Continuous breath acoustic resonance and sacred conch blowing."
    },
    {
      id: 4,
      name: "Foods of Pujo: Gastronomy & Culture",
      lead: "@indrajit_lahiri",
      format: "Reel (9:16, 30–60s) or Static Image Post (3:4 / 3:2)",
      description: "Bengal's festive culinary heritage, bhog offerings, heritage cabins, and street feasts."
    }
  ]
};

export const PRIZES: PrizesConfig = {
  totalAmount: 400000,
  currency: "INR",
  totalWinners: 12,
  categoriesCount: 4,
  perCategoryAmount: 100000,
  tiers: [
    {
      rank: 1,
      title: "1st Prize",
      amount: 50000,
      winnersPerCategory: 1,
      citation: "Official Govt of WB Certificate of Excellence + Grand Feature on @ig_calcutta"
    },
    {
      rank: 2,
      title: "2nd Prize",
      amount: 30000,
      winnersPerCategory: 1,
      citation: "Govt of WB Distinction Certificate + Social Showcase"
    },
    {
      rank: 3,
      title: "3rd Prize",
      amount: 20000,
      winnersPerCategory: 1,
      citation: "Official Merit Citation + Digital Creator Recognition"
    }
  ]
};
