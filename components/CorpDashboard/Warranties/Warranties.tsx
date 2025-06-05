import React, { useEffect, useState } from 'react'
import WarrantyCard from './WarrantyCard'
import { Warranty } from './warrantyTypes.ts'
import { useDispatch } from 'react-redux'
import { fetchWarrantyTypes } from '@/src/store/slices/warrantyTypesSlice.ts'
import { AppDispatch } from '@/src/store/store'
import { baseURL, getData } from '@/src/services/apiHub.tsx'
import CustomToast from '@/components/Custom/CustomToast/CustomToast.tsx'
import WarrantyFilter from './WarrantyFilter'
import FilterSection from '../FilterSection'
import LoadingSpinner from '@/components/Loading/LoadingSpinner/LoadingSpinner.tsx'

const mockData: Warranty[] = [
    {
        id: 1,
        name: "گارانتی طلایی کمرنگ",
        guaranteeType: 1,
        durationMonths: 50,
        description: "این یک گارانتی خیلی ویژه و طلایی و خیلی و خوب و بی نظیر و محشره محشره خیلی عالیه خوبه فوق العاده اس",
        terms: [
            {
              title: "ضربه خوردگی",
              description: "این جزو گارانتی محسوب نمیشه لطفا اصرار نکنید",
              limitations: "واقعا نمیدونم این فیلد چی توشه"
            },
            {
                title: "ضربه خوردگی",
                description: "این جزو گارانتی محسوب نمیشه لطفا اصرار نکنید",
                limitations: "واقعا نمیدونم این فیلد چی توشه"
            },
            {
                title: "ضربه خوردگی",
                description: "این جزو گارانتی محسوب نمیشه لطفا اصرار نکنید",
                limitations: "واقعا نمیدونم این فیلد چی توشه"
            },
            {
                title: "ضربه خوردگی",
                description: "این جزو گارانتی محسوب نمیشه لطفا اصرار نکنید",
                limitations: "واقعا نمیدونم این فیلد چی توشه"
            }
        ],
        isArchived: true,
    },
    {
        id: 2,
        name: "گارانتی طلایی براق",
        guaranteeType: 2,
        durationMonths: 50,
        description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
        terms: [
            {
              title: "ضربه خوردگی",
              description: "این جزو گارانتی محسوب نمیشه لطفا اصرار نکنید",
              limitations: "واقعا نمیدونم این فیلد چی توشه"
            }
        ],
        isArchived: false,
    },
    {
        id: 3,
        name: "گارانتی قهوه‌ای ملو",
        guaranteeType: 3,
        durationMonths: 50,
        description: "این یک گارانتی خیلی ویژه و طلایی و خیلی و خوب و بی نظیر و محشره محشره خیلی عالیه خوبه فوق العاده اس",
        terms: [
            {
              title: "ضربه خوردگی",
              description: "این جزو گارانتی محسوب نمیشه لطفا اصرار نکنید",
              limitations: "واقعا نمیدونم این فیلد چی توشه"
            }
        ],
        isArchived: false,
    },
    {
        id: 4,
        name: "گارانتی سبز فسفری",
        guaranteeType: 2,
        durationMonths: 50,
        description: "این یک گارانتی خیلی ویژه و طلایی و خیلی و خوب و بی نظیر و محشره محشره خیلی عالیه خوبه فوق العاده اس",
        terms: [
            {
              title: "ضربه خوردگی",
              description: "این جزو گارانتی محسوب نمیشه لطفا اصرار نکنید",
              limitations: "واقعا نمیدونم این فیلد چی توشه"
            }
        ],
        isArchived: false,
    },
    {
        id: 5,
        name: "گارانتی قرمز بدرنگ",
        guaranteeType: 3,
        durationMonths: 50,
        description: "این یک گارانتی خیلی ویژه و طلایی و خیلی و خوب و بی نظیر و محشره محشره خیلی عالیه خوبه فوق العاده اس",
        terms: [
            {
              title: "ضربه خوردگی",
              description: "این جزو گارانتی محسوب نمیشه لطفا اصرار نکنید",
              limitations: "واقعا نمیدونم این فیلد چی توشه"
            }
        ],
        isArchived: false,
    },
    {
        id: 6,
        name: "گارانتی آبی حنایی",
        guaranteeType: 1,
        durationMonths: 50,
        description: "این یک گارانتی خیلی ویژه و طلایی و خیلی و خوب و بی نظیر و محشره محشره خیلی عالیه خوبه فوق العاده اس",
        terms: [
            {
              title: "ضربه خوردگی",
              description: "این جزو گارانتی محسوب نمیشه لطفا اصرار نکنید",
              limitations: "واقعا نمیدونم این فیلد چی توشه"
            }
        ],
        isArchived: false,
    }
]

const Warranties = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [warrantyData, setWarrantyData] = useState<Warranty[] | null>(null);
  const [status, setStatus] = useState(1); // Default to active warranties
  const [loadingGuarantees, setLoadingGuarantees] = useState(true);

  useEffect(() => {
    dispatch(fetchWarrantyTypes());

    setLoadingGuarantees(true);
    getData({
        endPoint: `${baseURL}/v1/corp/2/guarantee?status=${status}`
    }).then(res => {
        setWarrantyData(res.data);
        // console.log(res.data)
        setLoadingGuarantees(false);
    }).catch(err => {
        CustomToast("مشکلی در دریافت اطلاعات گارانتیها پیش آمد!", "error");
        // console.log(err);
        setLoadingGuarantees(false);
    })
  }, [dispatch, status]); // Added status to dependencies

  const handleStatusChange = (newStatus: number) => {
    setStatus(newStatus);
  };

  if (loadingGuarantees) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col neu-container p-4 gap-4">
        <WarrantyFilter
          currentStatus={status}
          onStatusChange={handleStatusChange}
        />
      </div>
      <div className='grid md:grid-cols-2 md:gap-x-7 gap-y-5'>
          {(warrantyData || mockData).map((warrantyItem) =>
              <WarrantyCard
                  key={warrantyItem.id}
                  {...warrantyItem}
                  isArchived={warrantyItem.status !== "فعال"}
              />
          )}
      </div>
    </div>
  )
}

export default Warranties