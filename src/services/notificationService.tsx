import { data } from "cypress/types/jquery";
import { baseURL, getData,putData } from "./apiHub";
import { changeNotificationSetting, page } from "../types/notificationTypes";

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

    getNotificationList(typeId:number,pageinfo:page){
        return getData({
            endPoint:`${baseURL}/v1/user/notifications`,
            params:{notificationTypes:typeId,pageinfo}
        })
    }
}

export default new notification();