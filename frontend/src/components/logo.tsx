import { Compass } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  showText?: boolean
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <Compass className="h-5 w-5" aria-hidden="true" />
      </span>
      {showText && (
        <span className="text-lg font-semibold tracking-tight text-foreground">
          Journey<span className="text-primary">Sync</span>
        </span>
      )}
    </span>
  )
}
