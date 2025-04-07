import axios from "axios";
import { baseURL } from "./apiHub";
import { InitPanel } from "../types/addPanelType";


class AddPanel {
    AddPanel(panel:InitPanel,token:string) {
        return axios.post(`${baseURL}/v1/corp/1/panels/add`,panel,{
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })
    }
}

export default new AddPanel();
