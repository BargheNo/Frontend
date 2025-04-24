"use client";
import { ChevronLeft, Loader2, Send, Webhook } from "lucide-react";
import React, { useState, useEffect, use } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import { cn } from "@/lib/utils";
import { mockMessages } from "@/mocks/messagesMock";
import { Message } from "@/types/chat";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { set } from "react-hook-form";
import { getData } from "@/src/services/apiHub";
import { useSelector } from "react-redux";
import { useWebSocket } from "@/src/hooks/useChatWebSocket";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
gsap.registerPlugin(ScrollTrigger);

export default function ChatBox({ className }: { className?: string }) {
  const router = useRouter();
  const [boxWidth, setBoxWidth] = React.useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const boxRef = React.useRef<HTMLDivElement>(null);
  const rollerRef = React.useRef<SVGSVGElement>(null);
  const thirdMessage = React.useRef<any>(null);
  const messageReloaderRef = React.useRef<HTMLDivElement | null>(null);
  const selectedChatRoom = useSelector((state: any) => state.chat.selectedChatRoom);
  const token = useSelector((state: any) => state.user.accessToken);
  const [currentPage, setCurrentPage] = useState(1);
  const [wsUrl, setWsUrl] = useState<string | null>(null);
  const { messages: wsMessages, sendMessage, isConnected, connect , socket} = useWebSocket(wsUrl);
  const user = useSelector((state: any) => state.user);
  const [isLoading, setIsLoading] = useState(false);


  const scrollToBottom = () => {
    const chatBox = document.getElementById("chat-box");
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }

  const getNewPage = (page: number = 1, keepData: boolean = true, isInitial: boolean = false) => {
    console.log("roomID: ", selectedChatRoom.roomID);
    setCurrentPage(page);
    getData({endPoint: `/v1/user/chat/room/${selectedChatRoom.roomID}/messages`, params: {
      page: page,
      pageSize: 10
    }}).then((res: any)=>{
      if(res?.data?.length == 0){
        setIsLoading(false);
        return;
      }
      if(keepData){
        setMessages(prev => [...prev, ...res?.data])
      }else{
        setMessages(res?.data)
      }
      setIsLoading(false);
      if(isInitial){
        setTimeout(() => {
          scrollToBottom();
        }, 100);
      }
    })
  }
  
  // get initial messages
  useEffect(() => {
    if(selectedChatRoom){
      setIsLoading(true);
      getNewPage(1, false, true);
    }
  }, [selectedChatRoom])
  
  // // set ws url and connect
  useEffect(() => {
      console.log("wsUrl: ", wsUrl);
      setWsUrl(selectedChatRoom 
        ? `ws://46.249.99.69:8080/v1/user/chat/room/${selectedChatRoom.roomID}/token/${token}`
        : null);
      connect();
    
      return () => {
          if (socket) {
              socket.close();
            }
          };
        }, [selectedChatRoom, token]);
        
  // Handle incoming WebSocket messages
  useEffect(() => {
      if (wsMessages.length > 0) {
          const lastMessage = wsMessages[wsMessages.length - 1];
          try {
              const parsedMessage = JSON.parse(lastMessage);
              console.log("parsedMessage: ", parsedMessage);
              setMessages(prev => [parsedMessage, ...prev]);
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
              }
            }
          }, [wsMessages]);
                
  

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages])

  useEffect(() => {
          console.log("message count: ", messages.length);
  }, [messages])

  // set box width
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

  // scroll to bottom
  useEffect(() => {
    setTimeout(() => {
      const chatBox = document.getElementById("chat-box");
      if (chatBox) {
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    }, 0);
  }, []);

  // handle message reload
  useEffect(() => {
    const loaders = gsap.utils.toArray(".reload-spiner");
    // if (loaders.length !== 0) {
    //   console.log("loders");
    //   gsap.to(loaders, {
    //     rotate: 360,
    //     duration: 0.3,
    //     ease: "power1.out",
    //   });
    // }
    let messageReloader = null;
    if(messageReloaderRef.current){
      messageReloader = ScrollTrigger.create({
        trigger: messageReloaderRef.current,
        scroller: "#chat-box",
        start: "center top",
        end: "bottom bottom",
        // scrub: true,
        pin: true,
        // markers: true, // This will show visual markers for debugging
        id: "messageReloader",
        onEnterBack: () => {
          console.log("reload trigger");
          if (messageReloaderRef.current) {
            gsap.to(messageReloaderRef.current, {
              opacity: 1,
              height: "40px",
              duration: 0.7,
              ease: "power1.out",
            });
            gsap.to(messageReloaderRef.current, {
              opacity: 0,
              height: "0px",
              duration: 0.7,
              ease: "power1.out",
              delay: 0.7,
            });
            if (loaders.length !== 0) {
              console.log("loders");
              // Reset rotation first
              gsap.set(loaders, { rotation: 0 });
              gsap.to(loaders, {
                rotate: 360,
                duration: 0.2,
                repeat: 7,
                ease: "power1.out",
              });
            }
            // setTimeout(() => {
            //   if (messageReloaderRef.current) {
            //     const chatBox = document.getElementById("chat-box");
            //     if (chatBox) {
            //       // console.log(messageReloaderRef.current.offsetTop);
            //       chatBox.scrollTop =
            //         messageReloaderRef.current.offsetHeight + 20;
            //     }
            //   }
            // }, 1200);
          }
        },
      });
    }


    return () => {
      if (messageReloader) {
        messageReloader.kill();
      }
    };
  }, [messageReloaderRef.current]);

  // handle scroll UP
  useEffect(() => {
    console.log("thirdMessage: ", thirdMessage.current);
    const chatBox = document.getElementById("chat-box");
    if (!chatBox || !rollerRef.current) return;

    let lastScrollTop = chatBox.scrollTop;
    let rotationDegree = 0;

    const handleScroll = () => {
      const currentScroll = chatBox.scrollTop;
      const scrollDiff = currentScroll - lastScrollTop;

      // Update rotation based on scroll direction and amount
      rotationDegree += scrollDiff;

      gsap.to(rollerRef.current, {
        rotation: rotationDegree,
        duration: 0.3,
        ease: "power1.out",
      });

      lastScrollTop = currentScroll;
    };

    chatBox.addEventListener("scroll", handleScroll);

    // Setup ScrollTrigger for the third message
    let thirdMessageTrigger = null;
    if(thirdMessage.current){
      thirdMessageTrigger = ScrollTrigger.create({
        trigger: thirdMessage.current,
        start: "top top",
        end: "start start",
        scroller: "#chat-box",
        onLeaveBack: () => {
          console.log("fetching new page");
          getNewPage(currentPage + 1);
        },
        // markers: true, // This will show visual markers for debugging
      });
    }

    return () => {
      chatBox.removeEventListener("scroll", handleScroll);
      if(thirdMessageTrigger) {
        thirdMessageTrigger.kill();
      }
    };
  }, [messages]);

  // handle reply
  const handleReply = (messageId: string) => {
    setReplyingTo(messageId);
    // You can also scroll to your input field or show a reply UI indicator
  };

  // handle edit
  const handleEdit = (messageId: string, newContent: string) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, content: newContent } : msg
      )
    );
  };

  // handle send message
  const handleSendMessage = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && newMessage.trim()) {
      const message: any = 
        {"type": "chat", "content": newMessage.trim()};
      
      // Send message through WebSocket
      sendMessage(JSON.stringify(message));
      
      setNewMessage("");
      setReplyingTo(null);

      // Scroll to bottom after state update
      scrollToBottom();
    }
  };

  

  // render
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
            <span className={cn(
              "text-sm",
              isConnected ? "text-green-500" : "text-red-500"
            )}>
              {isConnected ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>
      {isLoading ? <div className="flex items-center justify-center h-full">
        <LoadingSpinner />
      </div> : (
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
          .map((message, index) => {
            // console.log("message: ", message);
            if(index == 2){
              console.log("message: ", message);
            }
            return (
            <ChatMessage
            key={message.id}
            message={message.content}
            type={message.sender.firstName === user.firstName && message.sender.lastName === user.lastName ? "self" : "other"}
              containerWidth={boxWidth}
              messageId={message.id}
              // onReply={handleReply}
              // onEdit={handleEdit}
              // replyTo={message.replyTo}
              log={index}
              ref={
                index == 2
                ? thirdMessage 
                : null
              }
              />
            )
          })}
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
          title="=ارسال پیام"
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
