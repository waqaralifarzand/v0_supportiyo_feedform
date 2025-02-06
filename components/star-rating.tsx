"use client"

import { Star } from "lucide-react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"

interface StarRatingProps {
  name: string
  onChange?: (value: string) => void
  value?: string
  disabled?: boolean
}

export function StarRating({ name, onChange, value, disabled }: StarRatingProps) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)

  const ratings = [
    { value: "5", label: "Highly relevant" },
    { value: "4", label: "Relevant" },
    { value: "3", label: "Neutral" },
    { value: "2", label: "Somewhat relevant" },
    { value: "1", label: "Not relevant" },
  ]

  return (
    <RadioGroup name={name} value={value} onValueChange={onChange} className="flex flex-col gap-3" disabled={disabled}>
      {ratings.map((rating) => (
        <div
          key={rating.value}
          className="flex items-center space-x-2"
          onMouseEnter={() => setHoveredRating(Number.parseInt(rating.value))}
          onMouseLeave={() => setHoveredRating(null)}
        >
          <RadioGroupItem value={rating.value} id={`rating-${rating.value}`} className="sr-only" />
          <Label htmlFor={`rating-${rating.value}`} className="flex items-center gap-2 cursor-pointer">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 transition-all duration-200 ${
                    i < (hoveredRating ?? Number.parseInt(value || "0"))
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({rating.label})</span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}

