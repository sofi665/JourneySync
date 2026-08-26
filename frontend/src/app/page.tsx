import Link from "next/link";

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-background">
            <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-16 text-center">

                <div className="max-w-3xl">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-emerald-600">
                        JourneySync
                    </p>

                    <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                        Planificá tus viajes de forma colaborativa.
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                        Organizá viajes, actividades, gastos y tareas
                        junto a las personas que te acompañan.
                    </p>

                    <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/login"
                            className="rounded-full bg-emerald-500 px-8 py-3 font-semibold text-white transition hover:bg-emerald-600"
                        >
                            Iniciar sesión
                        </Link>

                        <Link
                            href="/register"
                            className="rounded-full border border-border px-8 py-3 font-semibold text-foreground transition hover:bg-muted"
                        >
                            Crear una cuenta
                        </Link>
                    </div>
                </div>

                <div className="mt-20 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">

                    <div className="rounded-2xl border border-border bg-card p-6">
                        <h2 className="font-semibold text-card-foreground">
                            Viajes
                        </h2>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Creá y organizá todos tus viajes desde un solo lugar.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-6">
                        <h2 className="font-semibold text-card-foreground">
                            Actividades
                        </h2>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Planificá lugares y actividades para cada aventura.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-6">
                        <h2 className="font-semibold text-card-foreground">
                            Gastos
                        </h2>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Llevá un registro de los gastos de cada viaje.
                        </p>
                    </div>

                </div>
            </section>
        </main>
    );
}
