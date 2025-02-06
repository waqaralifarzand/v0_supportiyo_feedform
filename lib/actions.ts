"use server"

import { feedbackFormSchema } from "@/lib/schema"
import { z } from "zod"

export async function feedbackFormAction(_prevState: unknown, formData: FormData) {
  const defaultValues = z.record(z.string(), z.string()).parse(Object.fromEntries(formData.entries()))

  try {
    const data = feedbackFormSchema.parse(Object.fromEntries(formData))

    // This simulates a slow response like a form submission.
    // Replace this with your actual form submission logic.
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log(data)

    return {
      defaultValues: {
        name: "",
        companyName: "",
        relevanceRating: "",
        coverageComplete: "",
        missingInfo: "",
        improvementSuggestions: "",
        aiImprovements: "",
        additionalComments: "",
      },
      success: true,
      errors: null,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        defaultValues,
        success: false,
        errors: Object.fromEntries(
          Object.entries(error.flatten().fieldErrors).map(([key, value]) => [key, value?.join(", ")]),
        ),
      }
    }

    return {
      defaultValues,
      success: false,
      errors: null,
    }
  }
}

