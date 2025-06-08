"use client";
import BlogEditor from "@/components/blog/BlogEditor/BlogEditor";
import { ChevronLeft } from "lucide-react";
// import AnnounceView from "@/components/Announcement/AnnounceView/AnnounceView";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  return (
    <div className="flex flex-col justify-center items-center gap-2 p-5 pt-20 overflow-hidden rtl">
      <ChevronLeft
        className="self-end ml-12 text-gray-600 cursor-pointer"
        size={38}
        onClick={() => router.back()}
      />
      <BlogEditor blogID={id as string} onlyView={true} />
    </div>
  );
}
