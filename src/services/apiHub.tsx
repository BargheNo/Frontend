import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getParams, postParams } from "../types/apiHubType";



// export const baseURL = "https://bombfundingbackend.liara.run";
// export const baseURL = "http://104.168.46.4:8000";
// export const baseURL = "https://260d-141-11-250-179.ngrok-free.app";
export const baseURL = "http://185.110.189.68:8080";

// export const accessToken = localStorage.getItem("accessToken");
export const accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDU0MDcwMzcsImlhdCI6MTc0MjgxNTAzNywic3ViIjoxfQ.U245pmQco3hU0VATsXU8hovIl75FCpvcPGHDef0BVtRqPny5A9LBMMHRNcD4hQk9OciVS8v-kMYQvyuGsq6ido2ebNVFhIR0Vja023B48S5tW3yzSOyySEvcLEt3pWxTRQo45mK9GLBRtdpQu18qoKqreHOzr98K2mTd4E7lVE8";


const apiClient = axios.create({
  baseURL: baseURL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    // Authorization:""
  },
});

// Optional: Add interceptors to handle requests/responses globally
// This is useful for logging, error handling, or adding authorization tokens dynamically

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Modify the config before the request is sent, e.g., attach token
    //  const token = localStorage.getItem('token');
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMzY3NDc1LCJpYXQiOjE3MzIzNjM4NzUsImp0aSI6IjI2NjU0YzMzMzIwMzQyYjhiOTVlZDhiNjkxZDBhOTg5IiwidXNlcl9pZCI6M30.53XrPqzf9jmSdZBnZwZP8_Ggk8GfN4HbSgPYe4-Hux4";
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // Handle errors in the request
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Any response status code 2xx is handled here
    return response;
  },
  (error) => {
    // Handle response errors globally
    if (error?.response) {
      // Server responded with a status other than 2xx
      console.log("API Error:", error?.response?.status, error?.response?.data);
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

// Add TypeScript interfaces
// interface getParams {
//   endPoint: string;
//   headers?: any;
// }

// interface postParams {
//   endPoint: string;
//   data: any;
//   headers?: any;
// }

// Keep existing API functions as they are
export const getData = async ({ endPoint, headers }: getParams) => {
  try {
    const response = await apiClient.get(endPoint, headers);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const getDataParams = async (endPoint, headers, params) => {
//   await RefreshToken();
//   try {
//     const response = await apiClient.get(endPoint, {
//       headers,
//       params: { ...params },
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

export const postData = async ({ endPoint, data, headers }: postParams) => {
  try {
    const response = await apiClient.post(endPoint, data, headers);
    return response.data;
  } catch (error: any) {
    // Log the error details for better debugging
    console.log("Error in postData:", {
      endPoint,
      data,
      headers,
      error: error.response ? error.response.data : error.message,
    });
    throw error;
  }
};

export const patchData = async ({ endPoint, data, headers }: postParams) => {
  //   await RefreshToken();
  try {
    const response = await apiClient.patch(endPoint, data, headers);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const putData = async ({ endPoint, data, headers }: postParams) => {
  //   await RefreshToken();
  try {
    const response = await apiClient.put(endPoint, data, headers);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteData = async ({ endPoint, headers }: getParams) => {
  //   await RefreshToken();
  try {
    const response = await apiClient.delete(endPoint, headers);
    return response.data;
  } catch (error) {
    throw error;
  }
};






export const handleLogin = async (phoneNumber: string, password: string) => {
  try {
    const response = await axios.post(
      `${baseURL}/v1/auth/login`,
      {
        phone: "+98" + phoneNumber,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
      };
    }

    return {
      success: false,
      message: response.data?.message || "An unknown error occurred",
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Network error",
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

export const handleCorpLogin = async (cin: string, password: string) => {
  try {
    const response = await axios.post(
      `${baseURL}/v1/auth/corporation/login/`,
      {
        cin: cin,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
      };
    }

    return {
      success: false,
      message: response.data?.message || "An unknown error occurred",
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Network error",
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};


export const handleForgetPassword = async (phoneNumber: string) => {
  try {
    const response = await axios.post(
      `${baseURL}/v1/auth/forgot-password`,
      {
        phone: "+98" + phoneNumber,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
      };
    }

    return {
      success: false,
      message: response.data?.message || "An unknown error occurred",
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Network error",
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

export const phonenumberVerification = async (phone: string, otp: string) => {
  try {
    const response = await axios.post(
      `${baseURL}/v1/auth/confirm-otp`, 
      {
        phone: "+98" + phone,
        otp: otp
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
     if (response.status === 200) {
      return {
        success: true,
        data: response.data,
      };
    }

    return {
      success: false,
      message: response.data?.message || "Verification failed",
      };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Network error",
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

export const handleResetPassword = async (confirmPassword: string, password: string) => {
  try {
    // const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return {
        success: false,
        message: "No access token found. Please log in again.",
      };
    }

    const response = await axios.post(`${baseURL}/v1/auth/reset-password`, {
      confirmPassword: confirmPassword,
      password: password,
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      }
    });
    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
      };
    }

    return {
      success: false,
      message: response.data?.message || "An unknown error occurred",
      };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Network error",
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};


   

      

      

    