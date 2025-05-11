"use client";
import React, { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import generateErrorMessage from "@/src/functions/handleAPIErrors";
import { useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { vazir } from "@/lib/fonts";

type Role = {
  id: number;
  name: string;
  permissions: {
    id: number;
    name: string;
    description: string;
    category: string;
  }[];
};

interface UserRolesModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  onSaveSuccess: () => void;
  userStatus: "active" | "blocked"| null;
}

const UserRolesModal: React.FC<UserRolesModalProps> = ({
  isOpen,
  onClose,
  userId,
  onSaveSuccess,
}) => {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const [userRoles, setUserRoles] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isBanning, setIsBanning] = useState(false);
  const [currentUserStatus, setCurrentUserStatus] = useState<
    "active" | "blocked"
  >("active");

  // Fetch all available roles
  const getAllRoles = async () => {
    try {
      const response = await fetch("http://46.249.99.69:8080/v1/admin/roles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setAllRoles(data.data);
    } catch (err: any) {
      const errMsg =
        generateErrorMessage(err) || "مشکلی در دریافت نقش‌ها رخ داد.";
      toast.error(errMsg);
    }
  };

  // Fetch roles for the current user
  const getUserRoles = async (userId: number) => {
    try {
      const response = await fetch(
        `http://46.249.99.69:8080/v1/admin/users/${userId}/roles`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      setUserRoles(data.data.map((role: Role) => role.id));
    } catch (err: any) {
      console.log(err);
      const errMsg =
        generateErrorMessage(err) || "مشکلی در دریافت نقش‌های کاربر رخ داد.";
      toast.error(errMsg);
    }
  };

  // Handle checkbox changes
  const handleRoleChange = (roleId: number) => {
    setUserRoles((prev) => {
      if (prev.includes(roleId)) {
        return prev.filter((id) => id !== roleId);
      } else {
        return [...prev, roleId];
      }
    });
  };

  // Save updated roles
  const saveRoles = async () => {
    setIsSaving(true);

    try {
      const response = await fetch(
        `http://46.249.99.69:8080/v1/admin/users/${userId}/roles`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            role_ids: userRoles,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user roles");
      }

      const result = await response.json();
      toast.success(result.message);
      onSaveSuccess();
      onClose();
    } catch (error: any) {
      const errMsg =
        generateErrorMessage(error) ||
        "هنگام به‌روزرسانی نقش‌های کاربر مشکلی پیش آمد.";
      toast.error(errMsg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleBanAction = async () => {
    setIsBanning(true);
    const action = currentUserStatus === "active" ? "ban" : "unban";

    try {
      const response = await fetch(
        `http://46.249.99.69:8080/v1/admin/users/${userId}/${action}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to ${action} user`);
      }

      const result = await response.json();
      toast.success(result.message);
      // Toggle the status
      setCurrentUserStatus(
        currentUserStatus === "active" ? "blocked" : "active"
      );
      onSaveSuccess(); // Refresh user list if needed
    } catch (error: any) {
      const errMsg =
        generateErrorMessage(error) ||
        `هنگام ${
          action === "ban" ? "مسدود کردن" : "رفع انسداد"
        } کاربر مشکلی پیش آمد.`;
      toast.error(errMsg);
    } finally {
      setIsBanning(false);
    }
  };

  // Load data when modal opens or user changes
  useEffect(() => {
    if (isOpen && userId) {
      setIsLoading(true);
      Promise.all([getAllRoles(), getUserRoles(userId)]).finally(() =>
        setIsLoading(false)
      );
    }
  }, [isOpen, userId]);

  if (!isOpen || !userId) return null;

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 rtl ${vazir.className}`}
    >
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-blue-800">
            مدیریت نقش‌های کاربر
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isSaving}
          >
            <X size={24} />
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin text-orange-500" size={32} />
          </div>
        ) : (
          <div className="space-y-4">
            {allRoles.map((role) => (
              <div
                key={role.id}
                className="flex items-center gap-3 p-3 border-b"
              >
                <input
                  type="checkbox"
                  id={`role-${role.id}`}
                  checked={userRoles.includes(role.id)}
                  onChange={() => handleRoleChange(role.id)}
                  className="w-5 h-5 text-orange-500 rounded focus:ring-orange-400"
                />
                <label htmlFor={`role-${role.id}`} className="text-gray-700">
                  {role.name}
                </label>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center border-t pt-4">
          <button
            onClick={handleBanAction}
            disabled={isLoading || isBanning}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              currentUserStatus === "active"
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {isBanning && <Loader2 className="animate-spin" size={18} />}
            {currentUserStatus === "active" ? "مسدود کردن" : "رفع انسداد"}
          </button>

          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              disabled={isSaving || isBanning}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              انصراف
            </button>
            <button
              onClick={saveRoles}
              disabled={isLoading || isSaving || isBanning}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving && <Loader2 className="animate-spin" size={18} />}
              ذخیره تغییرات
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default UserRolesModal;
