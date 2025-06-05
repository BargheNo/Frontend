import { Trash } from 'lucide-react';
import CustomInput from '@/components/Custom/CustomInput/CustomInput';
import CustomTextArea from '@/components/Custom/CustomTextArea/CustomTextArea';
import { TermItem } from './warrantyTypes';
import { FormikTouched, FormikErrors } from 'formik';

interface WarrantyTermCardProps {
  index: number;
  touched: FormikTouched<{ terms: TermItem[] }>;
  errors: FormikErrors<{ terms: TermItem[] }>;
  onRemove: () => void;
}

const WarrantyTermCard = ({ index, touched, errors, onRemove }: WarrantyTermCardProps) => {
  const termErrors = errors.terms?.[index] as FormikErrors<TermItem> | undefined;
  const termTouched = touched.terms?.[index] as FormikTouched<TermItem> | undefined;

  return (
    <div className="p-4 border border-gray-200 bg-white/0 neu-container">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-black text-gray-700">شرط #{index + 1}</h3>
        <button
          type="button"
          onClick={onRemove}
          className="flex gap-2 cursor-pointer text-sm text-red-600 hover:text-red-800 hover:bg-red-500 p-2"
        >
          حذف <Trash size={18} />
        </button>
      </div>

      <div className="mb-3">
        <CustomInput
          id={`terms.${index}.title`}
          name={`terms.${index}.title`}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            termTouched?.title && termErrors?.title
              ? 'border-red-500'
              : 'border'
          }`}
        >
          عنوان شرط*
        </CustomInput>
      </div>

      <div className="mb-3">
        <CustomTextArea
          id={`terms.${index}.description`}
          name={`terms.${index}.description`}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            termTouched?.description && termErrors?.description
              ? 'border-red-500'
              : 'border'
          }`}
        >
          توضیحات شرط*
        </CustomTextArea>
      </div>

      <div>
        <CustomTextArea
          id={`terms.${index}.limitations`}
          name={`terms.${index}.limitations`}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            termTouched?.limitations && termErrors?.limitations
              ? 'border-red-500'
              : 'border'
          }`}
        >
          محدودیت‌های شرط*
        </CustomTextArea>
      </div>
    </div>
  );
};

export default WarrantyTermCard; 