import { baseURL, getData,putData, postData } from "./apiHub";

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
}

export default new notification();