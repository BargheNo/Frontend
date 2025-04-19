// app/profile-setup/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { vazir } from "@/lib/fonts";
import styles from '../../Auth/Signup/signup.module.css'
import { ArrowLeft, IdCard, Mail } from "lucide-react";

const validationSchema = Yup.object({
  email: Yup.string().email("ایمیل نامعتبر است."),
  nationalID: Yup.string()
                    .matches(/^[0-9]+$/, "کد ملی باید 10 رقم باشد.")
                    .min(10, "کد ملی باید 10 رقم باشد.")
                    .max(10, "کد ملی باید 10 رقم باشد."),
  // Add other fields as needed
});

const ProfileSetup = () => {
  const router = useRouter();
  
  const handleSubmit = async (values) => {
    try {
      // Call your API to update profile
      await updateProfile(values);
      router.push('/dashboard');
    } catch (error) {
      toast.error("خطا در ذخیره اطلاعات");
    }
  };

  const handleSkip = () => {
    router.push('/dashboard');
  };

  return (
    <div className={`${vazir.className} w-full h-full items-center content-center`} dir="rtl">
      <div className={`${styles.card} max-w-2xl mx-auto p-6`}>
        <h1 className="text-2xl font-bold mb-4 text-center">فقط یک قدم دیگر...</h1>
        <Formik
          initialValues={{
            email: "",
            address: "",
            birthDate: "",
            // Add other fields as needed
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="w-full space-y-4">
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
        </Formik>
      </div>
    </div>
  );
};

export default ProfileSetup;