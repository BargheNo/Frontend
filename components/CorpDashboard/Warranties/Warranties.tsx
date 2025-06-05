import React, { useEffect } from 'react'
import WarrantyCard from './WarrantyCard'
import { Warranty } from './warrantyTypes.ts'
import { useDispatch } from 'react-redux'
import { fetchWarrantyTypes } from '@/src/store/slices/warrantyTypesSlice.ts'
import { AppDispatch } from '@/src/store/store'

const mockData: Warranty[] = [
    {
        name: "گارانتی طلایی کمرنگ",
        type: 1,
        duration: 50,
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
        name: "گارانتی طلایی براق",
        type: 2,
        duration: 50,
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
        name: "گارانتی قهوه‌ای ملو",
        type: 3,
        duration: 50,
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
        name: "گارانتی سبز فسفری",
        type: 2,
        duration: 50,
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
        name: "گارانتی قرمز بدرنگ",
        type: 3,
        duration: 50,
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
        name: "گارانتی آبی حنایی",
        type: 1,
        duration: 50,
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

  useEffect(() => {
    dispatch(fetchWarrantyTypes());
  }, [dispatch]);


  return (
    // <TwoColsLayout>
    <div className='grid md:grid-cols-2 md:gap-x-7 gap-y-5'>
        {mockData.map((WarrantyItem, index) =>
            <WarrantyCard
                key={index}
                name={WarrantyItem.name}
                type={WarrantyItem.type}
                duration={WarrantyItem.duration}
                description={WarrantyItem.description}
                terms={WarrantyItem.terms}
                isArchived={WarrantyItem.isArchived}
            />
        )}
    </div>
    // </TwoColsLayout>
  )
}

export default Warranties