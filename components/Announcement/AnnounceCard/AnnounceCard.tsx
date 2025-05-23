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
import AnnounceEditor from "../AnnounceEditor/AnnounceEditor";
import { deleteData } from "@/src/services/apiHub";
import { toast } from "sonner";
// export default function AnnounceCard({ title, }: { title: string, content: string, writer: string, date: number }) {
export default function AnnounceCard({
  title,
  id,
}: {
  title: string;
  id: string;
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

  const handleDelete = async () => {
    try {
      const responce = await deleteData({
        endPoint: "/v1/admin/news",
          data: { newsIDs: [id]},
      });
      if (responce.statusCode == 200) {
        toast.success("خبر با موفقیت حذف شد.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Dialog>
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <div
              className={cn(
                "cursor-pointer",
                selected &&
                  "bg-[#EA6639] hover:bg-gray-300 py-2 rounded transition-all duration-300 ease-in-out relative",
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
          </ContextMenuTrigger>
          <ContextMenuContent className="border-0 p-4 flex flex-col gap-2 rtl bg-[#F0EDEF]">
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
                handleDelete();
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
    </>
  );
}
