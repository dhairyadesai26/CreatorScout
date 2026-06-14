import { writeFileSync } from "fs";
const platforms = ["YouTube", "Instagram"];
const niches = [
  "Technology",
  "Gaming",
  "Education",
  "Finance",
  "Fitness",
  "Travel",
  "Food",
  "Fashion",
  "Lifestyle",
  "Business",
  "AI",
  "Programming",
];
const countries = [
  "India",
  "USA",
  "Canada",
  "UK",
  "Germany",
  "Australia",
  "Japan",
  "Singapore",
];
const firstNames = [
  "Aarav",
  "Vihaan",
  "Aditya",
  "Rohan",
  "Arjun",
  "Neha",
  "Priya",
  "Ananya",
  "Sarah",
  "Emma",
  "John",
  "Alex",
  "Sophia",
  "Daniel",
];
const lastNames = [
  "Sharma",
  "Patel",
  "Gupta",
  "Singh",
  "Verma",
  "Wilson",
  "Johnson",
  "Brown",
  "Miller",
  "Davis",
];
const creators = Array.from({ length: 200 }, (_, i) => {
  const firstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];
  const followerCount =
    Math.floor(Math.random() * 900000) + 10000;
  const engagementRate =
    +(Math.random() * 9 + 1).toFixed(1);
  return {
    id: crypto.randomUUID(),
    name: `${firstName} ${lastName}`,
    avatarUrl: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`,
    platform:
      platforms[Math.floor(Math.random() * platforms.length)],
    niche:
      niches[Math.floor(Math.random() * niches.length)],
    bio: "Content creator helping audiences learn and grow.",
    followerCount,
    engagementRate,
    audienceCountry:
      countries[Math.floor(Math.random() * countries.length)],
    creatorScore: Math.round(
      engagementRate * 10 +
      Math.log10(followerCount) * 10
    ),
    verified: Math.random() > 0.6,
    recentContent: [
      "Latest creator content",
      "Campaign collaboration",
      "Audience engagement tips",
    ],
  };
});
writeFileSync(
  "src/data/creators.json",
  JSON.stringify(creators, null, 2)
);
console.log("200 creators generated");