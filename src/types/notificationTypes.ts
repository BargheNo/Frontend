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
        cost:number
        bidder:{firstName:string,lastName:string}
        installationRequest :{customer:{firstName:string,lastName:string,phone:string},name:string,createdTime:string}
        installationTime:string;
        description:string
        status:string
        panel:{customer:{firstName:string,lastName:string,phone:string},name:string,operator:{firstName:string,lastName:string},corporation:{name:string}}

        maintenanceRecord:{customer:{firstName:string,lastName:string,phone:string},date:string,details:string,panel:{name:string},title:string,operator:{firstName:string,lastName:string},corporation:{name:string}}
    },
    isRead: boolean 
    
    
}

interface page {
	page: string;
	pageSize: string;
}

export type {notifType,notificationSetting,changeNotificationSetting,Notification,page};