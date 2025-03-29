import axios from "axios"
import { baseURL } from "./apiHub";

interface Orderinfo{
    
    name: string,
    area:number,
    power: number,
    maxCost: number,
    buildingType: string,
    description: string,
    provinceID: number,
    cityID: number,
    streetAddress: string,
    postalCode:string,
    houseNumber: string,
    unit: number
}
interface page{
  page:number,
  pageSize:number,
}

class order{
    orderRequest(Orderinfo:Orderinfo,token:string){
        return axios.post(`${baseURL}/v1/installation/request`,Orderinfo, {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning":"69420"
            }
          })
    }

    orderHistory(pageinfo: page, token: string) {
      return axios.get(`${baseURL}/v1/installation/request`, {
          headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning":"69420"
          },
          params: pageinfo, 
      });
  }
}

export default new order();