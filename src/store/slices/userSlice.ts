import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: userData = {
    firstName: "",
    lastName: "",
    accessToken: "",
    permissions: {},
    refreshToken: "",
    isAuth: false,
    corps: [],
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
            state.permissions = action.payload.permissions;
            state.refreshToken = action.payload.refreshToken;
            state.corpId = action.payload.corpId;
            state.corps = action.payload.corps;
        },
        resetUser: (state: userData) => {
            state.isAuth = false;
            state.firstName = "";
            state.lastName = "";
            state.permissions = {};
            state.accessToken = "";
            state.refreshToken = "";
            state.corps = [];
            state.corpId = 0;
        },
        setCorpId: (state: userData, action: PayloadAction<number>) => {
            state.isAuth = true;
            state.firstName = state.firstName;
            state.lastName = state.lastName;
            state.accessToken = state.accessToken;
            state.permissions = state.permissions;
            state.refreshToken = state.refreshToken;
            state.corps = state.corps;
            state.corpId = action.payload;
        },
        setCorps: (state: userData, action: { payload: corp[] }) => {
            state.corps = action.payload;
        },
    },
});

// Export actions
export const { setUser, resetUser, setCorpId, setCorps } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
