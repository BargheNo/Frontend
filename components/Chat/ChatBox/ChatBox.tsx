"use client";
import { ChevronLeft, Send, Webhook } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useChatMessages } from "@/src/hooks/useChatMessages";
import { useChatScroll } from "@/src/hooks/useChatScroll";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

export default function ChatBox({ className, mode = "user" }: { className?: string, mode?: "user" | "corp" }) {
  const router = useRouter();
  const [boxWidth, setBoxWidth] = React.useState(0);
  const [newMessage, setNewMessage] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const boxRef = React.useRef<HTMLDivElement>(null);
  const thirdMessage = React.useRef<any>(null);
  const messageReloaderRef = React.useRef<HTMLDivElement>(null);
  const selectedChatRoom = useSelector((state: any) => state.chat.selectedChatRoom);
  const user = useSelector((state: any) => state.user);

  const {
    messages,
    currentPage,
    isLoading,
    // sendMessage,
    // isConnected,
    socket,
    getNewPage,
    scrollToBottom
  } = useChatMessages(selectedChatRoom);

  const { rollerRef } = useChatScroll(
    messageReloaderRef,
    thirdMessage,
    getNewPage,
    currentPage
  );

  useEffect(() => {

    return () => {
      if(socket){
        socket.close();
      }
    }
  }, []);

  useEffect(() => {
    console.log(selectedChatRoom);
  }, [selectedChatRoom]);

  // set box width
  React.useEffect(() => {
    if (!boxRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setBoxWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(boxRef.current);
    setBoxWidth(boxRef.current.offsetWidth);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // handle reply
  const handleReply = (messageId: string) => {
    setReplyingTo(messageId);
  };

  // handle send message
  const handleSendMessage = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && newMessage.trim()) {
      const message: any = 
        {"type": "chat", "content": newMessage.trim()};
      
      // sendMessage(JSON.stringify(message));
      if(socket){
        socket.send(JSON.stringify(message)); 
      }
      setNewMessage("");
      setReplyingTo(null);
      scrollToBottom();
    }
  };

  return (
    <div
      ref={boxRef}
      className={cn("neo-card bg-[#F0EDEF] rounded-lg relative", className)}
    >
      <div className="flex flex-row-reverse justify-between gap-2 px-6 items-center absolute top-0 right-0 left-0 h-20 rounded-t-md bg-white shadow-[2px_2px_5px_rgba(0,0,0,0.3)]">
        <div className="cursor-pointer hover:bg-gray-400 rounded-full flex items-center justify-center">
          <ChevronLeft size={32} onClick={() => router.back()} />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={mode === "user" ? selectedChatRoom?.corporation?.logo : selectedChatRoom?.customer?.profilePic}
              alt="Profile"
              className="object-cover"
            />
            <AvatarFallback className="bg-gray-500 text-white">{mode === "user" ? selectedChatRoom?.corporation?.name?.charAt(0) + selectedChatRoom?.corporation?.name?.charAt(1) : selectedChatRoom?.customer?.firstName?.charAt(0) + selectedChatRoom?.customer?.lastName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col mr-3">
            <span className="font-medium">{mode === "user" ? selectedChatRoom?.corporation?.name : selectedChatRoom?.customer?.firstName + " " + selectedChatRoom?.customer?.lastName}</span>
            {/* <span className={cn(
              "text-sm",
              isConnected ? "text-green-500" : "text-red-500"
            )}>
              {isConnected ? 'Online' : 'Offline'}
            </span> */}
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div
            id="chat-box"
            className="flex flex-col overscroll-y-auto scroll-smooth gap-4 absolute p-3 top-20 right-0 left-0 bottom-18 rounded-lg overflow-y-scroll no-scrollbar neo-card-rev-lg m-3"
          >
            <div
              ref={messageReloaderRef}
              className="w-full opacity-0 flex items-center justify-center gap-3"
            >
              <Webhook color="#FA682D" className="reload-spiner" />
              <Webhook color="#CB7096" className="reload-spiner" />
              <Webhook color="#A662D6" className="reload-spiner" />
            </div>
            {[...new Map(messages.map(message => [message.id, message])).values()]
              .reverse()
              .map((message, index) => (
                <ChatMessage
                  key={message.id}
                  message={message.content}
                  type={message.sender.firstName === user.firstName && message.sender.lastName === user.lastName ? "self" : "other"}
                  containerWidth={boxWidth}
                  messageId={message.id}
                  // log={index}
                  ref={index === 2 ? thirdMessage : null}
                />
              ))}
          </div>
          <div className="absolute neo-card-rev bottom-3 bg-white min-h-[48px] max-h-[200px] right-3 left-3 rtl mx-auto flex items-center rounded-lg px-3">
            <Webhook id="roller" ref={rollerRef} />
            <textarea
              className="w-full bg-transparent outline-none resize-none py-3 mr-[8px] max-h-[200px] overflow-y-auto no-scrollbar"
              placeholder={
                replyingTo
                ? "در حال پاسخ به پیام..."
                : "پیام خود را اینجا بنویسید..."
              }
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              style={{ minHeight: "48px" }}
              rows={1}
            />
            <button
              title="ارسال پیام"
              onClick={() =>
                handleSendMessage({
                  key: "Enter",
                } as React.KeyboardEvent<HTMLInputElement>)
              }
              className="p-2 hover:bg-gray-100 rounded-full transition-colors self-end"
            >
              <Send className="text-gray-600 mb-0.5" size={24} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
