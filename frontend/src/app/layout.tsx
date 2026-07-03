import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "JourneySync — Planificador colaborativo de viajes",
    description:
        "Crea viajes, invita participantes y organiza actividades, gastos y checklists en un solo lugar.",
};

export const viewport: Viewport = {
    themeColor: "#ffffff",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="es"
            className={`${geistSans.variable} ${geistMono.variable}`}
        >
        <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
        </body>
        </html>
    );
}
