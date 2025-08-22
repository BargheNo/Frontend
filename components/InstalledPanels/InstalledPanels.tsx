import React from "react";
import IconWithBackground from "../IconWithBackground/IconWithBackground";
import { Eclipse, User, Battery, MoveLeft, MapPin } from "lucide-react";
import Link from "next/link";
import { installedpanel } from "@/src/types/installedpanelType";
import wordExpression from "@/src/functions/Calculations";
import TruncatedText from "../ui/TruncatedText";

const InstalledPanel = ({ id, name, customer, address, power }: installedpanel) => {
    return (
        <>
            <div
                className={` w-full ${
                    0 ? "h-64" : ""
                } border-t-1  md:border-gray-300 border-gray-400 first:border-t-0 w-full `}
            >
                <div className="flex md:flex-row flex-col justify-between  h-full bg-[#F0EDEF] p-4 rtl md:pb-5 pb-28 overflow-hidden relative ">
                    <div className="flex flex-col justify-between w-full z-10 space-x-0">
                        <div className="w-full ">
                            {/* <h2 className="text-2xl font-bold text-gray-800"> */}
                            {/* {panelName} */}
                            {/* </h2> */}
                            <div className=" w-full">
                                <div className="flex text-gray-700 justify-between items-center">
                                    <div className="flex place-items-center text-black">
                                        <IconWithBackground
                                            icon={Eclipse}
                                            color="#FA682D"
                                        />
                                        <span className="font-medium mr-2 whitespace-nowrap">
                                            نام پنل:
                                        </span>
                                        <span className="md:text-2xl text-l font-bold text-gray-800 mr-2 whitespace-nowrap">
                                            {name}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex text-gray-700 justify-between mt-6 items-center">
                                    <div className="flex place-items-center text-black">
                                        <IconWithBackground
                                            icon={User}
                                            color="#FA682D"
                                        />
                                        <span className="font-medium mr-2 whitespace-nowrap">
                                            نام مشتری:
                                        </span>
                                        <span className="md:text-2xl text-l font-bold text-gray-800 mr-2 whitespace-nowrap">
                                            {customer.firstName +
                                                " " +
                                                customer.lastName}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex text-gray-700 justify-between mt-6 items-center">
                                    <div className="flex place-items-center text-black">
                                        <IconWithBackground
                                            icon={Battery}
                                            color="#FA682D"
                                        />
                                        <span className="font-medium mr-2 whitespace-nowrap">
                                            توان مصرفی:
                                        </span>
                                        <span className="mr-2">
                                            {wordExpression(power, true).value}W
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start text-gray-700 mt-6 ">
                            <div className="flex flex-row place-items-start text-black">
                                <IconWithBackground
                                    icon={MapPin}
                                    color="#FA682D"
                                />
                                <div className="font-medium mx-2">
                                    <TruncatedText maxLength={135}>
                                    {`
                                    استان ${address.province}، شهر ${
                                        address.city
                                    }، ${address.streetAddress}، پلاک
                                    ${address.houseNumber}، واحد ${String(
                                        address.unit
                                    )}
                                    `}
                                </TruncatedText>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:justify-center justify-end  lg:-mb-0 -mb-17 gap-2 items-center min-w-48 ">
                        <Link href={`/corpdashboard/installed-panels/${id}`}>
                            <button className="flex items-center  justify-between bg-gradient-to-r md:mt-0 mt-13 from-[#EE4334] to-[#D73628] px-4 py-2 text-white cursor-pointer shadow-md rounded-full hover:shadow-lg transition duration-300 hover:scale-105">
                                <span className="font-medium">مدیریت پنل</span>
                                <MoveLeft className="mr-2 w-4 h-4" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InstalledPanel;
