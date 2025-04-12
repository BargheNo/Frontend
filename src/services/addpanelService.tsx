import { baseURL, postData } from "./apiHub";
import { InitPanel } from "../types/addPanelType";


class AddPanel {
    AddPanel(panel:InitPanel) {
        return postData({endPoint:`${baseURL}/v1/corp/3/panels/add`,data:panel})
    }
}

export default new AddPanel();
