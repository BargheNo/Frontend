"use client";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import {
	MessageCirclePlus,
	MessageCircleMore,
	ArrowLeft,
	XIcon,
	MessageCircle,
} from "lucide-react";
import React from "react";
import styles from "./Tickets.module.css";
import generateErrorMessage from "@/src/functions/handleAPIErrors";
import { toast } from "sonner";
import Header from "@/components/Header/Header";
import Image from "next/image";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import LoadingOnButton from "@/components/Loading/LoadinOnButton/LoadingOnButton";

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

const initialValuesForm = { comment: "" };

const commentValidationSchemaForm = Yup.object({
	comment: Yup.string().required("نظر الزامی است"),
});

const TicketSupportPage = () => {
	const [putCommentLoading, setPutCommentLoading] = useState<boolean>(false);
	const [resolveTicketLoading, setResolveTicketLoading] =
		useState<boolean>(false);

	const [isLoadingComments, setIsLoadingComments] = useState(false);
	const [tickets, setTickets] = useState<Ticket[]>([]);
	const [comments, setComments] = useState<Comment[]>([]);
	const [activeCommentTicketId, setActiveCommentTicketId] = useState<
		string | null
	>(null);
	const [showCommentBoxFor, setShowCommentBoxFor] = useState<string | null>(
		null
	);
	const accessToken = useSelector(
		(state: RootState) => state.user.accessToken
	);
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
	const resolveTicket = async (ticketId: string) => {
		setResolveTicketLoading(true);
		try {
			const response = await fetch(
				`http://46.249.99.69:8080/v1/admin/ticket/${ticketId}/resolve`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({}),
				}
			);

			setResolveTicketLoading(false);
			if (!response.ok) {
				throw new Error("Failed to resolve ticket");
			}

			const result = await response.json();
			// toast.success(result?.message);
			CustomToast(result?.message, "success");
			fetchTickets();

			// Optionally refresh ticket list or update UI
		} catch (error: any) {
			console.log(error);
			const errMsg =
				generateErrorMessage(error) ||
				"هنگام بررسی تیکت مشکلی پیش آمد.";
			// toast.error(errMsg);
			CustomToast(errMsg, "error");
			setResolveTicketLoading(false);
		}
	};

	const createComment = async (
		comment: string,
		activeCommentTicketId: string
	) => {
		setPutCommentLoading(true);
		try {
			console.log("comment", comment);
			const response = await fetch(
				`http://46.249.99.69:8080/v1/admin/ticket/${activeCommentTicketId}/comments`,
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
			CustomToast(result?.message, "success");
			getComments(activeCommentTicketId);
			setPutCommentLoading(false);

			setActiveCommentTicketId(null);
		} catch (error: any) {
			const errMsg =
				generateErrorMessage(error) ||
				"هنگام ایجاد نظر جدید مشکلی پیش آمد.";
			// toast.error(errMsg);
			CustomToast(errMsg, "error");
			setPutCommentLoading(false);

			setActiveCommentTicketId(null);
		}
	};

	const getComments = async (showCommentBoxFor: string | null) => {
		// setComments([]);
		setIsLoadingComments(true);
		fetch(
			`http://46.249.99.69:8080/v1/admin/ticket/${showCommentBoxFor}/comments`,
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
				setIsLoadingComments(false);
			})
			.catch((err: any) => {
				const errMsg =
					generateErrorMessage(err) ||
					"هنگام گردآوری نظرات مشکلی به وجود آمد.";
				// toast.error(errMsg);
				CustomToast(errMsg, "error");
				setIsLoadingComments(false);
			});
	};

	const fetchTickets = () => {
		fetch("http://46.249.99.69:8080/v1/admin/ticket", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setTickets(data.data);
			})
			.catch((err) => {
				const errMsg =
					generateErrorMessage(err) ||
					"هنگام گردآوری تیکت ها مشکلی پیش آمد.";
				// toast.error(errMsg);
				CustomToast(errMsg, "error");
			});
	};

	useEffect(() => {
		fetchTickets();
	}, []);

	const Ticket = ({
		id,
		subject,
		description,
		status,
		created_at,
		image,
		Owner,
	}: {
		id: string;
		subject: string;
		description: string;
		status: string;
		created_at: string;
		image: string;
		Owner: {
			id?: number;
			firstName: string;
			lastName: string;
			phone: string;
			email: string;
			nationalID: string;
			profilePic: string;
			status: string;
		};
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
								<p className="text-start content-start w-full text-lg ">
									از طرف {Owner.firstName} {Owner.lastName}
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
							<div className="w-52 pr-5 flex flex-col gap-4 justify-between">
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
												status === "پاسخ دادید"
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
							{/* <div
								className={`cta-neu-button flex ${styles.button} items-center mt-4 content-center w-50 justify-center`}
							> */}
							{status === "بررسی نشده" && (
								<button
									className={`cursor-pointer cta-neu-button flex ${styles.button} items-center mt-4 content-center w-50 justify-center`}
									onClick={() => {
										resolveTicket(id);
									}}
								>
									{resolveTicketLoading ? (
										<LoadingOnButton />
									) : (
										<div className="flex gap-[2px] items-center">
											بستن تیکت
											<XIcon />
										</div>
									)}
								</button>
							)}
							{/* </div> */}
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
				{/* <div className="w-full border-t-1 border-gray-300 first:border-t-0"> */}
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
		<>
			{/* <div className="flex flex-col py-6 w-full"> */}
			{/* Ticket List */}
			{tickets.length === 0 ? (
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
										? "پاسخ دادید"
										: "بررسی نشده"
								}
								created_at={new Date(
									ticket.created_at
								).toLocaleDateString("fa-IR")}
								image={ticket.image}
								Owner={ticket.Owner}
							/>

							{activeCommentTicketId === ticket.id && (
								<Formik
									initialValues={initialValuesForm}
									validationSchema={
										commentValidationSchemaForm
									}
									onSubmit={(values) => {
										createComment(
											values.comment,
											activeCommentTicketId
										);
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
														textareaClassName="bg-white"
														name="comment"
														rows={3}
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
															{putCommentLoading ? (
																<LoadingOnButton
																	size={28}
																/>
															) : (
																<p>ثبت نظر</p>
															)}
														</button>
													</div>
												</div>
											</div>
										</Form>
									)}
								</Formik>
							)}
							{/* Comments */}
							{showCommentBoxFor === ticket.id && (
								<div className="bg-[#F0EDEF] p-8 rounded text-sm flex flex-col gap-4">
									<h2 className="text-right text-2xl font-bold text-blue-800 pr-7">
										نظرات
									</h2>
									{isLoadingComments ? (
										<LoadingSpinner />
									) : comments.length > 0 ? (
										<div className="flex flex-col text-gray-800 rounded-md overflow-hidden">
											{/* <div className="pb-1 border-t border-gray-400"> */}
											{comments.map((comment, index) => (
												<Comment
													key={index}
													id={ticket.id}
													Author={comment.Author}
													body={comment.body}
												/>
											))}
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
			{/* </div> */}
		</>
	);
};

export default TicketSupportPage;
