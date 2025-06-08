const ErrorField = {
	firstName: "firstName",
	lastName: "lastName",
	phone: "phone",
	password: "password",
	confirmPassword: "confirmPassword",
	isAcceptTerms: "isAcceptTerms",
	corporation: "corporation",
	nationalID: "nationalID",
	registrationNumber: "registrationNumber",
	iban: "iban",
	installationRequest: "installationRequest",
	bid: "bid",
	user: "user",
	address: "address",
	name: "name",
	province: "province",
	city: "city",
	page: "page",
	contactType: "contactType",
	room: "room",
	notificationType: "notificationType",
	notificationTypes: "notificationTypes",
	notification: "notification",
	NotificationSetting: "NotificationSetting",
	panel: "panel",
	maintenanceRequest: "maintenanceRequest",
	email: "email",
	maintenanceRecord: "maintenanceRecord",
	ticket: "ticket",
	role: "role",
	permission: "permission",
	ticketComment: "ticketComment",
	report: "report",
	contactInformation: "contactInformation",
	paymentTerm: "paymentTerm",
	guarantee: "guarantee",
	guaranteeViolation: "guaranteeViolation",
	news: "news",
	tittle: "tittle",
	media: "media",
	blog: "blog",
	post: "post",
	like: "like",
	unlike: "unlike",
	corporationReview: "corporationReview",
};
const ErrorTag = {
	generic: "generic",
	numeric: "numeric",
	fileRequired: "fileRequired",
	minimumLength: "minimumLength",
	containsLowercase: "containsLowercase",
	containsUppercase: "containsUppercase",
	containsNumber: "containsNumber",
	containsSpecialChar: "containsSpecialChar",
	alreadyRegistered: "alreadyRegistered",
	required: "required",
	e164: "e164",
	eqfield: "eqfield",
	eq: "eq",
	Expired: "Expired",
	invalid: "invalid",
	notRegistered: "notRegistered",
	invalidAuthCredentials: "invalidAuthCredentials",
	expiredAuthToken: "expiredAuthToken",
	invalidAuthToken: "invalidAuthToken",
	unauthorized: "unauthorized",
	awaitingApproval: "awaitingApproval",
	rejected: "rejected",
	notExist: "notExist",
	alreadyExist: "alreadyExist",
	notFound: "notFound",
	notVerified: "notVerified",
	notActive: "notActive",
	rateLimitExceed: "rateLimitExceed",
	installRateLimit: "installRateLimit",
	forbiddenError: "forbiddenError",
	forbiddenStatus: "forbiddenStatus",
	pending: "pending",
	email: "email",
	alreadyBlocked: "alreadyBlocked",
	alreadyActive: "alreadyActive",
	alreadyResolved: "alreadyResolved",
	alreadyArchived: "alreadyArchived",
	statusNotChange: "statusNotChange",
	alreadyCanceled: "alreadyCanceled",
	alreadyRejected: "alreadyRejected",
	alreadyAccepted: "alreadyAccepted",
	alreadyDraft: "alreadyDraft",
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
