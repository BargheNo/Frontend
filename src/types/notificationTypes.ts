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

export type {notifType,notificationSetting};