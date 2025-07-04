

import { useState, useEffect, useRef } from "react";
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";

// Custom hook for video fetching
export const useVideos = () => {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);

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

  return { videos, loading };
};

// Custom hook for video player state
export const useVideoPlayer = (videos: IVideo[], currentVideoIndex: number) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [liked, setLiked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

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

  const handleVideoClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return {
    isPlaying,
    liked,
    setLiked,
    videoRef,
    mobileVideoRef,
    handleVideoClick,
    handleLikeClick,
  };
};

// Custom hook for video navigation
export const useVideoNavigation = (videos: IVideo[]) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const getCurrentVideo = (): IVideo | undefined => {
    if (videos.length > 0 && videos[currentVideoIndex]) {
      return videos[currentVideoIndex];
    }
    return undefined;
  };

  const handleNextVideo = () => {
    if (videos.length > 0) {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }
  };

  const handlePreviousVideo = () => {
    if (videos.length > 0) {
      setCurrentVideoIndex(
        (prev) => (prev - 1 + videos.length) % videos.length
      );
    }
  };

  return {
    currentVideoIndex,
    getCurrentVideo,
    handleNextVideo,
    handlePreviousVideo,
  };
};
