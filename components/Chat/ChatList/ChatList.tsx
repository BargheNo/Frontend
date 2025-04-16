"use client";
import React from "react";
import { cn } from "@/lib/utils";
import ChatItem from "../ChatItem/ChatItem";
import { Separator } from "@/components/ui/separator";

export default function ChatList({
  className,
  conditionWidth,
}: {
  className?: string;
  conditionWidth?: number;
}) {
  return (
    <div
      className={cn(
        "neo-card bg-[#F0EDEF] flex flex-col items-center rounded-md py-2 w-full px-2",
        className
      )}
    >
      <ChatItem containerWidth={conditionWidth} />
      <ChatItem selected containerWidth={conditionWidth} />
      <ChatItem containerWidth={conditionWidth} />
      <ChatItem containerWidth={conditionWidth} />
    </div>
  );
}
