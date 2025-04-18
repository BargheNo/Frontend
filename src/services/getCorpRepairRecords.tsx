import { baseURL, getData } from "./apiHub";

class CorpRepairRecords {
    GetRepairRequest() {
        return getData({
            endPoint: `${baseURL}/v1/corp/1/maintenance/request/list`
        });
    }
}

export default new CorpRepairRecords;