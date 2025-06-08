import { baseURL, getData } from "./apiHub";

class provinceService {
	GetProvinces() {
		return getData({ endPoint: `${baseURL}/v1/address/province` });
	}
	GetCities(provinceId: number) {
		return getData({
			endPoint: `${baseURL}/v1/address/province/${provinceId}/city`,
		});
	}
}

export default new provinceService();
