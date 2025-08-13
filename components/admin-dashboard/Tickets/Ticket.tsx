import React, { useState } from "react";
import styles from "./Tickets.module.css";
import { MessageCircleMore, MessageCirclePlus, XIcon } from "lucide-react";
import LoadingOnButton from "@/components/Loading/LoadinOnButton/LoadingOnButton";
import { postData } from "@/src/services/apiHub";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";

export default function Ticket({
    id,
    subject,
    description,
    status,
    created_at,
    image,
    owner,
    fetchTickets,
    hasRespondTicketPermission,
    hasCloseTicketPermission,
    setActiveCommentTicketId,
    getComments,
    showCommentBoxFor,
    setShowCommentBoxFor,
}: {
    id: string;
    subject: string;
    description: string;
    status: string;
    created_at: string;
    image: string;
    owner: {
        id?: number;
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
        nationalID: string;
        profilePic: string;
        status: string;
    };
    fetchTickets: () => void;
    hasRespondTicketPermission: boolean;
    hasCloseTicketPermission: boolean;
    setActiveCommentTicketId: any;
    getComments: (showCommentBoxFor: string | null) => void;
    setShowCommentBoxFor: any;
    showCommentBoxFor: any;
}) {
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
    const [resolveTicketLoading, setResolveTicketLoading] =
        useState<boolean>(false);
    const resolveTicket = async (ticketId: string) => {
        setResolveTicketLoading(true);
        postData({ endPoint: `/v1/admin/ticket/${ticketId}/resolve` })
            .then((data) => {
                CustomToast(data?.message, "success");
                fetchTickets();
            })
            .catch((err) => console.log(err))
            .finally(() => setResolveTicketLoading(false));
    };
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
                                از طرف {owner?.firstName} {owner?.lastName}
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
                                    {created_at}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold">{status}</span>
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
                            {hasRespondTicketPermission && (
                                <div
                                    className={`cta-neu-button flex ${styles.button} items-center content-center justify-center`}
                                    onClick={() => setActiveCommentTicketId(id)}
                                >
                                    <button className="cursor-pointer">
                                        افزودن نظر
                                    </button>
                                    <MessageCirclePlus />
                                </div>
                            )}
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
                        {/* <div
								className={`cta-neu-button flex ${styles.button} items-center mt-4 content-center w-50 justify-center`}
							> */}
                        {status === "بررسی نشده" &&
                            hasCloseTicketPermission && (
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
}
