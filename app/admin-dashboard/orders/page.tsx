import Ordercard from '@/components/Entity-Monitoring/Orders/order-card'
import Header from '@/components/Header/Header'
import { Select, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SelectContent } from '@radix-ui/react-select'
import React from 'react'
const Customer={FirstName:"تینا",LastName:"محمدپور",Email:"tina.mpmp2017@gmail.com",Phone:"+989354826686",Status:"بلاک",ProfilePic:""}
export default function orders() {
  return (
    <>
    <div className='flex flex-col mt-10'>
      <Header className='px-20' header="سفارش ها" />
    </div>
    
    <div className='border-b-1 border-gray-300 py-8 '>
      
    </div>
    <div  className='w-[84%] m-auto border-gray-300  px-10 py-5 cursor-pointer rounded-xl'>
            <div className='flex flex-row justify-between items-center w-full rtl text-gray-500'>
                  <span >نام مشتری</span>
                  <span>نام پنل</span>
                  <span>وضعیت سفارش</span>
                  <span>سقف هزینه</span>
                  <span>توان مصرفی</span>
                  <span>مساحت</span>
                  <span> </span>
            </div>
    </div>
    
    <Ordercard  Customer={Customer} Status="فعال" MaxCost={12000} Area={120} Name=' سییی سیسی' PowerRequest={1200} BuildingType={'مسکونی'} Address={{
        Province: 'مازندران',
        City: 'آمل',
        StreetAddress: 'خیابان امام رضا، رضوان 20',
        PostalCode: '9837485930',
        HouseNumber: '21',
        Unit: 2
      }} Description={'این سفارش خیلی ضروریههههه'} ></Ordercard>
          <Ordercard  Customer={Customer} Status="فعال" MaxCost={12000} Area={120} Name=' سییی سیسی' PowerRequest={1200} BuildingType={'مسکونی'} Address={{
        Province: 'مازندران',
        City: 'آمل',
        StreetAddress: 'خیابان امام رضا، رضوان 20',
        PostalCode: '9837485930',
        HouseNumber: '21',
        Unit: 2
      }} Description={'این سفارش خیلی ضروریههههه'} ></Ordercard>
          <Ordercard  Customer={Customer} Status="فعال" MaxCost={12000} Area={120} Name=' سییی سیسی' PowerRequest={1200} BuildingType={'مسکونی'} Address={{
        Province: 'مازندران',
        City: 'آمل',
        StreetAddress: 'خیابان امام رضا، رضوان 20',
        PostalCode: '9837485930',
        HouseNumber: '21',
        Unit: 2
      }} Description={'این سفارش خیلی ضروریههههه'} ></Ordercard>
    </>
  )
}
