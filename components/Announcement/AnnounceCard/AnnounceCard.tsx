"use client";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuContent,
} from "@/components/ui/context-menu";
import { cn } from "@/lib/utils";
import { useState, useContext, useEffect } from "react";
import { AnnounceContex } from "../AnnouncementBox/AnnouncementBox";
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
// export default function AnnounceCard({ title, }: { title: string, content: string, writer: string, date: number }) {
export default function AnnounceCard({
  onlyView = false,
  title,
  id,
  status = 2,
}: {
  title: string;
  id: string;
  onlyView?: boolean;
  status?: number;
}) {
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
    if (!selectMode) {
      setselected(false);
    }
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
    onSuccess: (responce) => {
      console.log("Mutation successful, response:", responce);
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["news"] });
      toast.success("خبر با موفقیت حذف شد.");
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error("خطایی رخ داده است");
    },
  });

  return (
    <>
      {!onlyView ? (
        <Dialog>
          <ContextMenu>
            <ContextMenuTrigger asChild>
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
                {/* <CircleCheckBig className={cn("opacity-0",selected &&"absolute top-2 left-2 cursor-pointer opacity-100 transition-all duration-1000 ease-in-out")} /> */}
                <div
                  className={cn(
                    "flex flex-col gap-2 w-[70vw]! neo-card-rev  bg-white p-6 rounded-lg transition-all duration-300 ease-in-out",
                    selected && "scale-95"
                  )}
                >
                  <div className="text-xl font-bold ">{title}</div>
                  {status == 1 ? (
                    <span className="text-green-600">منتشر شده </span>
                  ) : (
                    <span className="text-red-600">منتشر نشده </span>
                  )}
                  {/* <div className="short-par">
                {content}
                </div> */}
                  {/* <div className="flex justify-between items-center">
                <div>نویسنده: {writer}</div>
                <div className="flex items-center gap-1">
                {new Date(date).toLocaleDateString('fa-IR', { year: 'numeric', month: 'numeric', day: 'numeric' })}
                <Calendar size={24} color="#EA6639"/>
                </div>
                </div> */}
                </div>
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
              <ContextMenuItem className="neo-btn bg-white">
                <DialogTrigger>ویرایش</DialogTrigger>
              </ContextMenuItem>
              <ContextMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete.mutate();
                }}
                className="neo-btn bg-white"
              >
                حذف
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
          <DialogContent className="w-[80vw]! max-w-none! h-[80vh]! rtl p-8">
            <DialogHeader className="hidden">
              <DialogTitle></DialogTitle>
            </DialogHeader>
            <AnnounceEditor newsID={id} onlyView={false} />
            <DialogDescription className="hidden" />
          </DialogContent>
        </Dialog>
      ) : (
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
          {/* <CircleCheckBig className={cn("opacity-0",selected &&"absolute top-2 left-2 cursor-pointer opacity-100 transition-all duration-1000 ease-in-out")} /> */}
          <div
            className={cn(
              "flex flex-col gap-2 w-[70vw]! neo-card-rev  bg-white p-6 rounded-lg transition-all duration-300 ease-in-out",
              selected && "scale-95"
            )}
          >
            <div className="text-xl font-bold ">{title}</div>
            {/* <div className="short-par">
                {content}
                </div> */}
            {/* <div className="flex justify-between items-center">
                <div>نویسنده: {writer}</div>
                <div className="flex items-center gap-1">
                {new Date(date).toLocaleDateString('fa-IR', { year: 'numeric', month: 'numeric', day: 'numeric' })}
                <Calendar size={24} color="#EA6639"/>
                </div>
                </div> */}
          </div>
        </div>
      )}
    </>
  );
}
