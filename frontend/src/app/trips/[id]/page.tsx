"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import {
    ArrowLeft,
    CalendarDays,
    MapPin,
    Loader2,
    CalendarPlus,
    Wallet,
    ListChecks,
    Plus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

import { formatDate } from "@/lib/format"
import { tripsService } from "@/services/trip.service"
import { TripDetail } from "@/types/trip"

export default function TripDetailPage({
                                           params,
                                       }: {
    params: Promise<{ id: string }>
}) {
    const { id } = use(params)

    const [trip, setTrip] = useState<TripDetail | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let active = true

        tripsService.getTripById(id).then((data) => {
            if (active) {
                setTrip(data)
                setLoading(false)
            }
        })

        return () => {
            active = false
        }
    }, [id])


    if (loading) {
        return (
            <div className="flex items-center justify-center py-20 text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin" />
            </div>
        )
    }


    if (!trip) {
        return (
            <div className="py-20 text-center">
                <p className="text-foreground">
                    No encontramos este viaje.
                </p>

                <Button
                    render={<Link href="/trips" />}
                    nativeButton={false}
                    variant="outline"
                    className="mt-4"
                >
                    Volver a mis viajes
                </Button>
            </div>
        )
    }


    return (
        <section className="flex flex-col gap-8">

            <Button
                render={<Link href="/trips" />}
                nativeButton={false}
                variant="ghost"
                size="sm"
                className="-ml-2 w-fit"
            >
                <ArrowLeft className="h-4 w-4" />
                Volver a mis viajes
            </Button>


            {/* Header */}
            <Card className="overflow-hidden">

                <div className="h-2 w-full bg-primary" />

                <CardContent className="pt-6">

                    <h1 className="text-2xl font-semibold tracking-tight text-card-foreground text-balance">
                        {trip.title}
                    </h1>


                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                        {trip.description}
                    </p>


                    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground">

                        <span className="flex items-center gap-2">
                            <CalendarDays
                                className="h-4 w-4 text-primary"
                                aria-hidden="true"
                            />

                            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                        </span>

                    </div>

                </CardContent>

            </Card>



            {/* Activities */}
            <TripSection
                icon={MapPin}
                title="Actividades"
                action={
                    <Button size="sm" variant="outline">
                        <CalendarPlus className="h-4 w-4" />
                        Agregar actividad
                    </Button>
                }
            >
                <EmptyState
                    icon={CalendarPlus}
                    title="No hay actividades todavía"
                    description="Agrega lugares y planes para organizar el itinerario del viaje."
                />

            </TripSection>



            {/* Expenses */}
            <TripSection
                icon={Wallet}
                title="Gastos"
                action={
                    <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4" />
                        Agregar gasto
                    </Button>
                }
            >

                <EmptyState
                    icon={Wallet}
                    title="No hay gastos todavía"
                    description="Registra los gastos del viaje para llevar un control."
                />

            </TripSection>



            {/* Checklist */}
            <TripSection
                icon={ListChecks}
                title="Checklist"
                action={
                    <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4" />
                        Agregar tarea
                    </Button>
                }
            >

                <EmptyState
                    icon={ListChecks}
                    title="No hay tareas todavía"
                    description="Crea una lista de pendientes para preparar el viaje."
                />

            </TripSection>


        </section>
    )
}



function TripSection({
                         icon: Icon,
                         title,
                         action,
                         children,
                     }: {
    icon: typeof MapPin
    title: string
    action?: React.ReactNode
    children: React.ReactNode
}) {

    return (
        <Card>

            <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0">

                <h2 className="flex items-center gap-2 text-lg font-semibold text-card-foreground">

                    <Icon
                        className="h-5 w-5 text-primary"
                        aria-hidden="true"
                    />

                    {title}

                </h2>


                {action}

            </CardHeader>


            <CardContent>
                {children}
            </CardContent>

        </Card>
    )
}



function EmptyState({
                        icon: Icon,
                        title,
                        description,
                    }: {
    icon: typeof MapPin
    title: string
    description: string
}) {

    return (
        <div className="flex flex-col items-center justify-center py-10 text-center">

            <Icon className="mb-3 h-8 w-8 text-muted-foreground" />

            <h3 className="text-sm font-medium text-foreground">
                {title}
            </h3>

            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                {description}
            </p>

        </div>
    )
}
