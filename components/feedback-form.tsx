"use client"

import * as React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { InteractiveStarRating } from "./interactive-star-rating"
import { CheckIcon } from "lucide-react"

import { feedbackFormAction } from "@/lib/actions"

export function FeedbackForm({ className }: React.ComponentProps<typeof Card>) {
  const [state, formAction, pending] = React.useActionState(feedbackFormAction, {
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
    success: false,
    errors: null,
  })

  const [showMissingInfo, setShowMissingInfo] = React.useState(false)

  const ratingOptions = [
    { value: "5", label: "Highly Relevant", stars: 5 },
    { value: "4", label: "Relevant", stars: 4 },
    { value: "3", label: "Neutral", stars: 3 },
    { value: "2", label: "Somewhat Relevant", stars: 2 },
    { value: "1", label: "Not Relevant", stars: 1 },
  ]

  return (
    <Card className={cn("w-full max-w-2xl mx-auto rounded-xl overflow-hidden", className)}>
      <CardHeader className="text-center space-y-2">
        <div className="flex justify-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Supportiyo_Logo-removebg-preview-n5KXB0hDaEvDSuWY3z4jT10oJIxo3k.png"
            alt="Supportiyo.AI Logo"
            width={300}
            height={150}
            className="mb-0"
          />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#6F42C1] to-[#3B82F6] text-transparent bg-clip-text px-4 py-2 rounded-lg">
            Supportiyo AI Call Demo Feedback Form
          </h1>
          <p className="text-muted-foreground text-base">
            We value your feedback! Please take a few moments to share your thoughts on your experience with the
            Supportiyo AI Call Demo.
          </p>
        </div>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-8">
          {state.success ? (
            <p className="text-muted-foreground flex items-center gap-2 text-sm">
              <CheckIcon className="size-4" />
              Thank you for your feedback!
            </p>
          ) : null}

          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#6F42C1] font-semibold">
              1. Your Name <span className="text-muted-foreground font-normal">(Optional)</span>
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              disabled={pending}
              defaultValue={state.defaultValues.name}
              className="border-[#DCC9F5] focus-visible:ring-[#6F42C1] rounded-md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-[#6F42C1] font-semibold">
              2. Your Company Name <span className="text-muted-foreground font-normal">(Optional)</span>
            </Label>
            <Input
              id="companyName"
              name="companyName"
              placeholder="Acme Corp"
              disabled={pending}
              defaultValue={state.defaultValues.companyName}
              className="border-[#DCC9F5] focus-visible:ring-[#6F42C1] rounded-md"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#6F42C1] font-semibold">
              3. How relevant was the AI demo for your business needs?
            </Label>
            <InteractiveStarRating
              name="relevanceRating"
              options={ratingOptions}
              onChange={(value) => {
                const formData = new FormData()
                formData.append("relevanceRating", value)
                formAction(formData)
              }}
              value={state.defaultValues.relevanceRating}
              disabled={pending}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#6F42C1] font-semibold">
              4. Did the AI cover all the information you need from your customers?
            </Label>
            <RadioGroup
              name="coverageComplete"
              value={state.defaultValues.coverageComplete}
              onValueChange={(value) => {
                setShowMissingInfo(value === "no")
                const formData = new FormData()
                formData.append("coverageComplete", value)
                formAction(formData)
              }}
              disabled={pending}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="coverage-yes" />
                <Label htmlFor="coverage-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="coverage-no" />
                <Label htmlFor="coverage-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {showMissingInfo && (
            <div className="space-y-2 pl-6">
              <Label htmlFor="missingInfo" className="text-[#6F42C1]">
                Please specify what's missing:
              </Label>
              <Textarea
                id="missingInfo"
                name="missingInfo"
                placeholder="Tell us what information was missing..."
                disabled={pending}
                defaultValue={state.defaultValues.missingInfo}
                className="border-[#DCC9F5] focus-visible:ring-[#6F42C1] rounded-md"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="improvementSuggestions" className="text-[#6F42C1] font-semibold">
              5. How can we improve the call structure for better customer engagement?
            </Label>
            <Textarea
              id="improvementSuggestions"
              name="improvementSuggestions"
              placeholder="Share your suggestions..."
              disabled={pending}
              defaultValue={state.defaultValues.improvementSuggestions}
              className="border-[#DCC9F5] focus-visible:ring-[#6F42C1] rounded-md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aiImprovements" className="text-[#6F42C1] font-semibold">
              6. Were there any areas where the AI struggled or could be improved?
            </Label>
            <Textarea
              id="aiImprovements"
              name="aiImprovements"
              placeholder="Tell us about any challenges or areas for improvement..."
              disabled={pending}
              defaultValue={state.defaultValues.aiImprovements}
              className="border-[#DCC9F5] focus-visible:ring-[#6F42C1] rounded-md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalComments" className="text-[#6F42C1] font-semibold">
              7. Any additional comments or suggestions?
            </Label>
            <Textarea
              id="additionalComments"
              name="additionalComments"
              placeholder="Share any other thoughts..."
              disabled={pending}
              defaultValue={state.defaultValues.additionalComments}
              className="border-[#DCC9F5] focus-visible:ring-[#6F42C1] rounded-md"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={pending}
            className="w-full bg-gradient-to-r from-[#6F42C1] to-[#3B82F6] hover:from-[#5D36A4] hover:to-[#2563EB] text-white font-semibold py-6 rounded-full"
          >
            {pending ? "Submitting..." : "Submit Feedback"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

