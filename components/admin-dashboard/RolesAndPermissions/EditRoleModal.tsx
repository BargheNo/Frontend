"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Vote, UserRoundCog, Check } from "lucide-react";
import { useSelector } from "react-redux";
import styles from "./RolesAndPermissions.module.css";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";

import * as Yup from "yup";
import { Form, Formik, FieldArray } from "formik";
import {
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import LoadingOnButton from "@/components/Loading/LoadinOnButton/LoadingOnButton";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import { getData, putData } from "@/src/services/apiHub";
import StickyFooter from "@/components/Dialog/StickyFooter/StickyFooter";
import CancelButton from "@/components/Dialog/CancelButton/CancelButton";
import SubmitButton from "@/components/Dialog/SubmitButton/SubmitButton";

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
    // isOpen?: boolean;
    // editOpen?: boolean;
    setEditOpen?: any;
    // onClose: () => void;
    role: Role | null;
    onSaveSuccess: () => void;
    allPermissions: Permission[];
}

const EditRoleModal: React.FC<EditRoleModalProps> = ({
    // role,
    // editOpen,
    // onClose,
    allPermissions,
    setEditOpen,
    role,
    onSaveSuccess,
}) => {
    // const { setFieldValue } = useFormikContext<MyFormValues>();
    // const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>(
        role?.permissions?.map((perm) => perm?.id) ?? []
    );
    // const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [roleName, setRoleName] = useState(role?.name || "");

    // const initialValuesForm = {
    // 	name: role?.name || "",
    // 	permissionIDs: [],
    // };
    const initialValuesForm = useMemo(
        () => ({
            name: role?.name || "",
            permissionIDs: selectedPermissions, // <- use fetched permissions
        }),
        [role?.name, selectedPermissions]
    );

    const validationSchemaForm = Yup.object({
        name: Yup.string().required("نام نقش الزامی است"),
        permissionIDs: Yup.array().of(Yup.number()),
    });

    // Fetch all available permissions
    // const getAllPermissions = async () => {
    // 	getData({ endPoint: `/v1/admin/permissions` })
    // 		.then((data) => {

    // 			// console.log(data?.data);
    // 			setAllPermissions(data?.data?.data);
    // 		})
    // 		.catch((err) => console.log(err));
    // };

    // Fetch permissions for the current role
    // const getRolePermissions = async (roleId: string | undefined) => {
    // 	if (!roleId) return;
    // 	// setIsLoading(true);
    // 	getData({ endPoint: `/v1/admin/roles/${roleId}` })
    // 		.then((data) => {
    // 			const permissionIds = data.data.permissions.map(
    // 				(p: Permission) => p.id
    // 			);
    // 			setSelectedPermissions(permissionIds);
    // 			setIsLoading(false);
    // 		})
    // 		.catch((err) => console.log(err));
    // 	// .finally(() => setIsLoading(false));
    // };

    // Save updated permissions
    const savePermissions = async (values: EditRoleTypes) => {
        if (!role) return;
        setEditOpen(true);
        setIsSaving(true);
        const formData = {
            name: values.name,
            permissionIDs: values.permissionIDs,
        };
        putData({
            endPoint: `/v1/admin/roles/${role.id}`,
            data: formData,
        })
            .then((data) => {
                CustomToast(data?.message, "success");
                setEditOpen(false);
                onSaveSuccess();
                // onClose();
            })
            .catch((err) => {
                console.log(err);
                setEditOpen(false);
            })
            .finally(() => setIsSaving(false));
    };

    // Group permissions by category
    const permissionsByCategory = allPermissions?.reduce((acc, permission) => {
        if (!acc[permission.category]) {
            acc[permission.category] = [];
        }
        acc[permission.category].push(permission);
        return acc;
    }, {} as Record<string, Permission[]>);

    // useEffect(() => {
    // 	const fetchPermissions = async (role: any) => {
    // 		if (!role) return;

    // 		setIsLoading(true);
    // 		getAllPermissions();
    // 		getRolePermissions(role.id);
    // 		// await Promise.all([
    // 		// 	getAllPermissions(),
    // 		// 	getRolePermissions(role.id),
    // 		// ]);

    // 		// setIsLoading(false);
    // 	};

    // 	fetchPermissions(role);
    // }, [role]);

    // useEffect(() => {
    // 	const fetchPermissions = async (role: any) => {
    // 		if (role) {
    // 			setIsLoading(true);
    // 			setRoleName(role.name);
    // 			Promise.all([
    // 				getAllPermissions(),
    // 				getRolePermissions(role?.id),
    // 				getRolePermissions(role.id),
    // 			])
    // 			.finally(() => setIsLoading(false));
    // 			// await getAllPermissions();
    // 			// await getRolePermissions(role?.id);
    // 			// await getRolePermissions(role.id);
    // 			// setIsLoading(false);
    // 		}
    // 	};
    // 	fetchPermissions(role);
    // }, [role]);
    // useEffect(() => {
    // 	const fetchAllPermissions = async () => {
    // 		if (role) {
    // 			setIsLoading(true);
    // 			await getAllPermissions();
    // 			await getRolePermissions(role?.id);
    // 			setIsLoading(false);
    // 		}
    // 	};
    // 	fetchAllPermissions();
    // 	// setIsLoading(true);
    // 	// Promise.all([
    // 	// 	getAllPermissions(),
    // 	// 	getRolePermissions(role?.id),
    // 	// ]).finally(() => setIsLoading(false));
    // }, []);
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        permissionId: number,
        push: any,
        remove: any
    ) => {
        // setFieldValue("");
        if (e.target.checked) {
            setSelectedPermissions(() => [
                permissionId,
                ...selectedPermissions,
            ]);
            push(permissionId);
        } else {
            remove(permissionId);
            setSelectedPermissions(() =>
                selectedPermissions.filter((item) => item != permissionId)
            );
        }
    };
    return (
        <Formik
            initialValues={initialValuesForm}
            enableReinitialize
            validationSchema={validationSchemaForm}
            onSubmit={(values) => savePermissions(values)}
        >
            <Form className="flex flex-col gap-4">
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-end font-bold mt-3.5">
                        افزودن نقش جدید
                    </DialogTitle>
                </DialogHeader>

                {/* {isLoading ? (
                    <LoadingSpinner className="h-full" />
                ) : ( */}
                <div className="flex flex-col gap-6 relative flex-1 overflow-y-auto no-scrollbar">
                    <CustomInput
                        name="name"
                        placeholder="نام نقش"
                        icon={UserRoundCog}
                        inputClassName="bg-white"
                        autoFocus
                    />
                    <div className="space-y-6">
                        <FieldArray name="permissionIDs">
                            {({ push, remove }) => (
                                <>
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
                                                    {permissions.map(
                                                        (permission, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <div className="relative">
                                                                    <input
                                                                        name={`permissionIDs.[${permission.id}]`}
                                                                        type="checkbox"
                                                                        defaultChecked={selectedPermissions.includes(
                                                                            permission.id
                                                                        )}
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
                {/* )} */}
                <StickyFooter>
                    <CancelButton />
                    <SubmitButton loading={isSaving}>
                        ذخیره تغییرات
                    </SubmitButton>
                </StickyFooter>
            </Form>
        </Formik>
    );
};

export default EditRoleModal;
