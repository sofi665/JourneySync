import { Plane, Users, Globe, Calendar } from "lucide-react";
import {StatCard} from "@/features/dashboard/stat-card";


export function StatsGrid() {
    return (
        <div className="grid grid-cols-2 gap-4">
            <StatCard title="Viajes" value={8} icon={Plane} />
            <StatCard title="Participantes" value={14} icon={Users} />
            <StatCard title="Países" value={5} icon={Globe} />
            <StatCard title="Próximos" value={2} icon={Calendar} />
        </div>
    );
}
