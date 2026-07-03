import { Button } from "@/components/ui/button";

interface Props {
    userName: string;
}

export function DashboardHero({ userName }: Props) {
    return (
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
                <h1 className="text-3xl font-semibold text-slate-900">
                    Bienvenida, {userName}
                </h1>

                <p className="text-slate-500 mt-2 max-w-xl">
                    Tu próximo viaje está más cerca de lo que crees. Organiza,
                    colabora y planifica todo en un solo lugar.
                </p>
            </div>

            <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6">
                Nuevo viaje
            </Button>
        </div>
    );
}
