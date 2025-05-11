"use client";
import React, { useState, useEffect } from "react";
import { Phone, Settings, User, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import styles from "./Users.module.css";
import generateErrorMessage from "@/src/functions/handleAPIErrors";
import { toast } from "sonner";

type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  status: "active" | "block";
};

type RootState = {
  user: {
    accessToken: string;
  };
};

const CustomIcon = ({ icon: Icon }: { icon: React.ElementType }) => {
  return (
    <div className={`${styles.icon} bg-[#F4F1F3] text-[#FA682D]`}>
      <Icon className="m-1" />
    </div>
  );
};

const UserItem = ({ firstName, lastName, phone, status }: UserType) => {
  return (
    <div className="flex flex-row justify-between w-full h-full bg-[#F4F1F3] p-5 overflow-hidden relative border-t-1 border-gray-300 first:border-t-0 items-center">
      <div className="flex items-center gap-3 w-1/4">
        <CustomIcon icon={User} />
        <p>
          {firstName} {lastName}
        </p>
      </div>
      <div className="flex items-center gap-3 w-1/4">
        <CustomIcon icon={Phone} />
        <p>{phone.slice(-10)}</p>
      </div>
      <div className="flex items-center gap-3 w-1/4">
        <div className="flex items-center gap-2">
          <span className="font-bold">
            {status === "active" ? "فعال" : "مسدود"}
          </span>
          <div
            className={`h-4 w-4 rounded-full ${
              status === "active" ? "bg-green-500" : "bg-red-500"
            } shadow-md`}
          />
        </div>
      </div>
      <button
        className={`${styles.button} text-[#FA682D] flex gap-2 items-center p-2 hover:cursor-pointer`}
      >
        <p className="font-bold">جزئیات بیشتر و مدیریت</p>
        <Settings />
      </button>
    </div>
  );
};

export default function Users() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://46.249.99.69:8080/v1/admin/users?statuses=1&statuses=2",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data.data);
      } catch (err: any) {
        const errMsg =
          generateErrorMessage(err) || "مشکلی در دریافت کاربران رخ داد.";
        toast.error(errMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [accessToken]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin text-orange-500" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        خطا در دریافت کاربران: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full text-gray-800 rounded-2xl overflow-hidden shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
      {users.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          firstName={user.firstName}
          lastName={user.lastName}
          phone={user.phone}
          status={user.status}
        />
      ))}
    </div>
  );
}
