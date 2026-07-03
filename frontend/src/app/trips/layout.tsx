import { Navbar } from "@/components/navbar"

export default function TripsLayout({
                                        children,
                                    }: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">{children}</div>
        </div>
    )
}
