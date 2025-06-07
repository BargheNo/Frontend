import { baseURL, deleteData, getData } from "./apiHub";

class OrderService {
    getOrdersList(status:number,limit:number,offset:number) {
        return getData({
            endPoint:`${baseURL}/v1/admin/installation/request?status=${status}&limit=${limit}&offset=${offset}`,
        });
    }

    deleteOrder(requestId:number){
        return deleteData({
            endPoint:`${baseURL}/v1/admin/installation/request/${requestId}`
        });
    }
}

export default new OrderService();