import { TripCard } from "@/components/trip-card";
import {tripsService} from "@/services/trip.service";

export async function RecentTrips() {
    const trips = await tripsService.getTrips();

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">
                Viajes recientes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {trips.slice(0, 3).map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
                ))}
            </div>
        </div>
    );
}
