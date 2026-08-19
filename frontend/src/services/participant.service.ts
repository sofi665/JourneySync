import api from "./api";
import {
    Participant,
    CreateParticipantRequest,
    UpdateParticipantRequest,
} from "@/types/participant";
export const participantService = {

    async getParticipants(tripId: string): Promise<Participant[]> {

        const response = await api.get(
            `/trips/${tripId}/participants`
        );

        return response.data;

    },

    async createParticipant(
        tripId: string,
        request: CreateParticipantRequest
    ): Promise<Participant> {

        const response = await api.post(
            `/trips/${tripId}/participants`,
            request
        );

        return response.data;

    },

    async updateParticipant(
        tripId: string,
        participantId: string,
        request: UpdateParticipantRequest
    ): Promise<Participant> {

        const response = await api.put(
            `/trips/${tripId}/participants/${participantId}`,
            request
        );

        return response.data;

    },

    async deleteParticipant(
        tripId: string,
        participantId: string
    ): Promise<void> {

        await api.delete(
            `/trips/${tripId}/participants/${participantId}`
        );

    }

};
