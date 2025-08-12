"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ChatItem from "../ChatItem/ChatItem";
import { Separator } from "@/components/ui/separator";
import { getData } from "@/src/services/apiHub";
import { ChatRoom } from "@/types/chat";
import { useDispatch } from "react-redux";
import {
    setChatRooms,
    setSelectedChatRoom,
} from "@/src/store/slices/chatSlice";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@/src/hooks/useMediaQuery";

export default function ChatList({
    className,
    conditionWidth,
    mode = "user",
    corpID,
}: {
    className?: string;
    conditionWidth?: number;
    mode?: "user" | "corp";
    corpID?: number;
}) {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const dispatch = useDispatch();
    const chatRooms = useSelector((state: any) => state.chat.chatRooms);

    return (
        <div
            className={cn(
                "neo-card bg-[#F0EDEF] flex flex-col items-center rounded-md py-2 w-full px-2 z-20",
                className
            )}
        >
            {chatRooms.length > 0 ? (
                chatRooms.map((chatRoom: ChatRoom) => (
                    <ChatItem
                        containerWidth={conditionWidth}
                        key={chatRoom.roomID}
                        chatRoom={chatRoom}
                        onClick={() => {
                            dispatch(setSelectedChatRoom(chatRoom));
                        }}
                        mode={mode}
                    />
                ))
            ) : (
                <div className="text-center text-gray-500">
                    {isMobile ? "هیچ مکالمه‌ای یافت نشد." : ""}
                </div>
            )}
        </div>
    );
}
