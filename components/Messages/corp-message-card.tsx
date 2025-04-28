"use client"
import React, { useState } from 'react'
import { ChevronDown,ChevronUp } from 'lucide-react'
import Link from 'next/link'
import { corpMessage } from '@/src/types/corpMessageType'

const CorpMessageCard=  ({
    topic,
    from,
    body,
    date,
}: corpMessage) => {

    const [showFullBody, setShowFullBody] = useState(false);

  return (
    <>
    
    <div
      className={` w-full ${
        0 ? "h-64" : ""
      } border-t-1  md:border-gray-300 border-gray-400 first:border-t-0 w-full `}
    >
      <div className="flex flex-row justify-between  h-full bg-[#F0EDEF] p-4 rtl md:pb-5 pb-28 overflow-hidden relative ">
        <div className="flex flex-col justify-between w-full z-10 space-x-0">
          <div className="w-full ">
                        {/* <h2 className="text-2xl font-bold text-gray-800"> */}
                            {/* {panelName} */}
                        {/* </h2> */}
                        <div className=" w-full">
                            <div className="flex text-gray-700 justify-between items-center">
                                <div className="flex items-center  text-black">
                                    {/* <IconWithBackground
                                        icon={Eclipse}
                                        color="#FA682D"
                                    />
                                    <span className=" mr-2 whitespace-nowrap">
                                         نام پنل :
                                    </span> */}
                                    <span className="text-2xl font-bold text-gray-800 mr-2 whitespace-nowrap">
                                        {topic}
                                    </span>
                                </div>
                            </div>

                            <div className="flex  text-gray-700 justify-between mt-6 items-center">
                                <div className="flex items-center text-black">
                                    {/* <IconWithBackground
                                        icon={User}
                                        color="#FA682D"
                                    /> */}
                                    <span className="font-medium mr-2 whitespace-nowrap">
                                         از طرف:
                                    </span>
                                    <span className="text-xl font-bold text-gray-800 mr-2 whitespace-nowrap"> 
                                        {from.firstName+" "+from.lastName}
                                    </span>
                                </div>
                                
                            </div>
                            
                            <div className="flex  text-gray-700 justify-between mt-6 items-center">
                                <div className="flex items-start text-black ">
                                    {/* <IconWithBackground
                                        icon={Battery}
                                        color="#FA682D"
                                    />
                                    <span className="font-medium mr-2 whitespace-nowrap">
                                         توان مصرفی:
                                    </span> */}
                                    <span className="mr-2">
                                    {showFullBody || body.length <= 150
                                        ? body
                                        : `${body.slice(0, 150)}... `}
                                    
                                    </span>
                                </div>
            
                            </div>
                            <div className='flex flex-row gap-1 mt-4'>
                                {body.length > 150 && (
                                <button
                                onClick={() => setShowFullBody((prev) => !prev)}
                                className="text-gray-500 justify-center items-center text-xl ml-1 flex flex-row">
                                    {showFullBody?<ChevronUp/>:<ChevronDown/>}
                                {showFullBody ? "بستن" : "بیشتر"}
                                
                                </button>
                                )}
                                
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex items-start  text-gray-700 mt-6 ">
                        <div className="flex flex-row items-start text-black">
                            <IconWithBackground icon={MapPin} color="#FA682D" />
                            <div className="font-medium mx-2">استان {address.province}،شهر {address.city}،{address.streetAddress}،پلاک {address.houseNumber}، واحد {address.unit}</div>
                        </div>
                    </div> */}
                </div>

                <div className="flex flex-col lg:justify-center justify-end lg:mb-0 -mb-18 gap-2 items-center md:mb-10 md:mr-0 -mr-40 min-w-48" >
                    
                     <div className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl bg-[#F0F0F3] shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)] w-27">
                            <span className="text-sm font-medium text-gray-600">
								{date}
							</span>
                            <Link  href={"#"}>
							<button
								className={` shadow-md cursor-pointer w-25 rounded-l rounded-r bg-fire-orange text-white h-9`}
							>مدیریت</button>
							</Link>
						</div>
                    
                </div>
            </div>
        </div>
    </>
  )}

export default CorpMessageCard;