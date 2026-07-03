import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getInitials } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Participant, ParticipantRole } from "@/lib/types"

const roleStyles: Record<ParticipantRole, string> = {
  ADMIN: "bg-primary text-primary-foreground",
  EDITOR: "bg-accent text-accent-foreground",
  VIEWER: "bg-secondary text-secondary-foreground",
}

interface ParticipantCardProps {
  participant: Participant
}

export function ParticipantCard({ participant }: ParticipantCardProps) {
  const { user, role } = participant

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4">
      <div className="flex min-w-0 items-center gap-3">
        <Avatar className="h-10 w-10 border border-border">
          <AvatarFallback className="bg-accent text-accent-foreground text-sm font-medium">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-card-foreground">
            {user.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>
      <Badge className={cn("shrink-0 border-transparent", roleStyles[role])}>
        {role}
      </Badge>
    </div>
  )
}
