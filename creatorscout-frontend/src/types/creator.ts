export type Platform = "YouTube" | "Instagram";
export type Niche =
  | "Technology"
  | "Gaming"
  | "Education"
  | "Finance"
  | "Fitness"
  | "Travel"
  | "Food"
  | "Fashion"
  | "Lifestyle"
  | "Business"
  | "AI"
  | "Programming";
export interface Creator {
  id: string;
  name: string;
  avatarUrl: string;
  platform: string;
  niche: string;
  bio: string;
  followerCount: number;
  engagementRate: number;
  audienceCountry: string;
  creatorScore: number;
  verified: boolean;
  recentContent: string[];
}