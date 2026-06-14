import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getShortlist, addToShortlist, removeFromShortlist } from "@/services/shortlist-service";
import { useAuth } from "@/contexts/AuthContext";

export function useShortlist() {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const { data: shortlist = [], isLoading, error } = useQuery({
    queryKey: ["shortlist"],
    queryFn: getShortlist,
    enabled: isAuthenticated,
  });

  const addMutation = useMutation({
    mutationFn: addToShortlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shortlist"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFromShortlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shortlist"] });
    },
  });

  const isShortlisted = (creatorId: string) => {
    return shortlist.some((item) => item.creator.id === creatorId);
  };

  const toggleShortlist = (creatorId: string) => {
    if (isShortlisted(creatorId)) {
      removeMutation.mutate(creatorId);
    } else {
      addMutation.mutate(creatorId);
    }
  };

  return {
    shortlist,
    isLoading,
    error,
    isShortlisted,
    toggleShortlist,
    isMutating: addMutation.isPending || removeMutation.isPending,
  };
}
