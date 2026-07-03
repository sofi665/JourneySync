"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Luggage, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TripCard } from "@/components/trip-card"
import { EmptyState } from "@/components/empty-state"
import {Trip} from "@/types/trip";
import {tripsService} from "@/services/trip.service";



export default function TripsPage() {
    const [trips, setTrips] = useState<Trip[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let active = true
        tripsService.getTrips().then((data) => {
            if (active) {
                setTrips(data)
                setLoading(false)
            }
        })
        return () => {
            active = false
        }
    }, [])

    return (
        <section>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                        Mis viajes
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Gestiona y organiza todas tus aventuras desde un solo lugar.
                    </p>
                </div>
                <Button render={<Link href="/trips/create" />} nativeButton={false}>
                    <Plus className="h-4 w-4" />
                    Crear viaje
                </Button>
            </div>

            <div className="mt-8">
                {loading ? (
                    <div className="flex items-center justify-center py-20 text-muted-foreground">
                        <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                ) : trips.length === 0 ? (
                    <EmptyState
                        icon={Luggage}
                        title="Aún no tienes viajes"
                        description="Crea tu primer viaje para empezar a planificar con tu equipo."
                    />
                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {trips.map((trip) => (
                            <TripCard key={trip.id} trip={trip} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
