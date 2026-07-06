import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({
                             icon: Icon,
                             title,
                             description,
                             actionLabel,
                             onAction,
                           }: EmptyStateProps) {
  return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-muted/30 px-8 py-16 text-center transition-all">
        {/* Contenedor preparado para Ilustración o Icono grande */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
          <Icon className="h-10 w-10" aria-hidden="true" />
        </div>

        <h3 className="text-xl font-bold tracking-tight text-foreground">{title}</h3>

        {description && (
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{description}</p>
        )}

        {actionLabel && onAction && (
            <Button
                onClick={onAction}
                size="default"
                className="mt-8 bg-emerald-500 text-white hover:bg-emerald-600 border-none shadow-sm font-semibold px-5"
            >
              {actionLabel}
            </Button>
        )}
      </div>
  )
}
