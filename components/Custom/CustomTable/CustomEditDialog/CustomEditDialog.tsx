import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PenBox } from "lucide-react";
import { putData, getData } from "@/src/services/apiHub";
import { useSelector } from "react-redux";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { CustomDatePicker } from "@/components/Custom/CustomDatePicker/CustomDatePicker";
import StickyFooter from "@/components/Dialog/StickyFooter/StickyFooter";
import CancelButton from "@/components/Dialog/CancelButton/CancelButton";
import SubmitButton from "@/components/Dialog/SubmitButton/SubmitButton";

// Field type definitions
export interface FieldConfig {
    name: string;
    label: string;
    type:
        | "text"
        | "number"
        | "textarea"
        | "select"
        | "date"
        | "email"
        | "password";
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    icon?: LucideIcon;
    validation?: Yup.Schema<any>;
    selectOptions?: Array<{ value: string | number; label: string }>;
    selectApiEndpoint?: string; // For dynamic select options
    maxLength?: number;
    min?: number;
    max?: number;
    containerClassName?: string;
    inputClassName?: string;
}

export interface CustomEditDialogProps {
    // Data and configuration
    rowData: Record<string, any>;
    fields: FieldConfig[];
    entityName: string;

    // API configuration
    updateApiUrl: string; // e.g., "/v1/corp/:corpId/entity/:id"
    corpId?: string | number;

    // Callbacks
    onSuccess?: (updatedData: any) => void;
    onError?: (error: any) => void;
    fetchData?: () => void;

    // UI customization
    triggerComponent?: React.ReactNode;
    dialogTitle?: string;
    dialogClassName?: string;
}

// Helper function to generate validation schema
const generateValidationSchema = (fields: FieldConfig[]) => {
    const shape: Record<string, Yup.Schema<any>> = {};

    fields.forEach((field) => {
        let validator: Yup.Schema<any>;

        // Base validation based on type
        switch (field.type) {
            case "number":
                validator = Yup.number();
                if (field.min !== undefined)
                    validator = validator.min(field.min);
                if (field.max !== undefined)
                    validator = validator.max(field.max);
                break;
            case "email":
                validator = Yup.string().email("ایمیل معتبر نیست");
                break;
            case "date":
                validator = Yup.string();
                break;
            default:
                validator = Yup.string();
                if (field.maxLength)
                    validator = validator?.max(
                        field.maxLength,
                        `حداکثر ${field.maxLength} کاراکتر مجاز است`
                    );
        }

        // Add required validation
        if (field.required) {
            validator = validator.required(`${field.label} الزامی است`);
        }

        // Use custom validation if provided
        if (field.validation) {
            validator = field.validation;
        }

        shape[field.name] = validator;
    });

    return Yup.object().shape(shape);
};

// Helper function to prepare initial values
const prepareInitialValues = (
    rowData: Record<string, any>,
    fields: FieldConfig[]
) => {
    const initialValues: Record<string, any> = {};

    fields.forEach((field) => {
        let value = rowData[field.name];

        // Handle nested objects (e.g., address.city)
        if (field.name.includes(".")) {
            const keys = field.name.split(".");
            value = keys.reduce((obj, key) => obj?.[key], rowData);
        }

        // Set default values based on type
        initialValues[field.name] = value ?? (field.type === "number" ? 0 : "");
    });

    return initialValues;
};

// Helper function to prepare form data for API
const prepareFormData = (
    values: Record<string, any>,
    fields: FieldConfig[]
) => {
    const formData: Record<string, any> = {};

    fields.forEach((field) => {
        let value = values[field.name];

        // Convert types as needed
        if (field.type === "number" && value !== "") {
            value = Number(value);
        }

        // Handle nested objects
        if (field.name.includes(".")) {
            const keys = field.name.split(".");
            let current = formData;

            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) {
                    current[keys[i]] = {};
                }
                current = current[keys[i]];
            }

            current[keys[keys.length - 1]] = value;
        } else {
            formData[field.name] = value;
        }
    });

    return formData;
};

const CustomEditDialog: React.FC<CustomEditDialogProps> = ({
    rowData,
    fields,
    entityName,
    updateApiUrl,
    corpId,
    onSuccess,
    onError,
    fetchData,
    triggerComponent,
    dialogTitle,
    dialogClassName = "w-full pb-0 max-h-[90vh] no-scrollbar mx-auto overflow-auto rtl dialog-width",
}) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectOptions, setSelectOptions] = useState<Record<string, any[]>>(
        {}
    );
    const reduxCorpId = useSelector((state: any) => state.user?.corpId);

    const finalCorpId = corpId || reduxCorpId;
    const validationSchema = generateValidationSchema(fields);
    const initialValues = prepareInitialValues(rowData, fields);

    // Load select options on mount
    useEffect(() => {
        const loadSelectOptions = async () => {
            const optionsToLoad = fields.filter(
                (field) => field.selectApiEndpoint
            );

            for (const field of optionsToLoad) {
                try {
                    const endpoint = field.selectApiEndpoint!.replace(
                        ":corpId",
                        String(finalCorpId)
                    );
                    const response = await getData({ endPoint: endpoint });

                    setSelectOptions((prev) => ({
                        ...prev,
                        [field.name]: response?.data || [],
                    }));
                } catch (error) {
                    console.error(
                        `Error loading options for ${field.name}:`,
                        error
                    );
                }
            }
        };

        if (open) {
            loadSelectOptions();
        }
    }, [open, fields, finalCorpId]);

    const handleSubmit = async (values: Record<string, any>) => {

        setLoading(true);

        try {
            const formData = prepareFormData(values, fields);
            const endpoint = updateApiUrl
                .replace(":corpId", String(finalCorpId))
                .replace(":id", String(rowData.id));

            const response = await putData({
                endPoint: endpoint,
                data: formData,
            });

            CustomToast(
                response?.message || "اطلاعات با موفقیت به‌روزرسانی شد",
                "success"
            );
            setOpen(false);

            if (onSuccess) {
                onSuccess(response);
            }

            if (fetchData) {
                fetchData();
            }
        } catch (error) {
            console.error("Update error:", error);
            CustomToast("خطا در به‌روزرسانی اطلاعات", "error");

            if (onError) {
                onError(error);
            }
        } finally {
            setLoading(false);
        }
    };

    const renderField = (
        field: FieldConfig,
        values: Record<string, any>,
        setFieldValue: (name: string, value: any) => void,
        errors: Record<string, any>,
        touched: Record<string, any>
    ) => {
        const hasError = errors[field.name] && touched[field.name];
        const errorClassName = hasError
            ? "!border-red-500 !ring-1 !ring-red-700"
            : "";
        const isDisabled = field.disabled;

        switch (field.type) {
            case "textarea":
                return (
                    <CustomTextArea
                        key={field.name}
                        placeholder={field.placeholder || field.label}
                        name={field.name}
                        icon={field.icon}
                        disabled={isDisabled}
                        containerClassName={
                            field.containerClassName || "w-full"
                        }
                        inputClassName={`${
                            field.inputClassName || ""
                        } ${errorClassName}`}
                    />
                );

            case "select":
                const options =
                    field.selectOptions || selectOptions[field.name] || [];
                return (
                    <div
                        key={field.name}
                        className={field.containerClassName || "w-full"}
                    >
                        <Select
                            name={field.name}
                            disabled={isDisabled}
                            value={String(values[field.name] || "")}
                            onValueChange={(value) =>
                                setFieldValue(field.name, value)
                            }
                        >
                            <SelectTrigger
                                className={`mt-[27px] min-h-[43px] cursor-pointer ${errorClassName}`}
                            >
                                <SelectValue
                                    placeholder={
                                        field.placeholder || field.label
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>{field.label}</SelectLabel>
                                    {options.map(
                                        (option: any, index: number) => (
                                            <SelectItem
                                                key={index}
                                                value={String(
                                                    option.value || option.id
                                                )}
                                                className="cursor-pointer"
                                            >
                                                {option.label ||
                                                    option.name ||
                                                    option.title}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                );

            case "date":
                return (
                    <div
                        key={field.name}
                        className={field.containerClassName || "w-full"}
                    >
                        <CustomDatePicker
                            placeholder={field.placeholder || field.label}
                            disabled={isDisabled}
                            date={values[field.name]}
                            setDate={(date: string) =>
                                setFieldValue(field.name, date)
                            }
                        />
                    </div>
                );

            default:
                return (
                    <CustomInput
                        key={field.name}
                        placeholder={field.placeholder || field.label}
                        name={field.name}
                        icon={field.icon}
                        type={field.type}
                        disabled={isDisabled}
                        containerClassName={
                            field.containerClassName || "w-full"
                        }
                        inputClassName={`${
                            field.inputClassName || ""
                        } ${errorClassName}`}
                        autoFocus={field.name === fields[0]?.name}
                    />
                );
        }
    };

    const defaultTrigger = (
        <div className="flex items-center cursor-pointer">
            <PenBox className="text-blue-600 mr-2 h-4 w-4" />
            <p>ویرایش</p>
        </div>
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {triggerComponent || defaultTrigger}
            </DialogTrigger>
            <DialogContent
                style={{ backgroundColor: "#F1F4FC" }}
                className={dialogClassName}
            >
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-end font-bold mt-3.5">
                        {dialogTitle || `ویرایش ${entityName}`}
                    </DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ values, setFieldValue, errors, touched }) => (
                        <Form className="w-full flex flex-col gap-6">
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                                {fields.map((field) =>
                                    renderField(
                                        field,
                                        values,
                                        setFieldValue,
                                        errors,
                                        touched
                                    )
                                )}
                            </div>

                            <StickyFooter>
                                <div className="flex gap-1 justify-end w-full">
                                    <CancelButton />
                                    <SubmitButton loading={loading}>
                                        ذخیره تغییرات
                                    </SubmitButton>
                                </div>
                            </StickyFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default CustomEditDialog;
