'use client'
import React, { useRef, useState } from "react";
import styles from "./Editor.module.scss";
import EditorJS from "@editorjs/editorjs";
import FaTranslation from "./FaTranslation.ts";
import { useEffect } from "react";
export default function AnnounceEditor() {
    const editorRef = useRef(null);
    const holderRef = useRef(null);
    const [data, setData] = useState();
    useEffect(() => {
    console.log("effectdata: ", data);
    console.log("holder: ", holderRef.current);
    if (holderRef.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        data: data,
        // tools: EditorTools(),
        i18n: FaTranslation(),
      });

      editorRef.current = editor;
      return () => {
        editor.isReady
          .then(() => editor.destroy())
          .catch((error) => console.log(error));
      };
    }
  }, [data, editorRef, holderRef]);


  return (
    <>
      <div className=" bg-bombCreme">
        <div className="pt-8 px-6 pb-4 relative">
          {/* <ArrowBackIosNewIcon
            className="absolute left-[8vw] top-10 text-2xl text-gray-600 hover:text-bomborange hover:animate-kreep cursor-pointer"
            onClick={() => {
              window.scrollTo(0, 0);
              navigate(`/projectDashboard/${projectId}`);
            }}
          /> */}
          <div className="text-3xl text-gray-600 pl-5 StartTour">
            :ویرایشگر
          </div>
        </div>
        <div className={`${styles.holder}`}>
          <div
            ref={holderRef}
            id="editorjs"
            className={`${styles.editor} EditorTour`}
          >
            {""}
          </div>
        </div>
        <div className="h-24 bg-bombBlue sticky bottom-0 right-0 left-0 z-[3] flex justify-center items-center gap-10">
          <button
            className="SaveTour btn bg-bomborange text-white hover:bg-white hover:text-black animate-kreep hover:animate-none"
            // onClick={handelSave}
          >
            ذخیره
          </button>
          <button
            className="btn bg-bomborange text-white hover:bg-white hover:text-black hover:animate-none"
            // onClick={handelDiscard}
          >
            فراموشی
          </button>
        </div>
      </div>
    </>
  )
}
