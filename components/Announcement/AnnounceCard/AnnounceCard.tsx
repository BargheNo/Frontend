"use client";
import {
    ContextMenu,
    ContextMenuItem,
    ContextMenuTrigger,
    ContextMenuContent,
} from "@/components/ui/context-menu";
import { cn } from "@/lib/utils";
import { useState, useContext, useEffect } from "react";
import { AnnounceContex } from "@/components/Announcement/AnnouncementBox/AnnouncementBox";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
const AnnounceEditor = dynamic(
    () => import("@/components/Announcement/AnnounceEditor/AnnounceEditor"),
    { ssr: false }
);
import { deleteData } from "@/src/services/apiHub";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useHasPermission from "@/src/functions/hasPermission";
import { Calendar } from "lucide-react";
import DateConverter from "@/src/functions/toJalali";

export default function AnnounceCard({
    onlyView = false,
    title,
    id,
    status = "پیش نویس",
    writer,
    date,
}: {
    title: string;
    id: string;
    onlyView?: boolean;
    status?: string;
    writer: string;
    date: string;
}) {
    const { hasPermission: hasEditNewsPermission, permissionLoading1 } = useHasPermission("news.edit");
    const { hasPermission: hasDeleteNewsPermission, permissionLoading2 } = useHasPermission("news.delete");
    const {
        selectMode,
        setSelectMode,
        incrementCount,
        decrementCount,
        addId,
        removeId,
    } = useContext(AnnounceContex);
    const [selected, setselected] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!selectMode) setselected(false);
    }, [selectMode]);

    const handleSelect = () => {
        const newSelected = !selected;
        setselected(newSelected);
        if (newSelected) {
            incrementCount();
            addId(id);
        } else {
            decrementCount();
            removeId(id);
        }
    };

    const queryClient = useQueryClient();
    const handleDelete = useMutation({
        mutationFn: () =>
            deleteData({
                endPoint: "/v1/admin/news",
                data: { newsIDs: [id] },
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["news"] });
            toast.success("خبر با موفقیت حذف شد.");
        },
        onError: (error) => {
            console.error("Mutation error:", error);
        },
    });

    const CardContent = (
        <div
            className={cn(
                "grid grid-cols-2 gap-4 w-full neo-card-rev bg-white p-6 rounded-lg transition-all duration-300 ease-in-out",
                selected && "scale-95"
            )}
        >
            {/* Right Column */}
            <div className="flex flex-col justify-start">
                <div className="text-xl font-bold">{title}</div>
                {!onlyView &&
                    (status === "منتشر شده" ? (
                        <span className="text-green-600 mt-2">منتشر شده</span>
                    ) : (
                        <span className="text-red-600 mt-2">منتشر نشده</span>
                    ))}
            </div>
            {/* Left Column */}
            <div className="flex flex-col items-end justify-between">
                {/* Date at top */}
                <div className="flex gap-2 items-center">
                    <Calendar size={20} className="text-sunset-orange" />
                    <span>{DateConverter(date)}</span>
                </div>

                {/* Writer at bottom */}
                {!onlyView && (
                    <div className="text-gray-600 text-left">{writer}</div>
                )}
            </div>
        </div>
    );

    return (
        <>
            {!onlyView ? (
                <Dialog>
                    <ContextMenu>
                        <ContextMenuTrigger asChild className="w-full">
                            <div
                                className={cn(
                                    "cursor-pointer",
                                    selected &&
                                        "bg-sunset-orange hover:opacity-80 py-2 rounded transition-all duration-300 ease-in-out relative",
                                    selectMode && ""
                                )}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (selectMode) {
                                        handleSelect();
                                    } else {
                                        router.push(`./announcements/${id}`);
                                    }
                                }}
                            >
                                {CardContent}
                            </div>
                        </ContextMenuTrigger>
                        <ContextMenuContent className="border-0 p-4 flex flex-col gap-2 rtl bg-warm-white">
                            <ContextMenuItem
                                className="neo-btn bg-white"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSelectMode(true);
                                    handleSelect();
                                }}
                            >
                                انتخاب
                            </ContextMenuItem>
                            {hasEditNewsPermission && (
                                <ContextMenuItem className="neo-btn bg-white">
                                    <DialogTrigger>ویرایش</DialogTrigger>
                                </ContextMenuItem>
                            )}
                            {hasDeleteNewsPermission && (
                                <ContextMenuItem
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleDelete.mutate();
                                    }}
                                    className="neo-btn bg-white"
                                >
                                    حذف
                                </ContextMenuItem>
                            )}
                        </ContextMenuContent>
                    </ContextMenu>
                    <DialogContent className="w-[80vw]! max-w-none! h-[80vh]! rtl p-8 overflow-y-scroll overflow-x-hidden flex items-center justify-center">
                        <DialogHeader>
                            <DialogTitle></DialogTitle>
                        </DialogHeader>
                        <div className="mt-20 lg:mt-0 flex items-center justify-center">
                            <AnnounceEditor newsID={id} onlyView={false} />
                        </div>
                        <DialogDescription className="hidden" />
                    </DialogContent>
                </Dialog>
            ) : (
                <div
                    className={cn(
                        "cursor-pointer w-full",
                        selected &&
                            "bg-sunset-orange hover:opacity-80 py-2 rounded transition-all duration-300 ease-in-out relative",
                        selectMode && ""
                    )}
                    onClick={(e) => {
                        e.preventDefault();
                        if (selectMode) {
                            handleSelect();
                        } else {
                            router.push(`./announcements/${id}`);
                        }
                    }}
                >
                    {CardContent}
                </div>
            )}
        </>
    );
}
