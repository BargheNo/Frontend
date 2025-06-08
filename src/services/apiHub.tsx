import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getParams, postParams } from "../types/apiHubType";
import generateErrorMessage from "../functions/handleAPIErrors";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";

export const baseURL = "http://46.249.99.69:8080";
// export const baseURL = "https://a50e-212-64-199-253.ngrok-free.app";

const apiClient = axios.create({
	baseURL: baseURL,
	timeout: 20000,
	headers: {
		"Content-Type": "application/json",
		"ngrok-skip-browser-warning": "69420",
	},
});

apiClient.interceptors.request.use(
	(config) => {
		const userDataString = localStorage.getItem("user");
		if (userDataString) {
			const userData = JSON.parse(userDataString);
			const accessToken = userData?.accessToken;

			if (accessToken && typeof accessToken === "string") {
				config.headers.Authorization = `Bearer ${accessToken}`;
			}
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

apiClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error?.response) {
			// Server responded with a status other than 2xx
			console.log(
				"API Error:",
				error?.response?.status,
				error?.response?.data
			);
		} else if (error.request) {
			// No response was received
			console.log("No response received:", error.request);
		} else {
			// Something happened in setting up the request
			console.log("Error setting up request:", error.message);
		}
		console.log(error);
		return Promise.reject(error);
	}
);

// Custom hooks for React Query
export function useGetData(endPoint: string, headers?: any, options = {}) {
	return useQuery({
		queryKey: [endPoint],
		queryFn: () => getData({ endPoint, headers }),
		...options,
	});
}

export function usePostData(options = {}) {
	return useMutation({
		mutationFn: (params: postParams) => postData(params),
		...options,
	});
}

export function usePatchData(options = {}) {
	return useMutation({
		mutationFn: (params: postParams) => patchData(params),
		...options,
	});
}

export function usePutData(options = {}) {
	return useMutation({
		mutationFn: (params: postParams) => putData(params),
		...options,
	});
}

export function useDeleteData(options = {}) {
	return useMutation({
		mutationFn: (params: getParams) => deleteData(params),
		...options,
	});
}

export const getData = async ({ endPoint, headers, params }: getParams) => {
	try {
		const response = await apiClient.get(endPoint, {
			params: params,
			...headers,
		});
		return response.data;
	} catch (error: any) {
		generateErrorMessage(error)
			.split("\n")
			.map((errMsg) => CustomToast(errMsg, "error"));
		throw error;
	}
};

export const postData = async ({ endPoint, data, headers }: postParams) => {
	try {
		const response = await apiClient.post(endPoint, data, {
			headers: {
				...headers,
			},
		});
		return response.data;
	} catch (error: any) {
		generateErrorMessage(error)
			.split("\n")
			.map((errMsg) => CustomToast(errMsg, "error"));
		throw error;
	}
};

export const patchData = async ({ endPoint, data, headers }: postParams) => {
	try {
		const response = await apiClient.patch(endPoint, data, {
			...headers,
		});
		return response.data;
	} catch (error: any) {
		generateErrorMessage(error)
			.split("\n")
			.map((errMsg) => CustomToast(errMsg, "error"));
		throw error;
	}
};
export const putDataFile = async ({
	endPoint,
	formData,
	headers,
}: {
	endPoint: string;
	formData: any;
	headers?: any;
}) => {
	try {
		const response = await apiClient.put(endPoint, formData, {
			headers: { "Content-Type": "multipart/form-data", ...headers },
		});
		return response.data;
	} catch (error: any) {
		generateErrorMessage(error)
			.split("\n")
			.map((errMsg) => CustomToast(errMsg, "error"));
		throw error;
	}
};
export const putData = async ({ endPoint, data, headers }: postParams) => {
	try {
		const response = await apiClient.put(endPoint, data, {
			...headers,
		});
		return response.data;
	} catch (error: any) {
		generateErrorMessage(error)
			.split("\n")
			.map((errMsg) => CustomToast(errMsg, "error"));
		throw error;
	}
};
export const deleteData = async ({ endPoint, data, headers }: postParams) => {
	try {
		const response = await apiClient.delete(endPoint, {
			data: data,
			...headers,
		});
		return response.data;
	} catch (error: any) {
		generateErrorMessage(error)
			.split("\n")
			.map((errMsg) => CustomToast(errMsg, "error"));
		throw error;
	}
};
