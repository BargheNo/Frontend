import axios from "axios"
import { baseURL } from "./apiHub";

class provinceService{
    GetProvinces(){
        return axios.get(`${baseURL}/v1/address/province`, {
            headers: {
                "ngrok-skip-browser-warning":"69420"
            }})
    }
    GetCities(provinceId:number){
        return axios.get(`${baseURL}/v1/address/province/${provinceId}/city`, {
            headers: {
                "ngrok-skip-browser-warning":"69420"
            }})
    }
}

export default new provinceService();