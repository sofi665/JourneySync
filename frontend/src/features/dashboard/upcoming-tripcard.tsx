import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function UpcomingTripCard() {
    return (
        <Card className="p-6 rounded-3xl bg-gradient-to-br from-card to-muted/30 border border-border shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-muted-foreground font-medium">Próximo viaje</p>

                    <h2 className="text-2xl font-bold text-foreground mt-1 tracking-tight">
                        Japón 2027
                    </h2>

                    <p className="text-sm text-muted-foreground mt-1">
                        15 Mar - 28 Mar • 4 participantes
                    </p>
                </div>

                {/* Usamos el sistema de Badge semántico (naranja/warning) que definimos antes */}
                <Badge variant="warning" className="px-3 py-1 text-xs font-semibold rounded-full">
                    18 días
                </Badge>
            </div>

            {/* Barra de progreso limpia sin slate */}
            <div className="mt-6 h-2 bg-muted rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-emerald-500 rounded-full" />
            </div>

            <div className="flex justify-between items-center mt-6">
                <p className="text-sm text-muted-foreground font-medium">
                    Estado: <span className="text-foreground">En planificación</span>
                </p>

                <Button variant="default" className="rounded-full px-5 shadow-sm">
                    Ver viaje
                </Button>
            </div>
        </Card>
    );
}
