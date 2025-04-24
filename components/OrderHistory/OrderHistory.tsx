import React from "react";
import IconWithBackground from "../IconWithBackground/IconWithBackground";
import { CalendarFold, FileWarning, MapPin, MoveLeft } from "lucide-react";
import Link from "next/link";
import SignupButton from "../SignupButton/SignupButton";
import { Orderhistory } from "@/src/types/OrderhistoryType";
import moment from 'jalali-moment';

const OrderHistory = ({ name, status, address, createdTime }: Orderhistory) => {
  return (

    <div
      className={` w-full ${
        0 ? "h-64" : ""
      } border-t-1  md:border-gray-300 border-gray-400 first:border-t-0 w-full`}
    >
      <div className="flex flex-row justify-between w-full h-full bg-[#F0EDEF] p-4 rtl md:pb-5 pb-28 overflow-hidden relative">
        <div className="flex flex-col justify-between w-full z-10">
          <div className="space-y-3 w-full">
            <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
            <div className=" w-full">
              <div className="flex text-gray-700 justify-between items-center">
                <div className="flex items-center  text-black">
                  <IconWithBackground icon={FileWarning} color="#6B7280" />
                  <span className=" mr-2">وضعیت:</span>
                  <span className="mr-2">{status}</span>
                </div>
              </div>

              <div className="flex  text-gray-700 justify-between mt-6 items-center">
                <div className="flex items-start text-black">
                  <IconWithBackground icon={CalendarFold} color="#6B7280" />
                  <span className="font-medium mr-2 whitespace-nowrap">تاریخ ثبت درخواست:</span>
                  <span className="mr-2 whitespace-nowrap">{moment(createdTime).locale('fa').format('jYYYY/jMM/jDD')}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start  text-gray-700 mt-6 ">
            <div className="flex flex-row items-start text-black">
              <IconWithBackground icon={MapPin} color="#6B7280" />
              <div className="font-medium mx-2 ">
                استان {address.province}،شهر {address.city}،
                {address.streetAddress}،پلاک {address.houseNumber}، واحد{" "}
                {address.unit}
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:flex-col flex-row-reverse justify-center lg:-mb-0 -mb-80 gap-2 items-center z-10 min-w-48 -mr-43">
          <Link href="">
            <div className="flex items-center justify-between cursor-pointer rounded-full  ">
              <SignupButton>
                <MoveLeft className="w-9 h-9"></MoveLeft>
              </SignupButton>
            </div>
          </Link>
          <div className="md:mt-0 mt-8">
              <p>مشاهده جزئیات</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
