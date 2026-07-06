"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();

  // Verifica si la ruta actual es "/trips"
  const isTripsActive = pathname === "/trips";

  return (
      <header className="sticky top-0 z-50 w-full border-b border-border bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">

          <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
            <Logo />
          </Link>

          <nav className="flex items-center gap-4">
            <Link href="/trips">
              <Button variant={isTripsActive ? "outline" : "ghost"}>
                Mis viajes
              </Button>
            </Link>

            <Button
                render={<Link href="/trips/create" />}
                nativeButton={false}
            >
              Crear viaje
            </Button>
          </nav>

        </div>
      </header>
  );
}
