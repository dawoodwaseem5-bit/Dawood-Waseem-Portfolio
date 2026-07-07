// @flow strict
"use client";

import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import experience from "../../assets/lottie/code.json";
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";
import Squares from "../Squares"; // ✅ background component

function AboutSection() {
  const aboutText =
    "Currently, I have completed eight semesters of my BSIT program with a strong academic record, maintaining a CGPA of 3.85. I am eager to apply my knowledge and skills in a dynamic environment and looking for opportunities to grow and gain practical experience in the field of Information Technology.";

  return (
    <section
  id="experience"
  className="relative border-t my-0 border-[#25213b] overflow-hidden pb-20"
>

      {/* 🔳 Squares Background */}
      <Squares
        direction="diagonal"
        speed={0.5}
        borderColor="rgb(92, 36, 188)" // ✅ ab purple lines aayengi
        squareSize={50}
        className="absolute inset-0"
      />

      {/* Section Heading */}
      <div className="flex justify-center my-5 lg:py-8 relative z-10">


        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            About Me
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {/* Content */}
      <div className="py-8 px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
          {/* Lottie Illustration */}
          <div className="w-full max-w-md flex justify-center pl-4 lg:pl-12">
            <AnimationLottie animationPath={experience} />
          </div>

          {/* About Text */}
          <div className="w-full max-w-2xl px-4 lg:px-12">
            <GlowCard identifier="about-me-box">
              <div className="relative p-6 sm:p-10 py-10 w-full mx-auto">
                <Image
                  src="/blur-23.svg"
                  alt="Blur"
                  width={1080}
                  height={200}
                  className="absolute bottom-0 opacity-80"
                />
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="text-violet-500 transition-all duration-300 hover:scale-125">
                    <BsPersonWorkspace size={60} />
                  </div>

                  {/* Glowing Text */}
                  <p className="text-base sm:text-lg leading-relaxed text-white/80 max-w-2xl flex flex-wrap justify-center">
                    {aboutText.split(" ").map((word, index, arr) => (
                      <span
                        key={index}
                        className="word-glow inline-block mr-1"
                        style={{
                          animationDelay: `${index * 0.25}s`,
                          animationDuration: `${arr.length * 0.25}s`,
                        }}
                      >
                        {word}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
