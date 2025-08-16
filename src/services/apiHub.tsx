import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getParams, postParams } from "@/src/types/apiHubType";
import generateErrorMessage from "@/src/functions/handleAPIErrors";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import { setCorpId, setUser } from "../store/slices/userSlice";
import { store } from "../store/store";

export const serverIPAndPort = "46.249.99.69:8080";
export const baseURL = `http://${serverIPAndPort}`;
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

const refreshToken = async () => {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
        const userData = JSON.parse(userDataString);
        const refreshToken = userData?.refreshToken;
        if (refreshToken) {
            try {
                const response = await apiClient.post("/v1/auth/refresh", {
                    refreshToken,
                });
                const data = response.data;
                if (data) {
                    store.dispatch(
                        setUser({
                            firstName: data?.data?.firstName,
                            lastName: data?.data?.lastName,
                            permissions: data?.data?.permissions,
                            accessToken: data?.data?.accessToken,
                            refreshToken: data?.data?.refreshToken,
                            corps: userData?.corps,
                            corpId: userData?.corpId,
                        })
                    );
                    // if (!userData?.corpId) {
                    //     getData({ endPoint: `/v1/user/corps` })
                    //         .then((res) => {
                    //             console.log("rescorp", res?.data[0]?.id);
                    //             // const corpId = res?.data[0]?.id;
                    //             store.dispatch(setCorpId(res?.data[0]?.id));
                    //         })
                    //         .catch((err) => console.log(err));
                    // }
                }
            } catch (error: any) {
                generateErrorMessage(error)
                    .split("\n")
                    .filter((errMsg) => errMsg)
                    .map((errMsg) => CustomToast(errMsg, "error"));
                console.log("error in refresh token:", error);
                throw error;
            }
        }
    }
};

export const getData = async ({ endPoint, headers, params }: getParams) => {
    await refreshToken();
    try {
        const response = await apiClient.get(endPoint, {
            params: params,
            ...headers,
        });
        return response.data;
    } catch (error: any) {
        generateErrorMessage(error)
            .split("\n")
            .filter((errMsg) => errMsg)
            .map((errMsg) => CustomToast(errMsg, "error"));
        console.log("error in getData", error);
        throw error;
    }
};
export const postData = async ({ endPoint, data, headers }: postParams) => {
    await refreshToken();
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
            .filter((errMsg) => errMsg)
            .map((errMsg) => CustomToast(errMsg, "error"));
        console.log("error in postData", error);
        throw error;
    }
};
export const patchData = async ({ endPoint, data, headers }: postParams) => {
    await refreshToken();
    try {
        const response = await apiClient.patch(endPoint, data, {
            ...headers,
        });
        return response.data;
    } catch (error: any) {
        generateErrorMessage(error)
            .split("\n")
            .filter((errMsg) => errMsg)
            .map((errMsg) => CustomToast(errMsg, "error"));
        console.log("error in patchData", error);
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
    await refreshToken();
    try {
        const response = await apiClient.put(endPoint, formData, {
            headers: { "Content-Type": "multipart/form-data", ...headers },
        });
        return response.data;
    } catch (error: any) {
        generateErrorMessage(error)
            .split("\n")
            .filter((errMsg) => errMsg)
            .map((errMsg) => CustomToast(errMsg, "error"));
        console.log("error in putDataFile", error);
        throw error;
    }
};
export const putData = async ({ endPoint, data, headers }: postParams) => {
    await refreshToken();
    try {
        const response = await apiClient.put(endPoint, data, {
            ...headers,
        });
        return response.data;
    } catch (error: any) {
        generateErrorMessage(error)
            .split("\n")
            .filter((errMsg) => errMsg)
            .map((errMsg) => CustomToast(errMsg, "error"));
        console.log("error in putData", error);
        throw error;
    }
};
export const deleteData = async ({ endPoint, data, headers }: postParams) => {
    await refreshToken();
    try {
        const response = await apiClient.delete(endPoint, {
            data: data,
            ...headers,
        });
        return response.data;
    } catch (error: any) {
        generateErrorMessage(error)
            .split("\n")
            .filter((errMsg) => errMsg)
            .map((errMsg) => CustomToast(errMsg, "error"));
        console.log("error in deleteData", error);
        throw error;
    }
};
