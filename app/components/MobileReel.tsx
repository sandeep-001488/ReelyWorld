import React, { useEffect } from "react";
import {
  Play,
  ChevronUp,
  ChevronDown,
  Heart,
  MessageCircle,
  Share,
} from "lucide-react";
import { IVideo } from "@/models/Video";

interface MobileReelProps {
  currentVideo: IVideo | undefined;
  isPlaying: boolean;
  liked: boolean;
  videos: IVideo[];
  mobileVideoRef: React.RefObject<HTMLVideoElement | null>;
  onVideoClick: () => void;
  onLikeClick: () => void;
  onNextVideo: () => void;
  onPreviousVideo: () => void;
  onShowDetails: () => void;
  capitalizeFirst: (text: string) => string;
}

const MobileReel: React.FC<MobileReelProps> = ({
  currentVideo,
  isPlaying,
  liked,
  videos,
  mobileVideoRef,
  onVideoClick,
  onLikeClick,
  onNextVideo,
  onPreviousVideo,
  onShowDetails,
  capitalizeFirst,
}) => {
  useEffect(() => {
    if (mobileVideoRef.current) {
      if (isPlaying) {
        mobileVideoRef.current.play();
      } else {
        mobileVideoRef.current.pause();
      }
    }
  }, [isPlaying, mobileVideoRef]);

  return (
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
          onClick={onVideoClick}
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
            onClick={onPreviousVideo}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-30 backdrop-blur-sm rounded-full flex items-center justify-center text-teal-900 hover:bg-opacity-50 transition-all z-20"
          >
            <ChevronUp className="w-6 h-6 rotate-90" />
          </button>
          <button
            onClick={onNextVideo}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-50 transition-all z-20 text-teal-900"
          >
            <ChevronDown className="w-6 h-6 rotate-90" />
          </button>
        </>
      )}

      {/* Mobile Reel UI - Updated with truncated text */}
      <div className="absolute bottom-6 left-4 right-16 z-10">
        <div className="text-white">
          <p
            className="text-2xl opacity-100 line-clamp-1 cursor-pointer text-white"
            onClick={onShowDetails}
          >
            {capitalizeFirst(currentVideo?.title || "")}
          </p>
          <p
            className="text-md opacity-70 mt-1 line-clamp-2 cursor-pointer text-white"
            onClick={onShowDetails}
          >
            {capitalizeFirst(currentVideo?.description || "")}
          </p>
        </div>
      </div>

      {/* Mobile Action Buttons */}
      <div className="absolute bottom-6 right-4 flex flex-col gap-4 z-10">
        <button
          onClick={onLikeClick}
          className="flex flex-col items-center text-white"
        >
          <Heart
            className={`w-8 h-8 ${liked ? "fill-red-500 text-red-500" : ""}`}
          />
          <span className="text-xs mt-1"> {videos.length > 1 ? 100 : 0}</span>
        </button>
        <button className="flex flex-col items-center text-white">
          <MessageCircle className="w-8 h-8" />
          <span className="text-xs mt-1"> {videos.length > 1 ? 21 : 0}</span>
        </button>
        <button className="flex flex-col items-center text-white">
          <Share className="w-8 h-8" />
          <span className="text-xs mt-1"> {videos.length > 1 ? 100 : 0}</span>
        </button>
      </div>
    </div>
  );
};

export default MobileReel;
