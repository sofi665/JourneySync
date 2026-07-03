import Link from "next/link"
import { CalendarDays, Users, ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/format"
import type { Trip } from "@/lib/types"

interface TripCardProps {
  trip: Trip
}

export function TripCard({ trip }: TripCardProps) {
  return (
    <Card className="group flex h-full flex-col transition-shadow hover:shadow-md">
      <CardHeader>
        <h3 className="text-lg font-semibold leading-tight text-card-foreground text-balance">
          {trip.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {trip.description}
        </p>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm text-foreground">
          <CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>
            {formatDate(trip.startDate)} &ndash; {formatDate(trip.endDate)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Users className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>
            {trip.participantCount}{" "}
            {trip.participantCount === 1 ? "participante" : "participantes"}
          </span>
        </div>
      </CardContent>

      <CardFooter className="mt-auto">
        <Button
          render={<Link href={`/trips/${trip.id}`} />}
          nativeButton={false}
          className="w-full"
        >
          Ver viaje
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
