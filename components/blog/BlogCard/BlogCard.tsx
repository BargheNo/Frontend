"use client";
import TextTruncator from "@/components/Custom/TextTruncator/TextTruncator";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Calendar, Heart } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import BlogEditor from "../BlogEditor/BlogEditor";

export default function BlogCard({
  className,
  blogID,
  imageUrl,
  title,
  description,
  writer,
  date,
  likeCount,
  viewOnly = false,
}: {
  className?: string;
  blogID: string;
  imageUrl: string;
  title: string;
  description: string;
  writer: string;
  date: string;
  viewOnly?: boolean;
  likeCount: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {!viewOnly ? (
        <>
          <Dialog>
            <DialogContent className="w-[90vw]! max-w-none! h-[90vh]! p-10">
              <BlogEditor blogID={blogID} />
            </DialogContent>
            <ContextMenu>
              <ContextMenuTrigger asChild>
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
                        <div className="font-bold text-xl short-par">
                          {title}
                        </div>
                        <div className="flex gap-1">
                          <Heart
                            fill="#fb8500"
                            className="cursor-pointer"
                            color="#fb8500"
                          />
                          <span>{likeCount}</span>
                        </div>
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
              </ContextMenuTrigger>
              <ContextMenuContent className="w-full h-full p-2 bg-warm-white border-0! neo-card flex flex-col gap-2">
                <DialogTrigger className="neo-btn rounded-lg!">
                  ویرایش
                </DialogTrigger>

                <button className="neo-btn rounded-lg!"> حذف</button>
              </ContextMenuContent>
            </ContextMenu>
          </Dialog>
        </>
      ) : (
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
                <div className="flex gap-1">
                  <Heart
                    fill="#fb8500"
                    className="cursor-pointer"
                    color="#fb8500"
                  />
                  <span>{likeCount}</span>
                </div>
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
      )}
    </>
  );
}
