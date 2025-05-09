import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: userData = {
	firstName: "",
	lastName: "",
	accessToken: "",
	refreshToken: "",
	isAuth: false,
	corpId: 0,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (
			state: userData,
			action: PayloadAction<Omit<userData, "isAuth">>
		) => {
			state.isAuth = true;
			state.firstName = action.payload.firstName;
			state.lastName = action.payload.lastName;
			state.accessToken = action.payload.accessToken;
			state.refreshToken = action.payload.refreshToken;
			state.corpId = action.payload.corpId;
		},
		resetUser: (state: userData) => {
			state.isAuth = false;
			state.firstName = "";
			state.lastName = "";
			state.accessToken = "";
			state.refreshToken = "";
			state.corpId = 0;
		},
	},
});

// Export actions
export const { setUser, resetUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
