import React from "react";
import { Form, FieldArray } from "formik";
// import * as Yup from "yup";
// import { v4 as uuidv4 } from "uuid";
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
// import { setCorp } from "@/src/store/slices/corpSlice";
// import { useDispatch } from "react-redux";
// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardFooter,
// 	CardHeader,
// 	CardTitle,
// } from "@/components/ui/card";
// import { useSelector } from "react-redux";
interface SignatoriesProps {
	// signatories: string[];
	// setSignatories: React.Dispatch<React.SetStateAction<string[]>>;
	values: corpData;
}
// const validationSchemaForm = Yup.object({
// 	corpName: Yup.string().required("نام شرکت الزامی است"),
// 	registrationNumber: Yup.string().required("شماره ثبت الزامی است"),
// 	nationalID: Yup.string().required("شناسه ملی الزامی است"),
// 	iban: Yup.string().required("شماره شبا الزامی است"),
// 	signatories: Yup.array().of(
// 		Yup.object().shape({
// 			signatoryName: Yup.string().required("نام صاحب امضا الزامی است"),
// 			nationalID: Yup.string()
// 				.required("کد ملی صاحب امضا الزامی است")
// 				.length(10, "کد ملی باید 10 رقم باشد"),
// 			position: Yup.string(),
// 		})
// 	),
// });
export default function CorpInfoForm({
	// step,
	// setStep,
	// steps,
	// signatories,
	// setSignatories,
	values
}: {
	// step: number;
	// setStep: (step: number) => void;
	// steps: string[];
	// signatories: string[];
	// setSignatories: React.Dispatch<React.SetStateAction<string[]>>;
	values: corpData;
}) {
	return (
		<Form>
			<div className="flex flex-col w-full">
				<div className="flex w-full justify-between gap-3">
					<CustomInput
						name="corpName"
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
				<h2 className="mt-8 text-xl">صاحبان امضا</h2>
				<Signatories
				values={values}
					// signatories={signatories}
					// setSignatories={setSignatories}
				/>
			</div>
		</Form>
	);
}

const Signatories: React.FC<SignatoriesProps> = ({
	// signatories,
	// setSignatories,
	values
}: SignatoriesProps) => {
	// Add a new signatory
	// const addSignatory = () => {
	// 	setSignatories((pre) => [...pre, uuidv4()]);
	// };

	// Remove a signatory by ID
	// const removeSignatory = (id: string) => {
	// 	setSignatories(signatories.filter((item) => item !== id));
	// };

	return (
		<FieldArray name="signatories">
			{({ push, remove }) => (
				<>
					{values.signatories.map((id, index) => (
						<div
							key={index}
							className="flex gap-3 items-end w-full"
						>
							<div className="flex w-[95%] gap-3">
								<CustomInput
									name={`signatories.[${index}].signatoryName`}
									placeholder="نام"
									icon={UserRound}
									// key={`name-${id}`}
								/>
								<CustomInput
									name={`signatories.[${index}].nationalID`}
									placeholder="کد ملی"
									icon={IdCard}
									// key={`national-${id}`}
								/>
								<CustomInput
									name={`signatories.[${index}].position`}
									placeholder="موقعیت"
									icon={CircleUserRound}
									// key={`position-${id}`}
								/>
							</div>
							<XIcon
								className="text-fire-orange rounded-sm hover:cursor-pointer flex mb-3 w-fit"
								// onClick={() => removeSignatory(id)}
								onClick={() => {
									remove(index);
									// removeSignatory(id);
								}}
							/>
						</div>
					))}

					<button
						className="place-self-start cta-neu-button w-1/3 mt-4"
						// onClick={addSignatory}
						onClick={() => {
							// addSignatory();
							push({
								signatoryName: "",
								nationalID: "",
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
