import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";
import { getData, postData, putDataFile } from "@/src/services/apiHub";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { ImageUp, SquarePlus } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { toast } from "sonner";
export default function AddBlogForm({
    setStep,
    setBlogID,
    edit = false,
    blogId,
}: {
    setStep?: (step: number) => void;
    setBlogID?: (id: string) => void;
    edit?: boolean;
    blogId?: string;
}) {
    const [file, setFile] = useState<File | null>(null);
    const [blog, setBlog] = useState<{
        title: string;
        description: string;
        content: string;
        cover_image: string;
    } | null>(null);
    const onDrop = useCallback((acceptedFiles: any) => {
        console.log(acceptedFiles);
        setFile(acceptedFiles[0]);
    }, []);
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    // Get corpID from userSlice store
    const corpID = useSelector((state: any) => state.user.corpId);

    useEffect(() => {
        if (edit && blogId) {
            // Fetch the blog data for editing
            const fetchBlog = async () => {
                const response = await getData({
                    endPoint: `/v1/corp/${corpID}/blog/${blogId}`,
                });
                if (response.statusCode === 200) {
                    const temp = response.data;
                    setBlog({
                        title: temp.title,
                        description: temp.description,
                        content: temp.content,
                        cover_image: temp.coverImage,
                    });
                    // urlToFile(temp.coverImage, "cover_image.jpg").then(setFile);
                }
            };
            fetchBlog();
        }
    }, [edit, blogId, corpID]);

    const queryClient = useQueryClient();
    const createBlog = useMutation({
        mutationFn: (values: { title: string; description: string }) => {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("content", "empty blog");
            if (file) {
                formData.append("cover_image", file);
            }
            return postData({
                endPoint: `/v1/corp/${corpID}/blog/create`,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        },
        onSuccess: (responce) => {
            // console.log("Mutation successful, response:", responce);
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            console.log("Query invalidated");
            if (setBlogID && setStep) {
                setBlogID(responce.data);
                setStep(1);
            }
            toast.success("بلاگ با موفقیت ساخته شد");
        },
        onError: (error) => {
            console.error("Mutation error:", error);
            toast.error("خطایی رخ داده است");
        },
    });

    const editBlog = useMutation({
        mutationFn: async (values: {
            title?: string;
            description?: string;
        }) => {
            const formData = new FormData();
            if (values.title) formData.append("title", values.title);
            if (values.description)
                formData.append("description", values.description);
            // formData.append("content", "empty blog");
            if (file) {
                formData.append("cover_image", file);
            }

            const responce = await putDataFile({
                endPoint: `/v1/corp/${corpID}/blog/${blogId}/edit`,
                formData: formData,
            });
            return responce;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            toast.success("بلاگ با موفقیت ذخیره شد");
        },
        onError: (error) => {
            console.error("Mutation error:", error);
            toast.error("خطایی رخ داده است");
        },
    });

    return (
        <>
            {(!edit || (edit && blog != null)) && (
                <Formik
                    initialValues={{
                        title: edit ? blog?.title : "",
                        description: edit ? blog?.description : "",
                        // cover_image: edit ? blog?.cover_image : "",
                    }}
                    validate={(values) => {
                        const errors: { title?: string; description?: string } =
                            {};
                        if (
                            !edit &&
                            (!values.title || values.title.trim() === "")
                        ) {
                            errors.title = "عنوان مقاله نمی‌تواند خالی باشد";
                        }
                        if (
                            !edit &&
                            (!values.description ||
                                values.description.trim() === "")
                        ) {
                            errors.description =
                                "توضیحات مقاله نمی‌تواند خالی باشد";
                        }
                        return errors;
                    }}
                    onSubmit={(values) => {
                        if (edit) {
                            editBlog.mutate(values);
                        } else {
                            // Ensure title and description are always strings
                            createBlog.mutate({
                                title: values.title ?? "",
                                description: values.description ?? "",
                            });
                        }
                    }}
                >
                    <Form>
                        <div className=" flex flex-col justify-start items-center gap-3">
                            <div
                                {...getRootProps()}
                                className="w-full aspect-video border-2 border-dashed rounded-lg flex justify-center items-center relative"
                            >
                                <input {...getInputProps()} />
                                {file ? (
                                    <Image
                                        fill
                                        src={URL.createObjectURL(file)}
                                        alt="file"
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center gap-2 cursor-pointer">
                                        <p>آپلود تصویر</p>
                                        <ImageUp size={50} />
                                    </div>
                                )}
                            </div>
                            <CustomInput
                                name="title"
                                placeholder="عنوان مقاله"
                            />
                            <CustomTextArea
                                textareaClassName=" max-h-[150px]!"
                                name="description"
                                placeholder="توضیحات مقاله"
                            />

                            <button
                                type="submit"
                                className="flex justify-center items-center w-full gap-3 py-2 px-3 mt-4 bg-fire-orange rounded-full! text-white font-bold text-lg cursor-pointer neo-btn"
                            >
                                <SquarePlus />
                                <span>{edit ? "بروزرسانی" : "ساخت"}</span>
                            </button>
                        </div>
                    </Form>
                </Formik>
            )}
        </>
    );
}
