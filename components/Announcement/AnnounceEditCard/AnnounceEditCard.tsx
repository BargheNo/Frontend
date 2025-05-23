"use client";

import { Dialog, DialogHeader } from "@/components/ui/dialog";
import {
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import AnnounceEditor from "../AnnounceEditor/AnnounceEditor";

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
