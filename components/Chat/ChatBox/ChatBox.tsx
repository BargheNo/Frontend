"use client";
import { ChevronLeft, Send } from "lucide-react";
import React, { useState } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import { cn } from "@/lib/utils";
import { mockMessages } from "@/mocks/messagesMock";
import { Message } from "@/types/chat";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export default function ChatBox({ className }: { className?: string }) {
  const router = useRouter();
  const [boxWidth, setBoxWidth] = React.useState(0);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const boxRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!boxRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setBoxWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(boxRef.current);

    // Initial width set
    setBoxWidth(boxRef.current.offsetWidth);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleReply = (messageId: string) => {
    setReplyingTo(messageId);
    // You can also scroll to your input field or show a reply UI indicator
  };

  const handleEdit = (messageId: string, newContent: string) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, content: newContent } : msg
      )
    );
  };

  const handleSendMessage = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        content: newMessage.trim(),
        type: "self",
        timestamp: new Date(),
        replyTo: replyingTo || undefined,
      };
      setMessages((prev) => [...prev, message]);
      setNewMessage("");
      setReplyingTo(null);
    }
  };

  return (
    <div
      ref={boxRef}
      className={cn("neo-card bg-[#F0EDEF] rounded-lg relative", className)}
    >
      <div className=" flex flex-row-reverse justify-between gap-2 px-6 items-center absolute top-0 right-0 left-0 h-20 rounded-t-md bg-white shadow-[2px_2px_5px_rgba(0,0,0,0.3)]">
        <div className="cursor-pointer hover:bg-gray-400 rounded-full flex items-center justify-center">
          <ChevronLeft size={32} onClick={() => router.back()} />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src="/images/Default/jinks.jpg"
              alt="Profile"
              className="object-cover"
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
          <div className="flex flex-col mr-3">
            <span className="font-medium">Chat Name</span>
            <span className="text-sm text-gray-500">Online</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 absolute p-3 top-20 right-0 left-0 bottom-18 rounded-lg overflow-y-scroll no-scrollbar neo-card-rev-lg m-3">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.content}
            type={message.type}
            containerWidth={boxWidth}
            messageId={message.id}
            onReply={handleReply}
            onEdit={handleEdit}
            replyTo={message.replyTo}
          />
        ))}
      </div>
      <div className="absolute neo-card-rev bottom-3 bg-white min-h-[48px] max-h-[200px] right-3 left-3 rtl mx-auto flex items-center rounded-lg px-3">
        <textarea
          className="w-full bg-transparent outline-none resize-none py-3 max-h-[200px] overflow-y-auto no-scrollbar"
          placeholder={
            replyingTo
              ? "در حال پاسخ به پیام..."
              : "پیام خود را اینجا بنویسید..."
          }
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            // Auto-adjust height based on content
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
    </div>
  );
}
