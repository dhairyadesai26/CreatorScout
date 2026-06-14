"use client";

import { Creator } from "@/types/creator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  TrendingUp,
  CheckCircle2,
  Heart,
  ExternalLink,
  Tv2,
  Camera,
  FileText,
  BarChart3,
  Zap,
  Globe,
} from "lucide-react";
import { useShortlist } from "@/hooks/useShortlist";
import { useAuth } from "@/contexts/AuthContext";
import AuthDialog from "@/components/auth/AuthDialog";
import { useState } from "react";

interface Props {
  creator: Creator | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatFollowers(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
}

function getNicheColor(niche: string): string {
  const map: Record<string, string> = {
    Technology: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    Gaming: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    Education: "bg-teal-500/15 text-teal-400 border-teal-500/30",
    Finance: "bg-green-500/15 text-green-400 border-green-500/30",
    Fitness: "bg-orange-500/15 text-orange-400 border-orange-500/30",
    Travel: "bg-sky-500/15 text-sky-400 border-sky-500/30",
    Food: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    Fashion: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    Lifestyle: "bg-pink-500/15 text-pink-400 border-pink-500/30",
    Business: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
    AI: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    Programming: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  };
  return map[niche] ?? "bg-primary/15 text-primary border-primary/30";
}

function getScoreLabel(score: number): { label: string; color: string } {
  if (score >= 150) return { label: "Elite", color: "text-emerald-400" };
  if (score >= 130) return { label: "Top Tier", color: "text-green-400" };
  if (score >= 110) return { label: "Strong", color: "text-yellow-400" };
  if (score >= 90) return { label: "Good", color: "text-orange-400" };
  return { label: "Rising", color: "text-red-400" };
}

function ScoreGauge({ score }: { score: number }) {
  const scoreInfo = getScoreLabel(score);
  const maxScore = 200;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const filled = (score / maxScore) * circumference;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-muted/30"
          />
          <circle
            cx="50" cy="50" r={radius}
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${filled} ${circumference}`}
            className={`transition-all duration-1000 ease-out ${
              score >= 130
                ? "stroke-emerald-400"
                : score >= 100
                ? "stroke-yellow-400"
                : "stroke-orange-400"
            }`}
          />
        </svg>
        <div className="flex flex-col items-center">
          <span className={`text-2xl font-extrabold ${scoreInfo.color}`}>
            {score}
          </span>
          <span className="text-[9px] text-muted-foreground uppercase tracking-wider">
            score
          </span>
        </div>
      </div>
      <span className={`text-xs font-bold ${scoreInfo.color}`}>
        {scoreInfo.label}
      </span>
    </div>
  );
}

export default function CreatorSheet({
  creator,
  open,
  onOpenChange,
}: Props) {
  const { isShortlisted, toggleShortlist, isMutating } = useShortlist();
  const { isAuthenticated } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  if (!creator) return null;

  const engagementMax = 10;
  const engagementWidth = Math.min(
    (creator.engagementRate / engagementMax) * 100,
    100
  );

  const shortlisted = isShortlisted(creator.id);

  const handleShortlistClick = () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }
    toggleShortlist(creator.id);
  };

  return (
    <>
      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
      <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className="overflow-y-auto bg-background/95 backdrop-blur-2xl border-border/60 sm:max-w-xl p-0"
        id="creator-detail-sheet"
      >

        <div className="h-1 w-full bg-gradient-to-r from-primary via-violet-500 to-pink-500" />

        <div className="p-6 space-y-6">

          <SheetHeader className="sr-only">
            <SheetTitle>Creator Profile — {creator.name}</SheetTitle>
            <SheetDescription>
              Full profile details for {creator.name}, a {creator.niche} creator on {creator.platform}.
            </SheetDescription>
          </SheetHeader>

          <div className="flex items-start gap-5">

            <div className="relative shrink-0">
              <img
                src={creator.avatarUrl}
                alt={creator.name}
                className={`h-20 w-20 rounded-2xl object-cover ${
                  creator.verified
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                    : "ring-2 ring-border/50"
                }`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    creator.name
                  )}&background=4f46e5&color=fff&size=80`;
                }}
              />
              {creator.verified && (
                <span className="absolute -bottom-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-background ring-2 ring-background">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-foreground leading-none">
                    {creator.name}
                  </h2>
                  {creator.verified && (
                    <p className="mt-0.5 text-xs font-semibold text-primary">
                      Verified Creator
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  {creator.platform === "YouTube" ? (
                    <Tv2 className="h-4 w-4 text-red-400" />
                  ) : (
                    <Camera className="h-4 w-4 text-pink-400" />
                  )}
                  <span className="font-medium text-foreground">
                    {creator.platform}
                  </span>
                </span>
                <span className="text-border">·</span>
                <span className="flex items-center gap-1">
                  <Globe className="h-3.5 w-3.5" />
                  {creator.audienceCountry}
                </span>
              </div>

              <div className="mt-2">
                <span
                  className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${getNicheColor(
                    creator.niche
                  )}`}
                >
                  {creator.niche}
                </span>
              </div>
            </div>
          </div>

          <Separator className="bg-border/50" />

          <div>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Performance Metrics
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-3">

              <div className="rounded-xl bg-muted/25 border border-border/40 p-3 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users className="h-3 w-3 text-violet-400" />
                </div>
                <p className="text-lg font-extrabold text-foreground">
                  {formatFollowers(creator.followerCount)}
                </p>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-0.5">
                  Followers
                </p>
              </div>

              <div className="rounded-xl bg-muted/25 border border-border/40 p-3 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="h-3 w-3 text-pink-400" />
                </div>
                <p className="text-lg font-extrabold text-foreground">
                  {creator.engagementRate}%
                </p>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-0.5">
                  Engagement
                </p>
              </div>

              <div className="rounded-xl bg-muted/25 border border-border/40 p-3 flex items-center justify-center">
                <ScoreGauge score={creator.creatorScore} />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium">
                  Engagement rate
                </span>
                <span className="font-bold text-foreground">
                  {creator.engagementRate}% / 10%
                </span>
              </div>
              <div className="engagement-bar">
                <div
                  className="engagement-fill"
                  style={{ width: `${engagementWidth}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Low</span>
                <span>Average (3%)</span>
                <span>Top (10%)</span>
              </div>
            </div>
          </div>

          <Separator className="bg-border/50" />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                About
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {creator.bio}
            </p>
          </div>

          <Separator className="bg-border/50" />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Recent Content
              </h3>
            </div>
            <ul className="space-y-2">
              {creator.recentContent.map((content, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 rounded-xl border border-border/40 bg-muted/20 p-3 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
                >
                  <span className="mt-0.5 shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary text-[10px] font-bold">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed">{content}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator className="bg-border/50" />

          <div className="flex gap-3 pb-2">
            <Button
              id="shortlist-creator-btn"
              onClick={handleShortlistClick}
              disabled={isMutating}
              className={`flex-1 gap-2 font-semibold ${
                shortlisted
                  ? "bg-primary/90 text-primary-foreground hover:bg-destructive/90"
                  : "btn-glow"
              }`}
              size="lg"
            >
              <Heart className={`h-4 w-4 ${shortlisted ? "fill-current" : ""}`} />
              {shortlisted ? "Remove from Shortlist" : "Add to Shortlist"}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 border-border/60 hover:border-primary/40 hover:bg-primary/10"
            >
              <ExternalLink className="h-4 w-4" />
              Profile
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
    </>
  );
}