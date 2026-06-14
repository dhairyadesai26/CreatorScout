"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function CreatorGridSkeleton() {
  return (
    <div>

      <div className="mb-5 flex items-center justify-between">
        <Skeleton className="h-4 w-24 bg-muted/60" />
        <Skeleton className="h-5 w-20 rounded-full bg-muted/60" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="glass-card rounded-2xl border border-border/50 overflow-hidden"
          >

            <Skeleton className="h-1 w-full rounded-none bg-muted/80" />

            <div className="p-5 space-y-4">

              <div className="flex items-start gap-3">
                <Skeleton className="h-14 w-14 rounded-full bg-muted/60 shrink-0" />
                <div className="flex-1 space-y-2 pt-1">
                  <Skeleton className="h-4 w-32 bg-muted/60" />
                  <Skeleton className="h-3 w-24 bg-muted/50" />
                </div>
              </div>

              <Skeleton className="h-5 w-20 rounded-md bg-muted/50" />

              <div className="grid grid-cols-2 gap-3">
                <Skeleton className="h-16 rounded-xl bg-muted/40" />
                <Skeleton className="h-16 rounded-xl bg-muted/40" />
              </div>

              <Skeleton className="h-1 w-full rounded-full bg-muted/40" />

              <Skeleton className="h-3 w-36 bg-muted/30" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}