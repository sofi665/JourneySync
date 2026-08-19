import { Loader2, Users } from "lucide-react";


import { ParticipantCard } from "./ParticipantCard";
import {Participant} from "@/types/participant";
import {EmptyState} from "@/components/empty-state";

interface ParticipantListProps {
    participants: Participant[];
    loading: boolean;
    error: string | null;
    onEdit: (participant: Participant) => void;
    onDelete: (participant: Participant) => void;
}

export function ParticipantList({
                                    participants,
                                    loading,
                                    error,
                                    onEdit,
                                    onDelete,
                                }: ParticipantListProps) {
    if (loading) {
        return (
            <div className="flex justify-center py-10">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive"
                role="alert"
            >
                {error}
            </div>
        );
    }

    if (participants.length === 0) {
        return (
            <EmptyState
                icon={Users}
                title="No hay participantes"
                description="Invita personas para comenzar a organizar el viaje."
            />
        );
    }

    return (
        <div className="space-y-3">
            {participants.map((participant) => (
                <ParticipantCard
                    key={participant.id}
                    participant={participant}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
