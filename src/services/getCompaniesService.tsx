import { baseURL, getData } from "./apiHub";

class CompaniesService {
    GetCompanies() {
        return getData({
            endPoint: `${baseURL}/v1/corporation`,
        });
    }
}

export default new CompaniesService(); 