import * as Yup from 'yup';
import { FormValues } from './warrantyTypes';

export const validationSchema = Yup.object().shape({
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

export const initialValues: FormValues = {
  warrantyName: '',
  warrantyType: '',
  warrantyDuration: 12,
  warrantyDescription: '',
  terms: [],
}; 