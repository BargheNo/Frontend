interface getOrder{
    Name:string,
    Status:string,
    PowerRequest:number,
    Description:string,
    BuildingType:string,
    Area:number,
    MaxCost:number,
    Customer:{FirstName:string,LastName:string,Phone:string,Email?:string,ProfilePic:string,Status:string},
    Address:{Province:string,City:string,StreetAddress:string,PostalCode:string,HouseNumber:string,Unit:number}

}
 export type {getOrder}