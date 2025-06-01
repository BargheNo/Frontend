"use client";
import React, { useEffect, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";

import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner.tsx";
import ImageTool from "ert-image";
import { FileUp, Save } from "lucide-react";
import { cn } from "@/lib/utils.ts";
import FaTranslation from "@/components/Announcement/AnnounceEditor/FaTranslation";
export default function BlogEditor({
  newsID,
  onlyView = false,
}: {
  newsID: string;
  onlyView: boolean;
}) {
  const editorRef = useRef<EditorJS | null>(null);
  const holderRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<OutputData | null>(null);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(2);
  const [loading, setLoading] = useState(false);
//   const router = useRouter();

  useEffect(() => {
    console.log("editor1: ", editorRef.current);
    if (editorRef.current == null) {
      setTimeout(() => {
        if (!holderRef.current || data == null) return;
        // console.log("editor2: ", editorRef.current);
        console.log("add editor ...");
        const editor = new EditorJS({
          holder: holderRef.current!,
          autofocus: true,
          data: data,
          tools: {
            header: {
              class: Header,
              inlineToolbar: ["link"],
              config: {
                placeholder: "یک عنوان وارد کنید", // Placeholder text
                levels: [1, 2, 3, 4, 5, 6], // Available heading levels
                defaultLevel: 3, // Default heading level
              },
            },
            list: {
              class: List,
              inlineToolbar: true,
            },
            paragraph: {
              class: Paragraph,
              inlineToolbar: true,
            },
            image: {
              class: ImageTool,
              config: {
                // endpoints: {
                //   // byFile: '46.249.99.69:8080/v1/admin/news/1/media',
                //   byId: `/v1/admin/news/${newsID}/media`,
                // },
                field: "media",
                // uploader: { uploadByFile },
                // getter: {
                //   getById: getter,
                // },
              },
            },
          } as any,
          i18n: FaTranslation(),
          readOnly: onlyView,
        });

        editorRef.current = editor;

        editor.isReady.then(() => {
          setLoading(false);
        });
      }, 1000);
    }

    // return () => {
    //   if(editorRef.current)
    //   {
    //   editorRef.current.isReady
    //     .then(() => editorRef.current?.destroy())
    //     .catch((error) => console.log(error));
    //   }
    // };
  }, [data, holderRef, loading, editorRef]);
  return (
    <>
      {loading && (
        <LoadingSpinner className="absolute top-0 left-0 right-0 bottom-0 bg-white z-50" />
      )}
      <div className="flex flex-col items-center gap-3 w-[70vw] mx-auto">
        {!onlyView && (
          <div className="text-bold text-2xl self-start">ویرایشگر: </div>
        )}
        {onlyView ? (
          <div className="flex flex-col justify-center items-center p-5 h-[80vh]">
            <div className=" w-[90vw]! h-full bg-warm-white neo-card rounded-md p-2 ">
              <div className="overflow-y-auto overflow-x-hidden no-scrollbar neo-card-rev w-full h-full rounded-md p-3">
                <div
                  ref={holderRef}
                  id="editorjs"
                  className={cn("rtl h-full w-full")}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className=" w-[70vw]! h-[60vh]! bg-warm-white neo-card rounded-md p-2 ">
              <div className="overflow-y-auto overflow-x-hidden no-scrollbar neo-card-rev w-full h-full rounded-md p-3">
                <div
                  ref={holderRef}
                  id="editorjs"
                  className={cn("rtl h-full w-full")}
                ></div>
              </div>
            </div>
            <div className="flex items-center gap-10 mt-2">
              <button
                className="flex gap-3 items-center bg-fire-orange px-8 py-2 rounded-full! neo-btn text-white font-bold text-lg"
                onClick={() => {
                //   handelSave.mutate();
                }}
              >
                <span>ذخیره</span>
                <Save />
              </button>
              {status == 2 ? (
                <button
                  className="flex gap-3 items-center bg-fire-orange px-8 py-2 rounded-full! neo-btn text-white font-bold text-lg"
                  onClick={() => {
                    // handelPublish.mutate();
                  }}
                >
                  <span>انتشار</span>
                  <FileUp />
                </button>
              ) : (
                <button
                  className="flex gap-3 items-center bg-fire-orange px-8 py-2 rounded-full! neo-btn text-white font-bold text-lg"
                  onClick={() => {
                    // handelUnpublish.mutate();
                  }}
                >
                  <span>پیش نویس</span>
                  <FileUp />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
