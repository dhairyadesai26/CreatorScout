import { useQuery } from "@tanstack/react-query";
import { getCreators } from "@/services/creator-service";
export function useCreators(filters: Record<string, unknown>) {
  return useQuery({
    queryKey: ["creators", filters],
    queryFn: () => getCreators(filters),
  });
}