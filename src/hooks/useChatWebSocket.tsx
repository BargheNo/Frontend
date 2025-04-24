// useWebSocket.js
import { useState, useEffect, useCallback } from 'react';

export const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  const connect = useCallback(() => {
    console.log("url: ", url);
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('Connected to WebSocket');
      setIsConnected(true);
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      setMessages(prev => [...prev, event.data]);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket');
      setIsConnected(false);
      setSocket(null);
      // Reconnect after 5 seconds
      setTimeout(connect, 5000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }, [url]);

//   useEffect(() => {
//     connect();

//     return () => {
//       if (socket) {
//         socket.close();
//       }
//     };
//   }, [connect]);

  const sendMessage = useCallback((message) => {
    if (socket && isConnected) {
      socket.send(message);
    }
  }, [socket, isConnected]);

  return { messages, sendMessage, isConnected , connect, socket};
};

