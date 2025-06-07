import { baseURL, getData } from "./apiHub";

const getUrgencyLevels = {
  GetUrgencyLevels: async () => {
    try {
      const response = await getData({
        endPoint: `${baseURL}/v1/user/maintenance/request/level`
      });
      return response;
    } catch (error) {
      console.error("Error fetching urgency levels:", error);
      throw error;
    }
  },
};

export default getUrgencyLevels; 