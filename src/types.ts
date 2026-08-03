export interface BirthdayConfig {
  name: string;
  age: number;
  birthdayDate: string; // ISO or date string e.g., "2026-08-06T00:00:00"
  subtitle: string;
  partnerName: string;
  loveLetter: string;
  heroBannerUrl: string;
  songTitle: string;
  songUrl: string; // Audio URL or synthesized ambient tune
}

export type PhotoCategory = 'All' | 'Trips' | 'Dates' | 'Milestones';

export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  category: PhotoCategory;
  date: string;
  location?: string;
  memoryNote?: string;
  likes: number;
}
