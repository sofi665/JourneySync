import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Definimos las combinaciones de círculos claros e iconos oscuros por variante
const variantStyles = {
    verde: {
        bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
        icon: "text-emerald-600 dark:text-emerald-400"
    },
    violeta: {
        bg: "bg-violet-500/10 dark:bg-violet-500/20",
        icon: "text-violet-600 dark:text-violet-400"
    },
    celeste: {
        bg: "bg-sky-500/10 dark:bg-sky-500/20",
        icon: "text-sky-600 dark:text-sky-400"
    },
    naranja: {
        bg: "bg-amber-500/10 dark:bg-amber-500/20",
        icon: "text-amber-600 dark:text-amber-400"
    },
};

interface Props {
    title: string;
    value: number | string;
    icon: LucideIcon;
    variant?: "verde" | "violeta" | "celeste" | "naranja";
}

export function StatCard({ title, value, icon: Icon, variant = "verde" }: Props) {
    const styles = variantStyles[variant];

    return (
        <Card className="p-4 rounded-3xl bg-card border border-border shadow-sm transition-all hover:shadow-md">
            <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
                </div>

                {/* Círculo de color perfecto (muy clarito de fondo, icono oscuro) */}
                <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors", styles.bg)}>
                    <Icon className={cn("h-5 w-5", styles.icon)} aria-hidden="true" />
                </div>
            </div>
        </Card>
    );
}
