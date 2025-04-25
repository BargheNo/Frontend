import { baseURL, getData } from "./apiHub";

class CustomerMyPanels {
    GetCustomerMyPanels() {
        return getData({
            endPoint: `${baseURL}/v1/user/panels/list`
        });
    }
}

export default new CustomerMyPanels;