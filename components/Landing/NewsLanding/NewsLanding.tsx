"use client";
import NeuFrame from "@/components/Custom/NeuFrame/NeuFrame";
import React from "react";
import AnnounceView from "@/components/Announcement/AnnounceView/AnnounceView";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";

export default function NewsLanding() {
  useGSAP(() => {
    gsap.from(".news-box", {
      opacity: 0,
      duration: 2,
      x: "+=100%",
      ease: "power2.out",
      delay: 0.7,
      scrollTrigger:
        {
          trigger: ".news-box",
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none none",
          // markers: true,
        },
    });
  });
  return (
    <div className="w-full h-fit px-5 md:px-[10vw] pt-40 news-box">
      <NeuFrame className="w-1/2 md:w-1/3 h-20 rounded-b-none bg-warm-white">
        <div className="flex justify-center items-center w-full h-full text-lg font-bold">
          اخبار و اطلاعیه‌ها
        </div>
      </NeuFrame>
      <AnnounceView onlyView className="rounded-tr-none " />
    </div>
  );
}
