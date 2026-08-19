export type ParticipantRole = "ADMIN" | "EDITOR" | "VIEWER"

export interface ParticipantUser {
    id: string
    name: string
    email: string
}

export interface Participant {
    id: string
    user: ParticipantUser
    role: ParticipantRole
}

export interface CreateParticipantRequest {
    userId: string
    role: ParticipantRole
}

export interface UpdateParticipantRequest {
    role: ParticipantRole
}
