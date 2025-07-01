"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const Header = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPreview,setShowPreview]=useState(false)
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [session]);

  console.log("Session Data:", session);

  useEffect(() => {
    setShowPreview(pathname === "/");
  }, [pathname]);

  return (
    <header className="fixed top-0 w-full border-b bg-white/95 backdrop-blur z-50 supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/reely_logo.png"
            alt="Reely Logo"
            width={500}
            height={160}
            className="h-16 w-auto object-contain transition-transform duration-500 hover:scale-110 animate-bounce"
          />
        </Link>
        <div
          className={`${
            showPreview ? "flex" : "hidden"
          } mt-20 ml-10  md:flex-row items-center gap-2 md:gap-6 w-full md:w-auto  md:mt-0  md:bg-transparent p-2 rounded-md`}
        >
          <div className="relative group">
            <button className="btn m-1 bg-teal-500 hover:scale-110">
              Review
            </button>
            <ul className="absolute hidden group-hover:flex flex-col bg-blue-500 rounded-md shadow-lg z-10 w-52 p-2">
              <li className="hover:bg-blue-600 text-white">
                <a href="#features">Features</a>
              </li>
              <li className="hover:bg-blue-600 text-white">
                <a href="#connect">Connect us</a>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className="flex items-center gap-4">
          <Link href={"/login"}>
            <button
              className="btn btn-outline btn-error text-teal-500   md:inline-flex items-center gap-2
            transition hover:bg-teal-500 hover:text-white
            "
            >
              Join Arena
            </button>
          </Link>
        </div> */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <Link href={"/login"}>
              <button
                className="btn btn-outline btn-error text-teal-500 md:inline-flex items-center gap-2
          transition hover:bg-teal-500 hover:text-white"
              >
                Join Arena
              </button>
            </Link>
          ) : (
            <div className="relative group">
              <button className="btn bg-teal-600 text-white">
               Hi,User
              </button>
              <ul className="absolute hidden group-hover:flex flex-col bg-white text-black border rounded-md shadow-lg mt-1 w-40 z-10">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
      {/* <BarLoader width={"100%"} color="#36d7b7" /> */}
    </header>
  );
};

export default Header;
