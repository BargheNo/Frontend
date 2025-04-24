import { baseURL, getData } from "./apiHub";

class CompaniesService {
    GetCompanies() {
        return getData({
            endPoint: `${baseURL}/v1/user/corp/list`,
        });
    }
}

export default new CompaniesService(); 