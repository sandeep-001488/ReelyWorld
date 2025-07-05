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
  const [activePlayer, setActivePlayer] = useState<"desktop" | "mobile">(
    "desktop"
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // Determine which player should be active based on screen size
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768; // Adjust breakpoint as needed
      setActivePlayer(isMobile ? "mobile" : "desktop");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (videos.length > 0) {
      const manageVideoPlayback = async () => {
        try {
          // Always pause both videos first to prevent echo
          if (videoRef.current) {
            videoRef.current.pause();
          }
          if (mobileVideoRef.current) {
            mobileVideoRef.current.pause();
          }

          // Only play the active player if isPlaying is true
          if (isPlaying) {
            if (activePlayer === "desktop" && videoRef.current) {
              await videoRef.current.play();
            } else if (activePlayer === "mobile" && mobileVideoRef.current) {
              await mobileVideoRef.current.play();
            }
          }
        } catch (error) {
          console.log("Autoplay failed:", error);
        }
      };

      manageVideoPlayback();
    }
  }, [currentVideoIndex, videos, isPlaying, activePlayer]);

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
// import { useState, useEffect, useRef } from "react";
// import { apiClient } from "@/lib/api-client";
// import { IVideo } from "@/models/Video";

// // Custom hook for video fetching
// export const useVideos = () => {
//   const [videos, setVideos] = useState<IVideo[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         setLoading(true);
//         const videos = await apiClient.getVideos();
//         setVideos(videos);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching videos:", error);
//         setLoading(false);
//       }
//     };

//     fetchVideos();
//   }, []);

//   return { videos, loading };
// };

// // Custom hook for video player state
// export const useVideoPlayer = (videos: IVideo[], currentVideoIndex: number) => {
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [liked, setLiked] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const mobileVideoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     if (videos.length > 0 && isPlaying) {
//       const playVideo = async () => {
//         try {
//           if (videoRef.current) {
//             await videoRef.current.play();
//           }
//           if (mobileVideoRef.current) {
//             await mobileVideoRef.current.play();
//           }
//         } catch (error) {
//           console.log("Autoplay failed:", error);
//         }
//       };
//       playVideo();
//     }
//   }, [currentVideoIndex, videos, isPlaying]);

//   const handleVideoClick = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const handleLikeClick = () => {
//     setLiked(!liked);
//   };

//   return {
//     isPlaying,
//     liked,
//     setLiked,
//     videoRef,
//     mobileVideoRef,
//     handleVideoClick,
//     handleLikeClick,
//   };
// };

// // Custom hook for video navigation
// export const useVideoNavigation = (videos: IVideo[]) => {
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

//   const getCurrentVideo = (): IVideo | undefined => {
//     if (videos.length > 0 && videos[currentVideoIndex]) {
//       return videos[currentVideoIndex];
//     }
//     return undefined;
//   };

//   const handleNextVideo = () => {
//     if (videos.length > 0) {
//       setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
//     }
//   };

//   const handlePreviousVideo = () => {
//     if (videos.length > 0) {
//       setCurrentVideoIndex(
//         (prev) => (prev - 1 + videos.length) % videos.length
//       );
//     }
//   };

//   return {
//     currentVideoIndex,
//     getCurrentVideo,
//     handleNextVideo,
//     handlePreviousVideo,
//   };
// };
