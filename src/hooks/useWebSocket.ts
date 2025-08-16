// hooks/useWebSocket.ts
import { useState, useEffect, useRef, useCallback } from "react";

const RECONNECT_INTERVAL_MS = 1000; // Initial reconnect delay
const MAX_RECONNECT_INTERVAL_MS = 30000; // Max reconnect delay
const RECONNECT_MULTIPLIER = 1.5; // Factor to increase reconnect delay

// Define the shape of a notification message
// You can make this more specific based on your actual notification structure
interface NotificationMessage {
	type: string;
	content: string;
	timestamp: string;
	// Add any other fields your notification objects have
	[key: string]: any; // Allow for flexible extra properties
}

/**
 * Return type for the useWebSocket hook
 */
interface WebSocketHookReturn {
	isConnected: boolean;
	lastMessage: NotificationMessage | null;
	sendMessage: (message: string | object) => void;
	error: Error | null;
	connect: () => void;
	disconnect: () => void;
}

/**
 * Custom React Hook for robust WebSocket communication.
 * Handles connection, disconnection, messages, errors, and automatic reconnection with exponential backoff.
 *
 * @param {string | null} url - The WebSocket URL, including the JWT as a query parameter.
 * Can be null initially if token is not available.
 * @returns {WebSocketHookReturn}
 */
export const useWebSocket = (url: string | null): WebSocketHookReturn => {
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [lastMessage, setLastMessage] = useState<NotificationMessage | null>(
		null
	);
	const [error, setError] = useState<Error | null>(null);
	const wsRef = useRef<WebSocket | null>(null);
	const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null); // For Node.js setTimeout
	const reconnectAttemptsRef = useRef<number>(0);

	const connect = useCallback(() => {
		if (!url) {
			// console.warn("WebSocket URL is not provided. Cannot connect.");
			setIsConnected(false); // Ensure state is disconnected if URL is null
			return;
		}

		// Clear any existing reconnect attempts
		if (reconnectTimeoutRef.current) {
			clearTimeout(reconnectTimeoutRef.current);
			reconnectTimeoutRef.current = null;
		}

		if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
			// console.warn("WebSocket is already open.");
			return;
		}

		setError(null); // Clear previous errors on new connection attempt
		wsRef.current = new WebSocket(url);

		wsRef.current.onopen = () => {
			// console.log("WebSocket connection opened.");
			setIsConnected(true);
			reconnectAttemptsRef.current = 0; // Reset reconnect attempts on successful connection
		};

		wsRef.current.onmessage = (event: MessageEvent) => {
			try {
				const data: NotificationMessage = JSON.parse(event.data);
				setLastMessage(data);
			} catch (e) {
				// console.log(
				// 	"Failed to parse WebSocket message as JSON:",
				// 	e,
				// 	event.data
				// );
				// If parsing fails, you might want to handle the raw message or log the error
				// For robustness, you could define a 'RawMessage' type or simply ignore if not parsable as NotificationMessage
				// setError(new Error(`Failed to parse message: ${event.data}`));
				// setLastMessage(null); // Or set to a generic error message type
			}
		};

		wsRef.current.onclose = (event: CloseEvent) => {
			// console.log(
			// 	"WebSocket connection closed:",
			// 	event.code,
			// 	event.reason
			// );
			setIsConnected(false);
			// Attempt to reconnect if the closure wasn't intentional or it's an abnormal closure code
			if (!event.wasClean || event.code !== 1000) {
				const delay = Math.min(
					RECONNECT_INTERVAL_MS *
						(reconnectAttemptsRef.current + 1) *
						RECONNECT_MULTIPLIER,
					MAX_RECONNECT_INTERVAL_MS
				);
				// console.log(
				// 	`Attempting to reconnect in ${
				// 		delay / 1000
				// 	} seconds... (Attempt ${reconnectAttemptsRef.current + 1})`
				// );
				reconnectAttemptsRef.current++;
				reconnectTimeoutRef.current = setTimeout(connect, delay);
			}
		};

		wsRef.current.onerror = (event: Event) => {
			// console.log("WebSocket error:", event);
			// setError(new Error("WebSocket connection error."));
			// The `onclose` event will typically follow `onerror`, which handles reconnection.
		};
	}, [url]); // `url` is a dependency as the connection depends on it

	const disconnect = useCallback(() => {
		if (wsRef.current) {
			// Clear any pending reconnect attempts when intentionally disconnecting
			if (reconnectTimeoutRef.current) {
				clearTimeout(reconnectTimeoutRef.current);
				reconnectTimeoutRef.current = null;
			}
			wsRef.current.close(1000, "Client initiated disconnection"); // 1000 is normal closure
		}
	}, []);

	const sendMessage = useCallback((message: string | object) => {
		if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
			try {
				const payload =
					typeof message === "object"
						? JSON.stringify(message)
						: message;
				wsRef.current.send(payload);
			} catch (e: any) {
				// Type 'any' for the catch variable for broader compatibility
				// console.log("Failed to send WebSocket message:", e);
				// setError(new Error(`Failed to send message: ${e.message}`));
			}
		} else {
			// console.warn(
			// 	"WebSocket is not connected. Message not sent:",
			// 	message
			// );
			// setError(
			// 	new Error("WebSocket not connected. Cannot send message.")
			// );
		}
	}, []);

	useEffect(() => {
		// Initial connection when the component mounts and url becomes available
		// We only connect if `url` is not null.
		if (url) {
			connect();
		}

		// Cleanup function: close the WebSocket when the component unmounts
		return () => {
			disconnect();
		};
	}, [url, connect, disconnect]); // `url` is now a dependency because `connect` depends on it.

	return {
		isConnected,
		lastMessage,
		sendMessage,
		error,
		connect,
		disconnect,
	};
};
