"use client";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function TextTruncator({
  className,
  text,
  treshHold = 150,
}: {
  className: string;
  text: string;
  treshHold?: number;
}) {
  const [show, setShow] = useState(false);
  return (
    <>
      <div
        className={cn(
          "flex text-gray-700 justify-between items-center",
          className
        )}
      >
        <div className="flex items-start">
          <div className="mr-2">
            {show || text.length <= treshHold
              ? text
              : `${text.slice(0, treshHold)} ... `}
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-1">
        {text.length > treshHold && (
          <button
            onClick={() => setShow((prev) => !prev)}
            className="text-gray-700 justify-center items-center text-xl ml-1 flex flex-row cursor-pointer"
          >
            {show ? <ChevronUp /> : <ChevronDown />}
            {show ? "بستن" : "بیشتر"}
          </button>
        )}
      </div>
    </>
  );
}
