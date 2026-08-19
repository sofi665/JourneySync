import { useCallback, useEffect, useState } from "react";

import { participantService } from "@/services/participant.service";
import {
    Participant,
    CreateParticipantRequest,
    UpdateParticipantRequest,
} from "@/features/participants/types";

export function useParticipants(tripId: string) {

    const [participants, setParticipants] = useState<Participant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadParticipants = useCallback(async () => {

        try {

            setLoading(true);
            setError(null);

            const data =
                await participantService.getParticipants(tripId);

            setParticipants(data);

        } catch {

            setError("No se pudieron cargar los participantes.");

        } finally {

            setLoading(false);

        }

    }, [tripId]);



    useEffect(() => {

        loadParticipants();

    }, [loadParticipants]);



    const createParticipant = async (
        request: CreateParticipantRequest
    ) => {

        const participant =
            await participantService.createParticipant(
                tripId,
                request
            );

        setParticipants((current) => [
            ...current,
            participant,
        ]);

        return participant;

    };



    const updateParticipant = async (
        participantId: string,
        request: UpdateParticipantRequest
    ) => {

        const updated =
            await participantService.updateParticipant(
                tripId,
                participantId,
                request
            );

        setParticipants((current) =>
            current.map((participant) =>
                participant.id === participantId
                    ? updated
                    : participant
            )
        );

        return updated;

    };



    const deleteParticipant = async (
        participantId: string
    ) => {

        await participantService.deleteParticipant(
            tripId,
            participantId
        );

        setParticipants((current) =>
            current.filter(
                (participant) =>
                    participant.id !== participantId
            )
        );

    };



    return {

        participants,

        loading,

        error,

        reload: loadParticipants,

        createParticipant,

        updateParticipant,

        deleteParticipant,

    };

}
