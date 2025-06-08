"use client";
import React, { useRef, useState } from "react";
import "./Editor.css";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import FaTranslation from "./FaTranslation.ts";
import { useEffect } from "react";
import { cn } from "@/lib/utils.ts";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner.tsx";
import { FileUp, Save } from "lucide-react";

import ImageTool from "ert-image";
import { getData, postData, putData } from "@/src/services/apiHub.tsx";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
	const [status, setStatus] = useState(2);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	const getter = async (id: string) => {
		try {
			console.log("id to url: ", `/v1/admin/news/${newsID}/media/${id}`);
			const responce = await getData({
				endPoint: `/v1/admin/news/${newsID}/media/${id}`,
			});
			return responce.data;
		} catch (error) {
			console.error("Error getting image: url", error);
			return {
				success: 0,
				error: "Image upload failed",
			};
		}
	};

	const uploadByFile = async (file: File) => {
		// Create a FormData object to send the image file
		const formData = new FormData();
		formData.append("media", file);

		try {
			// Send the POST request to your API
			const response = await postData({
				endPoint: `/v1/admin/news/${newsID}/media`,
				data: formData,
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			console.log(response);

			// The API should return the URL of the uploaded image
			const imageId = response.data.toString();
			console.log("success on upload");

			// Return the URL of the uploaded image
			return {
				success: 1,
				file: {
					id: imageId, // The URL returned by your API
				},
			};
		} catch (error) {
			console.error("Error uploading image:", error);
			return {
				success: 0,
				error: "Image upload failed",
			};
		}
	};

	const queryClient = useQueryClient();
	const handelSave = useMutation({
		mutationFn: async () => {
			const savedData = await editorRef.current?.save();
			if (savedData) {
				setData(savedData);
				const responce = await putData({
					endPoint: `/v1/admin/news/${newsID}`,
					data: {
						content: JSON.stringify(savedData),
						title: title,
						status: 2,
					},
				});
				return responce;
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["news"] });
			toast.success("خبر با موفقیت ذخیره شد");
		},
		onError: (error) => {
			console.error("Mutation error:", error);
			toast.error("خطایی رخ داده است");
		},
	});
	const handelPublish = useMutation({
		mutationFn: async () =>
			putData({ endPoint: `/v1/admin/news/${newsID}/publish` }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["news"] });
			toast.success("خبر با موفقیت منتشر شد");
		},
		onError: (error) => {
			console.error("Mutation error:", error);
			toast.error("خطایی رخ داده است");
		},
	});
	const handelUnpublish = useMutation({
		mutationFn: async () =>
			putData({ endPoint: `/v1/admin/news/${newsID}/unpublish` }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["news"] });
			toast.success("خبر با موفقیت از انتشار خارج شد");
		},
		onError: (error) => {
			console.error("Mutation error:", error);
			toast.error("خطایی رخ داده است");
		},
	});
	///v1/admin/news/1/unpublish
	const {} = useQuery({
		queryKey: ["news", newsID],
		queryFn: async () => {
			try {
				const responce = await getData({
					endPoint: `/v1/admin/news/${newsID}`,
				});
				console.log(responce);
				if (responce.statusCode == 200) {
					setTitle(responce.data.title);
					setStatus(responce.data.status);
					if (responce.data.content != "") {
						setData(JSON.parse(responce.data.content));
					} else {
						setData({
							blocks: [
								{
									type: "paragraph",
									data: {
										text: "متن اعلان خود را اینجا بنویسید...",
									},
								},
							],
						});
					}
				}
				return responce;
			} catch (error) {
				console.error(error);
				router.push("/not-found");
			}
		},
	});

	useEffect(() => {
		console.log("editor1: ", editorRef.current);
		if (editorRef.current == null) {
			setTimeout(() => {
				if (!holderRef.current || data == null) return;
				// console.log("editor2: ", editorRef.current);
				console.log("add editor ...");
				const editor = new EditorJS({
					holder: holderRef.current!,
					autofocus: true,
					data: data,
					tools: {
						header: {
							class: Header,
							inlineToolbar: ["link"],
							config: {
								placeholder: "یک عنوان وارد کنید", // Placeholder text
								levels: [1, 2, 3, 4, 5, 6], // Available heading levels
								defaultLevel: 3, // Default heading level
							},
						},
						list: {
							class: List,
							inlineToolbar: true,
						},
						paragraph: {
							class: Paragraph,
							inlineToolbar: true,
						},
						image: {
							class: ImageTool,
							config: {
								endpoints: {
									// byFile: '46.249.99.69:8080/v1/admin/news/1/media',
									byId: `/v1/admin/news/${newsID}/media`,
								},
								field: "media",
								uploader: { uploadByFile },
								getter: {
									getById: getter,
								},
							},
						},
					} as any,
					i18n: FaTranslation(),
					readOnly: onlyView,
				});

				editorRef.current = editor;

				editor.isReady.then(() => {
					setLoading(false);
				});
			}, 1000);
		}

		// return () => {
		//   if(editorRef.current)
		//   {
		//   editorRef.current.isReady
		//     .then(() => editorRef.current?.destroy())
		//     .catch((error) => console.log(error));
		//   }
		// };
	}, [data, holderRef, loading, editorRef]);

	return (
		<>
			{loading && (
				<LoadingSpinner className="absolute top-0 left-0 right-0 bottom-0 bg-white z-50" />
			)}
			<div className="flex flex-col items-center gap-3 w-[70vw] mx-auto">
				{!onlyView && (
					<div className="text-bold text-2xl self-start">
						ویرایشگر:{" "}
					</div>
				)}
				{onlyView ? (
					<div className="flex flex-col justify-center items-center p-5 h-[80vh] w-[85vw]">
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
						<div className=" w-[70vw]! h-[60vh]! bg-warm-white neo-card rounded-md p-2 ">
							<div className="overflow-y-auto overflow-x-hidden no-scrollbar neo-card-rev w-full h-full rounded-md p-3">
								<div
									ref={holderRef}
									id="editorjs"
									className={cn("rtl h-full w-full")}
								></div>
							</div>
						</div>
						<div className="flex items-center gap-10 mt-2">
							<button
								className="flex gap-3 items-center bg-fire-orange px-8 py-2 rounded-full! neo-btn text-white font-bold text-lg"
								onClick={() => {
									handelSave.mutate();
								}}
							>
								<span>ذخیره</span>
								<Save />
							</button>
							{status == 2 ? (
								<button
									className="flex gap-3 items-center bg-fire-orange px-8 py-2 rounded-full! neo-btn text-white font-bold text-lg"
									onClick={() => {
										handelPublish.mutate();
									}}
								>
									<span>انتشار</span>
									<FileUp />
								</button>
							) : (
								<button
									className="flex gap-3 items-center bg-fire-orange px-8 py-2 rounded-full! neo-btn text-white font-bold text-lg"
									onClick={() => {
										handelUnpublish.mutate();
									}}
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
