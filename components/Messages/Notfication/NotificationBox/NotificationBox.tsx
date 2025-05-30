"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Notification} from "@/src/types/notificationTypes";
import React, { ReactNode, useState } from "react";


export default function NotificationBox({ children,date,notificationContent,typeid }: { children: ReactNode,date:string,notificationContent:Notification,typeid:number}) {
    const[open,setOpen]=useState(false);
	return (
        <>  
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
            </DialogTrigger>
            
            <DialogContent
                className="w-full sm:min-w-[500px] max-w-l p-4 overflow-auto py-4 bg-[#F1F4FC]"
            >
                 <DialogTitle className="flex justify-center font-bold mt-3.5">
                        جزئیات اعلان
                </DialogTitle>
                    <div className="flex flex-col text-gray-700 mt-2 items-end self-end">
                    {typeid===2&&
                    (
                        <>
                        <span className="mr-2 rtl">{" نام پنل: "}{notificationContent.data.installationRequest.name}</span>
                        <span className="mr-2 rtl">{" نام مشتری: "}{notificationContent.data.installationRequest.customer.firstName+" "+notificationContent.data.installationRequest.customer.lastName}</span>
                        <span className="mr-2 rtl">{" شماره تماس مشتری: "}{notificationContent.data.installationRequest.customer.phone}</span>
                        <span className="mr-2 rtl">{" نام بیدر: "}{notificationContent.data.bidder.firstName+" "+notificationContent.data.bidder.lastName}</span>            
                        <span className="mr-2 rtl">{"  تاریخ نصب: "}{notificationContent.data.installationTime}</span>
                        </> 
                    )
                    }          
                    </div>
            </DialogContent>
        </Dialog>
		<div className="w-full border-t-1 md:border-gray-300 border-gray-400 first:border-t-0">
			<div className="flex flex-row justify-between h-full bg-[#F0EDEF] p-4 rtl md:pb-5 pb-28 overflow-hidden relative">
				<div className="flex flex-col justify-between w-full z-10 space-x-0">
					<div className="w-full">{children}</div>
				</div>
				<div className="flex flex-col lg:justify-center justify-end lg:mb-0 -mb-20 gap-2 items-center md:mb-10 md:mr-0 -mr-40 min-w-48 ">
					<div className="flex flex-col  w-2/3 items-center justify-center gap-2 p-5 rounded-2xl bg-[#F0F0F3] shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)]">
						<span className="text-sm font-medium text-gray-600">
							{date}
						</span>

						<button onClick={()=>setOpen(!open)} className="shadow-md cursor-pointer text-[0.8rem] w-28 rounded-lg bg-fire-orange text-white h-9">
							مشاهده جزئیات
						</button>
					
					</div>
				</div>
			</div>
		</div>
        </>

	);
}
