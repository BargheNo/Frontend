"use client";
import React, { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { vazir } from "@/lib/fonts";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import { getData, putData } from "@/src/services/apiHub";
import generateErrorMessage from "@/src/functions/handleAPIErrors";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  userStatus: "فعال" | "blocked" | null;
}

const UserRolesModal: React.FC<UserRolesModalProps> = ({
  isOpen,
  onClose,
  userId,
  onSaveSuccess,
  userStatus,
}) => {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const [userRoles, setUserRoles] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isBanning, setIsBanning] = useState(false);

	// Fetch all available roles
	const getAllRoles = async () => {
		getData({ endPoint: `/v1/admin/roles` }).then((data) => {
			setAllRoles(data.data);
		});
	};

	// Fetch roles for the current user
	const getUserRoles = async (userId: number) => {
		getData({ endPoint: `/v1/admin/users/${userId}/roles` }).then(
			(data) => {
				setUserRoles(data.data.map((role: Role) => role.id));
			}
		);
	};

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
      const errMsg =
        generateErrorMessage(err) || "مشکلی در دریافت نقش‌های کاربر رخ داد.";
      CustomToast(errMsg, "error");
    }
  };

	// Save updated roles
	const saveRoles = async () => {
		setIsSaving(true);
		const formData = {
			roleIDs: userRoles,
		};
		putData({
			endPoint: `/v1/admin/users/${userId}/roles`,
			data: formData,
		})
			.then((data) => {
				CustomToast(data?.message, "success");
				onSaveSuccess();
				onClose();
			})
			.finally(() => setIsSaving(false));
	};

	const handleBanAction = async () => {
		const action = currentUserStatus === "active" ? "ban" : "unban";
		setIsBanning(true);
		putData({ endPoint: `/v1/admin/users/${userId}/${action}` })
			.then((data) => {
				CustomToast(data?.message, "success");
				setCurrentUserStatus(
					currentUserStatus === "active" ? "blocked" : "active"
				);
				onSaveSuccess();
			})
			.finally(() => setIsBanning(false));
	};
  const handleRoleChange = (roleId: number) => {
    setUserRoles((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId]
    );
  };

  useEffect(() => {
    if (isOpen && userId) {
      setIsLoading(true);
      Promise.all([getAllRoles(), getUserRoles(userId)]).finally(() =>
        setIsLoading(false)
      );
    }
  }, [isOpen, userId]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={`sm:max-w-[800px] max-h-[80vh] overflow-y-auto rtl ${vazir.className} flex flex-col`}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className="relative flex-1 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-blue-800 text-right">
              مدیریت نقش‌های کاربر
            </DialogTitle>
          </DialogHeader>

          <DialogClose
            className="absolute left-4 top-0 p-1 rounded-sm opacity-70 hover:bg-gray-100 disabled:pointer-events-none"
            disabled={isSaving || isBanning}
          ></DialogClose>

          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="animate-spin text-orange-500 h-8 w-8" />
            </div>
          ) : (
            <div className="space-y-3 py-4">
              {allRoles.map((role) => (
                <div key={role.id} className="flex items-center gap-3 p-2">
                  <input
                    type="checkbox"
                    id={`role-${role.id}`}
                    checked={userRoles.includes(role.id)}
                    onChange={() => handleRoleChange(role.id)}
                    className="w-5 h-5 text-orange-500 rounded focus:ring-orange-400 border-gray-300"
                  />
                  <label
                    htmlFor={`role-${role.id}`}
                    className="text-gray-700 cursor-pointer"
                  >
                    {role.name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sticky footer */}
        <div className="sticky bottom-0 bg-white pt-4 border-t">
          <DialogFooter className="grid grid-cols-2 gap-4 w-full">
            {/* Left-aligned buttons container */}
            <div className="flex justify-start">
              <Button
                onClick={handleBanAction}
                disabled={isLoading || isBanning}
                className={`px-4 py-2 rounded-lg ${
                  userStatus === "فعال"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isBanning && <Loader2 className="animate-spin h-4 w-4 ml-2" />}
                {userStatus === "فعال" ? "مسدود کردن" : "رفع انسداد"}
              </Button>
            </div>

            {/* Right-aligned button container */}
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  disabled={isSaving || isBanning}
                  className="bg-gray-300"
                >
                  انصراف
                </Button>
              </DialogClose>

              <Button
                onClick={saveRoles}
                disabled={isLoading || isSaving || isBanning}
                className="bg-orange-500 hover:bg-orange-600"
              >
                {isSaving && <Loader2 className="animate-spin h-4 w-4 ml-2" />}
                ذخیره تغییرات
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserRolesModal;
