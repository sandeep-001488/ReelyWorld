import React from "react";
import { Sparkles, Star } from "lucide-react";
import { IVideo } from "@/models/Video";

interface MobileDetailsOverlayProps {
  currentVideo: IVideo | undefined;
  showMobileDetails: boolean;
  onClose: () => void;
}

const MobileDetailsOverlay: React.FC<MobileDetailsOverlayProps> = ({
  currentVideo,
  showMobileDetails,
  onClose,
}) => {
  if (!showMobileDetails) return null;

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      {/* Transparent clickable backdrop */}
      <div className="absolute inset-0 bg-opacity-30"></div>

      {/* Bottom popup content */}
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
  );
};

export default MobileDetailsOverlay;
