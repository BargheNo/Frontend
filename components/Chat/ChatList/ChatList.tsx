"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ChatItem from "../ChatItem/ChatItem";
import { Separator } from "@/components/ui/separator";
import { getData } from "@/src/services/apiHub";
import { ChatRoom } from "@/types/chat";

export default function ChatList({
  className,
  conditionWidth,
}: {
  className?: string;
  conditionWidth?: number;
}) {


    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

    useEffect(() => {
    getData({endPoint:"/v1/user/chat/room"}).then((res:ChatRoom[])=>{
      setChatRooms(res)
    });
  }, []);
  return (
    <div
      className={cn(
        "neo-card bg-[#F0EDEF] flex flex-col items-center rounded-md py-2 w-full px-2",
        className
      )}
    >
      {chatRooms.map((chatRoom) => (
        <ChatItem containerWidth={conditionWidth} chatRoom={chatRoom} />
      ))}
    </div>
  );
}
