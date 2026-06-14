import { z } from "zod";
export const filterSchema = z.object({
  search: z.string().optional(),
  niche: z.string().optional(),
  platform: z.string().optional(),
  country: z.string().optional(),
  followers: z.array(z.number()).length(2),
  showShortlistOnly: z.boolean().optional(),
});
export type FilterFormValues = z.infer<
  typeof filterSchema
>;