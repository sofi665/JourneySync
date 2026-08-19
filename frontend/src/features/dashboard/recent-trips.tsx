"use client";

import { useEffect, useState } from "react";
import { TripCard } from "@/components/trip-card";
import { tripsService } from "@/services/trip.service";
import { Trip } from "@/types/trip";

export function RecentTrips() {

    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        let active = true;

        tripsService.getTrips()
            .then((data) => {

                if (active) {
                    setTrips(data);
                }

            })
            .catch((error) => {

                console.error("Error al cargar viajes recientes:", error);

            })
            .finally(() => {

                if (active) {
                    setLoading(false);
                }

            });

        return () => {
            active = false;
        };

    }, []);

    if (loading) {
        return (
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-900">
                    Viajes recientes
                </h2>

                <p className="text-sm text-muted-foreground">
                    Cargando viajes...
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">

            <h2 className="text-lg font-semibold text-slate-900">
                Viajes recientes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {trips.slice(0, 3).map((trip) => (
                    <TripCard
                        key={trip.id}
                        trip={trip}
                    />
                ))}

            </div>

        </div>
    );
}
