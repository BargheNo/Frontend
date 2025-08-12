"use client";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { postData, putData } from "@/src/services/apiHub";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { SquarePlus } from "lucide-react";
import { toast } from "sonner";

export default function AnnounceForm({
    setStep,
    setAnnounceID,
    edit = false,
    announceId,
    initialTitle = "",
}: {
    setStep?: (step: number) => void;
    setAnnounceID?: (id: string) => void;
    edit?: boolean;
    announceId?: string;
    initialTitle?: string;
}) {
    const queryClient = useQueryClient();

    const createAnnounce = useMutation({
        mutationFn: (values: { title: string }) =>
            postData({
                endPoint: "/v1/admin/news/draft",
                data: { title: values.title, content: "" },
            }),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["news"] });
            if (setAnnounceID && setStep) {
                setAnnounceID(response.data);
                setStep(1);
            }
            toast.success("خبر با موفقیت ساخته شد");
        },
        onError: () => toast.error("خطایی رخ داده است"),
    });

    const editAnnounce = useMutation({
        mutationFn: (values: { title: string }) =>
            putData({
                endPoint: `/v1/admin/news/${announceId}`,
                data: { title: values.title },
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["news"] });
            toast.success("خبر با موفقیت ویرایش شد");
        },
        onError: () => toast.error("خطایی رخ داده است"),
    });

    return (
        <Formik
            initialValues={{ title: initialTitle }}
            enableReinitialize
            onSubmit={edit ? editAnnounce.mutate : createAnnounce.mutate}
        >
            <Form className="flex flex-col items-center gap-8 w-full">
                <CustomInput
                    containerClassName="w-full"
                    name="title"
                    type="text"
                    placeholder="عنوان خبر"
                />
                <button
                    type="submit"
                    className="flex justify-center items-center w-full gap-3 py-2 px-3 bg-fire-orange rounded-full! text-white font-bold text-lg cursor-pointer neo-btn"
                >
                    <SquarePlus />
                    <span>{edit ? "بروزرسانی" : "ساخت"}</span>
                </button>
            </Form>
        </Formik>
    );
}
