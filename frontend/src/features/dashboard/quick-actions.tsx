import { Button } from "@/components/ui/button";

export function QuickActions() {
    return (
        <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm space-y-3">
            <p className="text-sm text-slate-500">Acciones rápidas</p>

            <Button className="w-full rounded-full bg-slate-900">
                Crear viaje
            </Button>

            <Button
                variant="outline"
                className="w-full rounded-full"
            >
                Ver viajes
            </Button>

            <Button
                variant="outline"
                className="w-full rounded-full"
            >
                Invitar personas
            </Button>
        </div>
    );
}
