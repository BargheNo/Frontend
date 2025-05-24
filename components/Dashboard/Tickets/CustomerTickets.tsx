"use client";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import {
	MessageCirclePlus,
	MessageCircleMore,
	ImagePlus,
	List,
} from "lucide-react";
import React from "react";
import styles from "./CustomerTickets.module.css";
import generateErrorMessage from "@/src/functions/handleAPIErrors";
import { toast } from "sonner";
import Header from "@/components/Header/Header";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import TransparentLoading from "@/components/LoadingSpinner/TransparentLoading";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
interface Ticket {
	id: string;
	subject: string;
	description: string;
	status: string;
	image: string;
	created_at: string;
	Owner: {
		email: string;
		firstName: string;
		lastName: string;
		nationalID: string;
		phone: string;
		profilePic: string;
		status: string;
	};
}
interface Comment {
	id: number;
	Author: {
		id: number;
		first_name: string;
		last_name: string;
		owner_type: string;
	};
	body: string;
}

const validationSchemaForm = Yup.object({
	subject: Yup.string().required("موضوع تیکت الزامی است"),
	description: Yup.string().required("توضیحات تیکت الزامی است"),
	// image: Yup.mixed().optional(),
	// image: Yup.mixed().test("fileType", "فرمت فایل معتبر نیست", (value) => {
	// 	const file = value as File;
	// 	return value && ["image/jpeg", "image/png"].includes(file.type);
	// }),
});

const initialValuesForm = {
	subject: "",
	description: "",
	image: null,
};

const initialCommentValuesForm = { comment: "" };

const commentValidationSchemaForm = Yup.object({
	comment: Yup.string().required("نظر الزامی است"),
});

const resetFormValues = (
	setFieldValue: (field: string, value: any) => void
) => {
	setFieldValue("subject", "");
	setFieldValue("description", "");
	setFieldValue("image", null);
};

const TicketSupportPage = () => {
	const [loading, setLoading] = useState(false);
	const [isLoadingComments, setIsLoadingComments] = useState(false);
	const [loadingTickets, setLoadingTickets] = useState(true);
	const [tickets, setTickets] = useState<Ticket[]>([]);
	const [comments, setComments] = useState<Comment[]>([]);
	const [activeCommentTicketId, setActiveCommentTicketId] = useState<
		string | null
	>(null);
	const [showCommentBoxFor, setShowCommentBoxFor] = useState<string | null>(
		null
	);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const accessToken = useSelector(
		(state: RootState) => state.user.accessToken
	);
	const subjectOptions = [
		{ id: 1, label: "عمومی" },
		{ id: 2, label: "پنل" },
		{ id: 3, label: "نصب" },
		{ id: 4, label: "تعمیرات" },
		{ id: 5, label: "سایر" },
	];
	const translateSubjectToPersian = (subject: string): string => {
		const translations: { [key: string]: string } = {
			installation: "نصب",
			panel: "پنل",
			maintenance: "تعمیرات",
			general: "عمومی",
			other: "سایر",
		};

		return translations[subject.toLowerCase()] || subject;
	};

	const createTicket = async (
		values: {
			subject: string;
			description: string;
			image?: File | null;
		},
		setFieldValue: (field: string, value: any) => void
	) => {
		setLoading(true);
		console.log("values", values);
		const formData = new FormData();
		setImagePreview(null);
		formData.append("subject", values.subject);
		console.log(values.subject);
		formData.append("description", values.description);

		if (values.image) {
			formData.append("image", values.image);
		}

		try {
			const res = await fetch("http://46.249.99.69:8080/v1/user/ticket", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				body: formData,
			});

			const data = await res.json();
			resetFormValues(setFieldValue);
			CustomToast(data?.message, "success");
			// toast.success(data?.message);
			fetchTickets();
			setLoading(false);
		} catch (error: any) {
			console.log(error);
			const errMsg =
				generateErrorMessage(error) ||
				"هنگام ایجاد تیکت جدید مشکلی پیش آمد.";
			CustomToast(errMsg, "error");
			setLoading(false);
			// toast.error(errMsg);
		}
	};

	const createComment = async (
		comment: string,
		activeCommentTicketId: string | null
	) => {
		try {
			console.log("comment", comment);
			const response = await fetch(
				`http://46.249.99.69:8080/v1/user/ticket/${activeCommentTicketId}/comments`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify({ body: comment }),
				}
			);

			const result = await response.json();
			// toast.success(result?.message);
			console.log(result);
			CustomToast(result?.message, "success");
			getComments(activeCommentTicketId);
		} catch (error: any) {
			const errMsg =
				generateErrorMessage(error) ||
				"هنگام ایجاد نظر جدید مشکلی پیش آمد.";
			CustomToast(errMsg, "error");
			// toast.error(errMsg);
		}
	};

	const getComments = async (showCommentBoxFor: string | null) => {
		setComments([]);
		setIsLoadingComments(true);
		fetch(
			`http://46.249.99.69:8080/v1/user/ticket/${showCommentBoxFor}/comments`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)
			.then((res) => res.json())
			.then((data) => {
				setComments(data.data);
			})
			.catch((err: any) => {
				const errMsg =
					generateErrorMessage(err) ||
					"هنگام گردآوری نظرات مشکلی به وجود آمد.";
				// toast.error(errMsg);
				CustomToast(errMsg, "error");
			});
		{
			setIsLoadingComments(false);
		}
	};

	const fetchTickets = () => {
		setLoadingTickets(true);
		fetch("http://46.249.99.69:8080/v1/user/ticket/list", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setTickets(data.data);
				setLoadingTickets(false);
			})
			.catch((err) => {
				const errMsg =
					generateErrorMessage(err) ||
					"هنگام گردآوری تیکت ها مشکلی پیش آمد.";
				CustomToast(errMsg, "error");
				setLoadingTickets(false);
				// toast.error(errMsg);
			});
	};

	useEffect(() => {
		fetchTickets();
	}, []);

	// const formik = useFormik({
	// 	initialValues: {
	// 		subject: "",
	// 		description: "",
	// 		image: null as File | null,
	// 	},
	// 	onSubmit: (values) => {
	// 		createTicket(values);
	// 		console.log(values);
	// 		// formik.resetForm();
	// 	},
	// });

	const Ticket = ({
		id,
		subject,
		description,
		status,
		created_at,
		image,
	}: {
		id: string;
		subject: string;
		description: string;
		status: string;
		created_at: string;
		image: string;
	}) => {
		return (
			<div className="w-full border-t-1 border-gray-300 first:border-t-0">
				{/* <div className="flex flex-row justify-between w-full h-full py-5 px-10 overflow-hidden relative border-t-1 border-gray-300 first:border-t-0 min-h-[250px]"> */}
				<div className="flex flex-col p-5 bg-[#F0EDEF] w-full h-full relative min-h-[250px]">
					{/* Top section */}
					<div className="flex flex-row justify-between overflow-hidden">
						{/* Right section */}
						<div className="w-5/6 flex flex-col justify-between">
							<div className="flex flex-col gap-3">
								<p className="text-start content-start w-full text-2xl font-bold">
									{translateSubjectToPersian(subject)}
								</p>

								<p className="break-words">{description}</p>
							</div>
						</div>
						{/* Left section */}
						<div className="min-w-[50px] pr-5 flex flex-row">
							{/* status */}
							{/* {image && <Image src={image} alt="تصویر تیکت" width={500} height={500} className="object-cover h-32 w-32 rounded-xl" />} */}
							{image && (
								<img
									src={image}
									className="h-full w-48 object-cover rounded-xl"
									alt="تصویر تیکت"
								/>
							)}
							<div className="w-64 pr-5 flex flex-col gap-4 justify-between">
								<div
									className={`flex flex-col items-center w-full align-middle h-full ${styles.status} py-8 justify-center gap-2`}
								>
									<span className="text-[#636363] font-bold">
										{created_at}{" "}
									</span>
									<div className="flex items-center gap-2">
										<span className="font-bold">
											{status}
										</span>
										<div
											className={`h-4 w-4 rounded-full ${
												status === "پاسخ داده شده"
													? "green"
													: "red"
											}-status shadow-md`}
										/>
									</div>
								</div>
								{/* <div
								className={`cta-neu-button flex ${styles.button} items-center content-center justify-center`}
							>
								<button
									className="cursor-pointer"
									onClick={() => {
										resolveTicket(id);
									}}
								>
									بستن تیکت
								</button>
							</div> */}
							</div>
						</div>
					</div>
					{/* Bottom section */}
					<div>
						<div className="flex flex-row justify-between w-full gap-4 mt-4">
							<div className="flex flex-row w-100 gap-4 mt-4">
								<div
									className={`cta-neu-button flex ${styles.button} items-center content-center justify-center`}
									onClick={() => setActiveCommentTicketId(id)}
								>
									<button className="cursor-pointer">
										افزودن نظر
									</button>
									<MessageCirclePlus />
								</div>
								<div
									className={`cta-neu-button flex ${styles.button} items-center content-center justify-center`}
									onClick={() => {
										const nextValue =
											showCommentBoxFor === id
												? null
												: id;
										setShowCommentBoxFor(nextValue);

										// Only fetch comments if we're opening the box
										if (nextValue !== null) {
											getComments(nextValue);
										}
									}}
								>
									{/* <div className="flex gap-2 justify-end"> */}
									<button className="cursor-pointer">
										{showCommentBoxFor === id
											? "بستن نظرات"
											: "مشاهده نظرات"}
									</button>
									<MessageCircleMore />
									{/* </div> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};

	const Comment = ({
		id,
		Author,
		body,
	}: {
		id: string;
		Author: {
			id?: number;
			first_name: string;
			last_name: string;
			owner_type: string;
		};
		body: string;
	}) => {
		return (
			<div className="flex flex-row justify-between w-full h-full bg-white gap-10 py-5 px-10 overflow-hidden relative border-t-1 border-gray-300 first:border-t-0 ">
				{/* Right section */}
				<div className="w-5/6 flex flex-col gap-3 justify-between">
					<div className="flex flex-col gap-3">
						<p className="max-w-[600px] break-words text-md">
							{body}
						</p>
						<p className="text-start content-start text-xs text-gray-600">
							از طرف {Author.first_name} {Author.last_name} ({" "}
							{Author.owner_type === "users" ? "کاربر" : "ادمین"}{" "}
							)
						</p>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="flex flex-col p-6 space-y-6">
			{/* <h2 className="text-right text-2xl font-bold text-blue-800">ثبت تیکت</h2> */}
			<Header header="ثبت تیکت" />

			{/* Ticket Creation Form */}
			<Formik
				initialValues={initialValuesForm}
				validationSchema={validationSchemaForm}
				onSubmit={(values, { setFieldValue }) =>
					createTicket(values, setFieldValue)
				}
			>
				{({ setFieldValue, values }) => (
					<Form
						// onSubmit={formik.handleSubmit}
						className={`flex flex-row w-full p-5 gap-5 bg-[#F0EDEF] text-gray-800 rounded-2xl overflow-hidden shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]`}
					>
						{loading && <TransparentLoading />}
						<CustomTextArea
							name="description"
							rows={7}
							placeholder="متن تیکت"
							// value={formik.values.description}
							// onChange={formik.handleChange}
							textareaClassName="bg-white"
							containerClassName={`-translate-y-6 w-5/7`}
						/>
						<div
							className={`
						flex flex-col gap-4 w-2/7`}
						>
							{/* <div
							className={`bg-white rounded-xl flex items-center gap-3 rtl ${styles.shadow}`}
						> */}
							<Select
								name="subject"
								value={values.subject}
								onValueChange={async (value) => {
									console.log(value);
									await setFieldValue(
										"subject",
										String(value)
									);
									console.log(values);
								}}
							>
								<SelectTrigger
									name="subject"
									className={`${styles.CustomInput} cursor-pointer w-full rtl`}
									id="subject"
									// style={{ width: "25vw" }}
								>
									<SelectValue placeholder="انتخاب عنوان" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>عنوان</SelectLabel>
										{subjectOptions.map((item, index) => (
											<SelectItem
												key={index}
												className="cursor-pointer"
												value={String(item.id)}
											>
												{item.label}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
							{/* <select
							name="subject"
							value={formik.values.subject}
							onChange={formik.handleChange}
							className="bg-white text-right outline-none w-full px-4 py-3 rounded-lg shadow-md border border-gray-300 text-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 appearance-none transition-all duration-300"
							>
							<option value="" className="text-gray-500">
								انتخاب عنوان
							</option>
							{subjectOptions.map((item) => (
								<option
									key={item.id}
									value={item.id}
									className="text-black"
								>
								{item.label}
								</option>
								))}
								</select> */}

							{/* <div className="text-orange-500">
							<List />
						</div> */}
							{/* </div> */}

							<div className="flex flex-row justify-between gap-4">
								{/* <div
								className={`bg-white  rounded-xl shadow-sm  w-5/7 ${styles.shadow}`}
							> */}

								{/* <textarea
								name="description"
								placeholder="متن تیکت"
								value={formik.values.description}
								onChange={formik.handleChange}
								rows={5}
								className=" bg-transparent text-right outline-none min-h-[250px] min-w-[750px] resize-none px-3 w-11/12"
								/> */}
								{/* </div> */}

								<div
									className={`p-4 rounded-xl shadow-sm text-right h-fit flex flex-col justify-between w-full ${styles.shadow}`}
								>
									<label
										htmlFor="image-upload"
										className="block mb-2 text-sm text-gray-600 text-center py-3 cursor-pointer"
									>
										بارگذاری تصویر (اختیاری)
									</label>

									{/* Custom Styled Button */}
									<label
										htmlFor="image-upload"
										className={`cursor-pointer bg-[#f0edef] cta-neu-button flex rounded-lg items-center content-center justify-center gap-2 w-full py-2`}
									>
										<span>انتخاب تصویر</span>
										<ImagePlus className="w-5 h-5" />
									</label>

									{/* Hidden File Input */}
									<input
										id="image-upload"
										name="image"
										type="file"
										accept="image/*"
										onChange={(e) => {
											const file =
												e?.currentTarget?.files?.[0];
											if (file) {
												setFieldValue(`image`, file);
												const previewUrl =
													URL.createObjectURL(file);
												setImagePreview(previewUrl);
											} else {
												setImagePreview(null);
											}
										}}
										className="hidden"
									/>

									{/* Image Preview */}
									{imagePreview && (
										<div className="mt-4">
											<img
												src={imagePreview}
												alt="پیش‌ نمایش تصویر"
												className="max-w-full h-auto rounded-lg shadow-md"
											/>
										</div>
									)}
								</div>
							</div>

							<div className="flex justify-end">
								<button
									type="submit"
									className={`cta-neu-button flex ${styles.button} items-center justify-center w-32 bg-white`}
								>
									ارسال
								</button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
			<Header header="تیکت‌های قبلی" />
			{/* Ticket List */}
			<div className="space-y-4">
				{loadingTickets ? (
					<LoadingSpinner />
				) : tickets.length === 0 ? (
					<div className="text-center py-8 text-gray-500">
						هیچ تیکتی موجود نیست
					</div>
				) : (
					<div className="flex flex-col text-gray-800 rounded-2xl overflow-hidden shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
						{tickets.map((ticket, index) => (
							<>
								<Ticket
									id={ticket.id}
									key={index}
									subject={ticket.subject}
									description={ticket.description}
									status={
										ticket.status === "resolved"
											? "پاسخ داده شده"
											: "بررسی نشده"
									}
									created_at={new Date(
										ticket.created_at
									).toLocaleDateString("fa-IR")}
									image={ticket.image}
								/>
								{activeCommentTicketId === ticket.id && (
									<Formik
										initialValues={initialCommentValuesForm}
										validationSchema={
											commentValidationSchemaForm
										}
										onSubmit={(values) => {
											createComment(
												values.comment,
												activeCommentTicketId
											);
											setActiveCommentTicketId(null);
										}}
									>
										{({ setFieldValue, values }) => (
											<Form>
												<div className="flex bg-[#F0EDEF] pb-4 items-center justify-center">
													<div className="px-10 rounded-lg w-full text-right space-y-8">
														<h3 className="text-lg font-bold">
															ثبت نظر
														</h3>
														<CustomTextArea
															name="comment"
															rows={3}
															textareaClassName="bg-white"
															placeholder="متن نظر..."
														/>

														<div className="flex justify-between">
															<button
																onClick={() =>
																	setActiveCommentTicketId(
																		null
																	)
																}
																className={`text-gray-500 cta-neu-button cursor-pointer w-1/9 ${styles.button}`}
															>
																لغو
															</button>
															<button
																className={`text-left cta-neu-button flex ${styles.button} items-center content-center justify-center w-1/9`}
															>
																ثبت نظر
															</button>
														</div>
													</div>
												</div>
											</Form>
										)}
									</Formik>
									// <div className="flex bg-[#F0EDEF] pb-4 items-center justify-center">
									// 	<div className="px-10 rounded-lg w-full text-right space-y-4">
									// 		<h3 className="text-lg font-bold">
									// 			ثبت نظر
									// 		</h3>
									// 		<div
									// 			className={`bg-white p-6 rounded-xl shadow-xl ${styles.shadow}`}
									// 		>
									// 			<textarea
									// 				value={commentInput}
									// 				onChange={(e) =>
									// 					setCommentInput(
									// 						e.target.value
									// 					)
									// 				}
									// 				rows={3}
									// 				className={`w-full p-2 resize-none outline-none focus:ring-0 focus:outline-none bg-white`}
									// 				placeholder="متن نظر..."
									// 			/>
									// 		</div>

									// 		<div className="flex justify-between">
									// 			<button
									// 				onClick={() =>
									// 					setActiveCommentTicketId(
									// 						null
									// 					)
									// 				}
									// 				className={`text-gray-500 cta-neu-button cursor-pointer w-1/9 ${styles.button}`}
									// 			>
									// 				لغو
									// 			</button>
									// 			<button
									// 				onClick={() => {
									// 					createComment(
									// 						commentInput,
									// 						activeCommentTicketId
									// 					);
									// 					setActiveCommentTicketId(
									// 						null
									// 					);
									// 					setCommentInput("");
									// 				}}
									// 				className={`text-left cta-neu-button flex ${styles.button} items-center content-center justify-center w-1/9`}
									// 			>
									// 				ثبت نظر
									// 			</button>
									// 		</div>
									// 	</div>
									// </div>
								)}
								{/* Comments */}
								{showCommentBoxFor === ticket.id && (
									<div className="bg-[#F0EDEF] p-8 rounded text-sm flex flex-col gap-4">
										<h2 className="text-right text-2xl font-bold text-blue-800 pr-7">
											نظرات
										</h2>
										{comments.length > 0 ? (
											<div className="flex flex-col text-gray-800 rounded-md overflow-hidden">
												{/* <div className="pb-1 border-t border-gray-400"> */}
												{comments.map(
													(comment, index) => (
														<Comment
															key={index}
															id={ticket.id}
															Author={
																comment.Author
															}
															body={comment.body}
														/>
													)
												)}
											</div>
										) : (
											<div className="text-gray-400 pr-7">
												نظری ثبت نشده است
											</div>
										)}
										<button
											className={`text-left cursor-pointer cta-neu-button flex ${styles.button} self-end justify-center w-1/9`}
											onClick={() => {
												setShowCommentBoxFor(null);
												setComments([]);
											}}
										>
											بستن
										</button>
									</div>
								)}
							</>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default TicketSupportPage;
