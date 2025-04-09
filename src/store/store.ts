import { configureStore } from "@reduxjs/toolkit";

// Import your reducers here
import counterReducer from "./slices/counterSlice";
import userReducer from "./slices/userSlice";
import localStorageMiddleware from "./middleware";
import { preloadedState } from "./preLoader";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
