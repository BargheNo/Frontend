import TextTruncator from "@/components/Custom/TextTruncator/TextTruncator";
import { cn } from "@/lib/utils";
import { Calendar, Heart } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function BlogCard({
  className,
  imageUrl,
  title,
  description,
  writer,
  date,
}: {
  className?: string;
  imageUrl?: string;
  title?: string;
  description?: string;
  writer?: string;
  date?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col m-5 neo-card rounded-2xl bg-warm-white overflow-hidden",
        className
      )}
    >
      <div className="relative z-10 self-center rounded-xl h-[300px] w-full ">
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-b opacity-40 from-black to-transparent z-20"></div>
        <Image
          className="object-cover"
          src={imageUrl ?? ""}
          alt="Profile picture"
          fill={true}
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-4 justify-start items-start p-5">
          <div className="flex justify-between w-full">
            <div className="font-bold text-xl short-par">{title}</div>
            <Heart fill="#fb8500" className="cursor-pointer" color="#fb8500" />
          </div>

          <div className="text-lg text-gray-700 short-par">
            {description ?? ""}
          </div>
        </div>
        <div className="flex justify-between w-full px-5 pb-2">
          <div className="flex gap-2 justify-between items-center">
            <Calendar size={25} className="text-sunset-orange" />
            <span className="block text-center h-5">{date}</span>
          </div>
          <div>{writer}</div>
        </div>
      </div>
    </div>
  );
}
