import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  loading: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">
          <Loader2 />
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
