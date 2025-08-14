interface corp {
    id: number;
    name: string;
    addresses: Address[];
    isSuspended: boolean;
}
interface userData {
    firstName: string;
    lastName: string;
    accessToken: string;
    refreshToken: string;
    permissions: any;
    isAuth: boolean;
    corps?: corp[];
    corpId?: number;
}
