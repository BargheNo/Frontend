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
  const sepratorClassName = "bg-gray-900";
  return (
    <div
      className={cn(
        "neo-card bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2] flex flex-col items-center rounded-md py-2 w-full px-1",
        className
      )}
    >
      <ChatItem containerWidth={conditionWidth} />
      <Separator className={sepratorClassName} />
      <ChatItem selected containerWidth={conditionWidth} />
      <Separator className={sepratorClassName} />
      <ChatItem containerWidth={conditionWidth} />
      <Separator className={sepratorClassName} />
      <ChatItem containerWidth={conditionWidth} />
      <Separator className={sepratorClassName} />
    </div>
  );
}
