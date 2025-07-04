import React from "react";
import { Heart, MessageCircle, Share, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import { IVideo } from "@/models/Video";

interface ContentDetailsProps {
  currentVideo: IVideo | undefined;
  videos: IVideo[];
  capitalizeFirst: (text: string) => string;
}

const ContentDetails: React.FC<ContentDetailsProps> = ({
  currentVideo,
  videos,
  capitalizeFirst,
}) => {
  return (
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
              <span className="text-2xl font-bold text-gray-800">100</span>
              <p className="text-sm text-gray-500">Likes</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl text-center">
              <MessageCircle className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <span className="text-2xl font-bold text-gray-800">21</span>
              <p className="text-sm text-gray-500">Comments</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl text-center">
              <Share className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <span className="text-2xl font-bold text-gray-800">100</span>
              <p className="text-sm text-gray-500">Shares</p>
            </div>
          </div>

          {/* Video Counter */}
          {videos.length > 1 && (
            <Link href={"/upload-reel"}>
              <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl p-4 text-center">
                <p className="text-white font-bold text-xl">
                  Create your own ?
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentDetails;
