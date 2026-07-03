"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">

          <Link href="/trips" aria-label="Ir a mis viajes">
            <Logo />
          </Link>

          <nav className="flex items-center gap-3">

            <Button
                render={<Link href="/trips" />}
                nativeButton={false}
                variant="ghost"
            >
              Mis viajes
            </Button>

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
