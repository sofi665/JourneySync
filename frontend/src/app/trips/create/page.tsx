"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {tripsService} from "@/services/trip.service";

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
        <section className="mx-auto max-w-2xl">
            <Button
                render={<Link href="/trips" />}
                nativeButton={false}
                variant="ghost"
                size="sm"
                className="mb-4 -ml-2"
            >
                <ArrowLeft className="h-4 w-4" />
                Volver a mis viajes
            </Button>

            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Crear viaje
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
                Define los datos principales de tu próxima aventura.
            </p>

            <Card className="mt-6">
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title">Título</Label>
                            <Input
                                id="title"
                                required
                                placeholder="Ej. Viaje a Italia"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="description">Descripción</Label>
                            <Textarea
                                id="description"
                                rows={4}
                                placeholder="Cuéntanos de qué trata este viaje..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="startDate">Fecha inicio</Label>
                                <Input
                                    id="startDate"
                                    type="date"
                                    required
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="endDate">Fecha fin</Label>
                                <Input
                                    id="endDate"
                                    type="date"
                                    required
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-sm text-destructive" role="alert">
                                {error}
                            </p>
                        )}

                        <div className="flex items-center gap-3">
                            <Button type="submit" disabled={loading}>
                                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                                Crear viaje
                            </Button>
                            <Button
                                render={<Link href="/trips" />}
                                nativeButton={false}
                                variant="outline"
                                type="button"
                            >
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </section>
    )
}
