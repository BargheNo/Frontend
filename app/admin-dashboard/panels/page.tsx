"use client";
import Ordercard from "@/components/Entity-Monitoring/Orders/order-card";
import Header from "@/components/Header/Header";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import SignupButton from "@/components/SignupButton/SignupButton";
import style from "./style.module.css";
import { getOrder } from "@/src/types/Entity-Monitoring/orderType";
import PanelService from "@/src/services/entityMonitoringPanel";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import { getPanel } from "@/src/types/Entity-Monitoring/panelType";
import PanelCard from "@/components/Entity-Monitoring/Panels/panel-card";

export default function panels() {
  const [panellist, setPanelList] = useState<getPanel[]>([]);
  const [status, setStatus] = useState<number>(4);
  const [loading, setLoading] = useState(true);
  const panelStatusTypeMap = {
    active: "1",
    expired: "2",
    cancled: "3",
    all: "4",
  } as const;
  useEffect(() => {
    PanelService.getPanelList(status, 1, 1).then((res) => {
      setPanelList(res.data);
      setLoading(false);
    });
  }, [status]);
  return (
    <>
      <div className="flex flex-col mt-10">
        <Header className="px-20" header="پنل ها" />
      </div>

      <div className="border-b-1 border-gray-300 py-4">
        <div className="flex flex-row items-end">
          <Select
            name="order status"
            onValueChange={(value: keyof typeof panelStatusTypeMap) => {
              const id = panelStatusTypeMap[value];
              if (id) setStatus(Number(id));
            }}
          >
            <SelectTrigger
              className={`${style.CustomInput} bg-warm-white px-6 mr-20 mt-[27px] min-h-[43px] cursor-pointer`}
            >
              <SelectValue placeholder="وضعیت پنل" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>وضعیت پنل</SelectLabel>
                <SelectItem value="active" className="cursor-pointer">
                  فعال
                </SelectItem>
                <SelectItem value="expired" className="cursor-pointer">
                   در انتظار نصب
                </SelectItem>
                <SelectItem value="cancled" className="cursor-pointer">
                  خراب
                </SelectItem>

                <SelectItem value="all" className="cursor-pointer">
                  همه
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* <div className='lg:w-[15%] w-[20%] justify-center mr-auto ml-20'>
                    <SignupButton className='bg-warm-white whitespace-nowrap'>افزودن سفارش<Plus className='text-sunset-orange '/></SignupButton>
                </div> */}
        </div>
      </div>

      <div className="w-[91%] m-auto border-gray-300 px-10 py-5 rounded-xl">
        <div className="flex flex-row justify-between items-center w-full rtl text-gray-500">
          <div className="flex w-full justify-between text-center">
          <span className="w-[16%] flex justify-center">نام پنل</span>
            <span className="w-[16%] flex justify-center">نام مشتری</span>
            <span className="w-[16%] flex justify-center">نام شرکت</span>
            <span className="w-[16%] flex justify-center">وضعیت سفارش</span>
            <span className="w-[16%] flex justify-center">توان مصرفی</span>
            <span className="w-[20%] flex justify-center">وضعیت گارانتی</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center mt-6">
          <LoadingSpinner />
        </div>
      ) : panellist && panellist.length > 0 ? (
        <div className="rounded-xl overflow-hidden w-[90%] m-auto">
          {panellist.map((Item, index) => (
            <PanelCard
                  id={Item.id}
                  key={index}
                  customer={Item.customer}
                  status={Item.status}
                  area={Item.area}
                  name={Item.name}
                  power={Item.power}
                  buildingType={Item.buildingType}
                  address={Item.address} 
                  tilt={Item.tilt} 
                  azimuth={Item.azimuth} 
                  totalNumberOfModules={Item.totalNumberOfModules} 
                  guaranteeStatus={Item.guaranteeStatus} 
                  operator={Item.operator}
                   corporation={Item.corporation}
                     guarantee={Item.guarantee}
                                />
          ))}
        </div>
      ) : (
        <div className="flex flex-col m-auto justify-center font-bold self-center text-center mt-20">
          <p className="m-auto text-navy-blue">پنلی یافت نشد.</p>
        </div>
      )}
    </>
  );
}
