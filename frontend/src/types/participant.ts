import {User} from "@/types/user";

export interface Participant {
    id: string
    user: User
    role: ParticipantRole
}
export type ParticipantRole = "ADMIN" | "EDITOR" | "VIEWER"

export interface CreateParticipantRequest {
    userId: string
    role: ParticipantRole
}

export interface UpdateParticipantRequest {
    role: ParticipantRole
}
