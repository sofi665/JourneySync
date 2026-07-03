import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function UpcomingTripCard() {
    return (
        <Card className="p-6 rounded-3xl bg-gradient-to-br from-[#ffffff] to-[#f3f4f6] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-slate-500">Próximo viaje</p>

                    <h2 className="text-2xl font-semibold text-slate-900 mt-1">
                        Japón 2027
                    </h2>

                    <p className="text-slate-500 mt-1">
                        15 Mar - 28 Mar • 4 participantes
                    </p>
                </div>

                <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
          18 días
        </span>
            </div>

            <div className="mt-6 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-slate-900 rounded-full" />
            </div>

            <div className="flex justify-between items-center mt-6">
                <p className="text-sm text-slate-500">
                    Estado: En planificación
                </p>

                <Button className="rounded-full bg-slate-900 hover:bg-slate-800">
                    Ver viaje
                </Button>
            </div>
        </Card>
    );
}
