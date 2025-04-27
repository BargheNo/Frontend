import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: corpData = {
	name: "",
	registrationNumber: "",
	nationalID: "",
	iban: "",
	signatories: [],
	addresses: [],
	contactInformation: [],
	certificates: { vatTaxpayerCertificate: null, officialNewspaperAD: null },
};

export const corpSlice = createSlice({
	name: "corp",
	initialState,
	reducers: {
		setCorp: (state: corpData, action: PayloadAction<corpData>) => {
			state.name = action.payload.name;
			state.registrationNumber = action.payload.registrationNumber;
			state.nationalID = action.payload.nationalID;
			state.iban = action.payload.iban;
			state.signatories = action.payload.signatories;
			state.addresses = action.payload.addresses;
			state.contactInformation = action.payload.contactInformation;
			state.certificates = action.payload.certificates;
		},
		resetCorp: (state: corpData) => {
			state.name = initialState.name;
			state.registrationNumber = initialState.registrationNumber;
			state.nationalID = initialState.nationalID;
			state.iban = initialState.iban;
			state.signatories = initialState.signatories;
			state.addresses = initialState.addresses;
			state.contactInformation = initialState.contactInformation;
			state.certificates = initialState.certificates;
		},
	},
});

export const { setCorp, resetCorp } = corpSlice.actions;

export default corpSlice.reducer;
