"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import React from "react";
import { ChatRoom } from "@/types/chat";
import { useSelector } from "react-redux";
interface ChatItemProps {
  containerWidth?: number;
  selected?: boolean;
  chatRoom: ChatRoom;
  onClick?: () => void;
}

export default function ChatItem({
  onClick,
  chatRoom,
  containerWidth,
}: ChatItemProps) {
  const showText = containerWidth ? containerWidth > 20 : false;
  const selectedChatRoom = useSelector((state: any) => state.chat.selectedChatRoom);
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
          src={chatRoom.corporation.logo ?? "/images/Default/jinks.jpg"}
          alt="Profile"
          className="object-cover"
        />
        <AvatarFallback className={cn(chatRoom === selectedChatRoom && "text-white bg-gray-700")}>{chatRoom.corporation.name.charAt(0)+chatRoom.corporation.name.charAt(1)}</AvatarFallback>
      </Avatar>
      {showText && (
        <div className="flex flex-col gap-1 min-w-0">
          <span className="font-medium">{chatRoom.corporation.name}</span>
          <span
            className={cn(
              "text-sm truncate",
              chatRoom === selectedChatRoom ? "text-white" : "text-gray-500"
            )}
          >
            Last message...
          </span>
        </div>
      )}
    </div>
  );
}
