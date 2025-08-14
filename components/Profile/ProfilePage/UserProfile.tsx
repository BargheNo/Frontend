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
} from "lucide-react";
import ProfilePicPicker from "@/components/Custom/ProfilePicPicker/ProfilePicPicker";
import { useEffect, useState } from "react";
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

export interface ProfileData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    nationalID: string;
    profilePic: File | string | null;
    status: string;
    emailVerified: boolean;
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
    const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false);
    const [otp, setOtp] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);

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
        emailVerified: profileData?.emailVerified || false,
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
                // Refresh the page after successful profile update
                window.location.reload();
            })
            .catch((err) => console.log(err));
    };

    const sendVerificationEmail = async () => {
        try {
            // await postData({
            //     endPoint: `/v1/user/profile/verify/email`,
            //     data: {},
            // });
            CustomToast("کد تایید به ایمیل شما ارسال شده است.", "success");
            setIsVerificationDialogOpen(true);
        } catch (error) {
            console.log("Error sending verification email:", error);
            CustomToast("خطا در ارسال کد تایید", "error");
        }
    };

    const verifyEmail = async () => {
        if (otp.length !== 6) {
            CustomToast("کد تایید باید 6 رقم باشد", "error");
            return;
        }

        setIsVerifying(true);
        await postData({
            endPoint: `/v1/user/profile/verify/email`,
            data: {
                email: profileData?.email,
                    otp: otp
                 },
            }).then(() => {
                CustomToast("ایمیل شما با موفقیت تایید شد", "success");
                setIsVerificationDialogOpen(false);
                setOtp("");
                fetchProfileData();
            }).catch((error) => {
                console.log("Error verifying email:", error);
                CustomToast("کد تایید نامعتبر است", "error");
            }).finally(() => {
                setIsVerifying(false);
            });
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
                                            <div key={field.name}>
                                                <div className="relative">
                                                    <CustomInput
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
                                                    {/* Email verification status indicator */}
                                                    {field.name === "email" && profileData?.emailVerified && !isEditable && (
                                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <div className="h-4 w-4 rounded-full green-status shadow-md flex items-center justify-center">
                                                                    </div>
                                                                </TooltipTrigger>
                                                                <TooltipContent side="top" className="text-xs max-w-xs text-right leading-6">
                                                                    <p className="text=white">ایمیل شما تایید شده است</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </div>
                                                    )}
                                                </div>
                                                {/* Email verification button */}
                                                {field.name === "email" && !profileData?.emailVerified && !isEditable && profileData?.email && (
                                                    <Button
                                                        type="button"
                                                        onClick={sendVerificationEmail}
                                                        className="mt-2 w-full px-4 py-2 font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-300"
                                                    >
                                                        تایید ایمیل
                                                    </Button>
                                                )}
                                            </div>
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

            {/* Email Verification Dialog */}
            <Dialog open={isVerificationDialogOpen} onOpenChange={setIsVerificationDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl font-bold">
                            تایید ایمیل
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-6 py-4">
                        <p className="text-center text-gray-600">
                            کد تایید 6 رقمی ارسال شده به ایمیل خود را وارد کنید
                        </p>
                        <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={(value) => setOtp(value)}
                            disabled={isVerifying}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        <div className="flex gap-3 w-full">
                            <Button
                                onClick={() => {
                                    setIsVerificationDialogOpen(false);
                                    setOtp("");
                                }}
                                variant="outline"
                                className="flex-1"
                                disabled={isVerifying}
                            >
                                انصراف
                            </Button>
                            <Button
                                onClick={verifyEmail}
                                className="flex-1 gradient-blue"
                                disabled={isVerifying || otp.length !== 6}
                            >
                                {isVerifying ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        در حال تایید...
                                    </>
                                ) : (
                                    "تایید"
                                )}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UserProfile;
