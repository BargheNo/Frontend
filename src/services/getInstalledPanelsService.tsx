import axios from "axios";
import { baseURL, getData, postData } from "./apiHub";


interface page {
    page: string;
    pageSize: string;
}

class InstalledPanel {
    GetInstalledPanels(pageinfo: page) {
        return getData({
            endPoint:`${baseURL}/v1/corp/1/panels/list`,
            params: pageinfo,
		});

    }
}

export default new InstalledPanel();
