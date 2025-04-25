import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { getData } from "@/src/services/apiHub";
// import { useWebSocket } from './useChatWebSocket';
import { Message } from "@/types/chat";

export const useChatMessages = (selectedChatRoom: any) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  //   const [hasMore, setHasMore] = useState(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const token = useSelector((state: any) => state.user.accessToken);
  const [isConnected, setIsConnected] = useState(false);
  //   const [wsUrl, setWsUrl] = useState<string | null>(null);
  //   const { messages: wsMessages, sendMessage, isConnected, socket } = useWebSocket(wsUrl);

  const scrollToBottom = useCallback(() => {
    const chatBox = document.getElementById("chat-box");
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, []);

  const getNewPage = async (
    page: number = 1,
    keepData: boolean = true,
    isInitial: boolean = false
  ) => {
    if (!selectedChatRoom?.roomID) return;

    setCurrentPage(page);

    try {
      const res = await getData({
        endPoint: `/v1/user/chat/room/${selectedChatRoom.roomID}/messages`,
        params: {
          page: page,
          pageSize: 10,
        },
      });

      if (!res?.data?.length && !isInitial) {
        // setHasMore(false);
        setIsLoading(false);
        return;
      }

      if (keepData) {
        setMessages((prev) => [...prev, ...res?.data]);
      } else {
        setMessages(res?.data);
      }

      //   setHasMore(res?.data?.length === 10);
      setIsLoading(false);

      if (isInitial) {
        setTimeout(scrollToBottom, 100);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setIsLoading(false);
    }
  };

  const connectSocket = (selectedChatRoom: any, token: string) => {
    if (selectedChatRoom?.roomID && token) {
        const ws = new WebSocket(
          `ws://46.249.99.69:8080/v1/user/chat/room/${selectedChatRoom.roomID}/token/${token}`
        );
        ws.onopen = () => {
          console.log("WebSocket connected");
          setIsConnected(true);
        };
        ws.onclose = () => {
          console.log("WebSocket closed");
          setIsConnected(false);
        };
        ws.onerror = (error) => {
          console.error("WebSocket error:", error);
        };
        ws.onmessage = (event) => {
          console.log("Received message:", event.data);
        };
        ws.onmessage = (event) => {
          console.log("Received message:", event.data);
          setMessages((prev) => [JSON.parse(event.data), ...prev]);
          setTimeout(scrollToBottom, 100);
        };
        setSocket(ws);
      }


  };

  // Handle room change
  useEffect(() => {
    if (selectedChatRoom) {
      // Reset states
      setMessages([]);
      setCurrentPage(1);
      setIsLoading(true);
      // Load initial messages
      getNewPage(1, false, true);

      // open socket
      connectSocket(selectedChatRoom, token);
    }
  }, [selectedChatRoom]);

  // Set WebSocket URL when room changes
  //   useEffect(() => {
  //     console.log("closing socket...")
  //     socket?.close()
  //     if (selectedChatRoom?.roomID && token) {
  //       console.log("opening socket... to:", selectedChatRoom.roomID)
  //       setWsUrl(
  //         `ws://46.249.99.69:8080/v1/user/chat/room/${selectedChatRoom.roomID}/token/${token}`
  //       );
  //     }
  //   }, [selectedChatRoom?.roomID, token]);

  // Handle incoming WebSocket messages
  //   useEffect(() => {
  //     if (wsMessages.length > 0) {
  //       const lastMessage = wsMessages[wsMessages.length - 1];
  //       try {
  //         const parsedMessage = JSON.parse(lastMessage);
  //         setMessages(prev => [parsedMessage, ...prev]);
  //         setTimeout(scrollToBottom, 500);
  //       } catch (error) {
  //         console.error('Error parsing WebSocket message:', error);
  //       }
  //     }
  //   }, [wsMessages]);

  return {
    messages,
    currentPage,
    isLoading,
    // hasMore,
    // sendMessage,
    isConnected,
    socket,
    getNewPage,
    scrollToBottom,
  };
};
