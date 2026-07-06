"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Sparkles, CalendarRange } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { tripsService } from "@/services/trip.service"

export default function CreateTripPage() {
    const router = useRouter()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)

        if (endDate && startDate && endDate < startDate) {
            setError("La fecha de fin no puede ser anterior a la de inicio.")
            return
        }

        setLoading(true)
        try {
            const trip = await tripsService.createTrip({
                title,
                description,
                startDate,
                endDate,
            })
            router.push(`/trips/${trip.id}`)
        } catch {
            setError("No pudimos crear el viaje. Inténtalo de nuevo.")
            setLoading(false)
        }
    }

    return (
        <section className="mx-auto max-w-2xl px-4 py-8 md:py-12 animate-fade-in">
            {/* Botón superior de retroceso integrado */}
            <div className="mb-6">
                <Button
                    render={<Link href="/trips" />}
                    nativeButton={false}
                    variant="ghost"
                    size="default"
                    className="gap-2 -ml-3 text-muted-foreground hover:text-foreground rounded-full px-4"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Volver a mis viajes
                </Button>
            </div>

            {/* Cabecera limpia con mayor presencia */}
            <div className="space-y-1.5 mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                    Crear viaje
                </h1>
                <p className="text-base text-muted-foreground">
                    Define los datos principales de tu próxima aventura.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Bloque 1: Información General del Viaje */}
                <Card className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden">
                    <div className="border-b border-border/60 bg-muted/20 px-6 py-4 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-emerald-500" />
                        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Detalles del Destino</h2>
                    </div>
                    <CardContent className="p-6 flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title" className="text-sm font-semibold text-foreground/90 pl-0.5">Título del viaje</Label>
                            {/* Inputs más grandes y amigables: h-11 */}
                            <Input
                                id="title"
                                required
                                placeholder="Ej. Aventura en Italia y Grecia"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="h-11 px-4 text-sm rounded-xl focus-visible:ring-emerald-500/20"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="description" className="text-sm font-semibold text-foreground/90 pl-0.5">Descripción</Label>
                            <Textarea
                                id="description"
                                rows={4}
                                placeholder="Cuéntanos un poco sobre el itinerario, los lugares que quieres visitar o las notas importantes para tu equipo..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="px-4 py-3 text-sm rounded-xl resize-none focus-visible:ring-emerald-500/20"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Bloque 2: Cronograma / Fechas */}
                <Card className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden">
                    <div className="border-b border-border/60 bg-muted/20 px-6 py-4 flex items-center gap-2">
                        <CalendarRange className="h-4 w-4 text-emerald-500" />
                        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">¿Cuándo viajan?</h2>
                    </div>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="startDate" className="text-sm font-semibold text-foreground/90 pl-0.5">Fecha de inicio</Label>
                                <Input
                                    id="startDate"
                                    type="date"
                                    required
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="h-11 px-4 text-sm rounded-xl focus-visible:ring-emerald-500/20"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="endDate" className="text-sm font-semibold text-foreground/90 pl-0.5">Fecha de finalización</Label>
                                <Input
                                    id="endDate"
                                    type="date"
                                    required
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="h-11 px-4 text-sm rounded-xl focus-visible:ring-emerald-500/20"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {error && (
                    <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-sm text-destructive font-medium" role="alert">
                        {error}
                    </div>
                )}

                {/* Botones de acción unificados */}
                <div className="flex items-center justify-end gap-3 pt-2">
                    <Button
                        render={<Link href="/trips" />}
                        nativeButton={false}
                        variant="outline"
                        type="button"
                        className="rounded-full px-5 h-11"
                    >
                        Cancelar
                    </Button>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="bg-emerald-500 text-white hover:bg-emerald-600 border-none rounded-full px-6 h-11 font-semibold shadow-sm justify-center gap-2"
                    >
                        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                        Crear viaje
                    </Button>
                </div>
            </form>
        </section>
    )
}
