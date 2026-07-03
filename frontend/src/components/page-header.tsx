import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
    title: string;
    description?: string;
    actions?: ReactNode;
    className?: string;
}

export function PageHeader({
                               title,
                               description,
                               actions,
                               className,
                           }: PageHeaderProps) {
    return (
        <header
            className={cn(
                "flex flex-col gap-6 md:flex-row md:items-center md:justify-between",
                className
            )}
        >
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    {title}
                </h1>

                {description && (
                    <p className="max-w-2xl text-base text-slate-600">
                        {description}
                    </p>
                )}
            </div>

            {actions && (
                <div className="flex shrink-0 items-center gap-3">
                    {actions}
                </div>
            )}
        </header>
    );
}
