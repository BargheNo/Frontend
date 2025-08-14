"use client";
import Image from "next/image";
import React from "react";
// import panelGuy1 from "@/public/images/admin-dashboard/panelGuy1.jpg";

export default function Page() {
    return (
        <div className="flex flex-col sm:flex-row bg-white justify-center items-center h-full gap-4 p-6 text-center">
            <p className="vazir text-3xl sm:text-5xl leading-16 text-center">
                به سامانه مدیریت برق نو خوش آمدید!
            </p>
            <Image
                alt="panelGuy"
                src="/images/admin-dashboard/panelGuy3.jpg"
                width={1248}
                height={832}
            />
        </div>
        // <div className="flex flex-col sm:flex-row relative bg-white justify-center items-center h-full">
        //     <p className="vazir text-3xl sm:text-5xl flex w-2/3 text-center items-end sm:items-center h-full sm:mr-4 leading-16">
        //         به سامانه مدیریت برق نو خوش آمدید!
        //     </p>
        //     <div className="">
        //         <Image
        //             alt="panelGuy"
        //             // src={panelGuy1}
        //             src="/images/admin-dashboard/panelGuy3.jpg"
        //             // fill
        //             // style={{ objectFit: "cover" }}
        //             // unoptimized
        //             // style={{ width: "100%", height: "auto" }}
        //             width={1248}
        //             height={832}
        //         />
        //     </div>
        // </div>
    );
}
