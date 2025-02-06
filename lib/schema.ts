import { z } from "zod"

export const feedbackFormSchema = z.object({
  name: z.string().optional(),
  companyName: z.string().optional(),
  relevanceRating: z.enum(["5", "4", "3", "2", "1"]),
  coverageComplete: z.enum(["yes", "no"]),
  missingInfo: z.string().optional(),
  improvementSuggestions: z.string().optional(),
  aiImprovements: z.string().optional(),
  additionalComments: z.string().optional(),
})

