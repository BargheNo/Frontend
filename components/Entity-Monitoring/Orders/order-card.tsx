'use client'
import React, { useRef, useState } from 'react'
import { Ellipsis, CheckIcon, CopyIcon, Share2Icon } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/react-hover-card'
import { Button } from '@/components/ui/button'
import { getOrder } from '@/src/types/Entity-Monitoring/orderType'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import NotificationsDialogFields from '@/components/Messages/Notfication/NotificationBox/NotificationsDialogFields'

export default function Ordercard({name,status,customer,maxCost,area,powerRequest,buildingType,description,address}:getOrder) {
    const getStatusColor = () => {
		if (status === "فعال")
			return " text-green-600";
		else if (status==="منقضی")
			return "text-gray-500";
        else if (status==="لغو شده")
			return "text-red-600";
        if (status==="سپرده شده")
			return "text-yellow-600";
		return "text-yellow-600";
	};
    const[open,setOpen]=useState(false);
    const[copied,setCopied]=useState(false);
    const orderDetailRef=useRef<HTMLDivElement>(null);
    const handleCopy= ()=>{
            navigator.clipboard.writeText(orderDetailRef.current?.innerText||"");
            setCopied(true);
            setTimeout(()=>setCopied(false),2500);
    }
  return (
    <>
        <div onClick={()=>setOpen(!open)} className='  border-gray-300 border-1 w-full py-3 cursor-pointer bg-warm-white'>
            <div className='flex flex-row justify-between items-center w-full rtl'>
                <div className="flex w-full justify-between items-center text-sm text-gray-700 px-7 text-center">
                    <span className="w-[16%] flex justify-center">{customer.firstName + " " + customer.lastName}</span>
                    <span className="w-[16%] flex justify-center">{name}</span>
                    <span className={`w-[16%] flex justify-center ${getStatusColor()}`}>{status}</span>
                    <span className="w-[16%] flex justify-center">{maxCost}</span>
                    <span className="w-[16%] flex justify-center">{powerRequest}</span>
                    <span className="w-[16%] flex justify-center">{area}</span>
                </div>
            <HoverCard>
                <HoverCardTrigger asChild>
                <Button className="cursor-pointer" variant="link">
                    <Ellipsis />
                </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-34 h-auto border-0 p-4 flex flex-col gap-2 rtl bg-warm-white">
                <div className="flex flex-col neo-btn bg-white h-8">
                    <div className="w-full cursor-pointer">
                    <p className="mt-1 mr-2">حذف</p>
                    </div>
                </div>
                <div className="flex flex-col neo-btn bg-white h-8">
                    <div className="w-full cursor-pointer">
                    <p className="mt-1 mr-2">ویرایش</p>
                    </div>
                </div>
                </HoverCardContent>
            </HoverCard>
            </div>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
			<DialogContent
				style={{ backgroundColor: "#F1F4FC" }}
				className="w-full sm:min-w-[690px] max-w-xl max-h-[90vh] no-scrollbar mx-auto p-4 overflow-y-auto py-4"
			>
				<DialogHeader>
					<DialogTitle className="flex justify-center items-end font-bold mt-3.5">
						جزئیات سفارش
					</DialogTitle>
				</DialogHeader>
                <div className='flex flex-col gap-y-2 py-3' ref={orderDetailRef}>
                    <NotificationsDialogFields title="   نام پنل: " detail={name}/>
                    <NotificationsDialogFields title="    وضعیت سفارش: " detail={status}/>
                    <NotificationsDialogFields title="     توضیحات: " detail={description}/>
                    <NotificationsDialogFields title="    سقف هزینه: " detail={maxCost.toString()}/>
                    <NotificationsDialogFields title="    مساحت: " detail={area.toString()+"متر مربع"}/>
                    <NotificationsDialogFields title="    توان مصرفی: " detail={powerRequest.toString()+"کیلووات"}/>
                    <NotificationsDialogFields title="    نوع ساختمان: " detail={buildingType}/>
                    <NotificationsDialogFields title="    نام مشتری: " detail={customer.firstName+" "+customer.lastName}/>
                    <NotificationsDialogFields title="    شماره تماس مشتری: " detail={customer.phone}/>
                    {customer.email&&(<NotificationsDialogFields title="     ایمیل:" detail={customer.email}/>)}
                    <NotificationsDialogFields title="    وضعیت مشتری:" detail={customer.status}/>
                    <NotificationsDialogFields title="    آدرس:" detail={ "استان "+address.province+"،شهر "+address.city+"،"+address.streetAddress+"،پلاک "+address.houseNumber+"، واحد" +address.unit}/>
                    <NotificationsDialogFields title="    کدپستی:" detail={address.postalCode}/>
                </div>

				<DialogFooter className="flex flex-row justify-center items-center rounded-l self-center mr-auto">
                <button
                    onClick={handleCopy}
                    className=" flex items-center gap-1 border-1 rounded px-2 py-1 text-sm text-muted-foreground cursor-pointer hover:text-primary"
                    >
                    {copied ? (
                        <>
                        <CheckIcon className="h-4 w-4" /> کپی شد
                        </>
                    ) : (
                        <>
                        <CopyIcon className="h-4 w-4" /> کپی
                        </>
                    )}
                </button>
                <button
                    onClick={() => {
                        const text = orderDetailRef.current?.innerText || "";
                          navigator.share({
                            title: "جزئیات سفارش",
                            text,
                          });

                      }}
                      
                    className="flex items-center gap-1 border-1 rounded px-2 py-1 text-sm text-muted-foreground hover:text-primary"
                >
                    <Share2Icon className="h-4 w-4" /> ارسال
                </button>
					<DialogClose />
				</DialogFooter>
						
			</DialogContent>
		</Dialog>
    </>
  )
}
