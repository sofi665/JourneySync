"use client";


import { useCallback, useEffect, useState } from "react";
import {
    CreateParticipantRequest,
    Participant,
    UpdateParticipantRequest,
} from "@/types/participant";
import { participantsService } from "@/services/participant.service";


export function useParticipants(tripId: string) {


    const [participants, setParticipants] = useState<Participant[]>([]);


    const [loading, setLoading] = useState(true);


    const [error, setError] = useState<string | null>(null);



    const fetchParticipants = useCallback(async () => {


        try {


            setLoading(true);


            setError(null);


            const data = await participantsService.getParticipants(tripId);


            setParticipants(data);


        } catch {


            setError(
                "No se pudieron cargar los participantes"
            );


        } finally {


            setLoading(false);


        }


    }, [tripId]);



    useEffect(() => {


        fetchParticipants();


    }, [fetchParticipants]);



    const createParticipant = async (
        request: CreateParticipantRequest
    ): Promise<Participant> => {


        const created = await participantsService.createParticipant(
            tripId,
            request
        );


        setParticipants((prev) => [...prev, created]);


        return created;


    };



    const updateParticipant = async (
        participantId: string,
        request: UpdateParticipantRequest
    ): Promise<Participant> => {


        const updated = await participantsService.updateParticipant(
            tripId,
            participantId,
            request
        );


        setParticipants((prev) =>
            prev.map((participant) =>
                participant.id === participantId
                    ? updated
                    : participant
            )
        );


        return updated;


    };



    const deleteParticipant = async (
        participantId: string
    ): Promise<void> => {


        await participantsService.deleteParticipant(
            tripId,
            participantId
        );


        setParticipants((prev) =>
            prev.filter(
                (participant) => participant.id !== participantId
            )
        );


    };



    return {


        participants,

        loading,

        error,

        createParticipant,

        updateParticipant,

        deleteParticipant,

        refetch: fetchParticipants,

    };


}
