import AddComponent from "@/components/AddComponent/AddComponent";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import {
	Dialog,
	DialogHeader,
	DialogTrigger,
	DialogContent,
	DialogTitle,
} from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { FormValues, WarrantyType } from "./warrantyTypes";
import WarrantyForm from "./WarrantyForm";
import { RootState } from "@/src/store/store";
import { baseURL, postData } from "@/src/services/apiHub";

const AddWarranty = () => {
	const [open, setOpen] = useState(false);
	const {
		items: warrantyTypes,
		status,
		error,
	} = useSelector((state: RootState) => state.warrantyTypes);

	const handleSubmit = (values: FormValues) => {
		console.log("Form submitted:", values);
		postData({
			endPoint: `${baseURL}/v1/corp/2/guarantee`, // TODO: add corpID ................................................................
			data: values,
		})
			.then((res) => {
				console.log(res);
				CustomToast("با موفقیت ثبت شد!", "success");
			})
			.catch((err) => console.log(err));
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<div className="mb-11 items-center flex justify-around">
					<AddComponent title="ثبت گارانتی جدید" />
				</div>
			</DialogTrigger>
			<DialogContent
				style={{ backgroundColor: "#F1F4FC" }}
				className="w-full dialog-width mx-auto overflow-auto pb-0"
			>
				<DialogHeader>
					<DialogTitle className="flex justify-center items-end font-bold mt-3.5">
						ثبت گارانتی جدید
					</DialogTitle>
				</DialogHeader>

				<WarrantyForm
					warrantyTypes={warrantyTypes}
					isLoading={status === "loading"}
					onSubmit={handleSubmit}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default AddWarranty;
