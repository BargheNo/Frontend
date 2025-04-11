interface Signatory {
	signatoryName: string;
	nationalID: string;
	position?: string;
}

interface Address {
	province: string;
	city: string;
	streetAddress: string;
	postalCode: string;
	houseNumber: string;
	unit: number;
}

interface corpData {
	corpName: string;
	registrationNumber: string;
	nationalID: string;
	iban: string;
	signatories: Signatory[];
	addresses: Address[];
}
