interface getOrder{
    id:number,
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

interface editOrder{
    name: string|null,
    area: number|null,
    power:number|null,
    maxCost: number|null,
    buildingType: number|null,
    description: string|null
}
 export type {getOrder,editOrder}