"use client";

import { useCreators } from "@/hooks/useCreators";
import { useFilters } from "@/hooks/useFilters";
import { useShortlist } from "@/hooks/useShortlist";
import CreatorCard from "./CreatorCard";
import CreatorGridSkeleton from "./CreatorGridSkeleton";
import CreatorSheet from "@/components/creator/CreatorSheet";
import { Creator } from "@/types/creator";
import { useState, useMemo } from "react";
import { AlertCircle, SearchX, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreatorGrid() {
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [open, setOpen] = useState(false);
  const { filters, setFilters } = useFilters();
  const { shortlist } = useShortlist();

  const queryParams = useMemo(() => {
    const params: Record<string, string | number> = {};
    if (filters.search) params.q = filters.search;
    if (filters.niche && filters.niche !== "all-niches") params.niche = filters.niche;
    if (filters.platform && filters.platform !== "all-platforms") params.platform = filters.platform;
    if (filters.country && filters.country !== "all-countries") params.country = filters.country;
    if (filters.followers && filters.followers.length === 2) {
      params.minFollowers = filters.followers[0];
      params.maxFollowers = filters.followers[1];
    }
    params.page = filters.page || 1;
    return params;
  }, [filters]);

  const { data: response, isLoading, error, refetch } = useCreators(queryParams);

  const filteredCreators = useMemo(() => {
    if (filters.showShortlistOnly) {
      return shortlist
        .map(item => item.creator)
        .filter(creator => {
          const q = filters.search?.toLowerCase();
          const matchesSearch = !q || creator.name.toLowerCase().includes(q) || creator.bio.toLowerCase().includes(q);
          const matchesNiche = !filters.niche || filters.niche === "all-niches" || creator.niche.toLowerCase() === filters.niche.toLowerCase();
          const matchesPlatform = !filters.platform || filters.platform === "all-platforms" || creator.platform.toLowerCase() === filters.platform.toLowerCase();
          const matchesCountry = !filters.country || filters.country === "all-countries" || creator.audienceCountry.toLowerCase() === filters.country.toLowerCase();
          const matchesFollowers = !filters.followers || filters.followers.length !== 2 || (creator.followerCount >= filters.followers[0] && creator.followerCount <= filters.followers[1]);

          return matchesSearch && matchesNiche && matchesPlatform && matchesCountry && matchesFollowers;
        });
    }
    return response?.data || [];
  }, [filters.showShortlistOnly, shortlist, response?.data, filters.search, filters.niche, filters.platform, filters.country, filters.followers]);

  const displayCreators = useMemo(() => {
    if (filters.showShortlistOnly) {
      const startIndex = ((filters.page || 1) - 1) * 12;
      return filteredCreators.slice(startIndex, startIndex + 12);
    }
    return filteredCreators;
  }, [filteredCreators, filters.page, filters.showShortlistOnly]);

  const totalResults = filters.showShortlistOnly ? filteredCreators.length : (response?.total || 0);
  const totalPages = filters.showShortlistOnly ? Math.ceil(totalResults / 12) : (response?.totalPages || 0);

  if (isLoading) return <CreatorGridSkeleton />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-destructive/30 bg-destructive/10 px-6 py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/20">
          <AlertCircle className="h-7 w-7 text-destructive" />
        </div>
        <h3 className="mb-1 text-lg font-bold text-foreground">
          Something went wrong
        </h3>
        <p className="mb-6 text-sm text-muted-foreground">
          We couldn&apos;t load creators. Please try again.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          className="border-destructive/40 text-destructive hover:bg-destructive/10"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (displayCreators.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border/50 bg-muted/10 px-6 py-20 text-center glass-card">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/40">
          <SearchX className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-foreground">
          No creators found
        </h3>
        <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
          No creators match your current filters. Try adjusting your search
          query, niche, or follower range.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold text-foreground">
            Creators
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-primary/15 px-3 py-0.5 text-xs font-bold text-primary">
            {displayCreators.length} on page
          </span>
          {(!filters.showShortlistOnly && response && displayCreators.length < response.total) && (
            <span className="text-xs text-muted-foreground">
              of {response.total} total
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {displayCreators.map((creator, idx) => (
          <CreatorCard
            key={creator.id}
            creator={creator}
            animationDelay={Math.min(idx * 60, 600)}
            onClick={() => {
              setSelectedCreator(creator);
              setOpen(true);
            }}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilters((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
            disabled={filters.page === 1}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1 mx-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i + 1}
                variant={filters.page === i + 1 ? "default" : "outline"}
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => setFilters((prev) => ({ ...prev, page: i + 1 }))}
              >
                {i + 1}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilters((prev) => ({ ...prev, page: Math.min(totalPages, prev.page + 1) }))}
            disabled={filters.page === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      <CreatorSheet
        creator={selectedCreator}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
}