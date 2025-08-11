"use client";
import React, { useEffect, useState } from "react";
import { Loader2, Vote, Check, UserRoundCog } from "lucide-react";
import { useSelector } from "react-redux";
import styles from "./RolesAndPermissions.module.css";

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

type Permission = {
    id: number;
    name: string;
    description: string;
    category: string;
};

const initialValuesForm = { name: "", permissionIDs: [] };

const validationSchemaForm = Yup.object({
    name: Yup.string().required("نام نقش الزامی است"),
    permissionIDs: Yup.array().of(Yup.number()),
});

interface CreateRoleModalProps {
    // isOpen: boolean;
    // onClose: () => void;
    onSaveSuccess: () => void;
}

const CreateRoleModal: React.FC<CreateRoleModalProps> = ({
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

    // Create new role
    const createRole = async (values: any) => {
        console.log(values);
        // if (!roleName.trim()) {
        if (values.name === "") {
            CustomToast("نام نقش نمی‌تواند خالی باشد", "warning");
            return;
        }

        setIsSaving(true);
        const formData = values;
        console.log(formData);
        postData({ endPoint: `/v1/admin/roles`, data: formData })
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
                <DialogTrigger asChild>
                    <AddComponent title="افزودن نقش" />
                </DialogTrigger>
                <DialogContent
                    style={{ backgroundColor: "#F1F4FC" }}
                    className="w-full sm:min-w-[750px] mx-auto no-scrollbar p-4 overflow-auto pb-0 max-h-[90vh] h-[90vh] overflow-y-auto rtl"
                >
                    <Formik
                        initialValues={initialValuesForm}
                        validationSchema={validationSchemaForm}
                        onSubmit={(values) => createRole(values)}
                    >
                        <Form>
                            <DialogHeader>
                                <DialogTitle className="flex justify-center items-end font-bold my-3">
                                    افزودن نقش جدید
                                </DialogTitle>
                            </DialogHeader>

                            {isLoading ? (
                                <div className="flex justify-center items-center">
                                    <LoadingSpinner />
                                </div>
                            ) : (
                                <div className="flex flex-col gap-6 relative flex-1 overflow-y-auto no-scrollbar">
                                    <CustomInput
                                        name="name"
                                        placeholder="نام نقش"
                                        icon={UserRoundCog}
                                        inputClassName="bg-white"
                                    />
                                    <div className="space-y-6">
                                        <FieldArray name="permissionIDs">
                                            {({ push, remove }) => (
                                                <>
                                                    {Object.entries(
                                                        permissionsByCategory
                                                    ).map(
                                                        ([
                                                            category,
                                                            permissions,
                                                        ]) => (
                                                            <div
                                                                key={category}
                                                                className={`bg-white p-4 rounded-xl w-full shadow-sm items-center gap-3 rtl ${styles.shadow} min-h-[140px]`}
                                                            >
                                                                <h4 className="text-lg text-orange-500 font-semibold mb-3 flex items-center gap-2">
                                                                    <Vote />
                                                                    {category}
                                                                </h4>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                    {permissions.map(
                                                                        (
                                                                            permission,
                                                                            index
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    index
                                                                                }
                                                                                className="flex items-center gap-2"
                                                                            >
                                                                                <div className="relative">
                                                                                    <input
                                                                                        name={`permissionIDs.[${permission.id}]`}
                                                                                        type="checkbox"
                                                                                        onChange={(
                                                                                            e
                                                                                        ) =>
                                                                                            handleChange(
                                                                                                e,
                                                                                                permission.id,
                                                                                                push,
                                                                                                remove
                                                                                            )
                                                                                        }
                                                                                        className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-[#2979FF] checked:border-blue-500 mt-0.5"
                                                                                    />
                                                                                    <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3 text-white opacity-0 pointer-events-none peer-checked:opacity-100 w-4.5 h-4.5 " />
                                                                                </div>
                                                                                <label
                                                                                    htmlFor={`perm-${permission.id}`}
                                                                                    className="text-gray-700"
                                                                                >
                                                                                    {
                                                                                        permission.description
                                                                                    }
                                                                                </label>
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </>
                                            )}
                                        </FieldArray>
                                    </div>
                                </div>
                            )}
                            <StickyFooter>
                                <CancelButton />
                                <SubmitButton loading={isSaving}>
                                    ایجاد نقش
                                </SubmitButton>
                            </StickyFooter>
                        </Form>
                    </Formik>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CreateRoleModal;
