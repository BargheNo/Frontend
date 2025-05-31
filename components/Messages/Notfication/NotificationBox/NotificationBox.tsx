"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import toFarsiNumber from "@/src/functions/toPersianNumbers";
import notificationService from "@/src/services/notificationService";
import { Notification} from "@/src/types/notificationTypes";
import moment from "jalali-moment";
import React, { ReactNode, useState } from "react";


export default function NotificationBox({ children,notificationContent,typeid }: { children: ReactNode,date:string,notificationContent:Notification,typeid:number}) {
    const[open,setOpen]=useState(false);
    const[read,setread]=useState(notificationContent.isRead?"خوانده شده":"خوانده نشده");
   
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
                    <div className="flex flex-col  text-gray-700 mt-2 items-end self-end">
                    {typeid===2&&
                    (
                        <>
                        <span className="mr-2 rtl"><span className="font-bold">{" نام پنل: "}</span>{notificationContent.data.installationRequest.name}</span>
                        <span className="mr-2 rtl"><span className="font-bold">{" هزینه نصب : "}</span>{toFarsiNumber(notificationContent.data.cost)}</span>
                        <span className="mr-2 rtl"><span className="font-bold">{"  تاریخ ثبت درخواست : "}</span>{toFarsiNumber(moment(notificationContent.data.installationRequest.createdTime).locale('fa').format('jYYYY/jMM/jDD'))}</span>
                        {/* <span className="mr-2 rtl">{" نام مشتری: "}{notificationContent.data.installationRequest.customer.firstName+" "+notificationContent.data.installationRequest.customer.lastName}</span> */}
                        {/* <span className="mr-2 rtl">{" شماره تماس مشتری: "}{notificationContent.data.installationRequest.customer.phone}</span> */}
                        {/* <span className="mr-2 rtl">{" نام بیدر: "}{notificationContent.data.bidder.firstName+" "+notificationContent.data.bidder.lastName}</span>             */}
                        <span className="mr-2 rtl"><span className="font-bold">{"  تاریخ نصب: "}</span>{toFarsiNumber(moment(notificationContent.data.installationTime).locale('fa').format('jYYYY/jMM/jDD'))}</span>
                        </> 
                    )
                    }     
                    {typeid===3&&
                    (
                        <>
                        <span className="mr-2 rtl"><span className="font-bold">{" نام پنل: "}</span>{notificationContent?.data?.panel?.name}</span>
                        <span className="mr-2 rtl"><span className="font-bold">{" نام مشتری: "}</span>{notificationContent?.data?.panel?.customer?.firstName+" "+notificationContent?.data?.panel?.customer?.lastName}</span>
                        <span className="mr-2 rtl"><span className="font-bold">{" شماره تماس مشتری: "}</span>{toFarsiNumber(notificationContent?.data?.panel?.customer?.phone)}</span>
                        <span className="mr-2 rtl"><span className="font-bold">{"   نام شرکت نصب کننده: "}</span>{notificationContent?.data?.panel?.corporation?.name}</span>
                        <span className="mr-2 rtl"><span className="font-bold">{"   نام اوپراتور: "}</span>{notificationContent?.data?.panel?.operator?.firstName+" "+notificationContent?.data?.panel?.operator?.lastName}</span>
                        <span className="mr-2 rtl"><span className="font-bold">{"  وضعیت نصب: "}</span>{notificationContent?.data?.status}</span>
                        </> 
                    )
                    }   
                    {typeid===4&&
                    (
                        <>
                        <span className="mr-2 rtl"><span className="font-bold">{"  عنوان اعلان: "}</span>{notificationContent.data.maintenanceRecord.title}</span>
                        <span className="mr-2 rtl"><span className="font-bold">{"  جزئیات اعلان: "}</span>{notificationContent.data.maintenanceRecord.details}</span>
                        <span className="mr-2 rtl"><span className="font-bold">{" نام مشتری: "}</span>{notificationContent.data.maintenanceRecord.customer.firstName+" "+notificationContent.data.maintenanceRecord.customer.lastName}</span>
                        <span className="mr-2 rtl"><span className="font-bold">{" شماره تماس مشتری: "}</span>{toFarsiNumber(notificationContent.data.maintenanceRecord.customer.phone)}</span>
                        <span className="mr-2 rtl"><span className="font-bold">{" نام اوپراتور: "}</span>{notificationContent.data.maintenanceRecord.operator.firstName+" "+notificationContent.data.maintenanceRecord.operator.lastName}</span>
                        <span className="mr-2 rtl"><span className="font-bold">{" نام شرکت: "}</span>{notificationContent.data.maintenanceRecord.corporation.name}</span>
                        <span className="mr-2 rtl"><span className="font-bold">{"   نام پنل: "}</span>{notificationContent.data.maintenanceRecord.panel.name}</span>
                        <span className="mr-2 rtl"><span className="font-bold">{" تاریخ تعمیر: "}</span>{toFarsiNumber(moment(notificationContent.data.maintenanceRecord.date).locale('fa').format('jYYYY/jMM/jDD'))}</span>
                        <span className="mr-2 rtl"><span className="font-bold">{"    وضعیت تعمیر: "}</span>{notificationContent.data.status}</span>
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
						
                        <button onClick={()=>setOpen(!open)} className="shadow-md cursor-pointer text-[0.8rem] w-28 rounded-lg bg-fire-orange text-white h-9">
                        مشاهده جزئیات
						</button>
                        
						<button onClick={()=>{notificationContent.isRead===false?notificationService.markAsRead(notificationContent.id).then(res=>setread("خوانده شده")):""}}  className="shadow-md cursor-pointer text-[0.8rem] w-28 rounded-lg bg-fire-orange text-white h-9">
                            {read}
						</button>
					
					</div>
				</div>
			</div>
		</div>
        </>

	);
}
