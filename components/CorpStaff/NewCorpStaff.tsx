"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Loader2, Vote, Check, UserRoundCog, Phone } from "lucide-react";
import { useSelector } from "react-redux";
import styles from "./NewStaff.module.css";

import * as Yup from "yup";
import { Form, Formik, FieldArray } from "formik";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import AddComponent from "@/components/AddComponent/AddComponent";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import LoadingOnButton from "@/components/Loading/LoadinOnButton/LoadingOnButton";
import { getData, postData } from "@/src/services/apiHub";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import StickyFooter from "@/components/Dialog/StickyFooter/StickyFooter";
import SubmitButton from "@/components/Dialog/SubmitButton/SubmitButton";
import CancelButton from "@/components/Dialog/CancelButton/CancelButton";
import { Button } from "../ui/button";

type Permission = {
    id: number;
    name: string;
    description: string;
    category: string;
};

const initialValuesForm = { phone: "", permissionIDs: [] };

const validationSchemaForm = Yup.object({
    phone: Yup.string()
        .required("شماره تلفن الزامی است")
        .length(10, "شماره تلفن را بدون 0 وارد کنید"),
    permissionIDs: Yup.array().of(Yup.number()),
});

interface CreateRoleModalProps {
    // isOpen: boolean;
    // onClose: () => void;
    onSaveSuccess: () => void;
}

interface Role {
    id: number;
    name: string;
    permissions: Permission[];
}

const NewCorpStaff: React.FC<CreateRoleModalProps> = ({
    // isOpen,
    // onClose,
    onSaveSuccess,
}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>(
        []
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [roleName, setRoleName] = useState("");
    const [loadingRoles, setLoadingRoles] = useState(false);
    const [allRoles, setAllRoles] = useState<Role[]>([]);
    const [userRoles, setUserRoles] = useState<number[]>([]);
    const corpId = useSelector((state: RootState) => state.user.corpId);
    const handleRoleChange = (roleId: number) => {
        setUserRoles((prev) =>
            prev.includes(roleId)
                ? prev.filter((id) => id !== roleId)
                : [...prev, roleId]
        );
    };
    const getAllPermissions = async () => {
        getData({
            endPoint: `/v1/admin/permissions`,
            params: { pageSize: 1000000 },
        })
            .then((data) => {
                setAllPermissions(data?.data?.data);
            })
            .catch((err) => console.log(err));
    };

    const getAllRoles = useCallback(() => {
        setLoadingRoles(true);
        getData({ endPoint: `/v1/corp/${corpId}/staff/roles` })
            .then((data) => {
                setAllRoles(data?.data?.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoadingRoles(false));
    }, [corpId]);

    useEffect(() => {
        getAllRoles();
    }, [getAllRoles]);

    // Create new role
    const NewStaff = async (values: any) => {
        console.log(values);
        // if (!roleName.trim()) {
        if (values.phone === "") {
            CustomToast("لطفا شماره تلفن را وارد کنید", "warning");
            return;
        }

        setIsSaving(true);
        const formData = {
            phone: "+98" + values.phone,
            roleIDs: userRoles,
        };
        console.log(formData);
        postData({ endPoint: `/v1/corp/${corpId}/staff`, data: formData })
            .then((data) => {
                CustomToast(data?.message, "success");
                onSaveSuccess();
                setRoleName("");
                setSelectedPermissions([]);
                setOpen(false);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsSaving(false));
    };

    // Load permissions when modal opens
    // useEffect(() => {
    // 	if (isOpen) {
    // 		setIsLoading(true);
    // 		getAllPermissions().finally(() => setIsLoading(false));
    // 	}
    // }, [isOpen]);

    // Group permissions by category
    const permissionsByCategory = allPermissions?.reduce((acc, permission) => {
        if (!acc[permission.category]) {
            acc[permission.category] = [];
        }
        acc[permission.category].push(permission);
        return acc;
    }, {} as Record<string, Permission[]>);

    useEffect(() => {
        getAllPermissions();
        // console.log("allPermissions", allPermissions);
    }, []);
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        permissionId: number,
        push: any,
        remove: any
    ) => {
        // setFieldValue("");
        if (e.target.checked) {
            push(permissionId);
        } else {
            remove(permissionId);
        }
    };
    // if (!isOpen) return null;
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <AddComponent title="افزودن عضو جدید" />
                    {/* <div
                        className={`bg-white ${styles.button} text-[#FA682D] flex gap-2 items-center p-2 hover:cursor-pointer`}
                    >
                        <AddComponent title="افزودن عضو جدید" />
                    </div> */}
                </DialogTrigger>
                <DialogContent
                    className={`max-h-[80vh] overflow-y-auto no-scrollbar rtl vazir dialog-width flex flex-col pb-0`}
                >
                    <Formik
                        initialValues={initialValuesForm}
                        validationSchema={validationSchemaForm}
                        onSubmit={(values) => NewStaff(values)}
                    >
                        <Form>
                            <div className="relative flex-1 overflow-y-auto no-scrollbar">
                                <DialogHeader>
                                    <DialogTitle className="text-blue-800 text-right">
                                        افزودن عضو جدید
                                    </DialogTitle>
                                </DialogHeader>
                                <CustomInput
                                    name="phone"
                                    placeholder="تلفن عضو جدید"
                                    icon={Phone}
                                    inputClassName="bg-white"
                                />
                                {loadingRoles ? (
                                    <div className="flex justify-center items-center">
                                        <LoadingSpinner className="w-full h-full" />
                                        {/* <Loader2 className="animate-spin text-orange-500 h-8 w-8" /> */}
                                    </div>
                                ) : (
                                    <div className="space-y-3 py-4">
                                        {allRoles?.map((role) => (
                                            <div
                                                key={role.id}
                                                className="flex items-center gap-3 p-2"
                                            >
                                                <div className="relative">
                                                    <input
                                                        name={`role-${role.id}`}
                                                        type="checkbox"
                                                        onChange={() =>
                                                            handleRoleChange(
                                                                role.id
                                                            )
                                                        }
                                                        className={`peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-[#2979FF] checked:border-blue-500 mt-0.5`}
                                                    />
                                                    <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3 text-white opacity-0 pointer-events-none peer-checked:opacity-100 w-4.5 h-4.5 " />
                                                </div>
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
                            <StickyFooter>
                                <div className="flex justify-end gap-2 md:mt-0 mt-12">
                                    <CancelButton />
                                    <SubmitButton loading={isSaving}>
                                        افزودن عضو
                                    </SubmitButton>
                                    {/* <Button
                                        className="bg-orange-500 cursor-pointer hover:bg-orange-600 min-w-28"
                                    >
                                        {isSaving ? (
                                            <LoadingOnButton />
                                        ) : (
                                            <p>افزودن عضو</p>
                                        )}
                                    </Button> */}
                                </div>
                            </StickyFooter>
                        </Form>
                    </Formik>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default NewCorpStaff;
