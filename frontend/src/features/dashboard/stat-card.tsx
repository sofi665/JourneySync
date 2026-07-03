import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface Props {
    title: string;
    value: number | string;
    icon: LucideIcon;
}

export function StatCard({ title, value, icon: Icon }: Props) {
    return (
        <Card className="p-4 rounded-2xl border-slate-100 shadow-sm">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm text-slate-500">{title}</p>
                    <p className="text-xl font-semibold text-slate-900">{value}</p>
                </div>

                <div className="p-2 rounded-xl bg-[#f1f5f9]">
                    <Icon className="w-4 h-4 text-slate-700" />
                </div>
            </div>
        </Card>
    );
}
