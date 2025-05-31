"use client"
import { Button } from "@/components/ui/button";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/react-hover-card";
import toFarsiNumber from "@/src/functions/toPersianNumbers";
import notificationService from "@/src/services/notificationService";
import { Notification} from "@/src/types/notificationTypes";
import { event } from "cypress/types/jquery";
import moment from "jalali-moment";
import { MessageCirclePlus,EllipsisVertical } from "lucide-react";
import React, { ReactNode, useState } from "react";
import { toast } from "sonner";


export default function NotificationBox({ children,notificationContent,typeid }: { children: ReactNode,date:string,notificationContent:Notification,typeid:number}) {
    const[open,setOpen]=useState(false);
    const[read,setread]=useState(notificationContent.isRead?"خوانده شده":"خوانده نشده");
    const getStatusColor = () => {
		if (notificationContent.isRead === true)
			return "bg-gradient-to-br from-green-400 to-green-500 border-1 border-gray-100/50 shadow-sm shadow-green-500";
		if (notificationContent.isRead===false)
			return "bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-yellow-500";
		return "bg-gradient-to-br from-red-400 to-red-500 shadow-red-500";
	};
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

        <ContextMenu>
  <ContextMenuTrigger>

		<div className="w-full border-t-1 border-b-1 md:border-gray-300 border-gray-600 first:border-t-0">
			<div className="flex flex-row justify-between h-full bg-[#F0EDEF] p-4 rtl md:pb-5 pb-28 overflow-hidden relative">
                
				<div className="flex flex-col justify-between w-full z-10 space-x-0">
                    
					<div className="w-full">{children}</div>
				    </div>
                
				<div className="flex flex-col lg:justify-center justify-end lg:mb-0 -mb-20 gap-2 items-center md:mb-10 md:mr-0 -mr-40 min-w-48 ">
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <Button  className="cursor-pointer mr-auto mb-auto -mt-2 -ml-2" variant="link"><EllipsisVertical/></Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-34 h-auto border-0 p-4 flex flex-col gap-2 rtl bg-warm-white ">
                        <div className="flex neo-btn bg-white h-8">
                            <div onClick={()=>{notificationContent.isRead===false?notificationService.markAsRead(notificationContent.id).then(res=>setread("خوانده شده")):toast.success("قبلا خوانده شده.")}}  className=" w-full cursor-pointer">
                                <p className="mt-1 mr-2">خوانده شد</p>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
                
					<div className="flex flex-col md:ml-10 ml-23 items-center justify-center gap-2 p-5 md:mt-0 mt-15">

                        <div className="flex flex-col gap-4">

							<div className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-[#F0F0F3] shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)] w-24 ">
								<div
									className={`h-4 w-4 rounded-full ${getStatusColor()} shadow-md`}
								></div>
								<span className="text-sm font-medium text-gray-600">
									{notificationContent.isRead?"خوانده شده":"خوانده نشده"}
								</span>
							</div>
						</div>
                        <div className={`cta-neu-button flex bg-white items-center md:w-auto w-40 content-center justify-center `}>
                                <button onClick={()=>setOpen(!open)} className="cursor-pointer whitespace-nowrap text-[1rem]">
                                        مشاهده جزئیات
                                </button>
                                <MessageCirclePlus />
                        </div>
                        
                        {/* <div className={`cta-neu-button flex bg-white items-center content-center justify-center`}>
                                <button onClick={()=>{notificationContent.isRead===false?notificationService.markAsRead(notificationContent.id).then(res=>setread("خوانده شده")):""}}  className="cursor-pointer whitespace-nowrap text-[1rem]">
                                       {read}
                                </button>
                                <MessageCirclePlus />
                        </div> */}

						{/* <button onClick={()=>{notificationContent.isRead===false?notificationService.markAsRead(notificationContent.id).then(res=>setread("خوانده شده")):""}}  className="shadow-md cursor-pointer text-[0.8rem] w-28 rounded-lg bg-fire-orange text-white h-9">
                            {read}
						</button> */}
					
					</div>
				</div>
			</div>
		</div>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="border-0 p-4 flex flex-col gap-2 rtl bg-warm-white">
                <ContextMenuItem  className="neo-btn bg-white" onClick={()=>{notificationContent.isRead===false?notificationService.markAsRead(notificationContent.id).then(res=>setread("خوانده شده")):toast.success("قبلا خوانده شده.")}} >خوانده شد</ContextMenuItem>
            </ContextMenuContent>
            </ContextMenu>

        </>

	);
}
