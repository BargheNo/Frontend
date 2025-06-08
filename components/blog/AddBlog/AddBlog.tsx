"use client";
import AddComponent from "@/components/AddComponent/AddComponent";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";
import AddBlogForm from "./AddBlogForm";
import BlogEditor from "../BlogEditor/BlogEditor";

export default function AddBlog() {
  const [step, setStep] = useState(0);
  const [blogID, setBlogID] = useState("");
  return (
    <>
      <Dialog
        onOpenChange={(state) => {
          if (!state) {
            setStep(0);
          }
        }}
      >
        <DialogTrigger asChild>
          <AddComponent title="اضافه کردن مطلب جدید" />
        </DialogTrigger>
        <DialogContent
          className={cn(
            step === 0
              ? "w-[90vw]! h-fit! p-10"
              : "w-[90vw]! max-w-none! h-[90vh]! p-10"
          )}
        >
          {step === 0 ? (
            <AddBlogForm  setBlogID={setBlogID} setStep={setStep} />
          ) : (
            <BlogEditor blogID={blogID} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
