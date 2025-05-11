"use client";
import React from "react";
import styles from "./RolesAndPermissions.module.css";
import { User, SquareCheckBig, Trash2, Pencil, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import generateErrorMessage from "@/src/functions/handleAPIErrors";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import EditRoleModal from "./EditRoleModal";
import CreateRoleModal from "./CreateRoleModal";

const RolesAndPermissions = () => {
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

  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const [roles, setRoles] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const getRoles = () => {
    fetch("http://46.249.99.69:8080/v1/admin/roles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRoles(data.data);
      })
      .catch((err) => {
        const errMsg =
          generateErrorMessage(err) || "مشکلی در دریافت نقش ها رخ داد.";
        toast.error(errMsg);
      });
  };
  const deleteRole = async (roleToDeleteId: string) => {
    try {
      const response = await fetch(
        `http://46.249.99.69:8080/v1/admin/roles/${roleToDeleteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to resolve ticket");
      }

      const result = await response.json();
      toast.success(result.message);
      getRoles();

      // Optionally refresh ticket list or update UI
    } catch (error: any) {
      const errMsg =
        generateErrorMessage(error) || "هنگام حذف نقش مشکلی پیش آمد.";
      toast.error(errMsg);
    }
  };

  const openEditModal = (role: Role) => {
    setCurrentRole(role);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getRoles();
  }, []);

  const Roles = ({
    id,
    name,
    permissions,
  }: {
    id: string;
    name: string;
    permissions: Array<Permission>;
  }) => {
    return (
      <div
        className={`bg-white p-4 rounded-xl w-full shadow-sm flex items-center gap-3 rtl ${styles.shadow}`}
      >
        <div className="flex flex-row justify-between items-center content-center h-full bg-white gap-10 py-5 px-5 overflow-hidden relative border-t-1 border-gray-300 w-full first:border-t-0 min-h-[20px]">
          <div className="flex flex-row gap-2 w-1/3 ">
            <div className="text-orange-500">
              <User />
            </div>
            <p className="text-start content-start  text-xl ">{name}</p>
          </div>
          <div className="flex flex-row gap-2 w-5/7 ">
            <div className="text-orange-500">
              <SquareCheckBig />
            </div>
            <p className="content-start w-full text-xl text-gray-600" dir="rtl">
              دسترسی‌ها:{" "}
              {permissions.length === 0
                ? "دسترسی موجود نیست"
                : permissions
                    .slice(0, 2)
                    .map((p) => p.description)
                    .join("، ") + (permissions.length > 2 ? "، ..." : "")}
            </p>
          </div>
          <div className="flex flex-row w-1/3 px-3 justify-center ">
            <div
              className={`cta-neu-button flex flex-row ${styles.button} items-center content-center justify-center h-1/2 w-1/2`}
              onClick={() => openEditModal({ id, name, permissions })}
            >
              <div className="text-orange-500">
                <Pencil />
              </div>
              <button className="cursor-pointer">تغییر</button>
            </div>
            <div
              className={`cta-neu-button flex ${styles.button} items-center content-center justify-center h-1/2 w-1/2 cursor-pointer`}
            >
              <div className="text-orange-500">
                <Trash2 />
              </div>
              <button onClick={() => deleteRole(id)} className="cursor-pointer">
                حذف
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="flex items-center justify-center p-10">
      <div
        className={`bg-white p-10 rounded-xl shadow-sm flex flex-col items-center gap-3 w-full justify-center ${styles.outsideShadow}`}
      >
        <div className="flex justify-between items-center w-full mb-6 pb-4 px-10">
          <h2 className="text-right text-2xl font-bold text-blue-800 border-b">
            نقش های فعلی
          </h2>
          <div
            className={`cta-neu-button flex flex-row ${styles.button} items-center content-center justify-center h-15 w-1/5 text-2xl `}
            onClick={() => setIsCreateModalOpen(true)}
          >
            <div className="text-orange-500">
              <Plus />
            </div>
            <button
              className="cursor-pointer"
              
            >
              افزودن نقش
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {roles.length > 0 ? (
            roles.map((role) => (
              <Roles
                key={role.id}
                id={role.id}
                name={role.name}
                permissions={role.permissions}
              />
            ))
          ) : (
            <p className="text-gray-500 text-right">هیچ گزارشی موجود نیست.</p>
          )}
        </div>
      </div>
      <EditRoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        role={currentRole}
        onSaveSuccess={getRoles}
      />
       <CreateRoleModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSaveSuccess={getRoles}
      />
    </div>
  );
};

export default RolesAndPermissions;
