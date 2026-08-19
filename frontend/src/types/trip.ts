import {Participant} from "@/types/participant";
import {Activity} from "@/types/activity";
import {Expense} from "@/types/expense";
import {ChecklistItem} from "@/types/checklist";

export interface Trip {
    id: string
    title: string
    description: string
    startDate: string // ISO date string (YYYY-MM-DD)
    endDate: string // ISO date string (YYYY-MM-DD)
    participantCount: number
}

export interface TripDetail extends Trip {
    participants: Participant[]
    activities: Activity[]
    expenses: Expense[]
    checklist: ChecklistItem[]
}


export interface CreateTripRequest {

    title: string;

    description: string;

    startDate: string;

    endDate: string;

}
