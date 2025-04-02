const Errors = {
	AlreadyRegistered: "alreadyRegistered",
	MinimumLength: "minimumLength",
	ContainsLowercase: "containsLowercase",
	ContainsUppercase: "containsUppercase",
	ContainsNumber: "containsNumber",
	ContainsSpecialChar: "containsSpecialChar",
	Expired: "Expired",
	Invalid: "invalid",
	NotRegistered: "notRegistered",
	InvalidAuthCredentials: "invalidAuthCredentials",
	ExpiredAuthToken: "expiredAuthToken",
	InvalidAuthToken: "invalidAuthToken",
	Unauthorized: "unauthorized",
	AwaitingApproval: "awaitingApproval",
	Rejected: "rejected",
	NotExist: "notExist",
	AlreadyExist: "alreadyExist",
};

interface ErrorResponse {
	messages?: {
		[key: string]: string;
	};
}

export default function generateErrorMessage(
	err: ErrorResponse,
	fields: string[]
) {
	let errorMessage = "";

	fields.forEach((field) => {
		if (err.messages?.[field]) {
			errorMessage += `${err.messages[field]}\n`;
		}
	});

	return errorMessage.trim();
}
