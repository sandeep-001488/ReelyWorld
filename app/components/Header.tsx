// "use client";
// import { signOut, useSession } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { BarLoader } from "react-spinners";

// const Header = () => {
//   const pathname = usePathname();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showPreview, setShowPreview] = useState(false);
//   const { data: session } = useSession();

//   useEffect(() => {
//     if (session) {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, [session]);

//   useEffect(() => {
//     setShowPreview(pathname === "/");
//   }, [pathname]);

//   return (
//     <header className="fixed top-0 w-full border-b-2 bg-white/95 backdrop-blur z-50 supports-[backdrop-filter]:bg-white/60 border-b-teal-900 rounded-b-md">
//       <nav className="container mx-auto px-4 h-20 bg-gradient-to-br from-red-50 to-teal-50 relative">
//         {/* Flexbox layout for better control */}
//         <div className="flex items-center justify-between h-full">
//           {/* Left: Logo - Always at leftmost */}
//           <div className="flex-shrink-0">
//             <Link href="/" className="flex items-center gap-2">
//               <Image
//                 src="/reely_logo.png"
//                 alt="Reely Logo"
//                 width={500}
//                 height={160}
//                 className="h-12 sm:h-14 md:h-16 object-contain transition-transform duration-500 hover:scale-110 animate-bounce"
//                 style={{ height: "clamp(3rem, 4vw, 4rem)" }}
//                 priority
//               />
//             </Link>
//           </div>

//           {/* Center: Review Button - Always centered on desktop, moves down on mobile */}
//           <div className="hidden sm:flex absolute left-1/2 transform -translate-x-1/2">
//             <div
//               className={`${showPreview ? "flex" : "hidden"} relative group`}
//             >
//               <button className="btn bg-teal-500 hover:scale-110 text-white">
//                 Review
//               </button>
//               <ul className="absolute z-10 border-2 hidden group-hover:flex flex-col border-teal-600 rounded-md shadow-lg w-52 p-2 text-teal-700 bg-teal-50 left-1/2 transform -translate-x-1/2 top-full mt-1">
//                 <li className="hover:bg-teal-600 hover:text-white p-2 rounded transition-colors">
//                   <a href="#features">Features</a>
//                 </li>
//                 <li className="hover:bg-teal-600 hover:text-white p-2 rounded transition-colors">
//                   <a href="#connect">Connect us</a>
//                 </li>
//                 {session && (
//                   <li className="hover:bg-teal-600 hover:text-white p-2 rounded transition-colors">
//                     <a href="/viewReel">View Reels</a>
//                   </li>
//                 )}
//               </ul>
//             </div>
//           </div>

//           {/* Right: Join Arena / User - Always at rightmost */}
//           <div className="flex-shrink-0">
//             {!isLoggedIn ? (
//               <Link href={"/login"}>
//                 <button className="btn btn-outline btn-error text-teal-500 text-xs sm:text-sm md:text-base px-2 sm:px-4 md:inline-flex items-center gap-2 transition hover:bg-teal-500 hover:text-white border-teal-500">
//                   <span className="hidden sm:inline">Join Arena</span>
//                   <span className="sm:hidden">Join</span>
//                 </button>
//               </Link>
//             ) : (
//               <div className="relative group">
//                 <button className="btn bg-teal-600 text-white text-xs sm:text-sm md:text-base px-2 sm:px-4 hover:bg-teal-700 transition-colors">
//                   <span className="hidden sm:inline">Hi, User</span>
//                   <span className="sm:hidden">User</span>
//                 </button>
//                 <ul className="absolute hidden group-hover:flex flex-col bg-teal-50 text-teal-700 border border-teal-600 rounded-md shadow-lg mt-1 w-32 sm:w-40 z-10 right-0">
//                   <li
//                     className="px-3 sm:px-4 py-2 hover:bg-teal-600 hover:text-white cursor-pointer transition-colors rounded"
//                     onClick={() => signOut({ callbackUrl: "/" })}
//                   >
//                     Logout
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Mobile Review Button - Positioned below main nav */}
//         <div className="sm:hidden absolute left-1/2 transform -translate-x-1/2 -bottom-3">
//           <div className={`${showPreview ? "flex" : "hidden"} relative group`}>
//             <button className="btn bg-teal-500 hover:scale-110 text-white text-sm px-3 py-1">
//               Review
//             </button>
//             <ul className="absolute z-10 border-2 hidden group-hover:flex flex-col border-teal-600 rounded-md shadow-lg w-48 p-2 text-teal-700 bg-teal-50 left-1/2 transform -translate-x-1/2 top-full mt-1">
//               <li className="hover:bg-teal-600 hover:text-white p-2 rounded transition-colors">
//                 <a href="#features">Features</a>
//               </li>
//               <li className="hover:bg-teal-600 hover:text-white p-2 rounded transition-colors">
//                 <a href="#connect">Connect us</a>
//               </li>
//               {session && (
//                 <li className="hover:bg-teal-600 hover:text-white p-2 rounded transition-colors">
//                   <a href="/viewReel">View Reels</a>
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Remove the extra space div since we're using grid layout */}
//       {/* <BarLoader width={"100%"} color="#36d7b7" /> */}
//     </header>
//   );
// };

// export default Header;

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
  const [showPreview, setShowPreview] = useState(false);
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
          } mt-20 ml-6 items-center gap-2 md:gap-6 w-full md:w-auto md:mt-0 md:bg-transparent p-2 rounded-md`}
        >
          <div className="relative group">
            <button className="btn m-1 bg-teal-500 hover:scale-110">
              Review
            </button>
            <ul className="absolute z-10 border-2 hidden group-hover:flex flex-col border-teal-600 rounded-md shadow-lg w-52 p-2 text-teal-700 bg-teal-50">
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
            <div className="relative group">
              <button className="btn bg-teal-600 text-white">Hi,User</button>
              <ul className="absolute hidden group-hover:flex flex-col bg-teal-50 text-teal-700 border rounded-md shadow-lg mt-1 w-40 z-10">
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
