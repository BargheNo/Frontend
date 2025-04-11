import axios from "axios";
import { baseURL, getData, postData } from "./apiHub";


interface page {
    page: string;
    pageSize: string;
}

class InstalledPanel {
    GetInstalledPanels(pageinfo: page, token: string) {
        return axios.get(`${baseURL}/v1/corp/3/panels/list`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },params:pageinfo},
             
            );

    }
}

export default new InstalledPanel();
