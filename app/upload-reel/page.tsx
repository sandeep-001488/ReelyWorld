"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import FileUpload from "../components/FileUpload";
import { apiClient } from "@/lib/api-client";

export default function UploadReelPage() {
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileType, setFileType] = useState<"video" | "image">("video");


  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const generateThumbnail = (videoUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      video.crossOrigin = "anonymous";
      video.currentTime = 1;

      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        video.onseeked = () => {
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const thumbnailDataUrl = canvas.toDataURL("image/jpeg", 0.8);
            resolve(thumbnailDataUrl);
          }
        };
      };

      video.onerror = () => reject(new Error("Failed to load video"));
      video.src = videoUrl;
    });
  };

  const handleVideoUpload = async (res: any) => {
    setVideoUrl(res.url);

    try {
      const thumbnailDataUrl = await generateThumbnail(res.url);

      const response = await fetch(thumbnailDataUrl);
      const blob = await response.blob();

      const thumbnailImageKitUrl = res.url.replace(/\.[^/.]+$/, "") + ".jpg";
      setThumbnailUrl(thumbnailImageKitUrl);
    } catch (error) {
      console.error("Error generating thumbnail:", error);
      alert(
        "Could not auto-generate thumbnail. Please upload a thumbnail image manually."
      );
    }
  };

  const handleSubmit = async () => {
    // Validate all required fields
    if (!title || !description) {
      return alert("Title and description are required.");
    }

    if (!videoUrl) {
      return alert("Please upload a video.");
    }

    // If no thumbnail, try to use ImageKit's video thumbnail feature
    const finalThumbnailUrl = thumbnailUrl || `${videoUrl}?tr=f-jpg,q-80`;

    setIsSubmitting(true);

    try {
      await apiClient.createVideo({
        title,
        description,
        videoUrl,
        thumbnailUrl: finalThumbnailUrl,
        controls: true,
        transformations: {
          height: 1920,
          width: 1080,
          quality: 100,
        },
      });

      router.push("/viewReel");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload reel. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-8 px-4 mt-15">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4 shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Create Your Reel
          </h1>
          <p className=" text-lg  bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            Share your story with the world
          </p>
        </div>
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={() => setFileType("video")}
            className={`btn btn-dash btn-primary px-4 py-2 rounded-full font-semibold transition duration-200 ${
              fileType === "video"
                ? "bg-blue-500 text-white"
                : ""
            }`}
          >
            Upload Video
          </button>
          <button
            onClick={() => setFileType("image")}
            className={`btn btn-dash btn-secondary px-4 py-2 rounded-full font-semibold transition duration-200 ${
              fileType === "image"
                ? "bg-pink-500 text-white"
                : ""
            }`}
          >
            Upload Image
          </button>
        </div>

        {/* Main Upload Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-white/20">
          <div className="space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold  mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Reel Title *
              </label>
              <input
                type="text"
                placeholder="Give your reel an awesome title..."

                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 text-blue-800 placeholder-teal-400"
                required
              />
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold  mb-2  bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Description *
              </label>
              <textarea
                placeholder="Tell viewers what your reel is about..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 text-blue-800 placeholder-teal-400 resize-none"
                rows={4}
                required
              />
            </div>

            {/* Upload Section */}
            {fileType === "video" ? (
              <div className="space-y-4">
                <label className="block text-sm font-semibold mb-2  bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Upload Your Video *
                </label>
                <div className="border-2 border-dashed border-purple-300 rounded-xl p-6 bg-purple-50/50 hover:bg-purple-50 transition-colors duration-200 ">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                      <svg
                        className="w-8 h-8 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <FileUpload
                      onSuccess={handleVideoUpload}
                      fileType="video"
                      key="video"
                    />
                    {videoUrl && (
                      <div className="mt-4 flex items-center justify-center space-x-2 text-green-600">
                        <svg className="w-5 h-5" />
                        <span className="font-medium">
                          Video uploaded successfully!
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <label className="block text-sm font-semibold mb-2  bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Upload Your Image *
                </label>
                <div className="border-2 border-dashed border-pink-300 rounded-xl p-6 bg-pink-50/50 hover:bg-pink-50 transition-colors duration-200 ">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
                      <svg
                        className="w-8 h-8 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <FileUpload
                      onSuccess={(res) => setThumbnailUrl(res.url)}
                      fileType="image"
                      key="image"
                    />
                    {thumbnailUrl && (
                      <div className="mt-4 flex items-center justify-center space-x-2 text-green-600">
                        <svg className="w-5 h-5" />
                        <span className="font-medium">
                          Image uploaded successfully!
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Thumbnail Upload Section */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold  bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Custom Thumbnail (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50/50 hover:bg-gray-50 transition-colors duration-200">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <svg
                      className="w-8 h-8 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-teal-900 mb-2">
                    Upload a custom thumbnail or we'll auto-generate one
                  </p>
                  <FileUpload
                    onSuccess={(res) => {
                      setThumbnailUrl(res.url);
                    }}
                    fileType="image"
                  />
                  {thumbnailUrl && (
                    <div className="mt-4 flex items-center justify-center space-x-2 text-green-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="font-medium">
                        Thumbnail uploaded successfully!
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !title || !description || !videoUrl}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all duration-200 transform ${
                isSubmitting || !title || !description || !videoUrl
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-105 hover:shadow-lg"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span className="">Uploading Your Reel...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span>Upload Reel</span>
                </div>
              )}
            </button>

            {/* Help Text */}
            <div className="text-center text-sm text-teal-900 mt-4">
              <p>
                Your reel will be processed and made available for viewing
                shortly after upload.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Tips */}
        <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <svg
              className="w-5 h-5 text-purple-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Tips for Great Reels
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              Keep your video under 60 seconds for maximum engagement
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              Keep the video file size less than 100 MB or compress the video
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              Use a catchy title that describes your content
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              Vertical videos (9:16) work best for reels
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>A custom thumbnail
              can help your reel stand out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
