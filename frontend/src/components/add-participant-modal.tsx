"use client"

import { useState } from "react"
import { Loader2, UserPlus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    CreateParticipantRequest,
    ParticipantRole,
} from "@/types/participant"

interface AddParticipantModalProps {
    open: boolean
    onClose: () => void
    onSubmit: (request: CreateParticipantRequest) => Promise<void>
}

const roleOptions: { value: ParticipantRole; label: string }[] = [
    { value: "ADMIN", label: "Admin" },
    { value: "EDITOR", label: "Editor" },
    { value: "VIEWER", label: "Visualizador" },
]

export function AddParticipantModal({
    open,
    onClose,
    onSubmit,
}: AddParticipantModalProps) {
    const [userId, setUserId] = useState("")
    const [role, setRole] = useState<ParticipantRole>("VIEWER")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    if (!open) {
        return null
    }

    function handleClose() {
        if (loading) {
            return
        }

        setUserId("")
        setRole("VIEWER")
        setError(null)
        onClose()
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            await onSubmit({ userId, role })
            setUserId("")
            setRole("VIEWER")
            onClose()
        } catch {
            setError("No pudimos agregar al participante. Inténtalo de nuevo.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <button
                type="button"
                aria-label="Cerrar modal"
                className="absolute inset-0 bg-black/50"
                onClick={handleClose}
            />

            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="add-participant-title"
                className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lg"
            >
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <UserPlus className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div>
                            <h2
                                id="add-participant-title"
                                className="text-lg font-semibold text-card-foreground"
                            >
                                Agregar participante
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Invita a alguien a colaborar en este viaje.
                            </p>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={handleClose}
                        disabled={loading}
                        aria-label="Cerrar"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="participant-user-id">ID de usuario</Label>
                        <Input
                            id="participant-user-id"
                            required
                            placeholder="Ej. 550e8400-e29b-41d4-a716-446655440000"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="h-10 rounded-xl"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="participant-role">Rol</Label>
                        <select
                            id="participant-role"
                            required
                            value={role}
                            onChange={(e) =>
                                setRole(e.target.value as ParticipantRole)
                            }
                            className="h-10 w-full rounded-xl border border-input bg-transparent px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                        >
                            {roleOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {error && (
                        <div
                            className="rounded-xl border border-destructive/20 bg-destructive/10 p-3.5 text-sm font-medium text-destructive"
                            role="alert"
                        >
                            {error}
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>

                        <Button type="submit" disabled={loading}>
                            {loading && (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            )}
                            Agregar participante
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
