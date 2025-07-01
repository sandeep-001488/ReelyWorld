"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        identifier,
        password,
      });

      if (!res || !res.ok) {
        setError("Check credentials");
        return;
      }

      router.push("/");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-tr from-purple-300 via-pink-100 to-blue-200">
      {/* Wide Welcome Heading */}
      <div className="w-full max-w-5xl text-center mb-6 mt-20 sm:mt-10 md:mt-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-purple-700 tracking-tight">
          Welcome back!
        </h1>
        <p className="text-base sm:text-lg mt-2 text-pink-600 font-medium">
          Step back into the world of reels and creators 🎬✨
        </p>
      </div>
      <div className="card w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl border border-blue-200">
        <div className="card-body flex flex-col items-center justify-center w-full px-4">
          <h2 className="text-3xl  font-bold text-center text-teal-600">
            Back in action🎬
          </h2>
          <p className="text-center mb-4 text-sm text-pink-600">
            Keep the reels rolling..
          </p>

          {error && (
            <div className="alert alert-error mb-4 w-full text-center">
              {error}
            </div>
          )}

          <form
            onSubmit={handleLogin}
            className="flex flex-col justify-center items-center form-control gap-4 w-full max-w-sm"
          >
            <input
              type="text"
              placeholder="Enter Username or Email"
              className="input input-bordered input-primary bg-white/80 placeholder-blue-600 text-blue-500"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              className="input input-bordered input-accent bg-white/80 placeholder-teal-500 text-teal-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="btn btn-primary mt-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
              type="submit"
            >
              Login ✨
            </button>
          </form>

          {/* Centered Login Message */}
          <div className="mt-4 flex flex-col justify-center items-center">
            <p className="text-sm text-center text-pink-600">
              Don't have an account?
            </p>
            <a
              href="/register"
              className="text-purple-600 font-semibold underline"
            >
              Signup here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
