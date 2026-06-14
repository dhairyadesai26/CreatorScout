"use client";

import { useCreators } from "@/hooks/useCreators";
import { Users, Globe, BarChart2, Star, Layers } from "lucide-react";

interface StatConfig {
  key: string;
  label: string;
  icon: React.ReactNode;
  getValue: (response: ReturnType<typeof useCreators>["data"]) => string;
  color: string;
  bgColor: string;
  borderColor: string;
}

const statConfigs: StatConfig[] = [
  {
    key: "creators",
    label: "Creators",
    icon: <Users className="h-5 w-5" />,
    getValue: (response) => `${response?.total ?? 0}`,
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
  },
  {
    key: "countries",
    label: "Countries",
    icon: <Globe className="h-5 w-5" />,
    getValue: (response) =>
      `${new Set(response?.data?.map((c) => c.audienceCountry) ?? []).size}`,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
  },
  {
    key: "engagement",
    label: "Avg. Engagement",
    icon: <BarChart2 className="h-5 w-5" />,
    getValue: (response) => {
      const data = response?.data;
      if (!data || data.length === 0) return "—";
      const avg =
        data.reduce((sum, c) => sum + c.engagementRate, 0) / data.length;
      return `${avg.toFixed(1)}%`;
    },
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/20",
  },
  {
    key: "platforms",
    label: "Platforms",
    icon: <Layers className="h-5 w-5" />,
    getValue: (response) =>
      `${new Set(response?.data?.map((c) => c.platform) ?? []).size}`,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
  {
    key: "verified",
    label: "Verified",
    icon: <Star className="h-5 w-5" />,
    getValue: (response) =>
      `${response?.data?.filter((c) => c.verified).length ?? 0}`,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
  },
];

export default function StatsSection() {
  // Always fetch all creators for global stats (no filters)
  const { data: response, isLoading } = useCreators({});

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {statConfigs.map((stat, idx) => (
        <div
          key={stat.key}
          className={`glass-card stat-shimmer rounded-xl border p-4 ${stat.borderColor} animate-fade-in-scale`}
          style={{ animationDelay: `${idx * 75}ms`, opacity: 0 }}
        >

          <div
            className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg ${stat.bgColor} ${stat.color}`}
          >
            {stat.icon}
          </div>

          {isLoading ? (
            <div className="mb-1 h-7 w-16 animate-pulse rounded-md bg-muted" />
          ) : (
            <p className={`text-2xl font-extrabold tracking-tight ${stat.color}`}>
              {stat.getValue(response)}
            </p>
          )}

          <p className="mt-0.5 text-xs font-medium text-muted-foreground">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}