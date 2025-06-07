import axios from "axios";
import { baseURL, getData } from "./apiHub";

class provinceService {
	GetProvinces() {
		return getData({ endPoint: `${baseURL}/v1/address/province` });
		// return axios.get(`${baseURL}/v1/address/province`, {
		// 	headers: {
		// 		"ngrok-skip-browser-warning": "69420",
		// 	},
		// });
	}
	GetCities(provinceId: number) {
		return getData({
			endPoint: `${baseURL}/v1/address/province/${provinceId}/city`,
		});
		return axios.get(`${baseURL}/v1/address/province/${provinceId}/city`);
	}
}

export default new provinceService();
