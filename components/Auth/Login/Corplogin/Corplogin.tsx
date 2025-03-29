"use client";
import { useState } from "react";
import { MoveLeft, Lock, Unlock, IdCard } from "lucide-react";
import Link from "next/link";
import styles from "./Corplogin.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../../../CustomInput/CustomInput";
import { vazir } from "@/lib/fonts";
import LoginButton from "./../LoginButton";
import { handleCorpLogin } from "@/src/services/apiHub";

const validationSchema = Yup.object({
  cin: Yup.string()
    .matches(/^[0-9]{11}$/, "شناسه ملی باید 11 رقم باشد")
    .required("شناسه ملی الزامی است"),
  password: Yup.string()
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
    .required("رمز عبور الزامی است"),
});

const initialValues = {
  cin: "",
  password: "",
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async (values: { cin: string; password: string }) => {
    const { cin: cin, password } = values;
    const response = await handleCorpLogin(cin, password);
    console.log("Login successful", response.data);
    if (response.success) {
      console.log("Login successful", response.data);
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.accessToken);
      window.location.href = "/";
    } else {
      setErrorMessage(response.message || "Login failed");
    }
  };

  return (
    <div className={`${vazir.className} w-full`}>
      <div dir="rtl" className={styles.mainbg}>
        <div className="w-full max-w-md p-6 space-y-4 shadow-2xl rounded-2xl bg-[#f1f4fc]">
          <h2 className="text-3xl text-black text-center">{"ورود شرکت"}</h2>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            <Form className="w-full flex flex-col items-center gap-3 text-black">
              <div className="flex flex-row justify-center w-9/10 gap-3">
                <div className="w-full">
                  <CustomInput name="cin" type="tel" icon={IdCard}>
                    شناسه ملی
                  </CustomInput>
                </div>
              </div>
              <div className="w-9/10">
                <CustomInput
                  name="password"
                  icon={showPassword ? Unlock : Lock}
                  type={showPassword ? "text" : "password"}
                  onIconClick={() => togglePasswordVisibility()}
                >
                  رمز عبور
                </CustomInput>
              </div>
              {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
              <LoginButton>
                {"ورود"}
                <MoveLeft />
              </LoginButton>
            </Form>
          </Formik>

          <p className="flex gap-5 justify-center text-center text-sm text-blue-600">
            <a href="">فراموشی رمز عبور</a>
            <Link href="/signup">ثبت نام نکرده ام</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
