import { baseURL, getData, postData } from "./apiHub";

interface Orderinfo {
	name: string;
	area: number;
	power: number;
	maxCost: number;
	buildingType: number;
	description: string;
	provinceID: number;
	cityID: number;
	streetAddress: string;
	postalCode: string;
	houseNumber: string;
	unit: number;
}
interface Filters {
	status: string;
	offset: string;
	limit: string;
}

class order {
	orderRequest(Orderinfo: Orderinfo) {
		// console.log("token", token);
		return postData({
			endPoint: `${baseURL}/v1/user/installation/request`,
			data: Orderinfo,
		});
	}

	orderHistory(filters: Filters) {
		return getData({
			endPoint: `${baseURL}/v1/user/installation/request`,
			params: filters,
		});
	}
}

export default new order();
