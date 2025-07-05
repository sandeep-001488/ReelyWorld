"use client";

import React, { useState, useEffect } from "react";
import {
  useVideos,
  useVideoPlayer,
  useVideoNavigation,
} from "../hooks/useVideoHooks";
import DesktopMockup from "../components/DesktopMockup";
import ContentDetails from "../components/ContentDetails";
import MobileDetailsOverlay from "../components/MobileDetailsOverlay";
import LoadingSpinner from "../components/LoadingSpinner";
import MobileReel from "../components/MobileReel";
import LeftSidePanel from "../components/LeftSidePanel";
import RightSidePanel from "../components/RightSidePanel";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ViewReelPage() {
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      const path = window.location.pathname;
      router.push(`/login?callbackUrl=${encodeURIComponent(path)}`);
    }
  }, [status, router]);
  const { videos, loading } = useVideos();
  const {
    currentVideoIndex,
    getCurrentVideo,
    handleNextVideo,
    handlePreviousVideo,
  } = useVideoNavigation(videos);
  const {
    isPlaying,
    liked,
    handleVideoClick,
    setLiked,
    handleLikeClick,
    videoRef,
    mobileVideoRef,
  } = useVideoPlayer(videos, currentVideoIndex);

  const currentVideo = getCurrentVideo();

  useEffect(() => {
    setLiked(false);
  }, [currentVideoIndex, setLiked]);

  const capitalizeFirst = (text: string) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const handleShowMobileDetails = () => {
    setShowMobileDetails(true);
  };

  const handleCloseMobileDetails = () => {
    setShowMobileDetails(false);
  };

  return (
    <div className="mt-20 flex flex-row h-[calc(100vh-5rem)] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <LeftSidePanel />
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
        <LoadingSpinner loading={loading} />

        {/* Desktop Layout */}
        <div className="hidden lg:flex w-full max-w-6xl gap-8 items-center">
          {/* Mobile Mockup */}
          <DesktopMockup
            currentVideo={currentVideo}
            isPlaying={isPlaying}
            liked={liked}
            videos={videos}
            videoRef={videoRef}
            onVideoClick={handleVideoClick}
            onLikeClick={handleLikeClick}
            onNextVideo={handleNextVideo}
            onPreviousVideo={handlePreviousVideo}
          />

          {/* Enhanced Content Details */}
          <ContentDetails
            currentVideo={currentVideo}
            videos={videos}
            capitalizeFirst={capitalizeFirst}
          />
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden w-full max-w-sm mx-auto relative">
          <MobileReel
            currentVideo={currentVideo}
            isPlaying={isPlaying}
            liked={liked}
            videos={videos}
            mobileVideoRef={mobileVideoRef}
            onVideoClick={handleVideoClick}
            onLikeClick={handleLikeClick}
            onNextVideo={handleNextVideo}
            onPreviousVideo={handlePreviousVideo}
            onShowDetails={handleShowMobileDetails}
            capitalizeFirst={capitalizeFirst}
          />

          {/* Mobile Details Overlay */}
          <MobileDetailsOverlay
            currentVideo={currentVideo}
            showMobileDetails={showMobileDetails}
            onClose={handleCloseMobileDetails}
          />
        </div>
      </div>

      <RightSidePanel />
    </div>
  );
}
