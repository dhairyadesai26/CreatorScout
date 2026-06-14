"use client";

import { useState } from "react";
import { Creator } from "@/types/creator";
import { Card, CardContent } from "@/components/ui/card";
import { useShortlist } from "@/hooks/useShortlist";
import { useAuth } from "@/contexts/AuthContext";
import AuthDialog from "@/components/auth/AuthDialog";
import {
  Users,
  TrendingUp,
  MapPin,
  Tv2,
  Camera,
  CheckCircle2,
  Star,
  Bookmark,
} from "lucide-react";

interface Props {
  creator: Creator;
  onClick: () => void;
  animationDelay?: number;
}

function getNicheBadgeClass(niche: string): string {
  const map: Record<string, string> = {
    Technology: "badge-technology",
    Gaming: "badge-gaming",
    Education: "badge-education",
    Fitness: "badge-fitness",
    Travel: "badge-travel",
    Food: "badge-food",
    Fashion: "badge-fashion",
    Lifestyle: "badge-lifestyle",
    Business: "badge-business",
    AI: "badge-ai",
    Programming: "badge-programming",
  };
  return map[niche] ?? "badge-technology";
}

function getPlatformIcon(platform: string) {
  if (platform === "YouTube")
    return <Tv2 className="h-3.5 w-3.5 text-red-400" />;
  if (platform === "Instagram")
    return <Camera className="h-3.5 w-3.5 text-pink-400" />;
  return null;
}

function formatFollowers(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return `${n}`;
}

function getScoreColor(score: number): string {
  if (score >= 130) return "text-emerald-400";
  if (score >= 100) return "text-yellow-400";
  return "text-orange-400";
}

export default function CreatorCard({ creator, onClick, animationDelay = 0 }: Props) {
  const { isShortlisted, toggleShortlist, isMutating } = useShortlist();
  const { isAuthenticated } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const shortlisted = isShortlisted(creator.id);
  const engagementMax = 10;
  const engagementWidth = Math.min((creator.engagementRate / engagementMax) * 100, 100);

  const handleShortlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }
    toggleShortlist(creator.id);
  };

  return (
    <>
      {showAuthDialog && (
        <AuthDialog
          open={showAuthDialog}
          onOpenChange={setShowAuthDialog}
          defaultTab="login"
        />
      )}
      <div
        className="animate-fade-in-up"
        style={{ animationDelay: `${animationDelay}ms`, opacity: 0 }}
      >
        <Card
          id={`creator-card-${creator.id}`}
          className="glass-card glass-card-hover cursor-pointer border-border/50 rounded-2xl overflow-hidden group relative"
          onClick={onClick}
        >
          <CardContent className="p-0">
            <div className="h-1 w-full bg-gradient-to-r from-primary via-violet-500 to-pink-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="p-5 space-y-4">
              <div className="absolute right-5 top-4 z-10 flex gap-2">
                <button 
                  onClick={handleShortlistClick}
                  disabled={isMutating}
                  className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-colors ${
                    shortlisted 
                      ? "bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20" 
                      : "bg-black/40 text-white hover:bg-primary/80"
                  }`}
                >
                  <Bookmark className={`h-4 w-4 ${shortlisted ? "fill-current" : ""}`} />
                </button>
              </div>

              <div className="flex items-start gap-3">
                <div className="relative shrink-0">
                  <img
                    src={creator.avatarUrl}
                    alt={creator.name}
                    className={`h-14 w-14 rounded-full object-cover ${
                      creator.verified ? "avatar-verified" : "ring-2 ring-border/50"
                    }`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name)}&background=random`;
                    }}
                  />
                  {creator.verified && (
                    <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-background ring-2 ring-background">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0 pr-10">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="font-bold text-foreground leading-tight truncate text-[0.95rem]">
                      {creator.name}
                    </h3>
                  </div>

                  <div className="mt-1 flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        {getPlatformIcon(creator.platform)}
                        {creator.platform}
                      </span>
                      <span className="text-border">·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {creator.audienceCountry}
                      </span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-0.5 text-xs font-bold ${getScoreColor(creator.creatorScore)}`}
                    >
                      <Star className="h-3 w-3 fill-current" />
                      Score: {creator.creatorScore}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <span
                  className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${getNicheBadgeClass(creator.niche)}`}
                >
                  {creator.niche}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-muted/30 px-3 py-2.5">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Followers
                    </p>
                  </div>
                  <p className="text-base font-extrabold text-foreground">
                    {formatFollowers(creator.followerCount)}
                  </p>
                </div>

                <div className="rounded-xl bg-muted/30 px-3 py-2.5">
                  <div className="flex items-center gap-1 mb-0.5">
                    <TrendingUp className="h-3 w-3 text-muted-foreground" />
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Engagement
                    </p>
                  </div>
                  <p className="text-base font-extrabold text-foreground">
                    {creator.engagementRate}%
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="engagement-bar">
                  <div
                    className="engagement-fill"
                    style={{ width: `${engagementWidth}%` }}
                  />
                </div>
              </div>

              <div className="pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Click to view full profile</span>
                  <span className="text-primary font-semibold group-hover:underline">
                    View →
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}