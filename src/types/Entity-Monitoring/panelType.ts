interface getPanel{
        id: number,
        name: string,
        status: string,
        buildingType: string,
        area: number,
        power: number,
        tilt: number,
        azimuth: number,
        totalNumberOfModules: number,
        guaranteeStatus: string,
        operator: {
            id: number,
            firstName: string,
            lastName: string,
            phone: string,
            email?: string,
            profilePic?: string,
            status: string
        },
        customer: {
            firstName: string,
            lastName: string,
            phone: string,
            email?: string,
            profilePic?: string,
            status: string
        },
        corporation: {
            id: number,
            name: string,
            contactInfo: 
            {
                contactType: {
                name: string
                }
                value: string
            }[]
            
            addresses: {
                
                    province: string,
                    city: string,
                    streetAddress: string,
                    postalCode: string,
                    houseNumber: string,
                    unit: number
                
            }[]
        },
        address: {
            province: string,
            provinceID: number,
            cityID: number,
            city: string,
            streetAddress: string,
            postalCode: string,
            houseNumber: string,
            unit: number
        },
        guarantee: {
            id: number,
            name: string,
            status: string,
            guaranteeType: string,
            durationMonths: number,
            description: string,
            // terms: null
        }
    
}

interface editPanel{
    name: string|null,
    status: number|null,
    buildingType: number|null,
    area: number|null,
    power: number|null,
    tilt: number|null,
    azimuth: number|null,
    totalNumberOfModules: number|null
}


 export type {getPanel,editPanel}