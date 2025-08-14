"use client";
import { useCallback, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { MessageCirclePlus, MessageCircleMore, XIcon } from "lucide-react";
import React from "react";
import styles from "./Tickets.module.css";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import LoadingOnButton from "@/components/Loading/LoadinOnButton/LoadingOnButton";
import { getData, postData } from "@/src/services/apiHub";
import useHasPermission from "@/src/functions/hasPermission";
import Ticket from "./Ticket";
import NoRecordFound from "@/components/NoRecordFound/NoRecordFound";
import FilterSection from "@/components/FilterSection/FilterSection";
import CustomPagination from "@/components/Custom/CustomPagination/CustomPagination";

interface Ticket {
    id: string;
    subject: string;
    description: string;
    status: string;
    image: string;
    created_at: string;
    createdAt: string;
    owner: {
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
    author: {
        id: number;
        firstName: string;
        lastName: string;
    };
    authorType: string;
    body: string;
}

const initialValuesForm = { comment: "" };

const commentValidationSchemaForm = Yup.object({
    comment: Yup.string().required("نظر الزامی است"),
});

const TicketSupportPage = () => {
    const {
        hasPermission: hasCloseTicketPermission,
        loading: permissionLoading1,
    } = useHasPermission("ticket.close");
    const {
        hasPermission: hasRespondTicketPermission,
        loading: permissionLoading2,
    } = useHasPermission("ticket.respond");
    const {
        hasPermission: hasCommentTicketPermission,
        loading: permissionLoading3,
    } = useHasPermission("ticket.comment");
    const [putCommentLoading, setPutCommentLoading] = useState<boolean>(false);

    const [isLoadingComments, setIsLoadingComments] = useState(false);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [activeCommentTicketId, setActiveCommentTicketId] = useState<
        string | null
    >(null);
    const [showCommentBoxFor, setShowCommentBoxFor] = useState<string | null>(
        null
    );
    const [loading, setLoading] = useState<boolean>(true);
    const [status, setStatus] = useState<string>("");
    const [resultPerPage, setResultPerPage] = useState<string>("");
    const [paginationInfo, setPaginationInfo] = useState<
        paginationInfoType | undefined
    >(undefined);
    const [page, setPage] = useState<number>(1);
    const [sortBy, setSortBy] = useState<string>("");
    const [asc, setAsc] = useState<boolean>(false);

    const [query, setQuery] = useState<string>("");
    const createComment = async (
        comment: string,
        activeCommentTicketId: string
    ) => {
        setPutCommentLoading(true);
        const formData = { body: comment };
        postData({
            endPoint: `/v1/admin/ticket/${activeCommentTicketId}/comments`,
            data: formData,
        })
            .then((data) => {
                CustomToast(data?.message, "success");
                getComments(activeCommentTicketId);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setPutCommentLoading(false);
                setActiveCommentTicketId(null);
            });
    };

    const getComments = async (showCommentBoxFor: string | null) => {
        setIsLoadingComments(true);
        getData({
            endPoint: `/v1/admin/ticket/${showCommentBoxFor}/comments`,
        })
            .then((data) => {
                setComments(data?.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoadingComments(false));
    };

    const fetchTickets = useCallback(() => {
        setLoading(true);
        getData({
            endPoint: `/v1/admin/ticket`,
            params: {
                status,
                page,
                sortBy,
                asc,
                pageSize: resultPerPage,
                query,
            },
        })
            .then((data) => {
                console.log(data?.data?.data);
                setTickets(data?.data?.data);
                setPaginationInfo(data?.data?.pagination);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [status, resultPerPage, page, sortBy, asc, query]);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    const Comment = ({
        id,
        auther,
        authorType,
        body,
    }: {
        id: string;
        auther: {
            id?: number;
            firstName: string;
            lastName: string;
        };
        authorType: string;
        body: string;
    }) => {
        return (
            <div className="flex flex-row justify-between w-full h-full bg-white gap-10 py-5 px-10 relative border-t-1 border-gray-300 first:border-t-0 ">
                {/* <div className="w-full border-t-1 border-gray-300 first:border-t-0"> */}
                {/* Right section */}
                <div className="w-5/6 flex flex-col gap-3 justify-between">
                    <div className="flex flex-col gap-3">
                        <p className="max-w-[600px] break-words text-md">
                            {body}
                        </p>
                        <p className="text-start content-start text-xs text-gray-600">
                            از طرف {auther.firstName} {auther.lastName} ({" "}
                            {authorType === "users" ? "کاربر" : "ادمین"} )
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {/* Ticket List */}
            <FilterSection
                header="تیکت‌ها"
                fieldName="تیکت"
                statusesListApiRoute={`/v1/ticket/status`}
                status={status}
                setStatus={setStatus}
                resultPerPage={resultPerPage}
                setResultPerPage={setResultPerPage}
                setPage={setPage}
                columnsListApiRoute={`/v1/ticket/sortable`}
                asc={asc}
                setAsc={setAsc}
                sortBy={sortBy}
                setSortBy={setSortBy}
                query={query}
                setQuery={setQuery}
                onSearchSubmit={() => fetchTickets()}
            />
            {loading ? (
                <LoadingSpinner />
            ) : tickets && tickets?.length === 0 ? (
                <NoRecordFound text="هیچ تیکتی یافت نشد." />
            ) : (
                <div className="flex flex-col text-gray-800 rounded-2xl overflow-hidden shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
                    {tickets &&
                        tickets?.map((ticket, index) => (
                            <div
                                key={`t-${index}`}
                                className="border-t-1 border-gray-300 first:border-t-0"
                            >
                                <Ticket
                                    id={ticket?.id}
                                    subject={ticket?.subject}
                                    description={ticket?.description}
                                    status={ticket?.status}
                                    createdAt={new Date(
                                        ticket.created_at ?? ticket.createdAt
                                    ).toLocaleDateString("fa-IR")}
                                    image={ticket?.image}
                                    owner={ticket?.owner}
                                    fetchTickets={fetchTickets}
                                    hasRespondTicketPermission={
                                        hasRespondTicketPermission
                                    }
                                    hasCloseTicketPermission={
                                        hasCloseTicketPermission
                                    }
                                    setActiveCommentTicketId={
                                        setActiveCommentTicketId
                                    }
                                    getComments={getComments}
                                    showCommentBoxFor={showCommentBoxFor}
                                    setShowCommentBoxFor={setShowCommentBoxFor}
                                />

                                {activeCommentTicketId === ticket?.id && (
                                    <Formik
                                        initialValues={initialValuesForm}
                                        validationSchema={
                                            commentValidationSchemaForm
                                        }
                                        onSubmit={(values) => {
                                            createComment(
                                                values?.comment,
                                                activeCommentTicketId
                                            );
                                        }}
                                    >
                                        {({ setFieldValue, values }) => (
                                            <Form>
                                                {hasCommentTicketPermission && (
                                                    <div className="flex bg-[#F0EDEF] relative pb-4 items-center justify-center">
                                                        <div className="px-10 rounded-lg w-full text-right space-y-8">
                                                            {hasRespondTicketPermission && (
                                                                <h3 className="text-lg font-bold">
                                                                    ثبت نظر
                                                                </h3>
                                                            )}
                                                            <CustomTextArea
                                                                textareaClassName="bg-white"
                                                                name="comment"
                                                                rows={3}
                                                                placeholder="متن نظر..."
                                                            />

                                                            <div className="flex justify-between md:gap-0 gap-4 mb-4">
                                                                <button
                                                                    onClick={() =>
                                                                        setActiveCommentTicketId(
                                                                            null
                                                                        )
                                                                    }
                                                                    className={`text-gray-500 text-[18px] md:text-[20px] cta-neu-button cursor-pointer md:w-2/9 ${styles.button}`}
                                                                >
                                                                    لغو
                                                                </button>
                                                                <button
                                                                    className={`text-[18px] md:text-[20px] text-left cta-neu-button flex ${styles.button} items-center content-center justify-center md:w-2/9`}
                                                                >
                                                                    {putCommentLoading ? (
                                                                        <LoadingOnButton
                                                                            size={
                                                                                28
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <p className="text-nowrap">
                                                                            ثبت
                                                                            نظر
                                                                        </p>
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Form>
                                        )}
                                    </Formik>
                                )}
                                {/* Comments */}
                                {showCommentBoxFor === ticket.id && (
                                    <div className="bg-[#F0EDEF] relative p-8 rounded text-sm flex flex-col gap-4">
                                        <h2 className="text-right text-2xl font-bold text-blue-800 pr-7">
                                            نظرات
                                        </h2>
                                        {isLoadingComments ? (
                                            <LoadingSpinner />
                                        ) : comments.length > 0 ? (
                                            <div className="flex flex-col text-gray-800 rounded-md overflow-y-auto no-scrollbar max-h-[60vh]">
                                                {/* <div className="pb-1 border-t border-gray-400"> */}
                                                {comments.map(
                                                    (comment, index) => (
                                                        <Comment
                                                            key={`c-${index}`}
                                                            id={ticket?.id}
                                                            auther={
                                                                comment?.author
                                                            }
                                                            authorType={
                                                                comment?.authorType
                                                            }
                                                            body={comment?.body}
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
                                            className={`text-left cursor-pointer cta-neu-button flex ${styles.button} self-end justify-center md:w-1/8 w-1/4`}
                                            onClick={() => {
                                                setShowCommentBoxFor(null);
                                                setComments([]);
                                            }}
                                        >
                                            بستن
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            )}
            <CustomPagination
                currentPage={page}
                setCurrentPage={setPage}
                paginationInfo={paginationInfo}
            />
        </>
    );
};

export default TicketSupportPage;
