import { Creator } from "@/types/creator";
export function getCreatorStats(
  creators: Creator[]
) {
  const countries =
    new Set(
      creators.map(
        (creator) => creator.audienceCountry
      )
    ).size;
  const avgEngagement =
    creators.reduce(
      (sum, creator) =>
        sum + creator.engagementRate,
      0
    ) / creators.length;
  return {
    totalCreators: creators.length,
    countries,
    avgEngagement:
      avgEngagement.toFixed(1),
  };
}