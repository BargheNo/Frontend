"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface permission {
    id: number;
    name: string;
    description: string;
    category: string;
}

interface PermissionState {
    hasPermission: boolean;
    loading: boolean;
}

export default function useHasPermission(permission: string): PermissionState {
    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setIsClient(true);
        // Add a small delay to ensure Redux store is ready
        const timer = setTimeout(() => {
            setLoading(false);
        }, 100);

        return () => clearTimeout(timer);
    }, []);
    const permissions = useSelector(
        (state: RootState) => state.user.permissions
    );
    // if (!permission) return { hasPermission: true, loading: false };
    const names = Array.isArray(permissions)
        ? permissions?.map((p: permission) => p.name)
        : [];
    // console.log(names);
    const hasPermission =
        isClient &&
        (names?.includes("general.all") || names?.includes(permission));

    return { hasPermission, loading };
}
