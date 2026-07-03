import {User} from "@/types/user";

export interface Participant {
    id: string
    user: User
    role: ParticipantRole
}
export type ParticipantRole = "ADMIN" | "EDITOR" | "VIEWER"
