import { baseURL, getData } from "./apiHub";

class CorpRepairRecords {
    GetRepairRequest() {
        return getData({
            endPoint: `${baseURL}/v1/corp/2/maintenance/request?status=7`    // TODO: CorpIDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
        });
    }
}

export default new CorpRepairRecords;