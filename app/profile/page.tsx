// app/profile/page.tsx
"use client";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { vazir } from "@/lib/fonts";

const validationSchema = Yup.object({
  firstName: Yup.string().required("نام الزامی است"),
  lastName: Yup.string().required("نام خانوادگی الزامی است"),
  email: Yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
  address: Yup.string().required("آدرس الزامی است"),
  birthDate: Yup.date().required("تاریخ تولد الزامی است"),
});

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Fetch user profile data
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      // Call your API to get profile data
      const response = await getProfile();
      setProfileData(response.data);
    } catch (error) {
      toast.error("خطا در دریافت اطلاعات پروفایل");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      await updateProfile(values);
      toast.success("اطلاعات با موفقیت بروزرسانی شد");
    } catch (error) {
      toast.error("خطا در بروزرسانی اطلاعات");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${vazir.className} w-full`}>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">پروفایل کاربری</h1>
        <Formik
          initialValues={profileData || {
            firstName: "",
            lastName: "",
            email: "",
            address: "",
            birthDate: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <CustomInput
                name="firstName"
                type="text"
                placeholder="نام"
              />
              <CustomInput
                name="lastName"
                type="text"
                placeholder="نام خانوادگی"
              />
            </div>
            <CustomInput
              name="email"
              type="email"
              placeholder="ایمیل"
            />
            <CustomInput
              name="address"
              type="text"
              placeholder="آدرس"
            />
            <CustomInput
              name="birthDate"
              type="date"
              placeholder="تاریخ تولد"
            />
            
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              بروزرسانی اطلاعات
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Profile;