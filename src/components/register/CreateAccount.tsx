import { useState } from "react";
import { signup } from "@/app/register/actions";
import Link from "next/link";

export default function CreateAccount() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const target = e.currentTarget;
    const formData = new FormData(target);

    try {
      await signup(formData);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold">
        Hey @<span>{username || "Username"}</span> 👋
      </h1>
      <p>Let&#39;s get started</p>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex flex-col gap-4">
          <input
            className="w-full rounded border-2 border-gray-200 bg-gray-50 px-3 py-2"
            type="text"
            name="username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
                  .replace(/[^a-zA-Z0-9\s-]/g, "")
                  .replace(/\s+/g, "-"),
              )
            }
            placeholder="Username"
            minLength={3}
            required
            disabled={loading}
          />

          <input
            className="w-full rounded border-2 border-gray-200 bg-gray-50 px-3 py-2"
            type="text"
            name="name"
            placeholder="Your Name"
            minLength={2}
            required
            disabled={loading}
          />

          <input
            className="w-full rounded border-2 border-gray-200 bg-gray-50 px-3 py-2"
            type="email"
            name="email"
            placeholder="Email"
            required
            disabled={loading}
          />

          <input
            className="w-full rounded border-2 border-gray-200 bg-gray-50 px-3 py-2"
            type="password"
            name="password"
            placeholder="Password"
            minLength={8}
            required
            disabled={loading}
          />
        </div>
        {error && <p className="mt-2 text-red-500">{error}</p>}

        <button
          className={`mt-4 w-full rounded py-3 font-bold text-white ${loading ? "bg-blue-400" : "bg-blue-600"}`}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign in"}
        </button>
      </form>

      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </div>
  );
}
