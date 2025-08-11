"use client";
import React, { useRef, useState, useEffect } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import ImageTool from "ert-image";
import { FileUp, Save, Settings } from "lucide-react";
import { cn } from "@/lib/utils.ts";
import FaTranslation from "./FaTranslation.ts";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import { getData, postData, putData } from "@/src/services/apiHub.tsx";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import CustomToast from "@/components/Custom/CustomToast/CustomToast.tsx";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CustomInput from "@/components/Custom/CustomInput/CustomInput.tsx";
import AddAnnounceForm from "../AddAnnounce/AddAnnounceForm.tsx";

export default function AnnounceEditor({
    newsID,
    onlyView = false,
}: {
    newsID: string;
    onlyView?: boolean;
}) {
    const editorRef = useRef<EditorJS | null>(null);
    const holderRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<OutputData | null>(null);
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("پیش نویس");
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const queryClient = useQueryClient();

    const getter = async (id: string) => {
        try {
            const responce = await getData({
                endPoint: `/v1/admin/news/${newsID}/media/${id}`,
            });
            return responce.data;
        } catch (error) {
            console.log("Error getting image:", error);
            return { success: 0, error: "Image fetch failed" };
        }
    };

    const uploadByFile = async (file: File) => {
        const formData = new FormData();
        formData.append("media", file);
        try {
            const response = await postData({
                endPoint: `/v1/admin/news/${newsID}/media`,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
            return { success: 1, file: { id: response.data.toString() } };
        } catch (error) {
            console.log("Error uploading image:", error);
            return { success: 0, error: "Image upload failed" };
        }
    };

    const handelSave = useMutation({
        mutationFn: async () => {
            const savedData = await editorRef.current?.save();
            if (savedData) {
                setData(savedData);
                return await putData({
                    endPoint: `/v1/admin/news/${newsID}`,
                    data: {
                        content: JSON.stringify(savedData),
                        title: title,
                        // status: 2,
                    },
                });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["news"] });
            CustomToast("خبر با موفقیت ذخیره شد", "success");
        },
        onError: (err) => console.log("Mutation error:", err),
    });

    const handelPublish = useMutation({
        mutationFn: async () =>
            putData({ endPoint: `/v1/admin/news/${newsID}/publish` }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["news"] });
            CustomToast("خبر با موفقیت منتشر شد", "success");
        },
    });

    const handelUnpublish = useMutation({
        mutationFn: async () =>
            putData({ endPoint: `/v1/admin/news/${newsID}/unpublish` }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["news"] });
            CustomToast("خبر با موفقیت از انتشار خارج شد", "success");
        },
    });

    useQuery({
        queryKey: ["news", newsID],
        queryFn: async () => {
            try {
                const responce = await getData({
                    endPoint: `/v1/admin/news/${newsID}`,
                });
                if (responce.statusCode === 200) {
                    setTitle(responce.data.title);
                    setStatus(responce.data.status);
                    if (responce.data.content) {
                        setData(JSON.parse(responce.data.content));
                    } else {
                        setData({
                            blocks: [
                                {
                                    type: "paragraph",
                                    data: {
                                        text: onlyView
                                            ? "این اعلان خالی است!"
                                            : "متن اعلان خود را اینجا بنویسید...",
                                    },
                                },
                            ],
                        });
                    }
                }
                return responce;
            } catch (error) {
                console.log(error);
                router.push("/not-found");
            }
        },
    });

    useEffect(() => {
        if (!editorRef.current) {
            setTimeout(() => {
                if (!holderRef.current || data == null) return;
                const editor = new EditorJS({
                    holder: holderRef.current!,
                    autofocus: true,
                    data: data,
                    tools: {
                        header: {
                            class: Header,
                            inlineToolbar: ["link"],
                            config: {
                                placeholder: "یک عنوان وارد کنید",
                                levels: [1, 2, 3, 4, 5, 6],
                                defaultLevel: 3,
                            },
                        },
                        list: { class: List, inlineToolbar: true },
                        paragraph: { class: Paragraph, inlineToolbar: true },
                        image: {
                            class: ImageTool,
                            config: {
                                byId: `/v1/admin/news/${newsID}/media`,
                                field: "media",
                                uploader: { uploadByFile },
                                getter: { getById: getter },
                            },
                        },
                    } as any,
                    i18n: FaTranslation(),
                    readOnly: onlyView,
                });
                editorRef.current = editor;
                editor.isReady.then(() => setLoading(false));
            }, 1000);
        }
    }, [data]);

    return (
        <>
            {loading && (
                <LoadingSpinner className="absolute top-0 left-0 right-0 bottom-0 bg-white z-50" />
            )}
            <div className="flex flex-col items-center justify-evenly gap-3 w-[70vw] mx-auto">
                {!onlyView && (
                    <div className="flex justify-between items-center w-full self-end rtl">
                        <div className="text-bold text-2xl">ویرایشگر</div>
                        <Dialog>
                            <DialogTrigger>
                                <div className="flex items-center gap-1 cursor-pointer hover:underline">
                                    <span className="text-blue-400">
                                        ویرایش جزئیات
                                    </span>
                                    <Settings
                                        className="text-blue-400"
                                        size={16}
                                    />
                                </div>
                            </DialogTrigger>
                            <DialogContent className="flex flex-col items-center justify-center w-[90vw]! h-fit! p-10">
                                <AddAnnounceForm edit announceId={newsID} />
                            </DialogContent>
                        </Dialog>
                    </div>
                )}
                {onlyView ? (
                    <div className="flex flex-col justify-center items-center p-5 h-[70vh] w-[85vw] z-30">
                        <div className="w-full h-full bg-warm-white neo-card rounded-md p-2 ">
                            <div className="overflow-y-auto overflow-x-hidden no-scrollbar neo-card-rev w-full h-full rounded-md p-3">
                                <div
                                    ref={holderRef}
                                    id="editorjs"
                                    className={cn("rtl h-full w-full")}
                                ></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-[70vw]! h-[60vh]! bg-warm-white neo-card rounded-md p-2 ">
                            <div className="overflow-y-auto overflow-x-hidden no-scrollbar neo-card-rev w-full h-full rounded-md p-3">
                                <div
                                    ref={holderRef}
                                    id="editorjs"
                                    className={cn("rtl h-full w-full")}
                                ></div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2 lg:gap-10 mt-1 lg:mt-2 lg:flex-row ">
                            <button
                                className="flex gap-3 items-center bg-fire-orange px-8 py-1 rounded-full! neo-btn text-white font-bold text-md"
                                onClick={() => handelSave.mutate()}
                            >
                                <span>ذخیره</span>
                                <Save />
                            </button>
                            {status === "پیش نویس" ? (
                                <button
                                    className="flex gap-3 items-center bg-fire-orange px-8 py-1 rounded-full! neo-btn text-white font-bold text-md"
                                    onClick={() => handelPublish.mutate()}
                                >
                                    <span>انتشار</span>
                                    <FileUp />
                                </button>
                            ) : (
                                <button
                                    className="flex gap-3 items-center bg-fire-orange px-8 py-1 rounded-full! neo-btn text-white font-bold text-md"
                                    onClick={() => handelUnpublish.mutate()}
                                >
                                    <span>پیش نویس</span>
                                    <FileUp />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
