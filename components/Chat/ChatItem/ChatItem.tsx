"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import { ChatRoom } from "@/types/chat";
import { useSelector } from "react-redux";
interface ChatItemProps {
  containerWidth?: number;
  selected?: boolean;
  chatRoom: ChatRoom;
  onClick?: () => void;
  mode?: "user" | "corp";
}

export default function ChatItem({
  onClick,
  chatRoom,
  containerWidth,
  mode,
}: ChatItemProps) {
  const showText = containerWidth ? containerWidth > 20 : false;
  const selectedChatRoom = useSelector((state: any) => state.chat.selectedChatRoom);
  useEffect(() => {
    console.log("mode", mode);
  }, [mode]);
  return (
    <div
      className={cn(
        "flex justify-center items-center gap-3 w-full p-2",
        "neo-card-rev flex px-3 m-2 rounded lg",
          chatRoom === selectedChatRoom && "bg-gray-500 text-white"
      )}
      onClick={onClick}
      style={{ justifyContent: showText ? "flex-start" : "center" }}
    >
      <Avatar className="h-12 w-12 flex-shrink-0">
        <AvatarImage
          src={mode === "user" ? chatRoom.corporation.logo : chatRoom.customer.profilePic}
          alt="Profile"
          className="object-cover"
        />
        <AvatarFallback className={cn(chatRoom === selectedChatRoom && "text-white bg-gray-700")}>{mode === "user" ? chatRoom.corporation.name.charAt(0)+chatRoom.corporation.name.charAt(1) : chatRoom.customer.firstName.charAt(0)+chatRoom.customer.lastName.charAt(0)}</AvatarFallback>
      </Avatar>
      {showText && (
        <div className="flex flex-col gap-1 min-w-0">
          <span className="font-medium">{mode === "corp" ? chatRoom.customer.firstName + " " + chatRoom.customer.lastName : chatRoom.corporation.name}</span>
          {/* <span
            className={cn(
              "text-sm truncate",
              chatRoom === selectedChatRoom ? "text-white" : "text-gray-500"
            )}
          >
            Last message...
          </span> */}
        </div>
      )}
    </div>
  );
}
