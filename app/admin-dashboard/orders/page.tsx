"use client"
import Ordercard from '@/components/Entity-Monitoring/Orders/order-card'
import Header from '@/components/Header/Header'
import { Plus } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useEffect, useState } from 'react'
import SignupButton from '@/components/SignupButton/SignupButton'
import style from "./style.module.css";
import { getOrder } from '@/src/types/Entity-Monitoring/orderType'
import OrderService from '@/src/services/entityMonitoring'


export default function orders() {
const [orderlist,setOrderList]=useState<getOrder[]>([]);
const[status,setStatus]=useState<number>(5);
const orderStatusTypeMap = {
	active: '1',
	expired: '2',
	cancled: '3',
	deposited: '4',
	all: '5',
  } as const;
useEffect(()=>{
  OrderService.getOrdersList(status,1,1).then(res=>setOrderList(res.data));
  
},[status]);
  return (
    <>
		<div className='flex flex-col mt-10'>
			<Header className='px-20' header="سفارش ها" />
		</div>
    
    	<div className='border-b-1 border-gray-300 py-4'>
      
      
      		<div className='flex flex-row items-end'>
        
			  <Select
				name="order status"
				onValueChange={(value: keyof typeof orderStatusTypeMap) => {
					const id = orderStatusTypeMap[value];
					if (id) setStatus(Number(id));
				}}
				>
  				<SelectTrigger
    			className={`${style.CustomInput} bg-warm-white px-6 mr-20 mt-[27px] min-h-[43px] cursor-pointer`}
  				>
    				<SelectValue placeholder="وضعیت سفارش" />
  				</SelectTrigger>
  				<SelectContent>
    				<SelectGroup>
						<SelectLabel>وضعیت سفارش</SelectLabel>
						<SelectItem value="active" className="cursor-pointer">فعال</SelectItem>
						<SelectItem value="cancled" className="cursor-pointer">لغو شده</SelectItem>
						<SelectItem value="expired" className="cursor-pointer">منقضی</SelectItem>
						<SelectItem value="deposited" className="cursor-pointer">سپرده شده</SelectItem>
						<SelectItem value="all" className="cursor-pointer">همه</SelectItem>
    				</SelectGroup>
  				</SelectContent>
			  </Select>

                {/* <div className='lg:w-[15%] w-[20%] justify-center mr-auto ml-20'>
                    <SignupButton className='bg-warm-white whitespace-nowrap'>افزودن سفارش<Plus className='text-sunset-orange '/></SignupButton>
                </div> */}
      		</div>
    	</div>
    
		<div className='w-[91%] m-auto border-gray-300 px-10 py-5 rounded-xl'>
		<div className='flex flex-row justify-between items-center w-full rtl text-gray-500'>
			<div className="flex w-full justify-between text-center">
			<span className="w-[16%] flex justify-center">نام مشتری</span>
			<span className="w-[16%] flex justify-center">نام پنل</span>
			<span className="w-[16%] flex justify-center">وضعیت سفارش</span>
			<span className="w-[16%] flex justify-center">سقف هزینه</span>
			<span className="w-[16%] flex justify-center">توان مصرفی</span>
			<span className="w-[20%] flex justify-center">مساحت</span>
			</div>
		</div>
		</div>

		<div className="rounded-xl overflow-hidden w-[90%] m-auto  ">
		{orderlist.map((Item,index)=>
			
			
			<Ordercard id={Item.id} key={index} customer={Item.customer} status={Item.status} maxCost={Item.maxCost} area={Item.area} name={Item.name} powerRequest={Item.powerRequest} buildingType={Item.buildingType}
			address={Item.address} description={Item.description}></Ordercard>
			
		)}
		</div>
    </>
  )
}
