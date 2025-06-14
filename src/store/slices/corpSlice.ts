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
	},
});

export const { setCorp } = corpSlice.actions;

export default corpSlice.reducer;
