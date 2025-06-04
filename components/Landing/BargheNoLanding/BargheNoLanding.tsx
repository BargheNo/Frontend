import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { vazir } from "@/lib/fonts";
import panel from "@/public/images/Landing/panel.png";
import Link from "next/link";
import React from "react";
import styles from "./BargheNoLanding.module.css";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { D3Panel } from "../D3Panel/D3Panel";
import {
  Box,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Stars,
} from "@react-three/drei";
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function BargheNoLanding() {
  useGSAP(() => {
    gsap.from(".panel-image", {
      opacity: 0,
      duration: 1,
      width: "100%",
      animation: "power2.inOut",
    });
    gsap.from(".h-text", {
      opacity: 0,
      duration: 1,
      y: 50,
      animation: "power4.inOut",
      stagger: {
        amount: 0.3,
      },
    });
    gsap.from(".btn-animation", {
      opacity: 0,
      duration: 1,
      y: "150px",
      animation: "power1.inOut",
      delay: 0,
    });
    const sections = gsap.utils.toArray(".slide-panel");

    const snapper = {
      trigger: ".container-box",
      start: "top top",
      end: () => `+=${(sections.length - 1) * 1000}vh`,
      pin: true,
      scrub: 1,
      snap: {
        snapTo: 1 / (sections.length - 1),
        duration: 0.5,
        ease: "power1.inOut",

        markers: true,
      },
    };

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: snapper,
    });

    gsap.to(".D3Panel", {
      left: "10vw",
      width: "20vw",
      top: "10vh",
      bottom: "50vh",
      scrollTrigger: {
        trigger: "#slide-panel1",
        start: "top top",
        end: () => `+=${1 * 1000}vh`,
        markers: true,
        toggleActions: "play none none reverse",
      },
    });
  });

  return (
    <>
      <div className="container-box h-[100vh]! flex flex-row-reverse max-w-none! w-auto! overflow-x-hidden">
        {/* <div className="fixed bg-red-500 top-20! bottom-20! left-20! right-20! w-[60vw] h-[50vh] flex justify-center items-center"> */}
        <div className="D3Panel fixed z-20 w-[80vw] bottom-[10vh] left-[10vw] top-[35vh] flex items-center justify-center">
          <Canvas
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <PerspectiveCamera makeDefault position={[0, 1.5, 3]} />
            <OrbitControls />
            {/* <Stars
              saturation={0}
              count={10000}
              depth={20}
              // color="#a0a0ff" // Soft blue stars
              // color2="#ffa0a0" // Secondary pinkish color for variation
            /> */}
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <Environment preset="city" />
            <D3Panel />
          </Canvas>
        </div>
        {/* </div> */}
        <div
          className="w-[100vw] h-[100vh] pt-20 flex-none px-10 gap-2 slide-panel"
          id="slide-panel1"
        >
          <div className="w-full flex flex-col justify-center items-center gap-20">
            <div className="flex flex-col items-center justify-center gap-2">
              <h1
                className={cn(
                  `text-9xl font-bold text-[#193947] ${vazir.className} flex place-self-center my-4`,
                  "h-text"
                )}
              >
                برق نو
              </h1>
              <span
                className={cn(
                  `${vazir.className} font-bold text-xl text-center`,
                  "h-text"
                )}
              >
                سامانه جامع مدیریت برق خورشیدی
              </span>
            </div>
            <button
              className={cn(
                "bg-fire-orange w-3/5 rounded-full flex items-center justify-center text-white py-3 gap-2 font-bold neo-btn hover:bg-black",
                "btn-animation"
              )}
            >
              <span className={`${vazir.className} text-2xl`}>ورود</span>
              <ArrowLeft />
            </button>
          </div>
        </div>
        <div
          className="w-[100vw] max-w-none h-[100vh] flex-none slide-panel"
          id="slide-panel2"
        >
          hello
        </div>
        <div
          className="w-[100vw] max-w-none h-[100vh] flex-none slide-panel"
          id="slide-panel3"
        >
          hello
        </div>
      </div>
    </>
    // <div className="w-[90vw] h-screen flex place-self-center items-center">
    // 	<div className="flex flex-col gap-5 w-1/2">
    // 		<h1
    // 			className={`text-9xl font-bold text-[#193947] ${vazir.className} flex place-self-center my-4`}
    // 		>
    // 			برق نو
    // 		</h1>
    // 		<span
    // 			className={`${vazir.className} font-bold text-xl text-center`}
    // 		>
    // 			سامانه جامع مدیریت برق خورشیدی
    // 		</span>
    // 		<Link href="/login" className="w-full">
    // 			<button className="w-3/5 place-self-center rounded-full flex justify-center gap-2 hover:cursor-pointer shadow-md hover:scale-105 items-center place-content-center cursor-pointer hover:shadow-lg transition duration-300 text-white p-4 font-bold bg-gradient-to-r from-[#EB4132] to-[#DD392B]">
    // 				<span className={`${vazir.className} text-2xl`}>
    // 					ورود
    // 				</span>
    // 				<ArrowLeft />
    // 			</button>
    // 		</Link>
    // 	</div>
    // 	<div className="p-8">
    // 		<div className="p-6 border-solid border-2 border-gray-100 rounded-lg">
    // 			<div className="p-6 border-solid border-2 border-gray-100 rounded-lg">
    // 				<div className="p-6 border-solid border-2 border-gray-200 rounded-lg">
    // 					<div className="p-6 border-solid border-2 border-gray-200 rounded-lg">
    // 						<Image
    // 							src={panel}
    // 							alt="panel"
    // 							className={`${styles.panel}`}
    // 						/>
    // 					</div>
    // 				</div>
    // 			</div>
    // 		</div>
    // 	</div>
    // </div>
  );
}
