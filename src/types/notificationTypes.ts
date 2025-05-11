interface notifType{
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
    additionalData: string,
    isRead: boolean   
}

interface page {
	page: string;
	pageSize: string;
}

export type {notifType,notificationSetting,changeNotificationSetting,Notification,page};