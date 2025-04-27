interface Signatory {
	name: string;
	nationalCardNumber: string;
	position?: string;
}

interface Address {
	ID: number;
	provinceID?: number;
	cityID?: number;
	province?: string;
	city?: string;
	streetAddress: string;
	postalCode: string;
	houseNumber: string;
	unit: number;
}

interface contactInformation {
	contactTypeID: number;
	contactValue: string;
}

interface corpData {
	name?: string;
	registrationNumber?: string;
	nationalID?: string;
	iban?: string;
	signatories?: Signatory[];
	addresses?: Address[];
	contactInformation?: contactInformation[];
	certificates?: { vatTaxpayerCertificate: any; officialNewspaperAD: any };
	corpId?: number;
}
