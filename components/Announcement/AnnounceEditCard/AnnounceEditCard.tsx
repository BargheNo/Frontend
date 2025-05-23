"use client";

import { Dialog, DialogHeader } from "@/components/ui/dialog";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import dynamic from "next/dynamic";
const AnnounceEditor = dynamic(
  () => import("@/components/Announcement/AnnounceEditor/AnnounceEditor"),
  { ssr: false }
);

export default function AnnounceEditCard({ id }: { id: string }) {
  return (
    <Dialog>
      <DialogContent className="w-[80vw]! max-w-none! h-[80vh]! rtl p-8">
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <AnnounceEditor newsID={id} onlyView={false} />
      </DialogContent>
    </Dialog>
  );
}
