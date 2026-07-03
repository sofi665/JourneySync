import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
    children: ReactNode;
    className?: string;
}

export function PageContainer({
                                  children,
                                  className,
                              }: PageContainerProps) {
    return (
        <main
            className={cn(
                "mx-auto w-full max-w-7xl px-6 py-8",
                className
            )}
        >
            {children}
        </main>
    );
}
