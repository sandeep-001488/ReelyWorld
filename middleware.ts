import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          return true;
        }
        // public
        if (pathname === "/" || pathname.startsWith("/api/videos")) {
          return true;
        }
        if (pathname.startsWith("/admin")) {
          return token?.isAdmin === true;
        }
        return !!token;
      },
    },
  }
);
export const config = {
  matcher: [
    // Match all request paths except:
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - Static file extensions (images, fonts, etc.)
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|mp4|mp3|pdf|zip|css|js|woff|woff2|ttf|eot)$).*)",
  ],
};

// export const config = {
//     matcher:["/((?!_next/static|_next/image|favicon.ico|public/).*)"]
// };
