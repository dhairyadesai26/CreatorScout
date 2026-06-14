import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const NICHES = [
  'Technology', 'Gaming', 'Finance', 'Education', 'Fitness',
  'Travel', 'Food', 'Fashion', 'Lifestyle', 'Business', 'AI', 'Programming',
];

const PLATFORMS = ['YouTube', 'Instagram'];
const COUNTRIES = ['USA', 'UK', 'Canada', 'Germany', 'Australia', 'India', 'Singapore', 'Japan'];

const FIRST_NAMES = [
  'Ananya', 'Vihaan', 'Aarav', 'Aditya', 'Emma', 'Sophia', 'John', 'Alex',
  'Priya', 'Rohan', 'Arjun', 'Sarah', 'Daniel', 'Kavya', 'Riya', 'Dev', 'Zara',
];

const LAST_NAMES = [
  'Wilson', 'Miller', 'Johnson', 'Singh', 'Sharma', 'Patel', 'Davis',
  'Brown', 'Gupta', 'Verma', 'Kumar', 'Taylor', 'Moore',
];

const CONTENT_TITLES: Record<string, string[]> = {
  Technology: ['Top 10 Tech Gadgets 2025', 'AI Tools for Productivity', 'My Tech Setup Tour', 'Future of Computing'],
  Gaming: ['Epic Ranked Game Session', 'Full Game Review', 'Hidden Game Secrets', 'Pro Tips & Tricks'],
  Finance: ['How I Saved $50K in 2 Years', 'Stock Market Breakdown', 'Best Index Funds 2025', 'Crypto Reality Check'],
  Education: ['How to Learn Faster', 'Study with Me — 3 Hours', 'Best Free Learning Resources', 'My Study System'],
  Fitness: ['Full Body Workout at Home', '30-Day Challenge Results', 'Meal Prep for the Week', 'My Fitness Journey'],
  Travel: ['Hidden Gems in Japan', 'Budget Europe Trip', '48 Hours in Dubai', 'Travel Hacks Nobody Tells You'],
  Food: ['5-Minute Healthy Breakfast', 'Restaurant vs. Homemade', 'Viral Recipe Test', 'Street Food Tour'],
  Fashion: ['Thrift Haul Styling', 'Capsule Wardrobe Essentials', 'OOTD This Week', 'Sustainable Fashion Guide'],
  Lifestyle: ['My Morning Routine', 'Productivity System 2025', 'Room Makeover on a Budget', 'Minimalist Living'],
  Business: ['How I Started a 6-Figure Business', 'Entrepreneur Morning Routine', 'Biggest Business Mistakes', 'Brand Building Secrets'],
  AI: ['Best AI Tools Right Now', 'I Used AI for a Week', 'Building with ChatGPT', 'Future of AI Jobs'],
  Programming: ['Build a Full Stack App', 'Clean Code Principles', 'VSCode Setup 2025', 'From Zero to SWE'],
};

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateCreator(index: number) {
  const firstName = randFrom(FIRST_NAMES);
  const lastName = randFrom(LAST_NAMES);
  const niche = NICHES[index % NICHES.length];
  const platform = randFrom(PLATFORMS);
  const country = randFrom(COUNTRIES);
  const followerCount = rand(50_000, 1_000_000);
  const engagementRate = parseFloat((Math.random() * 9 + 1).toFixed(1)); // 1.0–10.0
  const creatorScore = rand(70, 160);
  const verified = Math.random() > 0.65;

  const contentPool = CONTENT_TITLES[niche] ?? CONTENT_TITLES.Technology;
  const recentContent = [
    contentPool[0],
    contentPool[1] ?? 'Creator Vlog',
    contentPool[2] ?? 'Weekly Roundup',
  ];

  return {
    name: `${firstName} ${lastName}`,
    platform,
    niche,
    bio: `${niche} content creator passionate about helping audiences learn, grow, and explore new ideas. Based in ${country}.`,
    followerCount,
    engagementRate,
    audienceCountry: country,
    avatarUrl: `https://i.pravatar.cc/300?img=${(index % 70) + 1}`,
    creatorScore,
    verified,
    recentContent,
  };
}

async function main() {
  console.log('🌱 Starting seed...');

  // ── Seed test user ──────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'brand@upstageX.com' },
    update: {},
    create: {
      email: 'brand@upstageX.com',
      password: hashedPassword,
    },
  });

  console.log(`✅ Test user: ${user.email} (id: ${user.id})`);

  // ── Seed creators ────────────────────────────────────────────────────────────
  const creatorCount = 50;
  let created = 0;

  for (let i = 0; i < creatorCount; i++) {
    const data = generateCreator(i);

    await prisma.creator.create({ data });
    created++;
  }

  console.log(`✅ Created ${created} creators`);
  console.log('🎉 Seed complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
