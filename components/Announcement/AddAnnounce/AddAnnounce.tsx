"use client";
import AddComponent from "@/components/AddComponent/AddComponent";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";
import AddAnnounceForm from "@/components/Announcement/AddAnnounce/AddAnnounceForm";
import AnnounceEditor from "@/components/Announcement/AnnounceEditor/AnnounceEditor";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function AddAnnounce() {
    const [step, setStep] = useState(0);
    const [announceID, setAnnounceID] = useState("");

    return (
        <Dialog
            onOpenChange={(state) => {
                if (!state) {
                    setStep(0);
                    setAnnounceID("");
                }
            }}
        >
            <DialogTrigger asChild>
                <AddComponent title="ثبت خبر جدید" />
            </DialogTrigger>
            <DialogContent
                className={cn(
                    step === 0
                        ? "w-[80vw]! md:w-[60vw]! lg:w-[40vw]! h-fit! p-8"
                        : "w-[90vw]! max-w-none! p-10 overflow-y-scroll overflow-x-hidden"
                )}
            >
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>

                {step === 0 ? (
                    <AddAnnounceForm
                        setAnnounceID={setAnnounceID}
                        setStep={setStep}
                    />
                ) : (
                    // <div className="mt-20 lg:mt-0 flex items-center justify-center">
                    <AnnounceEditor
                        newsID={announceID}
                        onlyView={false}
                        mode="admin"
                    />
                    // </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
