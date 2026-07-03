import api from "./api";
import {
    CreateTripRequest,
    Trip,
    TripDetail,
} from "@/types/trip";

export const tripsService = {

    async getTrips(): Promise<Trip[]> {

        const response = await api.get("/trips");

        return response.data;

    },

    async getTripById(id: string): Promise<TripDetail> {

        const response = await api.get(`/trips/${id}`);

        return response.data;

    },

    async createTrip(request: CreateTripRequest): Promise<Trip> {

        const response = await api.post("/trips", request);

        return response.data;

    },

    async updateTrip(
        id: string,
        request: CreateTripRequest
    ): Promise<Trip> {

        const response = await api.put(`/trips/${id}`, request);

        return response.data;

    },

    async deleteTrip(id: string): Promise<void> {

        await api.delete(`/trips/${id}`);

    }

};
