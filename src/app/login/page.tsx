"use client";
import { useState } from "react";
import { login } from "./actions";
import Link from "next/link";

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const target = e.currentTarget;
    const formData = new FormData(target);

    try {
      const loginAwait = await login(formData);

      if (loginAwait?.error) {
        setError(loginAwait.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-sm mx-auto flex h-screen w-full flex-col justify-center px-5 text-left">
      <div>
        <h1 className="text-2xl font-bold">Welcome back 👋</h1>
        <p>Let's get started</p>
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex w-full flex-col gap-4">
        <input
          className="w-full rounded border-2 border-gray-200 bg-gray-50 px-3 py-2"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          disabled={loading}
        />
        <input
          className="w-full rounded border-2 border-gray-200 bg-gray-50 px-3 py-2"
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
          disabled={loading}
        />

        {error && <p className="mt-2 text-red-500">{error}</p>}

        <button
          className={`w-full rounded py-3 font-bold text-white ${loading ? "bg-blue-400" : "bg-blue-600"}`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="mt-4 text-sm">
        Create a account here:{" "}
        <Link href="/register" className="text-blue-600 underline">
          Register
        </Link>
      </p>
    </div>
  );
}
