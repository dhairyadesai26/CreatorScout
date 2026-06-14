import { api } from "@/lib/api";
import { Creator } from "@/types/creator";

export interface ShortlistItem {
  shortlistId: string;
  addedAt: string;
  creator: Creator;
}

export async function getShortlist(): Promise<ShortlistItem[]> {
  const response = await api.get("/shortlist");
  return response.data;
}

export async function addToShortlist(creatorId: string): Promise<ShortlistItem> {
  const response = await api.post("/shortlist", { creatorId });
  return response.data;
}

export async function removeFromShortlist(creatorId: string): Promise<{ message: string; creatorId: string }> {
  const response = await api.delete(`/shortlist/${creatorId}`);
  return response.data;
}
