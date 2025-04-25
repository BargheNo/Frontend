"use client";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { Edit, IdCard, Phone, Mail, UserRound, Save } from "lucide-react";
import ProfilePicPicker from "@/components/Custom/ProfilePicPicker/ProfilePicPicker";

export interface ProfileData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  nationalCode: string;
  profilePic: File | string | null;
  status: string;
}

interface UserProfileProps {
  profileData: ProfileData;
  isEditable: boolean;
  previewImage: string | null;
  setIsEditable: (value: boolean) => void;
  setPreviewImage: (value: string | null) => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: File | null) => void) => void;
  handleSubmit: (values: ProfileData) => Promise<void>;
}

const validationSchema = Yup.object({
  firstName: Yup.string().required("نام الزامی است").nullable(),
  lastName: Yup.string().required("نام خانوادگی الزامی است"),
  phone: Yup.string().required("شماره تلفن الزامی است"),
  email: Yup.string().email("ایمیل نامعتبر است").nullable(),
  nationalCode: Yup.string().min(10, "کد ملی باید ده رفم باشد.").max(10, "کد ملی باید ده رفم باشد.").nullable(),
});

const UserProfile: React.FC<UserProfileProps> = ({
  profileData,
  isEditable,
  previewImage,
  setIsEditable,
  setPreviewImage,
  handleImageChange,
  handleSubmit,
}) => {
  const initialFormValues: ProfileData = {
    firstName: profileData?.firstName || "",
    lastName: profileData?.lastName || "",
    phone: '0' + profileData?.phone?.slice(3, 13) || "",    // TODO: WHILE SUBMITTING THE FORM, THE FORMAT OF NUMBERS SHOULD BE CHANGED TO WHAT BACKECND ACTUALLY NEEDS.
    email: profileData?.email || "",
    nationalCode: profileData?.nationalCode || "",
    profilePic: profileData?.profilePic || null,
    status: profileData?.status || "",
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
      name: "nationalCode",
      type: "text",
      placeholder: "کد ملی",
      icon: IdCard,
    },
  ];

  return (
    <div className="p-6 w-full md:w-1/2 neu-container">
      <h2 className="text-navy-blue text-2xl font-bold mb-6">پروفایل کاربری</h2>

      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-4">
            <div className="flex justify-center mb-10">
              <ProfilePicPicker
                previewImage={previewImage}
                existingImage={profileData?.profilePic}
                isEditable={isEditable}
                onImageChange={handleImageChange}
                onRemoveImage={() => {
                  setPreviewImage(null);
                  setFieldValue("profilePic", null);
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
                disabled={field.name === "email" || field.name === "phone" ? true : !isEditable}
                // readOnly={field.name === "email" || field.name === "phone"}
                inputClassName={!isEditable ? "!bg-warm-white" : ""}
              />
            ))}

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
  );
};

export default UserProfile; 