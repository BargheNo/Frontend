import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: corpData = {
    id: 0,
    name: "",
    registrationNumber: "",
    nationalID: "",
    iban: "",
    signatories: [],
    addresses: [],
};

export const corpSlice = createSlice({
    name: "corp",
    initialState,
    reducers: {
        setCorp: (state: corpData, action: PayloadAction<corpData>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.registrationNumber = action.payload.registrationNumber;
            state.nationalID = action.payload.nationalID;
            state.iban = action.payload.iban;
            state.signatories = action.payload.signatories;
        },
        setRegisterCorpId: (state: corpData, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        resetCorps: (state: corpData) => {
            state.id = 0;
            state.name = "";
            state.registrationNumber = "";
            state.nationalID = "";
            state.iban = "";
            state.signatories = [];
            state.addresses = [];
        }
    },
});

export const { setCorp, setRegisterCorpId, resetCorps } = corpSlice.actions;

export default corpSlice.reducer;
