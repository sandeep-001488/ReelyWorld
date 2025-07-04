"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";


export default function Home() {
  const isVisible = true;

  const {data:session}= useSession()

  const features = [
    {
      icon: "🎬",
      title: "Easy Video Creation",
      description:
        "Intuitive tools to create stunning reels with just a few taps. Add filters, effects, and music effortlessly.",
    },
    {
      icon: "✨",
      title: "AI-Powered Effects",
      description:
        "Advanced AI technology that automatically enhances your videos with professional-grade effects and transitions.",
    },
    {
      icon: "🎵",
      title: "Music Library",
      description:
        "Access thousands of trending songs and sound effects to make your reels more engaging and viral.",
    },
    {
      icon: "📱",
      title: "Social Sharing",
      description:
        "Share your creations instantly across all major social platforms with optimized formats for each.",
    },
    {
      icon: "🏆",
      title: "Creator Rewards",
      description:
        "Earn rewards and recognition for your creative content. Join our creator program and monetize your talent.",
    },
    {
      icon: "🌟",
      title: "Trending Challenges",
      description:
        "Participate in viral challenges and discover new trends. Stay ahead of the curve with real-time insights.",
    },
  ];


  return (
    <div className="min-h-screen mt-10">
      {/* Hero Section */}
      <div className="hero min-h-screen relative overflow-hidden">
        <div className="hero-content text-center relative z-10">
          <div className="max-w-6xl mx-auto px-4">
            <div
              className={`transition-all duration-1000 opacity-100 translate-y-0 `}
            >
              <h1 className=" bg-gradient-to-r from-teal-600 via-teal-300 to-teal-600  text-6xl md:text-8xl font-black mb-6  bg-clip-text text-transparent">
                Create Epic
                <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Reels
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-pink-500 max-w-3xl mx-auto leading-relaxed">
                Unleash your creativity with our powerful video creation
                platform. Make stunning reels that captivate, engage, and go
                viral.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link href={session ? "/upload-reel" : "/register"}>
                  <button className="btn btn-primary btn-lg px-8 hover:scale-105 transition-transform shadow-lg hover:shadow-primary/50">
                    <span className="text-lg">🚀</span>
                    Start Creating
                  </button>
                </Link>
              </div>
            </div>

            {/* Video Mockups */}
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto transition-all duration-1000 delay-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="mockup-phone bg-gradient-to-br from-primary to-secondary p-1 hover:scale-105 transition-transform"
                >
                  <div className="camera"></div>
                  <div className="display">
                    <div className="artboard artboard-demo phone-1 bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
                      <div className="text-4xl animate-pulse">
                        {["🎬", "✨", "🎵", "🔥"][i - 1]}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div
        id="features"
        className="  py-20 bg-gradient-to-r from-teal-100 via-base to-teal-200"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-red-400">
              Everything you need to create, edit, and share amazing reels that
              stand out from the crowd.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card gradient backdrop-blur-sm border border-base-content/10 hover:bg-base-100/20 hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="card-body text-center">
                  <div className="text-6xl mb-4">{feature.icon}</div>
                  <h3 className="card-title text-2xl mb-2 justify-center ">
                    {feature.title}
                  </h3>
                  <p className="text-pink-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <h2 className="text-6xl font-black mb-6">Ready to Go Viral?</h2>
            <p className="text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Join millions of creators who are already making waves with
              ReelyWorld. Your next viral hit is just one click away.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href={session ? "/viewReel" : "/register"}>
                <button className="btn btn-accent btn-lg px-12 hover:scale-105 transition-transform text-black font-bold shadow-2xl">
                  <span className="text-xl">✨</span>
                  Get Started Free
                </button>
              </Link>
              <button className="btn btn-outline btn-lg px-8 text-white border-white hover:bg-white hover:text-primary">
                Learn More
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm opacity-75">
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>No watermarks</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>HD exports</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        id="connect"
        className="footer footer-center flex flex-col gap-3 p-10 bg-gray-50 backdrop-blur-sm "
      >
        <div>
          <div className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ReelyWorld
          </div>
          <p className="font-bold text-lg mb-2 text-blue-500">
            The Ultimate Video Creation Platform
          </p>
          <p className="text-base-content/70 max-w-md">
            Empowering creators worldwide to tell their stories through
            stunning, engaging video content that captures hearts and minds.
          </p>
        </div>

        <div className="grid grid-flow-col gap-8 text-2xl">
          <a
            href="https://www.instagram.com/sandeep001488?igsh=MXdpMzFnOHU3aWVhaA=="
            target="_blank"
            className=" transition-colors cursor-pointer"
          >
            <FaInstagram className=" bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600  transition-transform hover:scale-110" />
          </a>
          <a
            href="https://www.linkedin.com/in/sandeep-kumar-934237260/"
            target="_blank"
            className="hover:text-blue-700 transition-colors cursor-pointer"
          >
            <FaLinkedin className="text-blue-600 text-3xl rounded-xl" />
          </a>
        </div>

        <div className="text-blue-500">
          <p>
            © 2024 ReelyWorld. All rights reserved. Made with ❤️ for creators.
          </p>
        </div>
      </footer>
    </div>
  );
}
