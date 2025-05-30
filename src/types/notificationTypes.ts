interface notifType{
    id:number;
    name:string,
    description:string,
    supportsEmail:boolean,
    supportsPush:boolean,
}

interface notificationSetting{
    id:number,
    notificationType:notifType,
    isEmailEnabled:boolean;
    isPushEnabled:boolean,
}

interface changeNotificationSetting{
    isEmailEnabled:boolean;
    isPushEnabled:boolean,
}


interface Notification{
    id: number;
    type: {
        id: number,
        name: string,
        description: string,
        supportsEmail: boolean,
        supportsPush: boolean,
        },
    data: {
        bidder:{firstName:string,lastName:string}
        installationRequest :{customer:{firstName:string,lastName:string,phone:string},name:string}
        installationTime:string;
        description:string

        panel:{customer:{firstName:string,lastName:string,phone:string},name:string,}

        maintenanceRecord:{customer:{firstName:string,lastName:string,phone:string},date:string,details:string,panel:{name:string},title:string}
    },
    isRead: boolean 
    
    
}

interface page {
	page: string;
	pageSize: string;
}

export type {notifType,notificationSetting,changeNotificationSetting,Notification,page};