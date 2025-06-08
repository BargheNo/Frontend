import { configureStore } from "@reduxjs/toolkit";

// Import your reducers here
import counterReducer from "./slices/counterSlice";
import userReducer from "./slices/userSlice";
import corpReducer from "./slices/corpSlice";
import localStorageMiddleware from "./middleware";
import { preloadedState } from "./preLoader";
import warrantyTypesReducer from "./slices/warrantyTypesSlice"

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		user: userReducer,
		corp: corpReducer,
		warrantyTypes: warrantyTypesReducer,
	},
	preloadedState,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
