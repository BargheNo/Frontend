"use client";
import Image from "next/image";
import React from "react";
// import panelGuy1 from "@/public/images/admin-dashboard/panelGuy1.jpg";

export default function Page() {
    return (
        <div className="flex flex-col sm:flex-row relative bg-white justify-center h-full sm:h-fit">
            <p className="vazir text-3xl sm:text-5xl flex m-auto w-2/3 text-center items-center sm:mt-0 sm:mr-4 leading-16">
                به سامانه مدیریت برق نو خوش آمدید!
            </p>
            <div className="py-18">
                <Image
                    alt="panelGuy"
                    // src={panelGuy1}
                    src="/images/admin-dashboard/panelGuy3.jpg"
                    // fill
                    // style={{ objectFit: "cover" }}
                    // unoptimized
                    // style={{ width: "100%", height: "auto" }}
                    width={1248}
                    height={832}
                />
            </div>
        </div>
    );
}
