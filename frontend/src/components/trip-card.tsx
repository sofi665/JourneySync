import Link from "next/link"
import { CalendarDays, Users, ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/format"
import { Trip } from "@/types/trip"

interface TripCardProps {
    trip: Trip
}

export function TripCard({ trip }: TripCardProps) {
    return (
        <Card className="group flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="gap-1.5">
                <h3 className="text-xl font-bold tracking-tight text-card-foreground text-balance group-hover:text-primary transition-colors">
                    {trip.title}
                </h3>
                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {trip.description}
                </p>
            </CardHeader>

            <CardContent className="flex flex-col gap-3.5 pb-4">
                {/* Fechas más pequeñas y sutiles */}
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5 text-emerald-500/80" aria-hidden="true" />
                    <span>
            {formatDate(trip.startDate)} &ndash; {formatDate(trip.endDate)}
          </span>
                </div>

                {/* Participantes usando Badge */}
                <div className="flex items-center gap-2">
                    <Badge variant="neutral" className="gap-1.5 py-1 px-2.5 text-xs">
                        <Users className="h-3 w-3" aria-hidden="true" />
                        <span>
              {trip.participantCount}{" "}
                            {trip.participantCount === 1 ? "participante" : "participantes"}
            </span>
                    </Badge>
                </div>
            </CardContent>

            <CardFooter className="mt-auto pt-2">
                <Button
                    render={<Link href={`/trips/${trip.id}`} />}
                    nativeButton={false}
                    variant="outline"
                    className="w-full gap-2 group/btn"
                >
                    Ver viaje
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                </Button>
            </CardFooter>
        </Card>
    )
}
