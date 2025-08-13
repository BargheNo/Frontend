import LoadingOnButton from "@/components/Loading/LoadinOnButton/LoadingOnButton";
import { DivideIcon, Pencil, SquareCheckBig, Trash2, User } from "lucide-react";
import styles from "./RolesAndPermissions.module.css";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import useHasPermission from "@/src/functions/hasPermission";
import EditRoleModal from "./EditRoleModal";
import { deleteData } from "@/src/services/apiHub";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import { permission } from "process";

export default function RoleItem({
    role,
    getRoles,
    setLoading,
    allPermissions,
}: {
    role: any;
    getRoles: () => void;
    setLoading: any;
    allPermissions: Permission[];
}) {
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<boolean>(false);
    const { hasPermission: editRolePermission, permissionLoading1 } = useHasPermission("user.manageRolePermissions");
    const { hasPermission: removeRolePermission, permissionLoading2 } = useHasPermission("user.removeRole");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const deleteRole = async (roleToDeleteId: string) => {
        setLoading(true);
        setDeletingId(roleToDeleteId);
        deleteData({ endPoint: `/v1/admin/roles/${roleToDeleteId}` })
            .then((data) => {
                CustomToast(data?.message, "success");
                getRoles();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setDeletingId(null);
                setLoading(false);
            });
    };
    return (
        <div
            className={`w-full border-t-1 border-gray-300 first:border-t-0`}
            // className={`bg-white p-4 rounded-xl w-full shadow-sm flex items-center gap-3 rtl ${styles.shadow}`}
        >
            <div className="flex flex-col rtl justify-between content-center h-full gap-5 py-5 px-5 overflow-hidden relative border-t-1 border-gray-300 w-full first:border-t-0 min-h-[20px]">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-2">
                        <div className="text-orange-500">
                            <User />
                        </div>
                        <p className="text-start content-start  text-xl ">
                            {role?.name}
                        </p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <div className="text-orange-500">
                            <SquareCheckBig />
                        </div>
                        <div
                            className="content-start w-full flex gap-2 flex-wrap text-xl"
                            dir="rtl"
                        >
                            <p>دسترسی‌ها:</p>
                            {role?.permissions?.length === 0 ? (
                                <p>دسترسی موجود نیست</p>
                            ) : (
                                role?.permissions
                                    ?.filter(
                                        (
                                            permission: Permission,
                                            index: number
                                        ) => (expanded ? true : index < 5)
                                    )
                                    .map(
                                        (
                                            permission: Permission,
                                            index: number
                                        ) => (
                                            <Badge className="bg-fire-orange h-fit" key={index}>
                                                {permission?.description}
                                            </Badge>
                                        )
                                    )
                            )}
                            {role?.permissions?.length >= 5 && (
                                <Badge
                                    className="bg-fire-orange cursor-pointer h-fit"
                                    onClick={() => setExpanded(!expanded)}
                                >
                                    {expanded ? "<" : "..."}
                                </Badge> 
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row w-full h-full px-4 gap-4 rtl justify-end">
                    <Dialog open={editOpen} onOpenChange={setEditOpen}>
                        <DialogTrigger asChild>
                            {editRolePermission && (
                                <button
                                    // onClick={() => setCurrentRole(role)}
                                    className={`cta-neu-button cursor-pointer w-1/8 flex flex-row ${styles.button} items-center content-center justify-center h-1/2 w-1/2`}
                                >
                                    <p>تغییر</p>
                                    <Pencil className="text-orange-500" />
                                </button>
                            )}
                        </DialogTrigger>
                        <DialogContent
                            style={{
                                backgroundColor: "#F1F4FC",
                            }}
                            className="w-full sm:min-w-[750px] mx-auto no-scrollbar p-4 dialog-width overflow-auto pb-0 max-h-[90vh] h-[90vh] overflow-y-auto rtl"
                        >
                            <EditRoleModal
                                // editOpen={editOpen}
                                allPermissions={allPermissions}
                                setEditOpen={setEditOpen}
                                // onClose={() => setIsModalOpen(false)}
                                role={role}
                                onSaveSuccess={getRoles}
                            />
                        </DialogContent>
                    </Dialog>
                    {removeRolePermission && (
                        <button
                            className={`cta-neu-button flex cursor-pointer w-1/8 ${styles.button} items-center content-center justify-center h-1/2 w-1/2 cursor-pointer`}
                            onClick={() => deleteRole(role?.id)}
                            key={role?.id}
                        >
                            {deletingId === role?.id ? (
                                <LoadingOnButton />
                            ) : (
                                <>
                                    <p>حذف</p>
                                    <Trash2 className="text-orange-500" />
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
