/**
 * ============================================================================
 * DURGA PUJA WEST BENGAL — CREATORS CONTEST
 * Official Contest Configuration
 * ============================================================================
 */

export interface ContestCategory {
  id: number;
  name: string;
  format: string;
  description: string;
  note?: string;
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
  supportEmail: string;
  jurisdiction: string;
  categories: ContestCategory[];
}

export const CONTEST: ContestConfig = {
  officialName: "Durga Puja West Bengal — Creators Contest",
  tagline: "10 Hands. 10 Powers. One Bengal.",
  window: {
    startDate: "1 October 2026",
    endDate: "23 October 2026",
    closeTime: "11:59 PM IST",
    text: "October 2026"
  },
  supportEmail: "support@durgapujawb.com",
  jurisdiction: "High Court at Calcutta",
  categories: [
    {
      id: 1,
      name: "Dasha Shakti Reel Competition",
      format: "Reel",
      description: "Participants make a reel celebrating one of the ten powers (hands) of Maa Durga, around Durga Puja."
    },
    {
      id: 2,
      name: "Swachh Pandal Neighbourhood",
      format: "Reel",
      description: "Welcome Maa with clean streets, plastic-free zones, crowd discipline, and eco-initiatives.",
      note: "No AI-generated content."
    },
    {
      id: 3,
      name: "Shankhadhwani",
      format: "Reel",
      description: "Your longest, clearest conch blow in one continuous breath. Unedited single-take, face visible.",
      note: "No AI-generated content."
    }
  ]
};
