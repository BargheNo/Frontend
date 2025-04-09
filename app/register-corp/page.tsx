"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const steps = ["اطلاعات شرکت", "اطلاعات تماس", "مدارک"];
const icons = [
	<Building2 className="w-5" key="اطلاعات شرکت" />,
	<Phone className="w-5" key="اطلاعات تمایس" />,
	<FileText className="w-5" key="مدارک" />,
];
const initialValues = {};

export default function Page() {
	return (
		<div className="w-screen min-h-screen h-fit place-items-center flex place-content-center items-center bg-[#F0EDEF] transition-all duration-300 ease-in-out">
			<GeneratedForm />
		</div>
	);
}

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
	Building2,
	CircleUserRound,
	CreditCard,
	FileText,
	Fingerprint,
	IdCard,
	Phone,
	UserRound,
	UsersRound,
	XIcon,
} from "lucide-react";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";

const validationSchema = Yup.object({
	corpName: Yup.string().required("نام شرکت الزامی است"),
	registerationNumber: Yup.string().required("شماره ثبت الزامی است"),
	nationalID: Yup.string().required("شناسه ملی الزامی است"),
	iban: Yup.string().required("شماره شبا الزامی است"),
	// signatories: Yup.string().required("صاحبان امضا الزامی است"),
	signatories: Yup.array().of(
		Yup.object().shape({
			signatoryName: Yup.string().required("نام صاحب امضا الزامی است"),
			nationalID: Yup.string()
				.required("کد ملی صاحب امضا الزامی است")
				.length(10, "کد ملی باید 10 رقم باشد"),
			position: Yup.string(),
		})
	),
});

// const Signatories = ({ }: { signatories: Array<number> }) => {
const Signatories = () => {
	const [signatories, setSignatories] = useState<Array<string>>([]);

	// Add a new signatory
	const addSignatory = () => {
		setSignatories((prev) => [...prev, uuidv4()]);
	};

	// Remove a signatory by ID
	const removeSignatory = (id: string) => {
		setSignatories((prev) => prev.filter((item) => item !== id));
	};

	return (
		<>
			{signatories.map((id) => (
				<div
					key={id} // Use the UUID as the key for the entire row
					className="flex gap-3 items-end w-full"
				>
					<div className="flex w-[95%] gap-3">
						<CustomInput
							name={`signatories.${id}.signatoryName`}
							placeholder="نام"
							icon={UserRound}
							key={`name-${id}`} // Unique key for each input
						/>
						<CustomInput
							name={`signatories.${id}.nationalID`}
							placeholder="کد ملی"
							icon={IdCard}
							key={`national-${id}`}
						/>
						<CustomInput
							name={`signatories.${id}.position`}
							placeholder="موقعیت"
							icon={CircleUserRound}
							key={`position-${id}`}
						/>
					</div>
					<XIcon
						className="text-fire-orange rounded-sm hover:cursor-pointer flex mb-3 w-fit"
						onClick={() => removeSignatory(id)}
					/>
				</div>
			))}

			<button
				className="place-self-start cta-neu-button w-1/3 mt-4"
				onClick={addSignatory}
			>
				افزودن صاحب امضا
			</button>
		</>
	);
};
const GeneratedForm = () => {
	const [step, setStep] = useState(0);
	// const [signatories, setSignatories] = useState([]);

	const form = useForm();

	const { handleSubmit, control, reset } = form;

	const onSubmit = async () => {
		if (step < steps.length - 1) {
			setStep(step + 1);
		} else {
			setStep(0);
			reset();

			toast.success("Form successfully submitted");
		}
	};

	const handleBack = () => {
		if (step > 0) {
			setStep(step - 1);
		}
	};

	const handleFormSubmit = () => {};

	return (
		<div className="space-y-4 rtl vazir m-auto h-2/3 w-1/2 my-20">
			<div className="flex items-center justify-center">
				{Array.from({ length: steps.length }).map((_, index) => (
					<div key={index} className="flex items-center">
						<Badge
							className={cn(
								"rounded-full w-44 transition-all duration-300 ease-in-out text-md neu-shadow gap-2 p-2 bg-gradient-to-r ",
								index <= step
									? "from-[#A55FDA] to-[#F37240] text-black/80"
									: "from-[#A55FDA]/30 to-[#F37240]/30 text-black",
								index < step &&
									"from-[#A55FDA] to-[#F37240] text-white"
							)}
							key={index}
						>
							{steps[index]}
							{/* {icons[index]} */}
							<div className="">{icons[index]}</div>
						</Badge>
						{index < steps.length - 1 && (
							<div
								className={cn(
									"w-8 h-0.5 transition-all duration-500 ease-in-out",
									index < step
										? "bg-primary"
										: "bg-primary/30"
								)}
							/>
						)}
					</div>
				))}
			</div>
			<Card className="justify-between neu-shadow border-0">
				<CardHeader>
					<CardTitle className="text-lg">
						لطفا اطلاعات شرکت خود را وارد کنید
					</CardTitle>
					<CardDescription>مرحله فعلی: {steps[step]}</CardDescription>
				</CardHeader>
				<CardContent className="">
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleFormSubmit}
					>
						{step === 0 && (
							<Form className="flex flex-col w-full">
								<div className="flex w-full justify-between gap-3">
									<CustomInput
										name="corpName"
										placeholder="نام شرکت"
										icon={Building2}
										containerClassName="w-2/3 mx-auto"
									/>
									<CustomInput
										name="registerationNumber"
										placeholder="شماره ثبت"
										icon={Fingerprint}
										type="number"
									/>
								</div>
								<div className="flex w-full justify-between gap-3">
									<CustomInput
										name="nationalID"
										placeholder="شناسه ملی"
										icon={IdCard}
										type="number"
									/>
									<CustomInput
										name="iban"
										placeholder="شماره شبا"
										icon={CreditCard}
										type="number"
									/>
								</div>
								{/* <CustomTextArea name="signatories" placeholder="صاحبان امضا" icon={UsersRound} /> */}
								<h2 className="mt-8 text-xl">صاحبان امضا</h2>
								<Signatories />
								{/* {signatories.map((signatory, index) => (
									<Signatories
									signatories={signatories}
									/>
								))} */}

								{/* {Array.from({ length: signatories }, (_, i) => (
									<Signatory key={i + 1} index={i + 1} />
								))} */}
							</Form>
						)}
					</Formik>
				</CardContent>
				<CardFooter className="flex justify-between align-bottom ltr">
					<button
						type="submit"
						className="hover:cursor-pointer cta-neu-button w-1/4"
						onClick={() => onSubmit()}
					>
						{step === steps.length - 1 ? "تایید" : "بعدی"}
					</button>
					{step > 0 && (
						<button
							type="button"
							className="hover:cursor-pointer cta-neu-button w-1/4"
							onClick={handleBack}
						>
							قبلی
						</button>
					)}
				</CardFooter>
			</Card>
		</div>
	);
};
