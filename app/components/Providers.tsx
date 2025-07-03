"use client";
import { ImageKitProvider } from "imagekitio-next";
import { SessionProvider } from "next-auth/react";
import React from "react";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY!;

export default function Providers({ children }: { children: React.ReactNode }) {
 
  return (
    <SessionProvider>
      <ImageKitProvider
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
      >
        {children}
      </ImageKitProvider>
    </SessionProvider>
  );
}
