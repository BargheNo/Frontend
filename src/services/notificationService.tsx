import { data } from "cypress/types/jquery";
import { baseURL, getData,putData } from "./apiHub";
import { changeNotificationSetting } from "../types/notificationTypes";
import { number } from "yup";

class notification{
    getNotificationType(){
        return getData({
            endPoint:`${baseURL}/v1/notifications/type`
        })
    }

    getNotificationSetting(){
        return getData({
            endPoint:`${baseURL}/v1/user/notifications/setting`
        })
    }

    changeNotificationSetting(id:number,changeinfo:changeNotificationSetting){
        return putData({
                endPoint:`${baseURL}/v1/user/notifications/setting/${id}`,
                data:changeinfo,
        })
    }

    getNotificationList(typeId:number){
        return getData({
            endPoint:`${baseURL}/v1/user/notifications`,
            params:{notificationTypes:typeId}
        })
    }
}

export default new notification();