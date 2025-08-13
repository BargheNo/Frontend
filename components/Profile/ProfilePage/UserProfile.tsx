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
} from "lucide-react";
import ProfilePicPicker from "@/components/Custom/ProfilePicPicker/ProfilePicPicker";
import { useEffect, useState } from "react";
// import { toast } from "sonner";
import { getData, putDataFile } from "@/src/services/apiHub";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header";

export interface ProfileData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    nationalID: string;
    profilePic: File | string | null;
    status: string;
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

const UserProfile = () => {
    const router = useRouter();
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = () => {
        getData({ endPoint: `/v1/user/profile` })
            .then((res) => {
                console.log(res);
                setProfileData(res?.data);
				setPreviewImage(res?.data?.profilePic)
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    };

    const getInitialValues = (): ProfileData => ({
        firstName: profileData?.firstName || "",
        lastName: profileData?.lastName || "",
        phone: profileData?.phone || "",
        // phone: profileData?.phone ? "0" + profileData.phone.slice(3, 13) : "",
        email: profileData?.email || "",
        nationalID: profileData?.nationalID || "",
        profilePic: profileData?.profilePic || null,
        status: profileData?.status || "",
    });

    // console.log(profileData);
    // console.log(getInitialValues());

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: File | null) => void
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            setFieldValue("profilePic", file);
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
            })
            .catch((err) => console.log(err));
    };

    const handleSubmit = async (values: ProfileData) => {
        try {
            if (!isEditable) {
                setIsEditable(true);
                return;
            }
            // TODO: Implement updateProfile function
            // setFieldValue("profilePic", )
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
            name: "firstName",
            type: "text",
            placeholder: "نام",
            icon: UserRound,
        },
        {
            name: "lastName",
            type: "text",
            placeholder: "نام خانوادگی",
            icon: IdCard,
        },
        {
            name: "phone",
            type: "text",
            placeholder: "شماره تلفن",
            icon: Phone,
        },
        {
            name: "email",
            type: "email",
            placeholder: "ایمیل",
            icon: Mail,
        },
        {
            name: "nationalID",
            type: "text",
            placeholder: "کد ملی",
            icon: IdCard,
        },
    ];

    return (
        <>
            <Header header="پروفایل کاربری" />
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
                                                    typeof profileData?.profilePic ===
                                                    "string"
                                                        ? profileData.profilePic
                                                        : null
                                                }
                                                isEditable={isEditable}
                                                onImageChange={
                                                    handleImageChange
                                                }
                                                onRemoveImage={() => {
                                                    setPreviewImage(null);
                                                    setFieldValue(
                                                        "profilePic",
                                                        null
                                                    );
                                                    setIsEditable(true);
                                                }}
                                                setFieldValue={setFieldValue}
                                                size="large"
                                            />
                                        </div>

                                        {inputFields.map((field) => (
                                            <CustomInput
                                                key={field.name}
                                                name={field.name}
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                icon={field.icon}
                                                containerClassName="w-full"
                                                disabled={
                                                    // field.name === "email" ||
                                                    field.name === "phone"
                                                        ? true
                                                        : !isEditable
                                                }
                                                // readOnly={field.name === "email" || field.name === "phone"}
                                                inputClassName={
                                                    !isEditable
                                                        ? "!bg-warm-white"
                                                        : ""
                                                }
                                            />
                                        ))}

                                        <div className="flex justify-between md:gap-0 gap-2">
                                            <Button
                                                type="button"
                                                className="px-4 py-2 font-black active:brightness-90 flex justify-center w-fit gap-4 min-w-28  place-content-center cursor-pointer gradient-blue text-white rounded-md transition-all duration-300"
                                                onClick={() =>
                                                    router.push(
                                                        "/reset-password"
                                                    )
                                                }
                                            >
                                                <p>تغییر رمز عبور</p>
                                                <KeyRound />
                                            </Button>
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
                                            {/* <button
									type="submit"
									className={`px-4 py-2 flex justify-center w-fit gap-4 !rounded-lg ${
										isEditable
											? "red-circle-button active:brightness-90"
											: "cta-neu-button"
									} !text-lg h-12 font-black`}
								>
									{isEditable
										? "ذخیره تغییرات"
										: "ویرایش اطلاعات"}
									{isEditable ? <Save /> : <Edit />}
								</button> */}
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

export default UserProfile;
