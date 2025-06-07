interface getOrder{
    name:string,
    status:string,
    powerRequest:number,
    description:string,
    buildingType:string,
    area:number,
    maxCost:number,
    customer:{firstName:string,lastName:string,phone:string,email?:string,profilePic:string,status:string},
    address:{province:string,city:string,streetAddress:string,postalCode:string,houseNumber:string,unit:number}

}
 export type {getOrder}