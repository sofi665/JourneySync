import { Compass } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
    className?: string
    showText?: boolean
}

export function Logo({ className, showText = true }: LogoProps) {
    return (
        <span className={cn("flex items-center gap-2 select-none", className)}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
        <Compass className="h-4.5 w-4.5" aria-hidden="true" />
      </span>
            {showText && (
                <span className="text-base font-bold tracking-tight text-foreground">
          Journey<span className="text-emerald-500">Sync</span>
        </span>
            )}
    </span>
    )
}
