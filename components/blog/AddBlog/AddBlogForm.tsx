import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";
import { Form, Formik } from "formik";
import { ImageUp, SquarePlus } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
export default function AddBlogForm({
  setStep,
}: {
  setStep: (step: number) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const onDrop = useCallback((acceptedFiles: any) => {
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = (values: any) => {
    console.log(values);
    console.log(file);
    setStep(1);
  };

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
      }}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className=" flex flex-col justify-start items-center gap-3">
          <div
            {...getRootProps()}
            className="w-full aspect-video border-2 border-dashed rounded-lg flex justify-center items-center relative"
          >
            <input {...getInputProps()} />
            {file ? (
              <Image
                fill
                src={URL.createObjectURL(file)}
                alt="file"
                className="object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 cursor-pointer">
                <p>آپلود تصویر</p>
                <ImageUp size={50} />
              </div>
            )}
          </div>
          <CustomInput name="title" placeholder="عنوان مقاله" />
          <CustomTextArea
            textareaClassName=" max-h-[150px]!"
            name="description"
            placeholder="توضیحات مقاله"
          />

          <button
            type="submit"
            className="flex justify-center items-center w-full gap-3 py-2 px-3 bg-fire-orange rounded-full! text-white font-bold text-lg cursor-pointer neo-btn"
          >
            <SquarePlus />
            <span>ساخت</span>
          </button>
        </div>
      </Form>
    </Formik>
  );
}
