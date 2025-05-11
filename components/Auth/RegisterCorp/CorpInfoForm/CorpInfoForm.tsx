import React, { useEffect, useState } from "react";
import { Form, FieldArray } from "formik";
import {
	Building2,
	CircleUserRound,
	CreditCard,
	Fingerprint,
	IdCard,
	UserRound,
	XIcon,
} from "lucide-react";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { baseURL, getData } from "@/src/services/apiHub";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import generateErrorMessage from "@/src/functions/handleAPIErrors";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

interface SignatoriesProps {
	values: corpData;
}
export default function CorpInfoForm({
	values,
	setFieldValue,
}: {
	values: corpData;
	setFieldValue: any;
}) {
	const [loading, setLoading] = useState<boolean>(true);
	const corpId = useSelector((state: RootState) => state.user.corpId);
	useEffect(() => {
		setLoading(true);
		if (corpId) {
			getData({
				endPoint: `${baseURL}/v1/user/corps/registration/${corpId}`,
			})
				.then((res) => {
					console.log("res", res);
					setFieldValue("name", res.data.name);
					setFieldValue(
						"registrationNumber",
						res.data.registrationNumber
					);
					setFieldValue("nationalID", res.data.nationalID);
					setFieldValue("iban", res.data.iban);
					setFieldValue("signatories", res.data.signatories);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
					CustomToast(generateErrorMessage(err));
					setLoading(false);
				});
		}
		setLoading(false);
	}, []);
	if (loading)
		return (
			<div className="h-fit">
				<LoadingSpinner />
			</div>
		);
	return (
		<Form>
			<div className="flex flex-col w-full">
				<div className="flex lg:flex-row md:flex-row sm:flex-col w-full justify-between gap-3">
					<CustomInput
						name="name"
						placeholder="نام شرکت"
						icon={Building2}
						containerClassName="w-2/3 mx-auto"
					/>
					<CustomInput
						name="registrationNumber"
						placeholder="شماره ثبت"
						icon={Fingerprint}
						type="number"
					/>
				</div>
				<div className="flex lg:flex-row md:flex-row sm:flex-col w-full justify-between gap-3">
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
				<h2 className="mt-8 text-xl">صاحبان امضا</h2>
				<Signatories values={values} />
			</div>
		</Form>
	);
}

const Signatories: React.FC<SignatoriesProps> = ({
	values,
}: SignatoriesProps) => {
	const isMobile = useMediaQuery({ minWidth: 640 });
	const isTablet = useMediaQuery({ minWidth: 768 });
	const isDesktop = useMediaQuery({ minWidth: 1024 });
	return (
		<FieldArray name="signatories">
			{({ push, remove }) => (
				<>
					{values?.signatories?.map((id, index) => (
						<>
							{index > 0 && !isDesktop && (
								<div className="mt-6 border-solid border-1 border-gray-200 rounded-full" />
							)}
							<div
								key={index}
								className="flex gap-3 items-end w-full"
							>
								<div className="flex flex-col lg:flex-row sm:flex-col w-[95%] gap-3">
									<CustomInput
										name={`signatories.[${index}].name`}
										placeholder="نام"
										icon={UserRound}
									/>
									<CustomInput
										name={`signatories.[${index}].nationalCardNumber`}
										placeholder="کد ملی"
										icon={IdCard}
									/>
									<CustomInput
										name={`signatories.[${index}].position`}
										placeholder="موقعیت"
										icon={CircleUserRound}
									/>
								</div>
								<XIcon
									className="text-fire-orange rounded-sm hover:cursor-pointer flex mb-3 w-fit"
									onClick={() => {
										CustomToast(
											"صاحب امضا با موفقیت حذف شد"
										);
										remove(index);
									}}
								/>
							</div>
						</>
					))}

					<button
						className="place-self-start cta-neu-button w-full sm:w-1/2 lg:w-1/3 mt-8"
						data-test="addSignatory"
						onClick={() => {
							push({
								name: "",
								nationalCardNumber: "",
								position: "",
							});
						}}
					>
						افزودن صاحب امضا
					</button>
				</>
			)}
		</FieldArray>
	);
};
