import { Button } from "@/components/ui/button";

export function QuickActions() {
    return (
        <div className="bg-card rounded-3xl border border-border p-4 shadow-sm space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Acciones rápidas</p>

            {/* Botón principal verde */}
            <Button className="w-full rounded-full bg-emerald-500 text-white hover:bg-emerald-600 border-none shadow-sm font-semibold">
                Crear viaje
            </Button>

            {/* Los otros en variante outline */}
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
