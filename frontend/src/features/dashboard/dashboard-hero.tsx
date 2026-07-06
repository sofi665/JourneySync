import { Button } from "@/components/ui/button";

interface Props {
    userName: string;
}

export function DashboardHero({ userName }: Props) {
    return (
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 py-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Bienvenida, {userName}
                </h1>

                <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">
                    Tu próximo viaje está más cerca de lo que crees. Organiza,
                    colabora y planifica todo en un solo lugar.
                </p>
            </div>

            <Button variant="default" className="rounded-full px-6 shadow-sm">
                Nuevo viaje
            </Button>
        </div>
    );
}
