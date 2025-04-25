// app/profile-setup/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { vazir } from "@/lib/fonts";
import styles from '../../Auth/Signup/signup.module.css'
import { ArrowLeft, IdCard, Mail } from "lucide-react";
import { toast } from "sonner";
import ProfilePicPicker from "@/components/Custom/ProfilePicPicker/ProfilePicPicker";

interface FormValues {
  email: string;
  address: string;
  birthDate: string;
  nationalID: string;
  profileImage: File | null;
}

const validationSchema = Yup.object({
  email: Yup.string().email("ایمیل نامعتبر است.").nullable(),
  nationalID: Yup.string()
                    .matches(/^[0-9]+$/, "کد ملی باید 10 رقم باشد.")
                    .min(10, "کد ملی باید 10 رقم باشد.")
                    .max(10, "کد ملی باید 10 رقم باشد.")
                    .nullable(),
  profileImage: Yup.mixed<File>()
    .test("fileSize", "حجم فایل باید کمتر از 2 مگابایت باشد", (value) => {
      if (!value) return true;
      return value.size <= 2000000;
    })
    .test("fileType", "فرمت فایل باید jpg یا png باشد", (value) => {
      if (!value) return true;
      return ["image/jpeg", "image/png"].includes(value.type);
    })
    .nullable(),
});

const ProfileSetup = () => {
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: File | null) => void) => {
    const file = event.target.files?.[0];
    if (file) {
      setFieldValue("profileImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      // Call your API to update profile

      console.log("meow");
      console.log(values);
      // await updateProfile(values); // TODO: SETUP SUBMITTING FORM TO SERVER
      router.push('/dashboard');
    } catch {
      toast("خطا در ذخیرۀ اطلاعات");
    }
  };

  const handleSkip = () => {
    router.push('/dashboard');
  };


  // TODO: IF REQUIRED BASED ON DEMANDS OF BACKEND, CHANGE THE INITIALVALUE OF THE FORM TO NULL INSTEAD OF EMPTY STRING.

  return (
    <div className={`${vazir.className} w-full h-full items-center content-center`} dir="rtl">
      <div className={`${styles.card} max-w-2xl mx-auto p-6`}>
        <h1 className="text-2xl font-bold mb-4 text-center">فقط یک قدم دیگر...</h1>
        <Formik<FormValues>
          initialValues={{
            email: "",
            address: "",
            birthDate: "",
            nationalID: "",
            profileImage: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="w-full space-y-4">
              <div className="flex justify-center mb-6">
                <ProfilePicPicker
                  previewImage={previewImage}
                  onImageChange={handleImageChange}
                  onRemoveImage={() => {
                    setPreviewImage(null);
                    setFieldValue("profileImage", null);
                  }}
                  setFieldValue={setFieldValue}
                  size="small"
                />
              </div>
              <CustomInput
                name="email"
                type="email"
                icon={Mail}
                placeholder="ایمیل"
              />
              <CustomInput
                name="nationalID"
                type="text"
                icon={IdCard}
                placeholder="کد ملی"
              />
              {/* Add other fields as needed */}

              <div className="flex justify-between mt-10">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  رد کردن
                </button>
                <button
                  type="submit"
                  className="px-8 py-2 flex cta-neu-button !w-fit !rounded-lg"
                >
                  ادامه
                  <ArrowLeft />
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProfileSetup;