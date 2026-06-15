"use client";

import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { niches, platforms, countries } from "@/lib/filter-options";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFilters } from "@/hooks/useFilters";
import { filterSchema, FilterFormValues } from "@/lib/filter-schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  SlidersHorizontal,
  X,
  Sparkles,
  Bookmark,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function FilterPanel() {
  const { isAuthenticated } = useAuth();

  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      search: "",
      niche: "",
      platform: "",
      country: "",
      followers: [0, 1000000],
    },
  });

  const { setFilters } = useFilters();

  const onSubmit = (data: FilterFormValues) => {
    setFilters({
      search: data.search || "",
      niche: data.niche || "",
      platform: data.platform || "",
      country: data.country || "",
      followers: data.followers || [0, 1000000],
      showShortlistOnly: data.showShortlistOnly || false,
      page: 1,
    });
  };

  const handleReset = () => {
    form.reset();
    setFilters({ search: "", niche: "", platform: "", country: "", followers: [0, 1000000], showShortlistOnly: false, page: 1 });
  };

  const followersVal = form.watch("followers");
  const formatFollowers = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
    return `${n}`;
  };

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="lg:sticky lg:top-24 lg:h-fit lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto w-full">
      <div className="lg:hidden mb-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full flex justify-between items-center glass-card border-primary/20 h-12"
        >
          <div className="flex items-center gap-2 font-semibold">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            <span>Filters & Search</span>
          </div>
          {isMobileOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      <div className={`glass-card rounded-2xl border border-border/60 overflow-hidden ${isMobileOpen ? 'block' : 'hidden lg:block'}`}>
        <div className="flex items-center justify-between border-b border-border/50 bg-muted/20 px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <SlidersHorizontal className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Filters</p>
              <p className="text-xs text-muted-foreground">Refine creators</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
          >
            <X className="h-3 w-3" />
            Reset
          </button>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 p-5"
        >
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Keyword Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="filter-search"
                placeholder="Search by name, bio, niche…"
                className="pl-9 bg-input/60 border-border/60 text-sm placeholder:text-muted-foreground/60 focus-visible:ring-primary/40"
                {...form.register("search")}
              />
            </div>
          </div>

          <div className="h-px bg-border/40" />

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Niche
            </label>
            <Select
              onValueChange={(value) => form.setValue("niche", value)}
              value={form.watch("niche")}
            >
              <SelectTrigger
                id="filter-niche"
                className="bg-input/60 border-border/60 text-sm"
              >
                <SelectValue placeholder="All niches" />
              </SelectTrigger>
              <SelectContent className="bg-popover/95 backdrop-blur-xl border-border/60">
                <SelectItem value="all-niches">All niches</SelectItem>
                {niches.map((niche) => (
                  <SelectItem key={niche} value={niche}>
                    {niche}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Platform
            </label>
            <Select
              onValueChange={(value) => form.setValue("platform", value)}
              value={form.watch("platform")}
            >
              <SelectTrigger
                id="filter-platform"
                className="bg-input/60 border-border/60 text-sm"
              >
                <SelectValue placeholder="All platforms" />
              </SelectTrigger>
              <SelectContent className="bg-popover/95 backdrop-blur-xl border-border/60">
                <SelectItem value="all-platforms">All platforms</SelectItem>
                {platforms.map((platform) => (
                  <SelectItem key={platform} value={platform}>
                    <span className="flex items-center gap-2">
                      {platform === "YouTube" ? "📺" : "📸"} {platform}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Audience Country
            </label>
            <Select
              onValueChange={(value) => form.setValue("country", value)}
              value={form.watch("country")}
            >
              <SelectTrigger
                id="filter-country"
                className="bg-input/60 border-border/60 text-sm"
              >
                <SelectValue placeholder="All countries" />
              </SelectTrigger>
              <SelectContent className="bg-popover/95 backdrop-blur-xl border-border/60">
                <SelectItem value="all-countries">All countries</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="h-px bg-border/40" />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Follower Range
              </label>
            </div>

            <div className="px-1 py-2">
              <Slider
                id="filter-followers"
                min={0}
                max={1000000}
                step={10000}
                value={followersVal}
                onValueChange={(value) => form.setValue("followers", value)}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground">Min</p>
                <p className="text-xs font-bold text-foreground">
                  {formatFollowers(followersVal[0])}
                </p>
              </div>
              <div className="h-px flex-1 mx-3 bg-border/50" />
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground">Max</p>
                <p className="text-xs font-bold text-foreground">
                  {formatFollowers(followersVal[1])}
                </p>
              </div>
            </div>
          </div>

          {isAuthenticated && (
            <>
              <div className="h-px bg-border/40" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bookmark className="h-4 w-4 text-primary" />
                  <label htmlFor="filter-shortlist" className="text-sm font-medium text-foreground">
                    My Shortlist Only
                  </label>
                </div>
                <Switch
                  id="filter-shortlist"
                  checked={form.watch("showShortlistOnly")}
                  onCheckedChange={(checked) => form.setValue("showShortlistOnly", checked)}
                />
              </div>
            </>
          )}

          <Button
            id="filter-apply"
            type="submit"
            className="btn-glow w-full gap-2 text-sm font-semibold"
          >
            <Sparkles className="h-4 w-4" />
            Apply Filters
          </Button>
        </form>
      </div>
    </div>
  );
}