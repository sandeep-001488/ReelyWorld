// app/api/imagekit-auth/route.ts
import ImageKit from "imagekit";
import { NextRequest, NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export async function GET(_request: NextRequest) {
  try {
    // console.log("ImageKit auth GET request received");

    // Generate authentication parameters
    const authenticationParameters = imagekit.getAuthenticationParameters();

    // console.log("Auth parameters generated:", authenticationParameters);

    return NextResponse.json(authenticationParameters);
  } catch (error) {
    console.error("ImageKit auth error:", error);
    return NextResponse.json(
      { error: "ImageKit authentication failed" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // console.log("ImageKit auth POST request received");

    const body = await request.json();
    // console.log("Request body:", body);

    const { token, expire } = body;

    // Generate authentication parameters
    const authenticationParameters = imagekit.getAuthenticationParameters(
      token,
      expire
    );

    // console.log("Auth parameters generated:", authenticationParameters);

    return NextResponse.json(authenticationParameters);
  } catch (error) {
    console.error("ImageKit auth error:", error);
    return NextResponse.json(
      { error: "ImageKit authentication failed" },
      { status: 500 }
    );
  }
}
