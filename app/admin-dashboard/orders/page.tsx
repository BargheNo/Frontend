import Ordercard from '@/components/Entity-Monitoring/Orders/order-card'
import Header from '@/components/Header/Header'
import { Plus } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'
import SignupButton from '@/components/SignupButton/SignupButton'
import style from "./style.module.css";

const Customer={FirstName:"تینا",LastName:"محمدپور",Email:"tina.mpmp2017@gmail.com",Phone:"+989354826686",Status:"بلاک",ProfilePic:""}
export default function orders() {
  return (
    <>
    <div className='flex flex-col mt-10'>
      <Header className='px-20' header="سفارش ها" />
    </div>
    
    <div className='border-b-1 border-gray-300 py-4 '>
      
      
      <div className='flex flex-row'>
        
      <Select
									name="order status"
								>
									<SelectTrigger
										className={`${style.CustomInput} bg-warm-white px-6 mr-20 mt-[27px] min-h-[43px] cursor-pointer`}
									>
										<SelectValue placeholder="وضعیت سفارش" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>
												وضعیت سفارش
											</SelectLabel>
                      <SelectItem
												value="active"
												className="cursor-pointer"
											>
												 فعال
											</SelectItem>
											<SelectItem
												value="cancled"
												className="cursor-pointer"
											>
												لغو شده
											</SelectItem>
											<SelectItem
												value="expired"
												className="cursor-pointer"
											>
												منقضی
											</SelectItem>
											<SelectItem
												value="deposited"
												className="cursor-pointer"
											>
												سپرده شده
											</SelectItem>
											<SelectItem
												value="all"
												className="cursor-pointer"
											>
												همه
											</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>

                <Select
									name="building type"
								>
									<SelectTrigger
										className={`${style.CustomInput} bg-warm-white px-6 mr-2 mt-[27px] min-h-[43px] cursor-pointer`}
									>
										<SelectValue placeholder="نوع ساختمان" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>
												نوع ساختمان
											</SelectLabel>
                      <SelectItem
												value="active"
												className="cursor-pointer"
											>
												 مسکونی
											</SelectItem>
											<SelectItem
												value="residential"
												className="cursor-pointer"
											>
												تجاری
											</SelectItem>
											<SelectItem
												value="commercial"
												className="cursor-pointer"
											>
												صنعتی
											</SelectItem>
											<SelectItem
												value="agriculture"
												className="cursor-pointer"
											>
												کشاورزی
											</SelectItem>
                      <SelectItem
												value="educational"
												className="cursor-pointer"
											>
												آموزشی
											</SelectItem>
											<SelectItem
												value="goverment"
												className="cursor-pointer"
											>
												دولتی
											</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
                <div className='lg:w-[15%] w-[20%] justify-center mr-auto ml-20'>
                    <SignupButton className='bg-warm-white whitespace-nowrap'>افزودن سفارش<Plus className='text-sunset-orange '/></SignupButton>
                </div>
      </div>
    </div>
    
    <div  className='w-[84%] m-auto border-gray-300  px-10 py-5  rounded-xl'>
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
    
    <Ordercard  Customer={Customer} Status="سپرده شده" MaxCost={12000} Area={120} Name=' سییی سیسی' PowerRequest={1200} BuildingType={'مسکونی'} Address={{
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
