import { editOrder } from "../types/Entity-Monitoring/orderType";
import { baseURL, deleteData, getData, putData } from "./apiHub";

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

    updateOrder(requestId:number,editted:editOrder){
        return putData({
            endPoint:`${baseURL}/v1/admin/installation/request/${requestId}`,
            data: editted,
        })
    }
}

export default new OrderService();