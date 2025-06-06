'use client'
import React, { useRef, useState } from 'react'
import { Ellipsis,Copy, CheckIcon, CopyIcon, Share2Icon } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/react-hover-card'
import { Button } from '@/components/ui/button'
import { getOrder } from '@/src/types/Entity-Monitoring/orderType'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import NotificationsDialogFields from '@/components/Messages/Notfication/NotificationBox/NotificationsDialogFields'

export default function Ordercard({Name,Status,Customer,MaxCost,Area,PowerRequest,BuildingType,Description,Address}:getOrder) {
    const getStatusColor = () => {
		if (Status === "فعال")
			return " text-green-600";
		if (Status==="غیرفعال")
			return "text-red-600";
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
        <div onClick={()=>setOpen(!open)} className='w-[90%] m-auto border-gray-300 border-2 px-10 py-3 cursor-pointer '>
            <div className='flex flex-row justify-between items-center w-full rtl'>
                <div className='flex flex-row items-center mr-4'>
                    <span>{Customer.FirstName+" "+Customer.LastName}</span>
                </div>
                <span  >{Name}</span>
                <span className={`${getStatusColor()}`}>{Status}</span>
                <span>{MaxCost}</span>
                <span>{PowerRequest}</span>
                <span>{Area}</span>
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <Button  className="cursor-pointer" variant="link"><Ellipsis/></Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-34 h-auto border-0 p-4 flex flex-col gap-2 rtl bg-warm-white ">
                        <div className="flex flex-col neo-btn bg-white h-8">
                            <div className=" w-full cursor-pointer">
                                <p className="mt-1 mr-2">حذف</p>
                            </div>
                        </div>
                        <div className="flex flex-col neo-btn bg-white h-8">
                            <div className=" w-full cursor-pointer">
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
                    <NotificationsDialogFields title="   نام پنل: " detail={Name}/>
                    <NotificationsDialogFields title="    وضعیت سفارش: " detail={Status}/>
                    <NotificationsDialogFields title="     توضیحات: " detail={Description}/>
                    <NotificationsDialogFields title="    سقف هزینه: " detail={MaxCost.toString()}/>
                    <NotificationsDialogFields title="    مساحت: " detail={Area.toString()+"متر مربع"}/>
                    <NotificationsDialogFields title="    توان مصرفی: " detail={PowerRequest.toString()+"کیلووات"}/>
                    <NotificationsDialogFields title="    نوع ساختمان: " detail={BuildingType}/>
                    <NotificationsDialogFields title="    نام مشتری: " detail={Customer.FirstName+" "+Customer.LastName}/>
                    <NotificationsDialogFields title="    شماره تماس مشتری: " detail={Customer.Phone}/>
                    {Customer.Email&&(<NotificationsDialogFields title="     ایمیل:" detail={Customer.Email}/>)}
                    <NotificationsDialogFields title="    وضعیت مشتری:" detail={Customer.Status}/>
                    <NotificationsDialogFields title="    آدرس:" detail={ "استان "+Address.Province+"،شهر "+Address.City+"،"+Address.StreetAddress+"،پلاک "+Address.HouseNumber+"، واحد" +Address.Unit}/>
                    <NotificationsDialogFields title="    کدپستی:" detail={Address.PostalCode}/>
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
