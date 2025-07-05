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
import { format } from "date-fns";

interface DesktopMockupProps {
  currentVideo: IVideo | undefined;
  isPlaying: boolean;
  liked: boolean;
  videos: IVideo[];
  videoRef: React.RefObject<HTMLVideoElement | null>; 
  onVideoClick: () => void;
  onLikeClick: () => void;
  onNextVideo: () => void;
  onPreviousVideo: () => void;
}

const DesktopMockup: React.FC<DesktopMockupProps> = ({
  currentVideo,
  isPlaying,
  liked,
  videos,
  videoRef, 
  onVideoClick,
  onLikeClick,
  onNextVideo,
  onPreviousVideo,
}) => {
  const date = new Date();
  const formatted = format(date, "dd-MM   HH:mm a");

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, videoRef]);
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      if (isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }
  }, [isPlaying, videoRef, currentVideo]);
  const handleNext = () => {
    onNextVideo();
  };

  const handlePrevious = () => {
    onPreviousVideo();
  };

  return (
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
                  onClick={onVideoClick}
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
                    onClick={handlePrevious}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-30 backdrop-blur-sm rounded-full flex items-center justify-center text-teal-900 hover:bg-opacity-50 transition-all z-20"
                  >
                    <ChevronUp className="w-6 h-6 rotate-90" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-30 backdrop-blur-sm rounded-full flex items-center justify-center text-teal-900 hover:bg-opacity-50 transition-all z-20"
                  >
                    <ChevronDown className="w-6 h-6 rotate-90" />
                  </button>
                </>
              )}

              {/* Action Buttons */}
              <div className="absolute bottom-20 right-4 flex flex-col gap-4 z-10">
                <button
                  onClick={onLikeClick}
                  className="flex flex-col items-center text-white"
                >
                  <Heart
                    className={`w-7 h-7 ${
                      liked ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  <span className="text-xs mt-1">
                    {videos.length > 1 ? 100 : 0}
                  </span>
                </button>
                <button className="flex flex-col items-center text-white">
                  <MessageCircle className="w-7 h-7" />
                  <span className="text-xs mt-1">
                    {" "}
                    {videos.length > 1 ? 21 : 0}
                  </span>
                </button>
                <button className="flex flex-col items-center text-white">
                  <Share className="w-7 h-7" />
                  <span className="text-xs mt-1">
                    {" "}
                    {videos.length > 1 ? 100 : 0}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopMockup;
