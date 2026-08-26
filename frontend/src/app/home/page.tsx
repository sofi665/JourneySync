import { Navbar } from "@/components/navbar";
import { DashboardHero } from "@/features/dashboard/dashboard-hero";
import { PageContainer } from "@/components/page-container";
import { StatsGrid } from "@/features/dashboard/stats-grid";
import { UpcomingTripCard } from "@/features/dashboard/upcoming-tripcard";
import { QuickActions } from "@/features/dashboard/quick-actions";
import { RecentTrips } from "@/features/dashboard/recent-trips";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <PageContainer className="space-y-10 py-8">
                <DashboardHero userName="Sofía" />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <UpcomingTripCard />
                    </div>

                    <div className="space-y-6">
                        <QuickActions />
                        <StatsGrid />
                    </div>
                </div>

                <RecentTrips />
            </PageContainer>
        </div>
    );
}
