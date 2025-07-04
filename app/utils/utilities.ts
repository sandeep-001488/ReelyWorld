// Utility functions for the ViewReelPage component

/**
 * Capitalizes the first letter of a string
 * @param text - The text to capitalize
 * @returns The text with the first letter capitalized
 */
export const capitalizeFirst = (text: string): string => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Formats a date for display in the status bar
 * @param date - The date to format
 * @returns Formatted date string
 */
export const formatStatusBarDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;

  return `${day}-${month}   ${displayHours}:${minutes} ${ampm}`;
};

/**
 * Handles video autoplay with error handling
 * @param videoRef - Reference to the video element
 * @returns Promise that resolves when video starts playing
 */
export const handleVideoAutoplay = async (
  videoRef: React.RefObject<HTMLVideoElement>
): Promise<void> => {
  try {
    if (videoRef.current) {
      await videoRef.current.play();
    }
  } catch (error) {
    console.log("Autoplay failed:", error);
  }
};

/**
 * Toggles video play/pause state
 * @param videoRef - Reference to the video element
 * @param isPlaying - Current playing state
 */
export const toggleVideoPlayback = (
  videoRef: React.RefObject<HTMLVideoElement>,
  isPlaying: boolean
): void => {
  if (videoRef.current) {
    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }
};

/**
 * Calculates the next video index in a circular manner
 * @param currentIndex - Current video index
 * @param totalVideos - Total number of videos
 * @returns Next video index
 */
export const getNextVideoIndex = (
  currentIndex: number,
  totalVideos: number
): number => {
  return (currentIndex + 1) % totalVideos;
};

/**
 * Calculates the previous video index in a circular manner
 * @param currentIndex - Current video index
 * @param totalVideos - Total number of videos
 * @returns Previous video index
 */
export const getPreviousVideoIndex = (
  currentIndex: number,
  totalVideos: number
): number => {
  return (currentIndex - 1 + totalVideos) % totalVideos;
};
