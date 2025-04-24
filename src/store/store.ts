import { configureStore } from "@reduxjs/toolkit";

// Import your reducers here
import counterReducer from "./slices/counterSlice";
import userReducer from "./slices/userSlice";
import corpReducer from "./slices/corpSlice";
import localStorageMiddleware from "./middleware";
import { preloadedState } from "./preLoader";
import chatReducer from "./slices/chatSlice";
export const store = configureStore({
	reducer: {
		counter: counterReducer,
		user: userReducer,
		corp: corpReducer,
		chat: chatReducer,
	},
	preloadedState,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(localStorageMiddleware),
});
