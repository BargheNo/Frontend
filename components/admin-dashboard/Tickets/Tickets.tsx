"use client";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { MessageCirclePlus, MessageCircleMore, ArrowLeft } from "lucide-react";
import React from "react";
import styles from "./Tickets.module.css";
import generateErrorMessage from "@/src/functions/handleAPIErrors";
import { toast } from "sonner";
import Header from "@/components/Header/Header";
import Image from "next/image";

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

const TicketSupportPage = () => {
	const [isLoadingComments, setIsLoadingComments] = useState(false);
	const [tickets, setTickets] = useState<Ticket[]>([]);
	const [comments, setComments] = useState<Comment[]>([]);
	const [activeCommentTicketId, setActiveCommentTicketId] = useState<
		string | null
	>(null);
	const [showCommentBoxFor, setShowCommentBoxFor] = useState<string | null>(
		null
	);
	const [commentInput, setCommentInput] = useState("");
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

			if (!response.ok) {
				throw new Error("Failed to resolve ticket");
			}

			const result = await response.json();
			toast.success(result?.message);
			fetchTickets();

			// Optionally refresh ticket list or update UI
		} catch (error: any) {
			const errMsg =
				generateErrorMessage(error) ||
				"هنگام بررسی تیکت مشکلی پیش آمد.";
			toast.error(errMsg);
		}
	};

	const createComment = async (
		comment: string,
		activeCommentTicketId: string
	) => {
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
			toast.success(result?.message);
			getComments(activeCommentTicketId);
		} catch (error: any) {
			const errMsg =
				generateErrorMessage(error) ||
				"هنگام ایجاد نظر جدید مشکلی پیش آمد.";
			toast.error(errMsg);
		}
	};

	const getComments = async (showCommentBoxFor: string | null) => {
		setComments([]);
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
			})
			.catch((err: any) => {
				const errMsg =
					generateErrorMessage(err) ||
					"هنگام گردآوری نظرات مشکلی به وجود آمد.";
				toast.error(errMsg);
			}).finally;
		{
			setIsLoadingComments(false);
		}
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
				toast.error(errMsg);
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
			<div className="flex flex-row justify-between w-full h-full py-5 px-10 overflow-hidden relative border-t-1 border-gray-300 first:border-t-0 min-h-[250px]">
				{/* Right section */}
				<div className="w-5/6 flex flex-col justify-between">
					<div className="flex flex-col gap-3">
						<p className="text-start content-start w-full text-2xl font-bold">
							{translateSubjectToPersian(subject)}
						</p>
						<p className="text-start content-start w-full text-lg ">
							از طرف {Owner.firstName} {Owner.lastName}
						</p>

						<p className="max-w-[600px] break-words">
							{description}
						</p>
					</div>
					<div className="flex flex-row w-100 gap-4">
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
									showCommentBoxFor === id ? null : id;
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
				<div className="flex items-center ">
					{/* {image && <Image src={image} alt="تصویر تیکت" width={500} height={500} className="object-cover h-32 w-32 rounded-xl" />} */}
					{image && (
						<img
							src={image}
							className="object-cover rounded-xl "
							alt="تصویر تیکت"
						/>
					)}
				</div>
				{/* Left section */}
				<div className="w-50 min-w-[50px] pr-5 flex flex-col justify-around">
					{/* status */}
					<div
						className={`flex flex-col  items-center ${styles.status} py-4 gap-2`}
					>
						<span className="text-[#636363] font-bold">
							{created_at}{" "}
						</span>
						<div className="flex items-center gap-2">
							<span className="font-bold">{status}</span>
							<div
								className={`h-4 w-4 rounded-full ${
									status === "پاسخ دادید" ? "green" : "red"
								}-status shadow-md`}
							/>
						</div>
					</div>
					<div
						className={`cta-neu-button flex ${styles.button} items-center content-center justify-center`}
					>
						<button
							className="cursor-pointer"
							onClick={() => {
								resolveTicket(id);
							}}
						>
							پاسخ
						</button>
						<ArrowLeft />
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
		<div className="flex flex-col py-6 space-y-6 w-full">
			<Header header="تیکت‌های قبلی" />
			{/* Ticket List */}
			<div className="space-y-4">
				{tickets.length === 0 ? (
					<div className="text-center py-8 text-gray-500">
						هیچ تیکتی موجود نیست
					</div>
				) : (
					tickets.map((ticket) => (
						<div key={ticket.id} className="list">
							<Ticket
								id={ticket.id}
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
								<div className="flex items-center justify-center">
									<div className="bg-white px-10 rounded-lg w-full text-right space-y-4">
										<h3 className="text-lg font-bold">
											ثبت نظر
										</h3>
										<div
											className={`bg-white p-6 rounded-xl shadow-xl ${styles.shadow}`}
										>
											<textarea
												value={commentInput}
												onChange={(e) =>
													setCommentInput(
														e.target.value
													)
												}
												rows={3}
												className={`w-full p-2 resize-none outline-none focus:ring-0 focus:outline-none `}
												placeholder="متن نظر..."
											/>
										</div>

										<div className="flex justify-between">
											<button
												onClick={() =>
													setActiveCommentTicketId(
														null
													)
												}
												className="text-gray-500 hover:underline"
											>
												لغو
											</button>
											<button
												onClick={() => {
													createComment(
														commentInput,
														activeCommentTicketId
													);
													setActiveCommentTicketId(
														null
													);
													setCommentInput("");
												}}
												className={`text-left cta-neu-button flex ${styles.button} items-center content-center justify-center w-1/9`}
											>
												ثبت نظر
											</button>
										</div>
									</div>
								</div>
							)}
							{/* Comments */}
							{showCommentBoxFor === ticket.id && (
								<div className="bg-gray-100 p-3 rounded text-sm space-y-2 mt-2">
									<h2 className="text-right text-2xl font-bold text-blue-800 pr-7">
										نظرات
									</h2>
									{comments.length > 0 ? (
										comments.map((comment, i) => (
											<div
												key={i}
												className="pb-1 border-t border-gray-400"
											>
												<Comment
													id={ticket.id}
													Author={comment.Author}
													body={comment.body}
												/>
											</div>
										))
									) : (
										<div className="text-gray-400 pr-7">
											نظری ثبت نشده است
										</div>
									)}
									<div
										className={`text-left cta-neu-button flex ${styles.button} items-center content-center justify-center w-1/9`}
									>
										<button
											onClick={() => {
												setShowCommentBoxFor(null);
												setComments([]);
											}}
											className="cursor-pointer"
										>
											بستن
										</button>
									</div>
								</div>
							)}
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default TicketSupportPage;
