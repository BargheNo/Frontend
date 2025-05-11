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
import { Newspaper, Save } from "lucide-react";
import CustomInput from "@/components/Custom/CustomInput/CustomInput.tsx";
import { Form, Formik } from "formik";

export default function AnnounceEditor() {
    const editorRef = useRef<EditorJS | null>(null);
    const holderRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<OutputData>({
        blocks: [
            {
                type: "paragraph",
                data: {
                    text: "متن اعلان خود را اینجا بنویسید..."
                }
            }
        ]
    });
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
    if(savedData)
      setData(savedData);
    };


  return (
    <>
      {loading && <LoadingSpinner className="absolute top-0 left-0 right-0 bottom-0 bg-white z-50"/>}
      <div className="flex flex-col items-center gap-3 w-[70vw] mx-auto">
      <div className="text-bold text-2xl self-start">ویرایشگر: </div>
      <Formik<{name: string}>
        initialValues={{
          name:"",
        }}
        onSubmit={()=>{}}
        >
        <CustomInput
                  containerClassName="w-full lg:self-start lg:w-1/4!"
                  name="name"
                  type="text"
                  icon={Newspaper}
                  placeholder="عنوان خبر"
                  />
      </Formik>
      <div className="flex flex-col items-center gap-3">
        <div className="overflow-y-auto overflow-x-hiden w-[70vw]! h-[55vh]! bg-gray-100 rounded-md p-2">
          <div
            ref={holderRef}
            id="editorjs"
            className={cn("rtl h-full w-full")}
            >
          </div>
        </div>
        <button 
        className="flex gap-5 items-center bg-fire-orange px-10 py-3 rounded-full! neo-btn text-white font-bold text-lg">
          <span>
            ذخیره
          </span>
          <Save />
        </button>
      </div>
            </div>
    </>
  )
}
