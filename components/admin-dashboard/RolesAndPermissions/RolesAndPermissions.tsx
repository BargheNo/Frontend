import React from "react";
import styles from "./RolesAndPermissions.module.css";
import { User, SquareCheckBig, Trash2, Pencil } from "lucide-react";

const RolesAndPermissions = () => {
  type Permission = {
    id: number;
    name: string;
    description: string;
    category: string;
  };

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
        className={`bg-white p-4 rounded-xl w-full shadow-sm flex items-center gap-3 ltr ${styles.shadow}`}
      >
        <div className="flex flex-row justify-between items-center content-center h-full bg-white gap-10 py-5 px-5 overflow-hidden relative border-t-1 border-gray-300 w-full first:border-t-0 min-h-[20px]">
          <div className="flex flex-row gap-2 w-1/3 ">
            <div className="text-orange-500">
              <User />
            </div>
            <p className="text-start content-start  text-xl ">{id}-</p>
            <p className="text-start content-start  text-xl ">{name}</p>
          </div>
          <div className="flex flex-row gap-2 w-5/7 ">
            <p className="content-start w-full text-xl" dir="rtl">
              دسترسی‌ها:{" "}
              {permissions.length === 0
                ? "دسترسی موجود نیست"
                : permissions
                    .slice(0, 2)
                    .map((p) => p.description)
                    .join("، ") + (permissions.length > 2 ? "، ..." : "")}
            </p>
            <div className="text-orange-500">
              <SquareCheckBig />
            </div>
          </div>
          <div className="flex flex-row w-1/3 px-3 justify-center ">
            <div
              className={`cta-neu-button flex flex-row ${styles.button} items-center content-center justify-center h-1/2 w-1/2`}
            >
              <div className="text-orange-500">
                <Pencil />
              </div>
              <button
                className="cursor-pointer"
                // onClick={() => resolveReport(id)}
              >
                تغییر
              </button>
            </div>
            <div
              className={`cta-neu-button flex ${styles.button} items-center content-center justify-center h-1/2 w-1/2`}
            >
              <div className="text-orange-500">
                <Trash2 />
              </div>
              <button
                className="cursor-pointer"
                // onClick={() => resolveReport(id)}
              >
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
        <h2
          className={`text-right text-2xl font-bold text-blue-800 mb-6  pb-4 border-b`}
        >
          نقش های فعلی
        </h2>

        <Roles
          id="1"
          name="Admin"
          permissions={[
            {
              id: 1,
              name: "general.all",
              description: "دسترسی کامل به سیستم",
              category: "general",
            },
          ]}
        />
        <Roles
          id="2"
          name="Manager"
          permissions={[
            {
              id: 2,
              name: "users.view",
              description: "مشاهده کاربران",
              category: "users",
            },
            {
              id: 3,
              name: "users.edit",
              description: "ویرایش کاربران",
              category: "users",
            },
            {
              id: 3,
              name: "users.add",
              description: "افزودن کاربران",
              category: "users",
            },
          ]}
        />
        <Roles id="3" name="Viewer" permissions={[]} />
      </div>
    </div>
  );
};

export default RolesAndPermissions;
