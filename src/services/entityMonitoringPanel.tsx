import { editPanel } from "../types/Entity-Monitoring/panelType";
import { baseURL, deleteData, getData, putData } from "./apiHub";

class PanelService{
    getPanelList(status:number,limit:number,offset:number){
        return getData({
            endPoint:`${baseURL}/v1/admin/installation/panel?status=${status}&limit=${limit}&offset=${offset}`,
        });
    }

    deletePanel(panelId:number){
        return deleteData({
            endPoint:`${baseURL}/v1/admin/installation/panel/${panelId}`
        });
    }
    updatePanel(panelId:number,editted:editPanel){
        return putData({
            endPoint:`${baseURL}/v1/admin/installation/panel/${panelId}`,
            data: editted,
        })
    }
}

export default new PanelService();