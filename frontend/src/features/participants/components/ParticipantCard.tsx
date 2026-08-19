import { Pencil, Trash2 } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {Participant} from "@/types/participant";



interface ParticipantCardProps {
    participant: Participant;
    onEdit?: (participant: Participant) => void;
    onDelete?: (participant: Participant) => void;
}

const roleLabels = {
    ADMIN: "Administrador",
    EDITOR: "Editor",
    VIEWER: "Visualizador",
} as const;

const roleVariants = {
    ADMIN: "warning",
    EDITOR: "info",
    VIEWER: "neutral",
} as const;

export function ParticipantCard({
                                    participant,
                                    onEdit,
                                    onDelete,
                                }: ParticipantCardProps) {
    return (
        <div className="flex items-center justify-between rounded-xl border bg-card p-4 shadow-sm">

            <div className="flex items-center gap-4">

                <Avatar>
                    {participant.user.name.charAt(0).toUpperCase()}
                </Avatar>

                <div>

                    <p className="font-medium text-card-foreground">
                        {participant.user.name}
                    </p>

                    <p className="text-sm text-muted-foreground">
                        {participant.user.email}
                    </p>

                    <Badge
                        variant={roleVariants[participant.role]}
                        className="mt-2"
                    >
                        {roleLabels[participant.role]}
                    </Badge>

                </div>

            </div>

            <div className="flex gap-2">

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit?.(participant)}
                >
                    <Pencil className="h-4 w-4" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete?.(participant)}
                >
                    <Trash2 className="h-4 w-4 text-destructive" />
                </Button>

            </div>

        </div>
    );
}
