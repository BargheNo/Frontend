import { baseURL, postData } from "./apiHub";

class SubmitCustomerRepairRequest {
    PostCustomerRepairRequest(formData: object) {
        return postData({
            endPoint: `${baseURL}/v1/user/maintenance/request`,
            data: formData,
        });
    }
}

export default new SubmitCustomerRepairRequest;