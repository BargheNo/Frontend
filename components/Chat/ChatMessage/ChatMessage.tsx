"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Copy, Share2, Pencil, Reply } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface ChatMessageProps {
  log?: number;
  type: "self" | "other";
  containerWidth: number;
  message: string;
  messageId: number;
  // onReply: (messageId: string) => void;
  // onEdit: (messageId: string, newContent: string) => void;
  // replyTo?: string;
  ref?: any;
  srcpic?: string;
  decpic?: string;
  time?: string;
  srcName: string;
  decName: string;
}

export default function ChatMessage({
  type = "self",
  message,
  messageId,
  log,
  ref,
  srcpic,
  decpic,
  srcName,
  decName,
  time,
}: ChatMessageProps) {
  const [messageWidth, setMessageWidth] = useState<number>(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      toast.success("Message copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy message");
      console.error("Failed to copy message:", err);
    }
  };

  // useEffect(() => {
  //   // Set random width only if it hasn't been set yet (messageWidth is 0)
  //   if (messageWidth === 0) {
  //     const minWidth = Math.min(320, containerWidth * 0.4);
  //     const maxWidth = containerWidth * 0.8;
  //     setMessageWidth(
  //       Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth)
  //     );
  //   }
  //   // If message width is larger than container, adjust it
  //   else if (messageWidth > containerWidth - 100) {
  //     setMessageWidth(containerWidth - 100);
  //   }
  //   if (log) {
  //     console.log("messageWidth", messageWidth);
  //     console.log("containerWidth", containerWidth);
  //   }
  // }, [containerWidth, messageWidth, log]);

  // const handleReply = () => {
  //   onReply(messageId);
  // };

  // const handleEdit = () => {
  //   if (type === "self") {
  //     setIsEditing(true);
  //   }
  // };

  // const saveEdit = () => {
  //   onEdit(messageId, editedMessage);
  //   setIsEditing(false);
  // };

  return type === "other" ? (
    <div
      ref={ref}
      className="flex flex-col items-end gap-2 self-end max-w-[50%]"
      // style={{ width: `${messageWidth}px` }}
    >
      {log && <div className="text-xs text-gray-500">{log}</div>}
      <Avatar className="h-12 w-12">
        <AvatarImage
          src={srcpic}
          alt="Profile"
          className="object-cover"
        />
        <AvatarFallback>{srcName?.charAt(0) + srcName?.charAt(1)}</AvatarFallback>
      </Avatar>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className="bg-gray-800 text-white rounded-b-xl rounded-tr-xl ml-4 p-4 neo-card"
            // style={{ width: `${messageWidth}px` }}
          >
            {/* {replyTo && (
              <div className="text-sm text-gray-400 mb-2">
                Replying to a message
              </div>
            )} */}
            {message}
            {time && <div className="text-xs text-gray-400 mt-1">{time}</div>}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          {/* <ContextMenuItem onClick={handleReply}>
            <Reply className="h-4 w-4" />
            Reply
          </ContextMenuItem> */}
          {/* <ContextMenuItem className="flex items-center gap-2 hover:bg-gray-100 focus:bg-gray-100 cursor-pointer">
            <Share2 className="h-4 w-4" />
            Share
          </ContextMenuItem> */}
          <ContextMenuItem
            className="flex items-center gap-2 hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
            onClick={handleCopy}
          >
            <Copy className="h-4 w-4" />
            Copy
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ) : (
    <div
      ref={ref}
      className="flex flex-col items-start gap-2 self-start max-w-[50%]"
      // style={{ width: `${messageWidth}px` }}
    >
      {log && <div className="text-xs text-gray-500">{log}</div>}
      <Avatar className="h-12 w-12">
        <AvatarImage
          src={decpic}
          alt="Profile"
          className="object-cover"
        />
        <AvatarFallback>{decName?.charAt(0) + decName?.charAt(1)}</AvatarFallback>
      </Avatar>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className="bg-white text-gray-800 rounded-b-xl rounded-tl-xl mr-4 p-4 neo-card"
            // style={{ width: `${messageWidth}px` }}
          >
            {/* {replyTo && (
              <div className="text-sm text-gray-400 mb-2">
                Replying to a message
              </div>
            )} */}
            {isEditing ? (
              <input
                type="text"
                value={editedMessage}
                onChange={(e) => setEditedMessage(e.target.value)}
                // onBlur={saveEdit}
                autoFocus
                className="w-full bg-transparent outline-none"
              />
            ) : (
              <>
                {message}
                {time && <div className="text-xs text-gray-400 mt-1">{time}</div>}
              </>
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          {/* <ContextMenuItem onClick={handleReply}>
            <Reply className="h-4 w-4" />
            Reply
          </ContextMenuItem> */}
          {/* <ContextMenuItem className="flex items-center gap-2 hover:bg-gray-100 focus:bg-gray-100 cursor-pointer">
            <Pencil className="h-4 w-4" />
            Edit
          </ContextMenuItem> */}
          <ContextMenuItem className="flex items-center gap-2 hover:bg-gray-100 focus:bg-gray-100 cursor-pointer">
            <Share2 className="h-4 w-4" />
            Share
          </ContextMenuItem>
          <ContextMenuItem
            className="flex items-center gap-2 hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
            onClick={handleCopy}
          >
            <Copy className="h-4 w-4" />
            Copy
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
