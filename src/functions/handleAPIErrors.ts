const ErrorField = {
	User: "user",
	Phone: "phone",
	Password: "password",
	OTP: "otp",
	Corporation: "corporation",
	NationalID: "nationalID",
	RegistrationNumber: "registrationNumber",
	IBAN: "iban",
	InstallationRequest: "installationRequest",
	Bid: "bid",
	Address: "address",
	Name: "name",
	Province: "province",
	City: "city",
	Page: "page",
	ContactType: "contactType",
};
const ErrorTag = {
	AlreadyRegistered: "alreadyRegistered",
	MinimumLength: "minimumLength",
	ContainsLowercase: "containsLowercase",
	ContainsUppercase: "containsUppercase",
	ContainsNumber: "containsNumber",
	ContainsSpecialChar: "containsSpecialChar",
	Expired: "Expired",
	Invalid: "invalid",
	NotRegistered: "notRegistered",
	NotVerified: "notVerified",
	InvalidAuthCredentials: "invalidAuthCredentials",
	ExpiredAuthToken: "expiredAuthToken",
	InvalidAuthToken: "invalidAuthToken",
	Unauthorized: "unauthorized",
	AwaitingApproval: "awaitingApproval",
	Rejected: "rejected",
	NotExist: "notExist",
	AlreadyExist: "alreadyExist",
	ForbiddenStatus: "forbiddenStatus",
};
interface ErrorResponse {
	response: {
		data: {
			message?: string;
			messages?: {
				[key in keyof typeof ErrorField]?: {
					[key in keyof typeof ErrorTag]?: string;
					// [key in keyof typeof String]?: string;
				};
			};
		};
	};
}

// function iterateFields<T extends object>(referenceObject: T): (keyof T)[] {
// 	// TypeScript cannot reflect over the interface fields at runtime directly
// 	// So we'll create a helper function to map through the fields using a predefined list or type-safe approach
// 	const fields: (keyof T)[] = Object.keys(referenceObject) as (keyof T)[];
// 	return fields;
// }

export default function generateErrorMessage<T extends object>(
	err: ErrorResponse
	// referenceObject: T,
	// fields?: string[]
): string {
	// console.log("recieved:", err?.response?.data?.messages);
	let errorMessage: string = err?.response?.data?.message
		? err?.response?.data?.message
		: "";
	// const fields = iterateFields(referenceObject as T);
	// console.log("fields");
	// fields.forEach((field) => {
	// 	console.log(field);
	// });
	// fields?.forEach((field) => {
	// 	const fieldErrors = err?.response?.data?.messages?.[field as string];

	// 	if (fieldErrors) {
	// 		Object.entries(ErrorTag).forEach(([errorKey, errorValue]) => {
	// 			// if (fieldErrors[errorValue as keyof typeof fieldErrors]) {
	// 			console.log(
	// 				"f",
	// 				fieldErrors,
	// 				errorValue,
	// 				fieldErrors[errorValue as keyof typeof String]
	// 			);
	// 			if (fieldErrors[errorValue as keyof typeof fieldErrors]) {
	// 				// Append each error message
	// 				errorMessage += `\n${
	// 					fieldErrors[errorValue as keyof typeof fieldErrors]
	// 				}`;
	// 			}
	// 		});
	// 	}
	// 	// if (err.messages?.[field as string]) {
	// 	// 	errorMessage += `${err.messages[field as string]}\n`;
	// 	// }
	// });

	Object.entries(ErrorTag).forEach(([errorTagKey, errorTagValue]) => {
		Object.entries(ErrorField).forEach(
			([errorFieldKey, errorFieldValue]) => {
				// if (fieldErrors[errorValue as keyof typeof fieldErrors]) {
				// console.log(
				// 	"f",
				// 	fieldErrors,
				// 	errorValue,
				// 	fieldErrors[errorValue as keyof typeof String]
				// );
				const Errors = err?.response?.data?.messages;
				const msg =
					Errors?.[errorFieldValue as keyof typeof Errors]?.[
						errorTagValue as keyof (typeof Errors)[keyof typeof Errors]
					];
				if (msg) {
					// Append each error message
					errorMessage += `\n${msg}`;
				}
			}
		);
	});

	return errorMessage || "خطایی رخ داده است";
}
