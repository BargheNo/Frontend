import { baseURL, getData } from "./apiHub";

class CorpRepairRecords {
    GetRepairRequest(corpID: number) {
        return getData({
            endPoint: `${baseURL}/v1/corp/${corpID}/maintenance/request?status=7`
        });
    }
}

export default new CorpRepairRecords;