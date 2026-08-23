"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/services/authService";

export default function LoginPage() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await login({
                email,
                password
            });

            localStorage.setItem(
                "journeysync_token",
                response.token
            );

            localStorage.setItem(
                "journeysync_user",
                JSON.stringify(response.user)
            );

            router.push("/trips");

        } catch (error) {

            console.error(error);

            setError(
                "El email o la contraseña son incorrectos."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-6">

            <div className="w-full max-w-md">

                <div className="mb-8">
                    <h1 className="text-3xl font-semibold">
                        Iniciar sesión
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Ingresá a tu cuenta de JourneySync.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                            autoComplete="email"
                            className="w-full rounded-lg border px-4 py-3"
                            placeholder="tu@email.com"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium"
                        >
                            Contraseña
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                            autoComplete="current-password"
                            className="w-full rounded-lg border px-4 py-3"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg px-4 py-3 font-medium transition disabled:opacity-50"
                    >
                        {loading
                            ? "Ingresando..."
                            : "Iniciar sesión"}
                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-gray-600">

                    ¿No tenés una cuenta?{" "}

                    <Link
                        href="/register"
                        className="font-medium underline"
                    >
                        Crear cuenta
                    </Link>

                </p>

            </div>

        </main>
    );
}
