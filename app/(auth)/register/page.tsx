"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

   const { data: session } = useSession();
     useEffect(()=>{
      if(session){
        router.push("/viewReel")
      }
     },[session])


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        setError("Registration failed");
        return;
      }

      router.push("/viewReel");
    } catch (err) {
      setError(`Something went wrong. Please try again ${err}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-row">
      <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center bg-gradient-to-br from-pink-400 via-rose-100 to-red-300 text-gray-800 p-10">
        <h1 className="text-4xl font-extrabold mb-2 font-sans">Reely World</h1>
        <p className="text-lg mb-8 text-pink-600 font-medium">
          Where creativity meets community
        </p>

        {/* Phone Preview Mock */}
        <div className="w-48 h-96 bg-white rounded-3xl flex flex-col items-center justify-start shadow-xl relative overflow-hidden border border-gray-200">
          {/* Reels Top Bar */}
          <div className="w-full h-10 flex justify-between items-center px-4 text-xs text-gray-500 bg-gradient-to-r from-pink-50 to-purple-50">
            <span className="text-blue-600">Creator</span>
            <span>🎵 Trend Sound</span>
          </div>

          {/* Reels Content Placeholder */}
          <div className="flex-grow w-full bg-gradient-to-b from-purple-100 via-pink-100 to-red-100 flex items-center justify-center text-2xl font-bold text-gray-400">
            🎬 Are you ?
          </div>

          <div className="absolute bottom-4 right-3 space-y-3 text-pink-500 text-xl">
            <div className="bg-white/80 rounded-full p-2 shadow-md hover:scale-110 transition">
              ❤️
            </div>
            <div className="bg-white/80 rounded-full p-2 shadow-md hover:scale-110 transition">
              💬
            </div>
          </div>

          {/* LIVE Tag */}
          <span className="absolute top-3 right-3 text-[10px] bg-red-500 text-white px-2 py-[2px] rounded-full font-bold shadow">
            LIVE
          </span>
        </div>

        <p className="mt-6 text-sm font-semibold text-pink-700 tracking-wide">
          Create • Share • <span className="underline">Inspire</span>
        </p>
      </div>

      <div className="lg:w-1/2 w-full flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100">
        <div className="card w-full max-w-md shadow-2xl bg-gradient-to-r from-blue-200 via-white to-blue-200">
          <div className="card-body flex flex-col items-center justify-center w-full px-4">
            <h2 className="text-3xl font-bold text-center text-teal-600">
              Join Reely World 🎬
            </h2>
            <p className="text-center mb-4 text-sm text-pink-600">
              Create amazing reels and connect with creators.
            </p>

            {error && (
              <div className="alert alert-error mb-4 w-full text-center">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className=" flex flex-col justify-center items-center  form-control gap-4 w-full max-w-sm"
            >
              <input
                type="text"
                placeholder="Enter Username"
                className="input input-bordered input-primary bg-white/80 placeholder-blue-600 text-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Enter Email"
                className="input input-bordered input-secondary bg-white/80 placeholder-pink-500 text-pink-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                Sign Up ✨
              </button>
            </form>

            <div className="mt-4 flex flex-col justify-center items-center">
              <p className="text-sm text-center text-pink-600">
                Already have an account?{" "}
              </p>
              <a
                href="/login"
                className="text-purple-600 font-semibold underline"
              >
                Login here
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
