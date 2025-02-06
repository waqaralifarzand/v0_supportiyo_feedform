"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface RatingOption {
  value: string
  label: string
  stars: number
}

interface InteractiveStarRatingProps {
  name: string
  options: RatingOption[]
  onChange: (value: string) => void
  value?: string
  disabled?: boolean
}

export function InteractiveStarRating({ name, options, onChange, value, disabled }: InteractiveStarRatingProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div
          key={option.value}
          className={`flex items-center gap-4 p-2 rounded-md transition-colors duration-200 ${
            value === option.value ? "bg-[#F3EEFF]" : "hover:bg-[#F3EEFF]/50"
          }`}
          onMouseEnter={() => setHoveredRow(option.value)}
          onMouseLeave={() => setHoveredRow(null)}
          onClick={() => !disabled && onChange(option.value)}
        >
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`w-6 h-6 transition-all duration-200 ${
                  (value === option.value || hoveredRow === option.value) && index < option.stars
                    ? "fill-[#6F42C1] text-[#6F42C1]"
                    : "fill-transparent text-[#DCC9F5]"
                } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                strokeWidth={1.5}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-700">{option.label}</span>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="sr-only"
            disabled={disabled}
          />
        </div>
      ))}
    </div>
  )
}

