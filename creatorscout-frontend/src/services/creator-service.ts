import { api } from "@/lib/api";
import { Creator } from "@/types/creator";
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
export const getCreators = async (params?: Record<string, unknown>): Promise<PaginatedResponse<Creator>> => {
  const response = await api.get("/creators", { params });
  return response.data;
}