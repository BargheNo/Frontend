'use client'
import React, { useRef, useState } from "react";
import "./Editor.css";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import FaTranslation from "./FaTranslation.ts";
import { useEffect } from "react";
import { cn } from "@/lib/utils.ts";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner.tsx";

export default function AnnounceEditor() {
    const editorRef = useRef<EditorJS | null>(null);
    const holderRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<OutputData>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      console.log("editor1: ", editorRef.current);
      if(editorRef.current == null)
      {
        setTimeout(() => {
          if (!holderRef.current) return;
          // console.log("editor2: ", editorRef.current);
          console.log("add editor ...")
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
                  inlineToolbar: true
              },
              paragraph: {
                  class: Paragraph,
                  inlineToolbar: true
              }
          } as any,
            i18n: FaTranslation(),
          });

          editorRef.current = editor;

          editor.isReady.then(() => {setLoading(false)})


          }, 1000)
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

    const handelSave = async () => {
    const savedData = await editorRef.current?.save();
      // editorRef.current?.destroy();
    // console.log("id: ", projectId);
    console.log("data:", savedData);
    setData(savedData);
    };


  return (
    <>
      {loading && <LoadingSpinner className="absolute top-0 left-0 right-0 bottom-0 bg-red-800 z-50"/>}
      <div className="flex flex-col items-center gap-3">
        <div className="overflow-y-scroll overflow-x-hiden w-[70vw]! h-[60vh]! bg-gray-100 mt-5 rounded-md p-2">
        <div
          ref={holderRef}
          id="editorjs"
          className={cn("rtl h-full w-full")}
          >
        </div>
          </div>
        <button className="bg-red-500" onClick={handelSave}>Save</button>
      </div>
    </>
  )
}
