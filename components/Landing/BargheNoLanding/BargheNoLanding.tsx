"use client";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { vazir } from "@/lib/fonts";
import panel from "@/public/images/Landing/panel.png";
import Link, { use } from "next/link";
import React, { useEffect, useState } from "react";
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
import PanelBluePrint from "@/public/images/panels/panel-blueprint-2.jpeg";
import CleanEnergy from "@/public/images/panels/clean-energy.jpeg";
import TypewriterComponent from "typewriter-effect";
import { delay } from "cypress/types/bluebird";
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function BargheNoLanding() {
  const [position, setPosition] = useState([0, -0.7, 0]);
  const [rotation, setRotation] = useState([0.1, 1, 0]);
  const [scale, setScale] = useState(1.4);
  const [D3PanelRef, setD3PanelRef] = useState<any>(null);
  const slide1Trigger = {
    trigger: "#slide-panel1",
    start: "top top",
    end: () => `+=${1 * 1000}vh`,
    toggleActions: "play none none reverse",
  };
  const slide2Trigger = {
    trigger: "#slide-panel2",
    start: "110% top",
    end: () => `+=${1 * 1000}vh`,
    toggleActions: "play none none reverse",
    markers: true,
  };
  const slide3Trigger = {
    trigger: "#slide-panel3",
    start: "top top",
    end: () => `+=${1 * 1000}vh`,
    toggleActions: "play none none reverse",
  };
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

        // markers: true,
      },
    };

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: snapper,
    });

    gsap.to(".D3Panel", {
      y: "-=20vh",
      x: "-=2vw",
      // scale: 0.8,
      duration: 0.5,
      scrollTrigger: {
        trigger: "#slide-panel1",
        start: "12% top",
        // end: "center top",
        end: () => `+=${1 * 1000}vh`,
        // markers: true,
        toggleActions: "play none none reverse",
      },
    });
    gsap.to("#slide1-text", {
      opacity: 0,
      duration: 0.5,
      scrollTrigger: slide1Trigger,
    });

    gsap.from("#blueprint", {
      opacity: 0,
      y: "+=100%",
      animation: "power1.inOut",
      duration: 1,
      delay: 1.5,
      repeatDelay: 1.5,
      scrollTrigger: slide1Trigger,
    });
    gsap.from("#clean-card", {
      opacity: 0,
      y: "+=100%",
      animation: "power1.inOut",
      duration: 1,
      delay: 1.5,
      repeatDelay: 1.5,
      scrollTrigger: slide1Trigger,
    });
    // gsap.to("#blueprint", {
    //   opacity: 0,
    //   y: "+=100%",
    //   animation: "power1.inOut",
    //   duration: 1,
    //   scrollTrigger: slide2Trigger,
    // });

    console.log("useGsap runs");
  });
  useEffect(() => {
    gsap.to(D3PanelRef?.rotation, {
      x: 0,
      y: 3.14,
      z: 0,
      duration: 0.5,
      ease: "power1.inOut",
      scrollTrigger: slide1Trigger,
    });
    gsap.to(D3PanelRef?.scale, {
      x: 1.1,
      y: 1.1,
      z: 1.1,
      duration: 0.5,
      ease: "power1.inOut",
      scrollTrigger: slide1Trigger,
    });
  }, [D3PanelRef]);

  return (
    <>
      <div className="container-box h-[100vh]! flex flex-row-reverse max-w-none! w-auto! overflow-hidden">
        {/* <div className="fixed bg-red-500 top-20! bottom-20! left-20! right-20! w-[60vw] h-[50vh] flex justify-center items-center"> */}
        <div className="D3Panel fixed z-20 w-[40vw] left-[8vw] bottom-[20vh] top-[20vh] flex items-center justify-center rounded-2xl">
          <Canvas
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <PerspectiveCamera makeDefault position={[0, 1.5, 3]} />
            <OrbitControls />
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
            <D3Panel
              position={position}
              rotation={rotation}
              scale={scale}
              ref={setD3PanelRef}
            />
          </Canvas>
        </div>
        <div
          className="w-[100vw] h-[100vh] pt-20 flex-none px-10 gap-2 slide-panel"
          id="slide-panel1"
        >
          <div className="w-full h-full flex flex-row-reverse items-center justify-between">
            <div className="w-full h-full"></div>
            <div
              className="w-full flex flex-col justify-center items-center gap-20"
              id="slide1-text"
            >
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
                  "bg-fire-orange w-3/5 rounded-full flex items-center justify-center text-white py-3 gap-2 font-bold hover:bg-black",
                  "btn-animation"
                )}
              >
                <span className={`${vazir.className} text-2xl`}>ورود</span>
                <ArrowLeft />
              </button>
            </div>
          </div>
        </div>
        <div
          className="w-[100vw] max-w-none h-[100vh] flex-none slide-panel pt-[4.2rem] px-3 pb-5"
          id="slide-panel2"
        >
          <div className="flex flex-row justify-between w-full h-full">
            <div className="w-full h-full p-5 justify-center">
              <div
                className="neo-card w-full h-full p-6 rounded-lg bg-warm-white flex flex-col items-center justify-between"
                id="clean-card"
              >
                <span className="self-start text-3xl font-bold">چرا ما؟</span>
                <div className="w-full h-1/2 mt-4 text-lg text-gray-800">
                  <TypewriterComponent
                    options={{ delay: 40 }}
                    onInit={(typewriter) => {
                      typewriter
                        .typeString(
                          `پنل‌های خورشیدی یکی از بهترین راه‌حل‌های تولید انرژی پاک و
                  مقرون‌به‌صرفه هستند که با جذب نور خورشید، برق مورد نیاز منازل،
                  صنایع و مؤسسات را تأمین می‌کنند. کیفیت این پنل‌ها نقش
                  تعیین‌کننده‌ای در بازدهی و طول عمر سیستم خورشیدی دارد؛ به‌همین
                  دلیل، محصولات باکیفیت همراه با گارانتی عملکرد ۲۵ ساله ارائه
                  می‌شوند تا مشتریان با اطمینان کامل از بازدهی مطلوب و دوام بالا
                  بهره‌مند شوند. نصب اصولی پنل‌های خورشیدی نیز از اهمیت ویژه‌ای
                  برخوردار است و باید توسط تیم‌های متخصص و دارای مجوز انجام شود
                  تا از بیشترین جذب انرژی و ایمنی سیستم اطمینان حاصل گردد. با
                  انتخاب پنل‌های استاندارد و نصب حرفه‌ای، نه‌تنها در هزینه‌های
                  بلندمدت صرفه‌جویی می‌شود، بلکه سهم ارزشمندی در حفظ محیط زیست و
                  کاهش مصرف سوخت‌های فسیلی ایفا می‌کنید.`
                        )
                        .start();
                    }}
                  />
                </div>
                <div className="relative h-1/2 aspect-square rounded-2xl overflow-hidden">
                  <Image src={CleanEnergy} alt="CleanEnergy" fill />
                </div>
              </div>
            </div>
            <div className=" w-full h-full p-5">
              <div
                className="w-full h-full p-3 bg-warm-white neo-card rounded-lg"
                id="blueprint"
              >
                <div className="w-full h-full neo-card-rev p-3 bg-warm-white rounded-lg flex flex-col justify-between ">
                  <div className="w-full h-full"></div>
                  <div className="w-full h-full relative rounded-lg overflow-hidden">
                    <Image src={PanelBluePrint} alt="panel-blue-print" fill />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div
          className="w-[100vw] max-w-none h-[100vh] flex-none slide-panel"
          id="slide-panel3"
        >
        </div> */}
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
