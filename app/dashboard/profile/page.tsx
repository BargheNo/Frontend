// app/profile/page.tsx
"use client";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { vazir } from "@/lib/fonts";
import { Edit, IdCard, Phone, Mail, Plus, User, UserRound, Save, X } from "lucide-react";
import { baseURL, getData } from "@/src/services/apiHub";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import Image from "next/image";

interface ProfileData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  nationalID: string;
  profilePic: string;
  status: string;
}

const validationSchema = Yup.object({
  firstName: Yup.string().required("نام الزامی است").nullable(),
  lastName: Yup.string().required("نام خانوادگی الزامی است"),
  phone: Yup.string().required("شماره تلفن الزامی است"),
  email: Yup.string().email("ایمیل نامعتبر است").nullable(),
  nationalID: Yup.string().min(10, "کد ملی باید ده رفم باشد.").max(10, "کد ملی باید ده رفم باشد.").nullable(),
});

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: File | null) => void) => {
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

  const fetchProfileData = async () => {
    try {
      const response = await getData({endPoint: `${baseURL}/v1/user/profile`});
      console.log(response.data);
      setProfileData(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast("خطا در دریافت اطلاعات پروفایل");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values: ProfileData) => {
    try {
      if (!isEditable) {
        setIsEditable(true);
        return;
      }
      // TODO: Implement updateProfile function
      // await updateProfile(values);
      setIsEditable(false);
      toast.success("اطلاعات با موفقیت بروزرسانی شد");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("خطا در بروزرسانی اطلاعات");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const initialFormValues: ProfileData = {
    firstName: profileData?.firstName || "",
    lastName: profileData?.lastName || "",
    phone: '0' + profileData?.phone?.slice(3, 13) || "",
    email: profileData?.email || "",
    nationalID: profileData?.nationalID || "",
    profilePic: profileData?.profilePic || "",
    status: profileData?.status || "",
  };

  return (
    <div className={`${vazir.className} w-full min-h-full flex flex-col gap-8 text-white py-8 px-14 bg-transparent`}>

      <div className="flex gap-10">
        <div className="p-6 w-1/2 neu-container">
          <h2 className="text-navy-blue text-2xl font-bold mb-6">پروفایل کاربری</h2>

          <Formik
            initialValues={initialFormValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-4">
                <div className="flex justify-center mb-10">
                  <div className="relative">
                    <div className="inset-neu-container w-44 h-44 rounded-full flex items-center justify-center overflow-hidden">
                      {previewImage ? (
                        <Image
                          src={previewImage}
                          alt="Profile"
                          height={128}
                          width={128}
                          className="w-full h-full object-cover"
                        />
                      ) : profileData && profileData.profilePic !== "" ? (
                        <Image
                          src={profileData.profilePic}
                          alt="Profile"
                          height={128}
                          width={128}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-20 h-20 text-gray-400" />
                      )}
                    </div>
                    {(previewImage || (profileData && profileData.profilePic !== "")) && (
                      <button
                        onClick={() => {
                          setPreviewImage(null);
                          setFieldValue("profilePic", "");
                          setIsEditable(true);
                        }}
                        className="!absolute !bottom-0 !left-0 bg-cloud-white cursor-pointer rounded-full !w-fit p-2 cta-neu-button hover:bg-primary-dark transition-colors"
                      >
                        <X />
                      </button>
                    )}
                    { isEditable && <label
                      htmlFor="profileImage"
                      className="!absolute !bottom-0 !right-0 bg-cloud-white cursor-pointer rounded-full !w-fit p-2 cta-neu-button hover:bg-primary-dark transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                      <input
                        id="profileImage"
                        name="profileImage"
                        type="file"
                        accept="image/jpeg,image/png"
                        className="hidden"
                        onChange={(e) => {
                          // setIsEditable(true);
                          handleImageChange(e, setFieldValue);
                        }}
                      />
                    </label>}
                  </div>
                </div>

                
                <CustomInput
                  name="firstName"
                  type="text"
                  placeholder="نام"
                  icon={UserRound}
                  containerClassName="w-full"
                  disabled={!isEditable}
                  inputClassName={!isEditable ? "!bg-warm-white" : ""}
                />
                <CustomInput
                  name="lastName"
                  type="text"
                  placeholder="نام خانوادگی"
                  icon={IdCard}
                  containerClassName="w-full"
                  disabled={!isEditable}
                  inputClassName={!isEditable ? "!bg-warm-white" : ""}
                />

                <CustomInput
                  name="phone"
                  type="text"
                  placeholder="شماره تلفن"
                  icon={Phone}
                  containerClassName="w-full"
                  disabled={!isEditable}
                  inputClassName={!isEditable ? "!bg-warm-white" : ""}
                />
                <CustomInput
                  name="email"
                  type="email"
                  placeholder="ایمیل"
                  icon={Mail}
                  containerClassName="w-full"
                  disabled={!isEditable}
                  inputClassName={!isEditable ? "!bg-warm-white" : ""}
                />

                <CustomInput
                  name="nationalID"
                  type="text"
                  placeholder="کد ملی"
                  icon={IdCard}
                  containerClassName="w-full"
                  disabled={!isEditable}
                  inputClassName={!isEditable ? "!bg-warm-white" : ""}
                />
                {/* <div className="flex items-center gap-2">
                  <span className="text-gray-600">وضعیت:</span>
                  <span className="font-medium">{profileData?.status}</span>
                </div> */}
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={`px-4 py-2 flex justify-center w-fit gap-4 !rounded-lg ${
                      isEditable 
                        ? "red-circle-button active:brightness-90" 
                        : "cta-neu-button"
                    } !text-lg h-12 font-black`}
                  >
                    {isEditable ? "ذخیره تغییرات" : "ویرایش اطلاعات"}
                    {isEditable ? <Save /> : <Edit />}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="p-6 w-1/2 neu-container">
          <h2 className="text-navy-blue text-2xl font-bold mb-6">نقش و دسترسی‌ها</h2>
          
          <div className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
              <h3 className="text-navy-blue text-lg font-semibold">نقش کاربری</h3>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    className="w-4 h-4 text-primary-dark"
                    checked={profileData?.status === "user"}
                    disabled={!isEditable}
                  />
                  <span className="text-gray-700">کاربر عادی</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="notuser"
                    className="w-4 h-4 text-primary-dark"
                    checked={profileData?.status === "notuser"}
                    disabled={!isEditable}
                  />
                  <span className="text-gray-700">کاربر غیرعادی؟؟؟</span>
                </label>
              </div>
            </div>

            {/* Permissions */}
            <div className="space-y-3">
              <h3 className="text-navy-blue text-lg font-semibold">دسترسی‌ها</h3>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-dark rounded"
                    checked={profileData?.status === "admin" || profileData?.status === "moderator"}
                    disabled={!isEditable}
                  />
                  <span className="text-gray-700">مدیریت پنل؟</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-dark rounded"
                    checked={true}
                    disabled={!isEditable}
                  />
                  <span className="text-gray-700">درخواست تعمیر؟</span>
                </label>
              </div>
            </div>

            {/* Current Role Display */}
            <div className="mt-6 p-4 bg-warm-white rounded-lg">
              <h3 className="text-navy-blue text-lg font-semibold mb-2">نقش فعلی</h3>
              <p className="text-gray-700">
                {profileData?.status === "admin" && "مدیر سیستم"}
                {profileData?.status === "user" && "کاربر عادی"}
                {profileData?.status === "moderator" && "ناظر"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;