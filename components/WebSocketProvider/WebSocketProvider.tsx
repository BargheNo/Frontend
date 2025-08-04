// components/WebSocketProvider.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/src/store/store"; // Adjust path to your Redux store RootState
import { useWebSocket } from "@/src/hooks/useWebSocket"; // Adjust path to your useWebSocket hook
import CustomToast from "@/components/Custom/CustomToast/CustomToast"; // <--- IMPORT YOUR CUSTOM TOAST
import { serverIPAndPort } from "@/src/services/apiHub";

// If you have a notifications slice, import its actions
// import { addNotification } from '@/src/store/slices/notificationsSlice';

interface WebSocketProviderProps {
	children: ReactNode;
}

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
	const accessToken = useSelector(
		(state: RootState) => state.user.accessToken
	);
	const dispatch = useDispatch();

	const websocketUrl = accessToken
		? `ws://${serverIPAndPort}/v1/user/notifications/token/${accessToken}`
		: null;

	const { isConnected, lastMessage, error } = useWebSocket(websocketUrl);

	// Optional: Effects for logging or global error/status handling
	// useEffect(() => {
	// 	if (isConnected) {
	// 		console.log("Global WebSocket connected!");
	// 	} else if (!isConnected && accessToken) {
	// 		console.warn(
	// 			"Global WebSocket disconnected. Reconnection attempt in progress..."
	// 		);
	// 	}
	// 	if (error) {
	// 		console.log("Global WebSocket Error:", error);
	// 		// Optional: Show a toast for critical connection errors
	// 		// CustomToast('WebSocket connection error!', 'error');
	// 	}
	// }, [isConnected, error, accessToken]);

	// --- KEY CHANGE: Show CustomToast for incoming messages ---
	useEffect(() => {
		if (lastMessage) {
			console.log("New notification received:", lastMessage);

			// Customize your toast message and type based on the incoming message structure
			// For example, if your NotificationMessage has a 'type' property like 'alert' or 'info'
			let toastType: "success" | "error" | "info" | "warning" = "info"; // Default type
			let toastMessage = "New notification"; // Default message

			if (typeof lastMessage === "object" && lastMessage !== null) {
				// Assuming your NotificationMessage has 'content' and potentially 'type'
				toastMessage =
					lastMessage.description || "You received a new message!";

				// Example: If your message object has a 'notificationType' field
				if (lastMessage.type === "success") {
					toastType = "success";
				} else if (lastMessage.type === "error") {
					toastType = "error";
				} else if (lastMessage.type === "warning") {
					toastType = "warning";
				}
				// Add more conditions based on your message types
			} else {
				// Fallback for non-object messages (though we parse JSON)
				toastMessage = String(lastMessage);
			}

			CustomToast(toastMessage, toastType); // <--- Call CustomToast here!

			// Dispatch the notification to your Redux store for persistent display/management
			// if (addNotification) { // Check if addNotification is defined/imported
			//   dispatch(addNotification(lastMessage));
			// }
		}
	}, [lastMessage, dispatch]); // `dispatch` is a stable reference from useDispatch

	return <>{children}</>;
};
