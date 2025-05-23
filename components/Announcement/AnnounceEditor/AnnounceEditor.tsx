"use client";
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
import { Save } from "lucide-react";

import ImageTool from "ert-image";
import { getData, postData, putData } from "@/src/services/apiHub.tsx";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function AnnounceEditor({
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
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getter = async (id: string) => {
    try {
      console.log("id to url: ", `/v1/admin/news/${newsID}/media/${id}`);
      const responce = await getData({
        endPoint: `/v1/admin/news/${newsID}/media/${id}`,
      });
      return responce.data;
    } catch (error) {
      console.error("Error getting image: url", error);
      return {
        success: 0,
        error: "Image upload failed",
      };
    }
  };

  const uploadByFile = async (file: File) => {
    // Create a FormData object to send the image file
    const formData = new FormData();
    formData.append("media", file);

    try {
      // Send the POST request to your API
      const response = await postData({
        endPoint: `/v1/admin/news/${newsID}/media`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);

      // The API should return the URL of the uploaded image
      const imageId = response.data.toString();
      console.log("success on upload");

      // Return the URL of the uploaded image
      return {
        success: 1,
        file: {
          id: imageId, // The URL returned by your API
        },
      };
    } catch (error) {
      console.error("Error uploading image:", error);
      return {
        success: 0,
        error: "Image upload failed",
      };
    }
  };

  useEffect(() => {
    const getNews = async () => {
      try {
        const responce = await getData({
          endPoint: `/v1/admin/news/${newsID}`,
        });
        console.log(responce);
        if (responce.statusCode == 200) {
          setTitle(responce.data.title);
          if (responce.data.content != "") {
            setData(JSON.parse(responce.data.content));
          } else {
            setData({
              blocks: [
                {
                  type: "paragraph",
                  data: {
                    text: "متن اعلان خود را اینجا بنویسید...",
                  },
                },
              ],
            });
          }
        }
      } catch (error) {
        console.error(error);
        router.push("/not-found");
      }
    };

    getNews();
  }, [newsID]);

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
                endpoints: {
                  // byFile: '46.249.99.69:8080/v1/admin/news/1/media',
                  byId: `/v1/admin/news/${newsID}/media`,
                },
                field: "media",
                uploader: { uploadByFile },
                getter: {
                  getById: getter,
                },
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

  const handelSave = async () => {
    try {
      console.log("push");
      const savedData = await editorRef.current?.save();
      // editorRef.current?.destroy();
      // console.log("id: ", projectId);
      console.log("data:", savedData);
      if (savedData) {
        setData(savedData);
        const responce = await putData({
          endPoint: `/v1/admin/news/${newsID}`,
          data: {
            content: JSON.stringify(savedData),
            title: title,
            status: 1,
          },
        });
        if (responce.statusCode == 200) toast.success("خبر با موفقیت ذخیره شد");
      }
    } catch (error) {
      console.error(error);
      toast.error("خطایی رخ داده است");
    }
  };

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
            <div className="overflow-y-auto overflow-x-hiden w-[90vw]! h-full bg-gray-100 rounded-md p-2">
              <div
                ref={holderRef}
                id="editorjs"
                className={cn("rtl h-full w-full")}
              ></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="overflow-y-auto overflow-x-hiden w-[70vw]! h-[55vh]! bg-gray-100 rounded-md p-2">
              <div
                ref={holderRef}
                id="editorjs"
                className={cn("rtl h-full w-full")}
              ></div>
            </div>
            <button
              className="flex gap-5 items-center bg-fire-orange px-10 py-3 rounded-full! neo-btn text-white font-bold text-lg"
              onClick={handelSave}
            >
              <span>ذخیره</span>
              <Save />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
