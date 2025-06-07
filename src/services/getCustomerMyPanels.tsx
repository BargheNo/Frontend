import { baseURL, getData } from "./apiHub";

class CustomerMyPanels {
    GetCustomerMyPanels() {
        return getData({
            endPoint: `${baseURL}/v1/user/installation/panel?status=1&offset=30&limit=1`
        });
    }
}

export default new CustomerMyPanels;