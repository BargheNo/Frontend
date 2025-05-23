"use client";
import dynamic from "next/dynamic";
import { ChevronLeft } from "lucide-react";
// import AnnounceView from "@/components/Announcement/AnnounceView/AnnounceView";
import { useParams, useRouter } from "next/navigation";

const AnnounceEditor = dynamic(
  () => import("@/components/Announcement/AnnounceEditor/AnnounceEditor"),
  { ssr: false }
);

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  return (
    <div className="flex flex-col justify-center items-center gap-2 p-5 overflow-hidden">
      <ChevronLeft
        className="self-end text-gray-600 cursor-pointer"
        size={38}
        onClick={() => router.back()}
      />
      <AnnounceEditor newsID={id as string} onlyView={true} />
    </div>
  );
}
