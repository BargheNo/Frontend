"use client";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { Edit, IdCard, Phone, Mail, UserRound, Save } from "lucide-react";
import ProfilePicPicker from "@/components/Custom/ProfilePicPicker/ProfilePicPicker";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { baseURL, getData, putDataFile } from "@/src/services/apiHub";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";

export interface ProfileData {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	nationalCode: string;
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
	const [previewImage, setPreviewImage] = useState<string | null>(null);
	const [profileData, setProfileData] = useState<ProfileData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isEditable, setIsEditable] = useState(false);

	useEffect(() => {
		fetchProfileData();
	}, []);

	const fetchProfileData = async () => {
		try {
			const response = await getData({
				endPoint: `${baseURL}/v1/user/profile`,
			});
			// console.log(response.data);
			setProfileData(response.data);
		} catch (error) {
			console.error("Error fetching profile:", error);
			CustomToast("خطا در دریافت اطلاعات پروفایل", "error");
			// toast("خطا در دریافت اطلاعات پروفایل");
		} finally {
			setIsLoading(false);
		}
	};

	const getInitialValues = (): ProfileData => ({
		firstName: profileData?.firstName || "",
		lastName: profileData?.lastName || "",
		phone: profileData?.phone ? "0" + profileData.phone.slice(3, 13) : "",
		email: profileData?.email || "",
		nationalCode: profileData?.nationalCode || "",
		profilePic: profileData?.profilePic || null,
		status: profileData?.status || "",
	});

	console.log(profileData);
	console.log(getInitialValues());

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
		try {
			console.log(values);

			const response = await putDataFile({
				endPoint: `${baseURL}/v1/user/profile`,
				formData: values,
			});

			if (response) {
				// toast.success("اطلاعات با موفقیت ذخیره شد");
				CustomToast("اطلاعات با موفقیت ذخیره شد", "success");
			}
		} catch (err) {
			console.log(err);
		}
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
			console.error("Error updating profile:", error);
			// toast.error("خطا در بروزرسانی اطلاعات");
			CustomToast("خطا در بروزرسانی اطلاعات", "error");
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
			name: "nationalCode",
			type: "text",
			placeholder: "کد ملی",
			icon: IdCard,
		},
	];

	return (
		<div className="p-6 w-full md:w-1/2 neu-container">
			<h2 className="text-navy-blue text-2xl font-bold mb-6">
				پروفایل کاربری
			</h2>

			{isLoading ? (
				<div>Loading...</div>
			) : (
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
									disabled={
										field.name === "email" ||
										field.name === "phone"
											? true
											: !isEditable
									}
									// readOnly={field.name === "email" || field.name === "phone"}
									inputClassName={
										!isEditable ? "!bg-warm-white" : ""
									}
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
									{isEditable
										? "ذخیره تغییرات"
										: "ویرایش اطلاعات"}
									{isEditable ? <Save /> : <Edit />}
								</button>
							</div>
						</Form>
					)}
				</Formik>
			)}
		</div>
	);
};

export default UserProfile;
