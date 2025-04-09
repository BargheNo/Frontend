import axios from "axios";
import { baseURL, getData, postData } from "./apiHub";

interface Orderinfo {
	name: string;
	area: number;
	power: number;
	maxCost: number;
	buildingType: string;
	description: string;
	provinceID: number;
	cityID: number;
	streetAddress: string;
	postalCode: string;
	houseNumber: string;
	unit: number;
}
interface page {
	page: string;
	pageSize: string;
}

class order {
	orderRequest(Orderinfo: Orderinfo, token: string) {
		// console.log("token", token);
		return postData({
			endPoint: `${baseURL}/v1/user/installation/request`,
			data: Orderinfo,
			headers: {
				"ngrok-skip-browser-warning": "69420",
			},
		});
		// return axios.post(
		// 	`${baseURL}/v1/user/installation/request`,
		// 	Orderinfo,
		// 	{
		// 		headers: {
		// 			Authorization: `Bearer ${token}`,
		// 			"ngrok-skip-browser-warning": "69420",
		// 		},
		// 	}
		// );
	}

	orderHistory(pageinfo: page, token: string) {
		return getData({
			endPoint: `${baseURL}/v1/user/installation/request`,
			headers: {
				"ngrok-skip-browser-warning": "69420",
			},
			params: pageinfo,
		});
		// return axios.get(`${baseURL}/v1/user/installation/request`, {
		//     headers: {
		//         Authorization: `Bearer ${token}`,
		//         "ngrok-skip-browser-warning":"69420"
		//     },
		//     params: pageinfo,
		// });
	}
}

export default new order();
