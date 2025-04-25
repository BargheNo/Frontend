"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ChatItem from "../ChatItem/ChatItem";
import { Separator } from "@/components/ui/separator";
import { getData } from "@/src/services/apiHub";
import { ChatRoom } from "@/types/chat";
import { useDispatch } from "react-redux";
import { setChatRooms, setSelectedChatRoom } from "@/src/store/slices/chatSlice";
import { useSelector } from "react-redux";

export default function ChatList({
  className,
  conditionWidth,
  mode = "user"
}: {
  className?: string;
  conditionWidth?: number;
  mode?: "user" | "corp";
}) {


  
  const dispatch = useDispatch();
  const chatRooms = useSelector((state: any) => state.chat.chatRooms);
  useEffect(() => {
    getData({ endPoint: mode === "user" ? "/v1/user/chat/room" : "/v1/corp/chat/rooms/1" }).then((res: any) => {
      console.log(res);
      dispatch(setChatRooms(res?.data))
      if(res?.data?.length > 0){
        dispatch(setSelectedChatRoom(res?.data[0]))
      }
    });
  }, []);
  return (
    <div
      className={cn(
        "neo-card bg-[#F0EDEF] flex flex-col items-center rounded-md py-2 w-full px-2",
        className
      )}
    >
      { chatRooms.length > 0 ? chatRooms.map((chatRoom: ChatRoom) => (
        <ChatItem containerWidth={conditionWidth} key={chatRoom.roomID} chatRoom={chatRoom} onClick={()=>{
          dispatch(setSelectedChatRoom(chatRoom))
        }} />
      )) : <div className="text-center text-gray-500">No chat rooms found</div>}
    </div>
  );
}
