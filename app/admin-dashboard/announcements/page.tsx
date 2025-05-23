"use client";
import AnnounceView from "@/components/Announcement/AnnounceView/AnnounceView";
export default function page() {
  return (
    <div className="flex flex-col gap-4 items-center p-14">
      <AnnounceView />
      {/* <AnnounceAddCard /> */}
    </div>
  );
}
