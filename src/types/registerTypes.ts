interface signupInfo{  
    firstName:string;
    lastName:string;
    phone:string;
    password:string;
    confirmPassword:string;
    isAcceptTerms:boolean;
}

interface phonenumberVerification{
    phone: string;
    otp:string;
}

export type {phonenumberVerification,signupInfo}