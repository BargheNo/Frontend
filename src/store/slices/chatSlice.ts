
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chatData, ChatRoom } from "@/types/chat";
const initialState: chatData = {
    chatRooms: [],
    selectedChatRoom: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatRooms: (
      state: chatData,
      action: PayloadAction<ChatRoom[]>
    ) => {
        state.chatRooms = action.payload;
    },
    setSelectedChatRoom: (
      state: chatData,
      action: PayloadAction<ChatRoom>
    ) => {
        state.selectedChatRoom = action.payload;
    },
  },
});

// Export actions
export const {setChatRooms, setSelectedChatRoom} = chatSlice.actions;

// Export reducer
export default chatSlice.reducer;
