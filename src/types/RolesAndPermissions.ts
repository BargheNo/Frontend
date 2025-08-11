interface Permission {
    id: number;
    name: string;
    description: string;
    category: string;
}

interface Role {
    id: string;
    name: string;
    permissions: Permission[];
}
