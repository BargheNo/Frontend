import { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { getData } from "@/src/services/apiHub";
import { Message } from "@/types/chat";
import { toast } from "sonner";
import { set } from "cypress/types/lodash";

export const useChatMessages = (selectedChatRoom: any, mode = "user") => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const token = useSelector((state: any) => state.user.accessToken);
  const [isConnected, setIsConnected] = useState(false);

  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const failToastShownRef = useRef(false); 
  const [connection, setConnection] = useState<boolean>(false)

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
        params: { page, pageSize: 10 },
      });

      if (!res?.data?.data?.length && !isInitial) {
        setIsLoading(false);
        return;
      }

      if (keepData) {
        setMessages((prev) => [...prev, ...res?.data?.data]);
      } else {
        setMessages(res?.data?.data);
      }

      setIsLoading(false);

      if (isInitial) {
        setTimeout(scrollToBottom, 200);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setIsLoading(false);
    }
  };

  const connectSocket = (room: any, token: string) => {
    if (!room?.roomID || !token) return;

    // close previous socket if exists
    if (socket) {
      socket.close();
    }

    const ws = new WebSocket(
      mode === "corp"
        ? `ws://46.249.99.69:8080/v1/corp/chat/room/${room.roomID}/token/${token}`
        : `ws://46.249.99.69:8080/v1/user/chat/room/${room.roomID}/token/${token}`
    );

    ws.onopen = () => {
      console.log("✅ WebSocket connected");
      // toast.success("اتصال به چت با موفقیت انجام شد");
      setConnection(true);
      setIsConnected(true);

      // reset failure toast blocker
      failToastShownRef.current = false;

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };

    ws.onclose = () => {
      console.log("❌ WebSocket closed");
      setIsConnected(false);

      if (!failToastShownRef.current) {
        // toast.error("در اتصال به چت مشکلی به وجود امده است");
        setConnection(false);
        failToastShownRef.current = true;
      }

      // try reconnect after 3s
      if (!reconnectTimeoutRef.current) {
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log("🔄 Reconnecting WebSocket...");
          connectSocket(room, token);
        }, 3000);
      }
    };

    ws.onerror = (error) => {
      console.error("⚠️ WebSocket error:", error);

      if (!failToastShownRef.current) {
        // toast.error("در اتصال به چت مشکلی به وجود امده است");
        setConnection(false);
        failToastShownRef.current = true;
      }

      ws.close(); // trigger onclose → reconnect
    };

    ws.onmessage = (event) => {
      console.log("📩 Received:", event.data);

      try {
        const parsed = JSON.parse(event.data);
        if (parsed?.id) {
          setMessages((prev) => [parsed, ...prev]);
        }
      } catch (err) {
        console.error("Invalid message data:", event.data);
      }

      setTimeout(scrollToBottom, 100);
    };

    setSocket(ws);
  };

  useEffect(() => {
    if (selectedChatRoom && token) {
      setMessages([]);
      setCurrentPage(1);
      setIsLoading(true);

      getNewPage(1, false, true);
      connectSocket(selectedChatRoom, token);
    }

    return () => {
      if (socket) socket.close();
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [selectedChatRoom]);

  return {
    messages,
    currentPage,
    isLoading,
    isConnected,
    socket,
    getNewPage,
    scrollToBottom,
    connection,
  };
};
