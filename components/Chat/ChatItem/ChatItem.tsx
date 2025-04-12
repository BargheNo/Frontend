"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import React from "react";

interface ChatItemProps {
  containerWidth?: number;
  selected?: boolean;
}

export default function ChatItem({ containerWidth, selected = false }: ChatItemProps) {
  const showText = containerWidth ? containerWidth > 25 : false;

  return (
    <div
      className={cn(
            "flex justify-center items-center gap-3 w-full px-4 py-3",
        selected && "bg-gray-500 text-white"
      )}
      style={{ justifyContent: showText ? "flex-start" : "center" }}
    >
      <Avatar className="h-12 w-12 flex-shrink-0">
        <AvatarImage
          src="/images/Default/jinks.jpg"
          alt="Profile"
          className="object-cover"
        />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
      {showText && (
        <div className="flex flex-col gap-1 min-w-0">
          <span className="font-medium">Chat Name</span>
          <span className={cn("text-sm truncate", selected ? "text-white" : "text-gray-500")}>
            Last message...
          </span>
        </div>
      )}
    </div>
  );
}
