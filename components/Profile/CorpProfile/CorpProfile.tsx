"use client";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import {
    Edit,
    IdCard,
    Phone,
    Mail,
    UserRound,
    Save,
    KeyRound,
    CheckCircle,
    Loader2,
    FileText,
    CreditCard,
} from "lucide-react";
import ProfilePicPicker from "@/components/Custom/ProfilePicPicker/ProfilePicPicker";
import { useCallback, useEffect, useState } from "react";
// import { toast } from "sonner";
import { getData, putDataFile, postData } from "@/src/services/apiHub";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header";
import { useSelector } from "react-redux";

// For the object inside the 'signatories' array
export interface Signatory {
    id: number;
    name: string;
    nationalCardNumber: string;
    position: string;
}

// For the 'contactType' object inside the 'contactInfo' array
export interface ContactType {
    id: number;
    name: string;
}

// For the object inside the 'contactInfo' array
export interface ContactInfo {
    id: number;
    contactType: ContactType;
    value: string;
}

// For the object inside the 'addresses' array
export interface Address {
    id: number;
    province: string;
    provinceID: number;
    cityID: number;
    city: string;
    streetAddress: string;
    postalCode: string;
    houseNumber: string;
    unit: number;
}

// The main interface for the entire JSON structure
export interface Corporation {
    id?: number;
    name?: string;
    registrationNumber?: string;
    nationalID?: string;
    iban?: string;
    logo?: string | null;
    vatTaxpayerCertificate?: string;
    officialNewspaperAD?: string;
    signatories?: Signatory[];
    contactInfo?: ContactInfo[];
    addresses?: Address[];
}

const validationSchema = Yup.object({
    firstName: Yup.string().required("نام الزامی است").nullable(),
    lastName: Yup.string().required("نام خانوادگی الزامی است"),
    phone: Yup.string().required("شماره تلفن الزامی است"),
    email: Yup.string().email("ایمیل نامعتبر است").nullable(),
    nationalCode: Yup.string()
        .min(10, "کد ملی باید ده رفم باشد.")
        .max(10, "کد ملی باید ده رفم باشد.")
        .nullable(),
});

const CorpProfile = () => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [profileData, setProfileData] = useState<Corporation | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditable, setIsEditable] = useState(false);
    const corpId = useSelector((state: RootState) => state.user.corpId);

    const fetchProfileData = useCallback(() => {
        getData({ endPoint: `/v1/corp/${corpId}/profile` })
            .then((res) => {
                console.log(res);
                setProfileData(res?.data);
                setPreviewImage(res?.data?.logo);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }, [corpId]);

    useEffect(() => {
        fetchProfileData();
    }, [fetchProfileData]);

    const getInitialValues = (): Corporation => ({
        name: profileData?.name || "",
        registrationNumber: profileData?.registrationNumber || "",
        nationalID: profileData?.nationalID || "",
        logo: profileData?.logo || null,
        iban: profileData?.iban || "",
    });

    // console.log(profileData);
    // console.log(getInitialValues());

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: File | null) => void
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            setFieldValue("logo", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const updateProfile = async (values: object) => {
        putDataFile({
            endPoint: `/v1/user/profile`,
            formData: values,
        })
            .then((data) => {
                CustomToast(data?.message, "success");
                // Refresh the page after successful profile update
                window.location.reload();
            })
            .catch((err) => console.log(err));
    };

    const handleSubmit = async (values: Corporation) => {
        try {
            if (!isEditable) {
                setIsEditable(true);
                return;
            }
            // TODO: Implement updateProfile function
            // setFieldValue("logo", )
            updateProfile(values);
            // console.log(values);
            setProfileData(values);
            setIsEditable(false);
        } catch (error) {
            console.log("Error updating profile:", error);
            // toast.error("خطا در بروزرسانی اطلاعات");
            // CustomToast("خطا در بروزرسانی اطلاعات", "error");
        }
    };

    const inputFields = [
        {
            name: "name",
            type: "text",
            placeholder: "نام شرکت",
            icon: UserRound,
        },
        {
            name: "nationalID",
            type: "text",
            placeholder: "شناسه ملی",
            icon: IdCard,
        },
        {
            name: "registrationNumber",
            type: "text",
            placeholder: "شماره ثبت",
            icon: FileText,
        },
        {
            name: "iban",
            type: "text",
            placeholder: "شماره شبا",
            icon: CreditCard,
        },
    ];

    return (
        <>
            <div
                // className={`vazir w-full mx-auto min-h-full flex flex-col gap-8 text-white bg-transparent relative`}
                className={`vazir lg:w-[40vw] w-full mx-auto min-h-full flex flex-col gap-8 text-white py-4 md:py-8 px-3 md:px-14 bg-transparent relative`}
            >
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="flex justify-center items-center">
                        <div className="p-6 w-full neu-container">
                            <Formik
                                initialValues={getInitialValues()}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                                enableReinitialize
                            >
                                {({ setFieldValue }) => (
                                    <Form className="space-y-4">
                                        <div className="flex justify-center mb-10">
                                            <ProfilePicPicker
                                                previewImage={previewImage}
                                                existingImage={
                                                    typeof profileData?.logo ===
                                                    "string"
                                                        ? profileData.logo
                                                        : null
                                                }
                                                isEditable={isEditable}
                                                onImageChange={
                                                    handleImageChange
                                                }
                                                onRemoveImage={() => {
                                                    setPreviewImage(null);
                                                    setFieldValue("logo", null);
                                                    setIsEditable(true);
                                                }}
                                                setFieldValue={setFieldValue}
                                                size="large"
                                            />
                                        </div>

                                        {inputFields.map((field) => (
                                            <div key={field.name}>
                                                <div className="relative">
                                                    <CustomInput
                                                        name={field.name}
                                                        type={field.type}
                                                        placeholder={
                                                            field.placeholder
                                                        }
                                                        icon={field.icon}
                                                        containerClassName="w-full"
                                                        inputClassName={
                                                            !isEditable
                                                                ? "!bg-warm-white"
                                                                : ""
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        ))}

                                        <div className="flex justify-between md:gap-0 gap-2">
                                            <Button
                                                type="submit"
                                                className="px-4 py-2 font-black active:brightness-90 flex justify-center w-fit gap-4 min-w-28 place-content-center cursor-pointer gradient-green text-white rounded-md transition-all duration-300"
                                            >
                                                {isEditable
                                                    ? "ذخیره تغییرات"
                                                    : "ویرایش اطلاعات"}
                                                {isEditable ? (
                                                    <Save />
                                                ) : (
                                                    <Edit />
                                                )}
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CorpProfile;
