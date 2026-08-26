"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Luggage, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TripCard } from "@/components/trip-card"
import { EmptyState } from "@/components/empty-state"
import { Trip } from "@/types/trip"
import { tripsService } from "@/services/trip.service"

export default function TripsPage() {
    const [trips, setTrips] = useState<Trip[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let active = true

        const fetchTrips = async () => {
            try {
                const data = await tripsService.getTrips()
                if (active) {
                    // Nos aseguramos de que data sea un array sí o sí
                    setTrips(Array.isArray(data) ? data : [])
                }
            } catch (error) {
                console.error("Error al cargar los viajes:", error)
                if (active) {
                    setTrips([])
                }
            } finally {
                if (active) {
                    setLoading(false)
                }
            }
        }

        fetchTrips()

        return () => {
            active = false
        }
    }, [])

    return (
        <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
            {/* Header con más aire y jerarquía */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/40 pb-8">
                <div className="space-y-1">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-4xl">
                        Mis viajes
                    </h1>
                    <p className="text-base text-muted-foreground">
                        Gestiona y organiza todas tus aventuras desde un solo lugar.
                    </p>
                </div>

                {/* Botón Crear Viaje Verde y estilizado */}
                <Button
                    render={<Link href="/trips/create" />}
                    nativeButton={false}
                    className="bg-emerald-500 text-white hover:bg-emerald-600 border-none rounded-full px-5 py-5 font-semibold shadow-sm sm:w-auto w-full justify-center gap-2 transition-transform active:scale-95"
                >
                    <Plus className="h-5 w-5 stroke-[2.5]" />
                    Crear viaje
                </Button>
            </div>

            {/* Contenedor del listado con excelente espaciado */}
            <div className="mt-12">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 text-muted-foreground gap-3">
                        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                        <p className="text-sm font-medium animate-pulse">Cargando tus aventuras...</p>
                    </div>
                ) : trips.length === 0 ? (
                    <EmptyState
                        icon={Luggage}
                        title="Aún no tienes viajes"
                        description="Crea tu primer viaje para empezar a planificar con tu equipo."
                    />
                ) : (
                    /* Grilla con mejor responsive, gaps amplios y sombras fluidas */
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
                        {trips.map((trip) => (
                            <TripCard key={trip.id} trip={trip} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
