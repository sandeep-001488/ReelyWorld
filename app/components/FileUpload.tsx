"use client";

import { IKUpload } from "imagekitio-next";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface FileUploadProps {
  onSuccess: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = "image",
}: FileUploadProps) {


  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onError = (err: { message: string }) => {
    console.log("Upload Error:", err);
    setError(err.message);
    setUploading(false);
  };

  const handleSuccess = (response: IKUploadResponse) => {
  
    setUploading(false);
    setError(null);
    onSuccess(response);
  };

  const handleProgress = (evt: ProgressEvent) => {
    if (evt.lengthComputable && onProgress) {
      const percentComplete = (evt.loaded / evt.total) * 100;
      onProgress(Math.round(percentComplete));
    }
  };

  const handleStartUpload = () => {
    setUploading(true);
    setError(null);
  };

  const validateFile = (file: File) => {
    console.log("Validating file:", file.type, file.size);

    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload a video file");
        return false;
      }
      if (file.size > 100 * 1024 * 1024) {
        setError("Video must be less than 100 MB");
        return false;
      }
    } else {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a valid image file (JPEG, PNG, WEBP)");
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image must be less than 5 MB");
        return false;
      }
    }
    return true;
  };

  // Simplified authenticator function in FileUpload component
  const authenticator = async () => {
    try {
      console.log("Authenticating with ImageKit...");
      const response = await fetch("/api/imagekit-auth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Auth response error:", errorText);
        throw new Error(`Failed to authenticate: ${response.status}`);
      }

      const data = await response.json();
      console.log("Auth data received:", data);

      const { signature, expire, token } = data;

      if (!signature || !expire || !token) {
        throw new Error("Invalid authentication response");
      }

      return {
        signature,
        expire,
        token,
      };
    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    }
  };

  return (
    <div className="space-y-2">
      <IKUpload
        fileName={`${fileType}-${Date.now()}`}
        onError={onError}
        onSuccess={handleSuccess}
        onUploadStart={handleStartUpload}
        onUploadProgress={handleProgress}
        accept={fileType === "video" ? "video/*" : "image/*"}
        className="file-input file-input-bordered w-full"
        validateFile={validateFile}
        useUniqueFileName={true}
        folder={fileType === "video" ? "/videos" : "/images"}
        authenticator={authenticator}
        publicKey={process.env.NEXT_PUBLIC_PUBLIC_KEY!}
        urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT!}
      />

      {uploading && (
        <div className="flex items-center gap-2 text-sm text-primary">
          <Loader2 className="animate-spin h-4 w-4" />
          <span>Uploading...</span>
        </div>
      )}

      {error && (
        <div className="text-sm text-red-500 p-2 bg-red-50 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
