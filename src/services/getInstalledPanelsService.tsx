import { getData } from "./apiHub";

interface page {
	status: string;
	offset: string;
	limit: string;
}

class InstalledPanel {
	GetInstalledPanels({ page, corpId }: { page: page; corpId?: number }) {
		return getData({
			endPoint: `/v1/corp/${corpId}/installation/panel`,
			params: page,
		});
	}
}

export default new InstalledPanel();
