import AddComponent from '@/components/AddComponent/AddComponent';
import CustomInput from '@/components/Custom/CustomInput/CustomInput';
import CustomTextArea from '@/components/Custom/CustomTextArea/CustomTextArea';
import CustomToast from '@/components/Custom/CustomToast/CustomToast';
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Select } from '@/components/ui/select';
import { baseURL, getData } from '@/src/services/apiHub';
import { Form, Formik, Field, FieldArray } from 'formik';
import { Plus, Trash } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';

interface WarrantyType {
  id: string;
  name: string;
}

interface Term {
  title: string;
  description: string;
  limitations: string;
}

interface FormValues {
  warrantyName: string;
  warrantyType: string;
  warrantyDuration: number;
  warrantyDescription: string;
  terms: Term[];
}

const AddWarranty = () => {
  const [open, setOpen] = useState(false);
  const [warrantyTypes, setWarrantyTypes] = useState<WarrantyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch warranty types from backend (Replace with React Query)
  useEffect(() => {
    if (open) {
      getData({
        // TODO
        endPoint: `${baseURL}/apiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii`,
      }).then(
        res => {
					setWarrantyTypes(res.data);
					setIsLoading(false);
				}
      ).catch(() => {
        CustomToast("خطا در دریافت انواع گارانتی", "error");
        setIsLoading(false);
        setWarrantyTypes([{id: "1", name: "گارانتی نوع 1"}, {id: "2", name: "گارانتی نوع 2"}]);
      })
    }
  }, [open]);

  // Validation schema
  const validationSchema = Yup.object().shape({
    warrantyName: Yup.string()
      .required('نام گارانتی الزامی است')
      .max(100, 'نام گارانتی نباید بیشتر از ۱۰۰ کاراکتر باشد'),
    warrantyType: Yup.string().required('نوع گارانتی الزامی است'),
    warrantyDuration: Yup.number()
      .required('مدت گارانتی الزامی است')
      .min(1, 'حداقل مدت گارانتی ۱ ماه است')
      .max(120, 'حداکثر مدت گارانتی 600 ماه است'),
    warrantyDescription: Yup.string()
      .required('توضیحات الزامی است')
      .max(500, 'توضیحات نباید بیشتر از ۵۰۰ کاراکتر باشد'),
    terms: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required('عنوان شرط الزامی است'),
        description: Yup.string().required('توضیحات شرط الزامی است'),
        limitations: Yup.string().required('محدودیت‌های شرط الزامی است'),
      })
    ),
  });

  const initialValues: FormValues = {
    warrantyName: '',
    warrantyType: '',
    warrantyDuration: 12,
    warrantyDescription: '',
    terms: [],
  };

  const handleSubmit = (values: FormValues) => {
    console.log('Form submitted:', values);
    //  TODO
    // Submission APIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AddComponent title='ثبت گارانتی جدید' />
      </DialogTrigger>
      <DialogContent
        style={{ backgroundColor: "#F1F4FC" }}
        className="w-full sm:min-w-[750px] max-w-xl mx-auto p-4 overflow-auto py-4"
      >
        <DialogHeader>
          <DialogTitle className="flex justify-center items-end font-bold mt-3.5">
            ثبت گارانتی جدید
          </DialogTitle>
        </DialogHeader>
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, errors, touched, isSubmitting, setFieldValue }) => (
            <Form className="flex flex-col items-end w-full h-auto gap-4 rtl">
              {/* Warranty Name */}
              <div className="w-full">
                <CustomInput
                  name="warrantyName"
                  type="text"
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                    touched.warrantyName && errors.warrantyName ? 'border-red-500' : 'border'}`}
                >
                  نام گارانتی*
                </CustomInput>
              </div>

              {/* Warranty Type */}
              <div className="w-full">
                <Select
                  name="warrantyType"
                  disabled={isLoading}
                  value={values.warrantyType}
                  onValueChange={(value) => setFieldValue("warrantyType", value)}
                >
                  <SelectTrigger className={`w-full rounded-lg shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.5),inset_1px_1px_3px_rgba(0,0,0,0.2)]
                    ${touched.warrantyType && errors.warrantyType ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="انتخاب نوع گارانتی" />
                  </SelectTrigger>
                  <SelectContent>
                    {warrantyTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {touched.warrantyType && errors.warrantyType && (
                  <p className="mt-1 text-sm text-red-600 text-right">{errors.warrantyType}</p>
                )}
                {isLoading && (
                  <p className="mt-1 text-sm text-gray-500 text-right">در حال بارگذاری انواع گارانتی...</p>
                )}
              </div>

              {/* Warranty Duration */}
              <div className="w-full">
                <input
                  id="warrantyDuration"
                  type="number"
                  min="1"
                  max="600"
                  placeholder='مدت گارانتی (ماه)*'
                  className={`inset-input w-full p-2
                    ${touched.warrantyDuration && errors.warrantyDuration
                      ? "border-red-500"
                      : ""}`
                  }
                />
                {touched.warrantyDuration && errors.warrantyDuration && (
                  <p className="text-sm text-red-600 text-right">
                    {errors.warrantyDuration as string}
                  </p>
                )}
              </div>

              {/* Warranty Description */}
              <div className="w-full">
                <CustomTextArea
                  name="warrantyDescription"
                  rows={3}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                    touched.warrantyDescription && errors.warrantyDescription ? 'border-red-500' : 'border'}`}
                >
                  توضیحات گارانتی*
                </CustomTextArea>
              </div>

              <div className='w-full border-b-1 border-gray-400 mt-2'></div>

              {/* Terms Section */}
              <div className="w-full">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-medium text-gray-800">شرایط گارانتی</h2>
                  <button
                    type="button"
                    onClick={() => setFieldValue('terms', [...values.terms, { title: '', description: '', limitations: '' }])}
                    className="inline-flex items-center px-3 py-1 cta-neu-button w-fit text-sm font-medium"
                  >
                    افزودن شرط جدید <Plus  />
                  </button>
                </div>

                {values.terms.length === 0 && (
                  <p className="mt-2 text-sm text-gray-500 text-right">هنوز شرطی اضافه نشده است.</p>
                )}
                <div className='max-h-64 overflow-y-auto p-3'>
                  <FieldArray name="terms">
                    {() => (
                      <div className="mt-4 space-y-4">
                        {values.terms.map((term, index) => (
                          <div key={index} className="p-4 border border-gray-200 bg-white/0 neu-container">
                            <div className="flex justify-between items-center mb-3">
                              <h3 className="text-sm font-black text-gray-700">شرط #{index + 1}</h3>
                              <button
                                type="button"
                                onClick={() => {
                                  const terms = [...values.terms];
                                  terms.splice(index, 1);
                                  setFieldValue('terms', terms);
                                }}
                                className="flex gap-2 cursor-pointer text-sm text-red-600 hover:text-red-800 hover:bg-red-500 p-2"
                              >
                                حذف <Trash size={18} />
                              </button>
                            </div>

                            {/* Term Title */}
                            <div className="mb-3">
                              <CustomInput
                                id={`terms.${index}.title`}
                                name={`terms.${index}.title`}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                                  touched.terms?.[index]?.title && (errors.terms as any)?.[index]?.title
                                    ? 'border-red-500'
                                    : 'border'
                                }`}
                              >
                                عنوان شرط*
                              </CustomInput>
                            </div>

                            {/* Term Description */}
                            <div className="mb-3">
                              <CustomTextArea
                                id={`terms.${index}.description`}
                                name={`terms.${index}.description`}

                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                                  touched.terms?.[index]?.description && (errors.terms as any)?.[index]?.description
                                    ? 'border-red-500'
                                    : 'border'
                                }`}
                              >
                                توضیحات شرط*
                              </CustomTextArea>
                            </div>

                            {/* Term Limitations */}
                            <div>
                              <CustomTextArea
                                id={`terms.${index}.limitations`}
                                name={`terms.${index}.limitations`}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                                  touched.terms?.[index]?.limitations && (errors.terms as any)?.[index]?.limitations
                                    ? 'border-red-500'
                                    : 'border'
                                }`}
                              >
                                محدودیت‌های شرط*
                              </CustomTextArea>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </FieldArray>
                </div>
              </div>

              {/* Submit Button */}
              <div className="w-full pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'در حال ثبت...' : 'ثبت گارانتی'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddWarranty;