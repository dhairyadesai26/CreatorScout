import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsSection from "@/components/dashboard/StatsSection";
import FilterPanel from "@/components/filters/FilterPanel";
import CreatorGrid from "@/components/creator/CreatorGrid";

export default function DiscoverPage() {
  return (
    <main className="min-h-screen">

      <div className="relative border-b border-border/50 pb-8">

        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
          <DashboardHeader />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <StatsSection />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <FilterPanel />
          <CreatorGrid />
        </div>
      </div>
    </main>
  );
}
