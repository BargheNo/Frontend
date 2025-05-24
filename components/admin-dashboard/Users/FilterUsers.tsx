"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import generateErrorMessage from "@/src/functions/handleAPIErrors";

type Role = {
  id: number;
  name: string;
};

type FilterUsersProps = {
  accessToken: string;
  onFilteredUsers: (users: any[]) => void;
  setLoading: (loading: boolean) => void;
};

export default function FilterUsers({ accessToken, onFilteredUsers, setLoading }: FilterUsersProps) {
  const [filterType, setFilterType] = useState<string>("all");
  const [filterValue, setFilterValue] = useState<string | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const isInitialMount = useRef(true);

  // Fetch all roles when needed
  const fetchRoles = useCallback(async () => {
    try {
      setLoadingRoles(true);
      const response = await fetch("http://46.249.99.69:8080/v1/admin/roles", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setRoles(data.data);
    } catch (err: any) {
      const errMsg = generateErrorMessage(err) || "مشکلی در دریافت نقش‌ها رخ داد.";
      toast.error(errMsg);
    } finally {
      setLoadingRoles(false);
    }
  }, [accessToken]);

  // Fetch all users (no filtering)
  const fetchAllUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://46.249.99.69:8080/v1/admin/users?statuses=1&statuses=2",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const data = await response.json();
      onFilteredUsers(data.data);
    } catch (err: any) {
      const errMsg = generateErrorMessage(err) || "مشکلی در دریافت کاربران رخ داد.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  }, [accessToken, onFilteredUsers, setLoading]);

  // Fetch users by status
  const fetchUsersByStatus = useCallback(async (status: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://46.249.99.69:8080/v1/admin/users?statuses=${status}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const data = await response.json();
      onFilteredUsers(data.data);
    } catch (err: any) {
      const errMsg = generateErrorMessage(err) || "مشکلی در دریافت کاربران رخ داد.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  }, [accessToken, onFilteredUsers, setLoading]);

  // Fetch users by role
  const fetchUsersByRole = useCallback(async (roleId: string) => {
  try {
    setLoading(true);
    const response = await fetch(
      `http://46.249.99.69:8080/v1/admin/roles/${roleId}/owners`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const data = await response.json();
    
    // Filter out empty/invalid users and transform data
    const formattedUsers = data.data
      .filter((user: any) => user.firstName || user.lastName || user.phone) // Filter empty users
      .map((user: any, index: number) => ({
        id: user.id === 0 ? index + 1 : user.id, // Handle ID 0 by using index
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        status: user.status === "active" ? "active" : "block" // Ensure consistent status values
      }));
    
    onFilteredUsers(formattedUsers);
  } catch (err: any) {
    const errMsg = generateErrorMessage(err) || "مشکلی در دریافت کاربران رخ داد.";
    toast.error(errMsg);
  } finally {
    setLoading(false);
  }
}, [accessToken, onFilteredUsers, setLoading]);

  // Handle filter changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (filterType === "all") {
      fetchAllUsers();
    } else if (filterType === "role" && filterValue && filterValue !== "all") {
      fetchUsersByRole(filterValue);
    } else if (filterType === "status" && filterValue && filterValue !== "all") {
      fetchUsersByStatus(filterValue);
    } else if (filterValue === "all") {
      fetchAllUsers();
    }
  }, [filterType, filterValue, fetchAllUsers, fetchUsersByRole, fetchUsersByStatus]);

  // Fetch roles when role filter is selected
  useEffect(() => {
    if (filterType === "role") {
      fetchRoles();
    }
  }, [filterType, fetchRoles]);

  const renderSecondDropdown = () => {
    switch (filterType) {
      case "role":
        return (
          <Select
            onValueChange={(value) => setFilterValue(value)}
            disabled={loadingRoles}
          >
            <SelectTrigger dir="rtl" className="bg-[#F4F1F3] w-40">
              <SelectValue placeholder={loadingRoles ? "در حال بارگذاری..." : "انتخاب نقش"} />
            </SelectTrigger>
            <SelectContent dir="rtl">
              <SelectItem value="all">همه نقش‌ها</SelectItem>
              {roles.map((role) => (
                <SelectItem key={role.id} value={String(role.id)}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "status":
        return (
          <Select onValueChange={(value) => setFilterValue(value)}>
            <SelectTrigger dir="rtl" className="bg-[#F4F1F3] w-40">
              <SelectValue placeholder="وضعیت" />
            </SelectTrigger>
            <SelectContent dir="rtl">
              <SelectItem value="all">همه وضعیت‌ها</SelectItem>
              <SelectItem value="1">فعال</SelectItem>
              <SelectItem value="2">مسدود</SelectItem>
            </SelectContent>
          </Select>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-full text-gray-800 rounded-2xl overflow-hidden bg-white shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
      <div className="p-5 items-center flex gap-6">
        <div className="flex gap-4 items-center">
          <Select
            defaultValue="all"
            onValueChange={(value) => {
              setFilterType(value);
              setFilterValue(null);
            }}
          >
            <SelectTrigger dir="rtl" className="bg-[#F4F1F3] w-40">
              <SelectValue placeholder="فیلتر بر اساس" />
            </SelectTrigger>
            <SelectContent dir="rtl">
              <SelectItem value="all">همه کاربران</SelectItem>
              <SelectItem value="role">بر اساس نقش‌ها</SelectItem>
              <SelectItem value="status">بر اساس وضعیت</SelectItem>
            </SelectContent>
          </Select>

          {renderSecondDropdown()}
        </div>
      </div>
    </div>
  );
}