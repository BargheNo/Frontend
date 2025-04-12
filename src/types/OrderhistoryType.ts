interface Orderhistory{
    id:number,
    name:string,
    status:string,
    createdTime:string,
    address:{ID:number,province:string,city:string,streetAddress:string,postalCode:string,houseNumber:string,unit:number},
}

export type {Orderhistory}