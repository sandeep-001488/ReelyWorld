"use client";

import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  MessageCircle,
  Play,
  Share,
  Pause,
  Sparkles,
  Star,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {format} from "date-fns"

const ViewReelPage = () => {
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [liked, setLiked] = useState(false);
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const date = new Date();
  const formatted = format(date, "dd-MM   HH:mm a");

  // Fetch videos from API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const videos = await apiClient.getVideos();
        setVideos(videos);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Auto-play video when component mounts or video changes
  useEffect(() => {
    if (videos.length > 0 && isPlaying) {
      const playVideo = async () => {
        try {
          if (videoRef.current) {
            await videoRef.current.play();
          }
          if (mobileVideoRef.current) {
            await mobileVideoRef.current.play();
          }
        } catch (error) {
          console.log("Autoplay failed:", error);
        }
      };
      playVideo();
    }
  }, [currentVideoIndex, videos, isPlaying]);

  const getCurrentVideo = (): IVideo | undefined => {
    if (videos.length > 0 && videos[currentVideoIndex]) {
      return videos[currentVideoIndex];
    }
    return undefined;
  };

  const currentVideo = getCurrentVideo();

  const handleVideoClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextVideo = () => {
    if (videos.length > 0) {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
      setIsPlaying(true); // Auto-play next video
      setLiked(false);
    }
  };

  const handlePreviousVideo = () => {
    if (videos.length > 0) {
      setCurrentVideoIndex(
        (prev) => (prev - 1 + videos.length) % videos.length
      );
      setIsPlaying(true); // Auto-play previous video
      setLiked(false);
    }
  };

  // Handle video play/pause
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
    if (mobileVideoRef.current) {
      if (isPlaying) {
        mobileVideoRef.current.play();
      } else {
        mobileVideoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Helper function to truncate text
  const truncateText = (text: string, wordLimit: number) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };
  const capitalizeFirst = (text: string) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  

  return (
    <div className="mt-20 flex flex-row h-[calc(100vh-5rem)] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Left Side */}
      <div className="flex-1 bg-gradient-to-br from-amber-400 to-orange-500 text-white p-8 hidden lg:flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Discover</h2>
          <p className="text-xl opacity-90">Amazing content</p>
        </div>
      </div>

      {/* Middle - Mobile Mockup & Content */}
      <div className="flex-[2] relative flex items-center justify-center p-4 lg:p-8">
        {/* Decorative Border Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-purple-500 rounded-tl-3xl"></div>
          <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-blue-500 rounded-tr-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-green-500 rounded-bl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-pink-500 rounded-br-3xl"></div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">
                <Loader2 />
              </p>
            </div>
          </div>
        )}

        {/* Desktop Layout */}
        <div className="hidden lg:flex w-full max-w-6xl gap-8 items-center">
          {/* Mobile Mockup */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-80 h-[600px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-gray-900 rounded-[2rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="absolute top-0 left-0 right-0 h-8 bg-black z-10 flex items-center justify-between px-6 text-white text-xs">
                    <span>{formatted}</span>
                    <div className="w-6 h-3 bg-white rounded-sm"></div>
                  </div>

                  {/* Reel Content */}
                  <div className="relative w-full h-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>

                    {/* Video Element or Placeholder */}
                    {currentVideo?.videoUrl ? (
                      <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                        src={currentVideo.videoUrl}
                        loop
                        playsInline
                        muted
                        onClick={handleVideoClick}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-white text-lg">
                        <div className="text-center">
                          <Play className="w-16 h-16 mx-auto mb-2 opacity-50" />
                          <p className="opacity-70">Video Preview</p>
                        </div>
                      </div>
                    )}

                    {/* Play/Pause Indicator */}
                    {!isPlaying && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-15 h-15 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 pointer-events-none">
                        <Play className="w-10 h-10 text-teal-900 ml-1" />
                      </div>
                    )}

                    {/* Navigation Arrows - Only on Video */}
                    {videos.length > 1 && currentVideo?.videoUrl && (
                      <>
                        <button
                          onClick={handlePreviousVideo}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-30 backdrop-blur-sm rounded-full flex items-center justify-center text-teal-900 hover:bg-opacity-50 transition-all z-20"
                        >
                          <ChevronUp className="w-6 h-6 rotate-90" />
                        </button>
                        <button
                          onClick={handleNextVideo}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-30 backdrop-blur-sm rounded-full flex items-center justify-center text-teal-900 hover:bg-opacity-50 transition-all z-20"
                        >
                          <ChevronDown className="w-6 h-6 rotate-90" />
                        </button>
                      </>
                    )}

                    {/* Action Buttons */}
                    <div className="absolute bottom-20 right-4 flex flex-col gap-4 z-10">
                      <button
                        onClick={() => setLiked(!liked)}
                        className="flex flex-col items-center text-white"
                      >
                        <Heart
                          className={`w-7 h-7 ${
                            liked ? "fill-red-500 text-red-500" : ""
                          }`}
                        />
                        <span className="text-xs mt-1">100</span>
                      </button>
                      <button className="flex flex-col items-center text-white">
                        <MessageCircle className="w-7 h-7" />
                        <span className="text-xs mt-1">21</span>
                      </button>
                      <button className="flex flex-col items-center text-white">
                        <Share className="w-7 h-7" />
                        <span className="text-xs mt-1">100</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Content Details */}
          <div className="flex-1 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-200 to-teal-200 rounded-full opacity-20 transform -translate-x-12 translate-y-12"></div>

              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-gray-800 mb-2 leading-tight">
                      {capitalizeFirst(currentVideo?.title || "Title ")}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>Featured Content</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                  {capitalizeFirst(currentVideo?.description || "Description")}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 p-4 rounded-xl text-center">
                    <Heart className="w-6 h-6 mx-auto mb-2 text-red-500" />
                    <span className="text-2xl font-bold text-gray-800">
                      100
                    </span>
                    <p className="text-sm text-gray-500">Likes</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl text-center">
                    <MessageCircle className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                    <span className="text-2xl font-bold text-gray-800">21</span>
                    <p className="text-sm text-gray-500">Comments</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl text-center">
                    <Share className="w-6 h-6 mx-auto mb-2 text-green-500" />
                    <span className="text-2xl font-bold text-gray-800">
                      100
                    </span>
                    <p className="text-sm text-gray-500">Shares</p>
                  </div>
                </div>

                {/* Video Counter */}
                {videos.length > 1 && (
                  <Link href={"/upload-reel"}>
                    <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl p-4 text-center">
                      <p className=" text-white font-bold text-xl">
                        Create your own ?
                      </p>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden w-full max-w-sm mx-auto relative ">
          {/* Mobile Reel View with Enhanced Border */}
          <div className="relative w-full aspect-[9/16] bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            {/* Decorative Border Effects */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 rounded-3xl blur opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-3xl"></div>
            <div className="absolute inset-0 bg-black bg-opacity-20 rounded-3xl"></div>

            {/* Video Element or Placeholder */}
            {currentVideo?.videoUrl ? (
              <video
                ref={mobileVideoRef}
                className="absolute inset-0 w-full h-full object-cover rounded-3xl cursor-pointer"
                src={currentVideo.videoUrl}
                loop
                playsInline
                muted
                onClick={handleVideoClick}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white text-lg">
                <div className="text-center">
                  <Play className="w-20 h-20 mx-auto mb-2 opacity-50" />
                  <p className="opacity-70">Video Preview</p>
                </div>
              </div>
            )}

            {/* Play/Pause Indicator */}
            {!isPlaying && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-15 h-15 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 pointer-events-none">
                <Play className="w-10 h-10 text-teal-900 ml-1" />
              </div>
            )}

            {/* Navigation Arrows - Only on Video */}
            {videos.length > 1 && currentVideo?.videoUrl && (
              <>
                <button
                  onClick={handlePreviousVideo}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-30 backdrop-blur-sm rounded-full flex items-center justify-center text-teal-900 hover:bg-opacity-50 transition-all z-20"
                >
                  <ChevronUp className="w-6 h-6 rotate-90" />
                </button>
                <button
                  onClick={handleNextVideo}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-30 backdrop-blur-sm rounded-full flex items-center justify-center  hover:bg-opacity-50 transition-all z-20 text-teal-900"
                >
                  <ChevronDown className="w-6 h-6 rotate-90 " />
                </button>
              </>
            )}

            {/* Mobile Reel UI - Updated with truncated text */}
            <div className="absolute bottom-6 left-4 right-16 z-10">
              <div className="text-white">
                <p
                  className="text-2xl opacity-100 line-clamp-1 cursor-pointer text-white"
                  onClick={() => setShowMobileDetails(true)}
                >
                  {capitalizeFirst(currentVideo?.title || "")}
                </p>
                <p
                  className="text-md opacity-70 mt-1 line-clamp-2 cursor-pointer text-white"
                  onClick={() => setShowMobileDetails(true)}
                >
                  {capitalizeFirst(currentVideo?.description || "")}
                </p>
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="absolute bottom-6 right-4 flex flex-col gap-4 z-10">
              <button
                onClick={() => setLiked(!liked)}
                className="flex flex-col items-center text-white"
              >
                <Heart
                  className={`w-8 h-8 ${
                    liked ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                <span className="text-xs mt-1">100</span>
              </button>
              <button className="flex flex-col items-center text-white">
                <MessageCircle className="w-8 h-8" />
                <span className="text-xs mt-1">200</span>
              </button>
              <button className="flex flex-col items-center text-white">
                <Share className="w-8 h-8" />
                <span className="text-xs mt-1">210</span>
              </button>
            </div>
          </div>

          {/* Mobile Details Overlay */}
          {/* Mobile Details Overlay (Fixed & Floating Panel) */}
          {showMobileDetails && (
            <div
              className="fixed inset-0 z-50"
              onClick={() => setShowMobileDetails(false)}
            >
              {/* Transparent clickable backdrop (does NOT cover video entirely) */}
              <div className="absolute inset-0  bg-opacity-30"></div>

              {/* Bottom popup content, don't close when clicking inside */}
              <div
                className="absolute bottom-0 left-0 right-0 bg-gray-50 bg-opacity-95 backdrop-blur-md rounded-t-3xl p-6 max-h-[50vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800 mb-1">
                      {currentVideo?.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>Featured Content</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed text-sm font-light">
                  {currentVideo?.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 bg-gradient-to-br from-blue-800 to-purple-900 text-white p-8 hidden lg:flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Connect</h2>
          <p className="text-xl opacity-90">Share your story</p>
        </div>
      </div>
    </div>
  );
};

export default ViewReelPage;
