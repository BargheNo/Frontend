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
    Name :string ;
    Description :string ;
    SupportsEmail: boolean;    
    SupportsPush:boolean;   
      
}

export type {notifType,notificationSetting,changeNotificationSetting,Notification};