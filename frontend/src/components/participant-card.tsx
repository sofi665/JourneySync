import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getInitials } from "@/lib/format"
import { cn } from "@/lib/utils"
import { Participant, ParticipantRole } from "@/types/participant"

// Mapeo directo a las variantes semánticas existentes de tu Badge
const roleVariants: Record<ParticipantRole, "success" | "info" | "neutral"> = {
  ADMIN: "success",  // Verde
  EDITOR: "info",    // Violeta
  VIEWER: "neutral", // Gris
}

interface ParticipantCardProps {
  participant: Participant
}

export function ParticipantCard({ participant }: ParticipantCardProps) {
  const { user, role } = participant

  return (
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-xs transition-all hover:shadow-sm">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar className="h-10 w-10 border border-border">
            <AvatarFallback className="bg-muted text-muted-foreground text-sm font-medium">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-card-foreground">
              {user.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <Badge variant={roleVariants[role]} className="shrink-0 capitalize font-semibold">
          {role.toLowerCase()}
        </Badge>
      </div>
  )
}
