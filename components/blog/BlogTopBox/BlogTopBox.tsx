"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import blogFallback from "@/public/images/blog/blog.png";
import DateConverter from "@/src/functions/toJalali";
import { deleteData, getData, postData } from "@/src/services/apiHub";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Calendar, Heart } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const BlogTopBox = ({
    componentLoading,
    className,
    blogID,
    title,
    description,
    coverImage,
    likeCount,
    createdAt,
    corpID,
    mode = "user",
}: {
    componentLoading: boolean;
    blogID: number;
    className: string;
    title: string;
    description: string;
    coverImage: string;
    likeCount: number;
    createdAt: string;
    corpID?: number;
    mode?: "user" | "corp";
}) => {
    const accessToken = useSelector(
        (state: RootState) => state.user.accessToken
    );

    const { data: isLiked, isLoading } = useQuery({
        queryKey: ["like", blogID, corpID],
        queryFn: async () => {
            if (accessToken && mode != "corp") {
                const res = await getData({
                    endPoint: `/v1/user/blog/${blogID}/like`,
                });
                return res?.data;
            } else return true;
        },
        enabled: !!blogID,
    });

    const queryClient = useQueryClient();

    const likeBlog = useMutation({
        mutationFn: () =>
            postData({
                endPoint: `/v1/user/blog/${blogID}/like`,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["like", blogID] });
            queryClient.invalidateQueries({
                queryKey: ["blog-title", String(blogID)],
            });
            console.log(blogID);
            toast.success("مطلب با موفقیت لایک شد");
        },
        onError: () => toast.error("خطایی رخ داده است"),
    });

    const unLikeBlog = useMutation({
        mutationFn: () =>
            deleteData({
                endPoint: `/v1/user/blog/${blogID}/like`,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["like", blogID] });
            queryClient.invalidateQueries({
                queryKey: ["blog-title", String(blogID)],
            });
            console.log(blogID);
            toast.success("مطلب با موفقیت آنلایک شد");
        },
        onError: () => toast.error("خطایی رخ داده است"),
    });

    return (
        <div
            className={cn(
                "neo-container h-fit min-h-fit md:min-h-[250px] items-center w-full flex flex-col md:flex-row-reverse gap-1 z-10 bg-warm-white rounded-2xl p-3",
                className
            )}
        >
            {/* Cover Image / Skeleton */}
            <div className="relative h-[200px] max-h-[200px] w-full md:w-full md:min-h-full rounded-xl m-3 overflow-hidden items-center shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)]">
                {componentLoading ? (
                    <Skeleton className="h-full w-full rounded-xl" />
                ) : (
                    <Image
                        className="object-cover"
                        src={coverImage || blogFallback}
                        alt="Profile picture"
                        fill
                    />
                )}
            </div>

            {/* Text Section / Skeleton */}
            <div className="flex flex-col md:min-h-[200px] md:h-full w-full items-start justify-between md:w-full m-3 rounded-xl p-3 shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)]">
                {componentLoading ? (
                    <div className="w-full space-y-3">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <div className="flex justify-between mt-4">
                            <Skeleton className="h-5 w-20" />
                            <Skeleton className="h-5 w-10" />
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold">{title}</span>
                            <div className="text-sm text-gray-500 min-h-full min-w-full max-h-[100px] md:max-h-none overflow-y-auto no-scrollbar">
                                {description}
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-400 w-full">
                            <div className="flex gap-2 justify-between items-center">
                                <Calendar
                                    size={25}
                                    className="text-sunset-orange"
                                />
                                <span className="block text-center h-5">
                                    {DateConverter(createdAt)}
                                </span>
                            </div>
                            {isLoading ? (
                                <Skeleton className="h-5 w-5" />
                            ) : (
                                <div className="flex items-center gap-1">
                                    <span>{likeCount}</span>
                                    <Heart
                                        className={
                                            accessToken && mode != "corp"
                                                ? "cursor-pointer"
                                                : ""
                                        }
                                        onClick={() => {
                                            if (mode == "corp") return;
                                            if (accessToken && !isLiked) {
                                                likeBlog.mutate();
                                            } else if (accessToken && isLiked) {
                                                unLikeBlog.mutate();
                                            }
                                        }}
                                        fill={isLiked ? "#fb8500" : "none"}
                                        color="#fb8500"
                                        size={20}
                                    />
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BlogTopBox;
