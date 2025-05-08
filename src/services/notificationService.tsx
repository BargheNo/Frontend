import { baseURL, getData, postData } from "./apiHub";

class notification{
    getNotificationType(){
        return getData({
            endPoint:`${baseURL}/v1/notifications/type`
        })
    }
}

export default new notification();