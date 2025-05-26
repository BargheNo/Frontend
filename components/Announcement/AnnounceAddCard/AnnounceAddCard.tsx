"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const AnnounceEditor = dynamic(
	() => import("@/components/Announcement/AnnounceEditor/AnnounceEditor"),
	{ ssr: false }
);
import { toast } from "sonner";
import { postData } from "@/src/services/apiHub";
import { Form, Formik } from "formik";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { ArrowLeft, Newspaper, Plus } from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import SignupButton from "@/components/SignupButton/SignupButton";
import AddComponent from "@/components/AddComponent/AddComponent";

export default function AnnounceAddCard() {
	// const [open, setOpen] = useState(false);
	const [step, setStep] = useState(0);
	const [id, setId] = useState<string>("");

	const queryClient = useQueryClient();
	const createNews = useMutation({
		mutationFn: (values: { name: string }) =>
			postData({
				endPoint: "/v1/admin/news/draft",
				data: {
					title: values.name,
					content: "",
					//   writer: "",
					//   date: new Date().getTime(),
				},
			}),
		onSuccess: (responce) => {
			console.log("Mutation successful, response:", responce);
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ["news"] });
			console.log("Query invalidated");
			setId(responce.data.id);
			setStep((step) => step + 1);
			toast.success("خبر با موفقیت ساخته شد");
		},
		onError: (error) => {
			console.error("Mutation error:", error);
			toast.error("خطایی رخ داده است");
		},
	});
	switch (step) {
		case 0:
			// return (
			// 	<div className={`flex justify-center items-center`}>
			// 		<div>
			// 			<Dialog>
			// 				<DialogTrigger asChild>
			// 					<SignupButton
			// 						type="button"
			// 						className="bg-white "
			// 					>
			// 						<Plus
			// 							className={`relative text-[#FA682D] cursor-pointer w-28 h-auto`}
			// 						/>
			// 					</SignupButton>
			// 				</DialogTrigger>
			// 				<DialogContent
			// 					style={{ backgroundColor: "#F1F4FC" }}
			// 					className="sm:min-w-[750px] overflow-auto"
			// 				>
			// 					<DialogHeader>
			// 						<DialogTitle className="flex justify-center items-end font-bold mt-3.5">
			// 							ثبت اطلاعیه جدید
			// 						</DialogTitle>
			// 					</DialogHeader>
			// 					<Formik<{ name: string }>
			// 						initialValues={{
			// 							name: "",
			// 						}}
			// 						onSubmit={(values) => {
			// 							createNews.mutate(values);
			// 						}}
			// 					>
			// 						<Form className="flex flex-col items-center justify-center gap-16">
			// 							<CustomInput
			// 								containerClassName="w-full lg:self-start lg:w-full"
			// 								name="name"
			// 								type="text"
			// 								icon={Newspaper}
			// 								placeholder="عنوان خبر"
			// 							/>
			// 							<button
			// 								className="flex gap-5 items-center bg-fire-orange px-10 py-3 rounded-full! neo-btn text-white font-bold text-lg"
			// 								type="submit"
			// 							>
			// 								<span>ساخت</span>
			// 								<ArrowLeft />
			// 							</button>
			// 						</Form>
			// 					</Formik>
			// 					<DialogFooter>
			// 						<DialogClose />
			// 					</DialogFooter>
			// 				</DialogContent>
			// 			</Dialog>
			// 			<div className="mt-3 text-navy-blue font-bold text-center">
			// 				<p>ثبت اطلاعیه جدید</p>
			// 			</div>
			// 		</div>
			// 	</div>
			// );
			return (
				<div className={`flex justify-center items-center`}>
					<Dialog>
						<DialogTrigger asChild>
							{/* <button className="flex items-center justify-center w-16 h-16 bg-fire-orange rounded-full! neo-btn border-none!">
							<Plus className="text-white" size={30} />
						</button> */}
              <AddComponent title="ثبت خبر جدید" />
						</DialogTrigger>

						<DialogContent className="w-[40vw]! max-w-none! h-[40vh]! rtl p-8">
							<DialogHeader className="hidden">
								<DialogTitle></DialogTitle>
							</DialogHeader>

							<Formik<{ name: string }>
								initialValues={{
									name: "",
								}}
								onSubmit={(values) => {
									createNews.mutate(values);
								}}
							>
								<Form className="flex flex-col items-center justify-center gap-16">
									<CustomInput
										containerClassName="w-full lg:self-start lg:w-full"
										name="name"
										type="text"
										icon={Newspaper}
										placeholder="عنوان خبر"
									/>
									<button
										className="flex gap-5 items-center bg-fire-orange px-10 py-3 rounded-full! neo-btn text-white font-bold text-lg"
										type="submit"
									>
										<span>ساخت</span>
										<ArrowLeft />
									</button>
								</Form>
							</Formik>
						</DialogContent>
					</Dialog>
				</div>
			);
		case 1:
			return (
				<Dialog
					onOpenChange={(state) => {
						if (!state) {
							setStep(0);
							setId("");
						}
					}}
				>
					{/* <DialogTrigger asChild>
						<button className="flex items-center justify-center w-[80%] h-18 bg-warm-white rounded-full neo-btn">
							<div className="flex items-center justify-center w-full h-full gap-4">
								<span className="text-fire-orange text-xl">
									اضافه کردن اطلاعیه
								</span>
								<Plus className="text-fire-orange" size={30} />
							</div>
						</button>
					</DialogTrigger> */}
					<DialogContent className="w-[80vw]! max-w-none! h-[80vh]! rtl p-8">
						<DialogHeader className="hidden">
							<DialogTitle></DialogTitle>
						</DialogHeader>
						<AnnounceEditor newsID={id} onlyView={false} />
					</DialogContent>
				</Dialog>
			);
	}
}
