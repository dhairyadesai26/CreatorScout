-- AlterTable
ALTER TABLE "Creator" ADD COLUMN     "recentContent" TEXT[],
ALTER COLUMN "verified" SET DEFAULT false;
