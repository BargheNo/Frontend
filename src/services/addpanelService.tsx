import { baseURL, postData } from "./apiHub";
import { InitPanel } from "../types/addPanelType";

class AddPanel {
  AddPanel(panel: InitPanel, corpId?: number) {
    return postData({
      endPoint: `${baseURL}/v1/corp/${corpId}/installation/panel`,
      data: panel,
    });
  }
}

export default new AddPanel();
