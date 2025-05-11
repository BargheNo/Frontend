"use client";
import React, { useEffect, useState } from "react";
import {
  X,
  Loader2,
  Vote
} from "lucide-react";
import { toast } from "sonner";
import generateErrorMessage from "@/src/functions/handleAPIErrors";
import { useSelector } from "react-redux";
import ReactDOM from "react-dom";
import styles from "./RolesAndPermissions.module.css";
import { vazir } from "@/lib/fonts";

type Permission = {
  id: number;
  name: string;
  description: string;
  category: string;
};

type Role = {
  id: string;
  name: string;
  permissions: Permission[];
};

interface EditRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: Role | null;
  onSaveSuccess: () => void;
}

const EditRoleModal: React.FC<EditRoleModalProps> = ({
  isOpen,
  onClose,
  role,
  onSaveSuccess,
}) => {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [roleName, setRoleName] = useState(role?.name || "");

  useEffect(() => {
    if (role) {
      setRoleName(role.name);
    }
  }, [role]);

  // Fetch all available permissions
  const getAllPermissions = async () => {
    try {
      const response = await fetch(
        "http://46.249.99.69:8080/v1/admin/permissions",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      setAllPermissions(data.data);
    } catch (err: any) {
      const errMsg =
        generateErrorMessage(err) || "مشکلی در دریافت مجوزها رخ داد.";
      toast.error(errMsg);
    }
  };

  // Fetch permissions for the current role
  const getRolePermissions = async (roleId: string) => {
    try {
      const response = await fetch(
        `http://46.249.99.69:8080/v1/admin/roles/${roleId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      setSelectedPermissions(
        data.data.permissions.map((p: Permission) => p.id)
      );
    } catch (err: any) {
      console.log(err);
      const errMsg =
        generateErrorMessage(err) || "مشکلی در دریافت مجوزهای نقش رخ داد.";
      toast.error(errMsg);
    }
  };

  // Handle checkbox changes
  const handlePermissionChange = (permissionId: number) => {
    setSelectedPermissions((prev) => {
      if (prev.includes(permissionId)) {
        return prev.filter((id) => id !== permissionId);
      } else {
        return [...prev, permissionId];
      }
    });
  };

  // Save updated permissions
  const savePermissions = async () => {
    if (!role) return;
    setIsSaving(true);

    try {
      const response = await fetch(
        `http://46.249.99.69:8080/v1/admin/roles/${role.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            name: roleName,
            permissionIDs: selectedPermissions,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      const result = await response.json();
      toast.success(result.message);
      onSaveSuccess();
      onClose();
    } catch (error: any) {
      const errMsg =
        generateErrorMessage(error) || "هنگام به‌روزرسانی نقش مشکلی پیش آمد.";
      toast.error(errMsg);
    } finally {
      setIsSaving(false);
    }
  };

  // Load data when modal opens or role changes
  useEffect(() => {
    if (isOpen && role) {
      setIsLoading(true);
      Promise.all([getAllPermissions(), getRolePermissions(role.id)]).finally(
        () => setIsLoading(false)
      );
    }
  }, [isOpen, role]);

  // Group permissions by category
  const permissionsByCategory = allPermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  if (!isOpen || !role) return null;

  return ReactDOM.createPortal(
    <div className={`fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 rtl ${vazir.className}`}>
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-blue-800">
              ویرایش دسترسی‌های نقش:
            </h3>
            <input
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder={role.name}
              className="p-1 border-b border-blue-800 focus:outline-none focus:border-orange-500 text-lg font-bold text-blue-800 w-30"
            />
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
          <div className="space-y-6">
            {Object.entries(permissionsByCategory).map(
              ([category, permissions]) => (
                <div
                  key={category}
                  className={`bg-white p-4 rounded-xl w-full shadow-sm items-center gap-3 rtl ${styles.shadow} min-h-[140px]`}
                >
                  <h4 className="text-lg text-orange-500 font-semibold mb-3 flex items-center gap-2">
                    <Vote />
                    {category}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {permissions.map((permission) => (
                      <div
                        key={permission.id}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          id={`perm-${permission.id}`}
                          checked={selectedPermissions.includes(permission.id)}
                          onChange={() => handlePermissionChange(permission.id)}
                          className="w-5 h-5 text-orange-500 rounded focus:ring-orange-400"
                        />
                        <label
                          htmlFor={`perm-${permission.id}`}
                          className="text-gray-700"
                        >
                          {permission.description}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        )}

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            انصراف
          </button>
          <button
            onClick={savePermissions}
            disabled={isLoading || isSaving}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving && <Loader2 className="animate-spin" size={18} />}
            ذخیره تغییرات
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EditRoleModal;
