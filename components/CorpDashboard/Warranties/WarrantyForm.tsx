import { Plus } from 'lucide-react';
import { Form, Formik, FieldArray } from 'formik';
import CustomInput from '@/components/Custom/CustomInput/CustomInput';
import CustomTextArea from '@/components/Custom/CustomTextArea/CustomTextArea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormValues, WarrantyType } from './warrantyTypes';
import { validationSchema, initialValues } from './constants';
import WarrantyTermCard from './WarrantyTermCard';

interface WarrantyFormProps {
  warrantyTypes: WarrantyType[];
  isLoading: boolean;
  onSubmit: (values: FormValues) => void;
}

const WarrantyForm = ({ warrantyTypes, isLoading, onSubmit }: WarrantyFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ values, errors, touched, isSubmitting, setFieldValue }) => (
        <Form className="flex flex-col items-end w-full h-auto max-h-[85vh] gap-4 rtl overflow-y-auto">
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
          <div className="w-full mt-6">
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
            <CustomInput
              name="warrantyDuration"
              type="number"
              min="1"
              max="120"
              className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                touched.warrantyDuration && errors.warrantyDuration ? 'border-red-500' : 'border'}`}
            >
              مدت گارانتی (ماه)*
            </CustomInput>
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
                افزودن شرط جدید <Plus />
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
                      <WarrantyTermCard
                        key={index}
                        term={term}
                        index={index}
                        touched={touched}
                        errors={errors}
                        onRemove={() => {
                          const terms = [...values.terms];
                          terms.splice(index, 1);
                          setFieldValue('terms', terms);
                        }}
                      />
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
  );
};

export default WarrantyForm; 