"use client"
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function NotificationContent({description, ...props }:{description:string}) {
    const [showFullBody,setShowFullBody]=useState(false);
	return (
		<>
			<div className="flex  text-gray-700 justify-between mt-6 items-center">
                <div className="flex items-start text-black ">
                    <span className="mr-2">
                        {showFullBody || description.length <= 150
                            ? description
                            : `${description.slice(0, 150)}... `}
                    </span>
                </div>
            </div>
            <div className="flex flex-row gap-1 mt-4 ">
                {description.length > 150 && (
                <button
                    onClick={() =>setShowFullBody((prev) => !prev)}
                    className="text-gray-500 justify-center items-center text-xl ml-1 flex flex-row cursor-pointer">
                    {showFullBody ? (
                        <ChevronUp />) : (
                        <ChevronDown />
                    )}
                    {showFullBody ? "بستن" : "بیشتر"}
                </button>
                )}
            </div>
		</>
	);
}
