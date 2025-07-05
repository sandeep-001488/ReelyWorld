"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showReviewDropdown, setShowReviewDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [session]);

  useEffect(() => {
    setShowPreview(pathname === "/");
  }, [pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element)?.closest(".dropdown-container")) {
        setShowReviewDropdown(false);
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleMouseLeave = () => {
    setShowReviewDropdown(false);
    setShowUserDropdown(false);
  };

  const toggleReviewDropdown = () => {
    setShowReviewDropdown(!showReviewDropdown);
    setShowUserDropdown(false);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
    setShowReviewDropdown(false);
  };

  return (
    <header className="fixed top-0 w-full border-b-2   bg-gradient-to-br from-red-50 to-teal-50 bg-white/95 backdrop-blur z-50 supports-[backdrop-filter]:bg-white/60 border-b-teal-900 rounded-b-md">
      <nav className="container mx-auto px-4 h-20 flex flex-row items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/reely_logo.png"
            alt="Reely Logo"
            width={130}
            height={60}
            className="h-17  object-contain transition-transform duration-500 hover:scale-110 animate-bounce"
            priority
          />
        </Link>

        <div
          className={`${
            showPreview ? "flex" : "hidden"
          } mt-20 ml-10 items-center gap-2 md:gap-6 w-full md:w-auto md:mt-0 md:bg-transparent p-2 rounded-md`}
        >
          <div
            className="relative group dropdown-container"
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="btn m-1 bg-teal-500 hover:scale-110"
              onClick={toggleReviewDropdown}
            >
              Review
            </button>
            <ul
              className={`absolute z-10 border-2 ${
                showReviewDropdown ? "flex" : "hidden"
              } md:hidden md:group-hover:flex flex-col border-teal-600 rounded-md shadow-lg w-52 p-2 text-teal-700 bg-teal-50`}
            >
              <li className="hover:bg-teal-600 hover:text-white">
                <a href="#features">Features</a>
              </li>
              <li className="hover:bg-teal-600 hover:text-white">
                <a href="#connect">Connect us</a>
              </li>
              {session && (
                <li className="hover:bg-teal-600 hover:text-white">
                  <a href="/viewReel">View Reels</a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div>
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
            <div
              className="relative group dropdown-container"
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="btn bg-teal-600 text-white"
                onClick={toggleUserDropdown}
              >
                Hi, User
              </button>
              <ul
                className={`absolute ${
                  showUserDropdown ? "flex" : "hidden"
                } md:hidden md:group-hover:flex flex-col bg-teal-50 text-teal-700 border rounded-md shadow-lg mt-1 w-40 z-10`}
              >
                {pathname === "/upload-reel" && (
                  <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer">
                    <Link href="/viewReel">Reels</Link>
                  </li>
                )}

                {pathname === "/viewReel" && (
                  <li className="md:hidden px-4 py-2 hover:bg-teal-100 cursor-pointer">
                    <Link href="/upload-reel">Upload Reel</Link>
                  </li>
                )}

                <li
                  className="px-4 py-2 hover:bg-teal-100 cursor-pointer"
                  onClick={() => {
                    signOut({ redirect: false }).then(() => {
                      const currentPath = window.location.pathname;
                      if (
                        currentPath !== "/login" &&
                        currentPath !== "/register"
                      ) {
                        window.location.href = `/login?callbackUrl=${encodeURIComponent(
                          currentPath
                        )}`;
                      } else {
                        window.location.href = "/login";
                      }
                    });
                  }}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
