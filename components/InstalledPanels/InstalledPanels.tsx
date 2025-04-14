import React from 'react'
import IconWithBackground from '../IconWithBackground/IconWithBackground'
import { Eclipse, User, Battery, MoveLeft,MapPin } from 'lucide-react'
import Link from 'next/link'
import { installedpanel } from '@/src/types/installedpanelType'

const InstalledPanel=  ({
    panelName,
    customerName,
    address,
    power,
}: installedpanel) => {
  return (
    <>
	
    <div
			className={` w-full m-auto ${
				0 ? "h-64" : ""
			} border-gray-300 border-b-3`}
		>
			<div className="flex flex-row justify-between w-full h-full bg-[#F0EDEF] p-5 overflow-hidden relative shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)] ">
				<div className="flex flex-col justify-between w-full z-10">
					<div className="space-y-3 w-full">
						<h2 className="text-2xl font-bold text-gray-800">
                            {/* {panelName} */}
						</h2>
						<div className=" w-full">
							<div className="flex text-gray-700 justify-between items-center">
								<div className="flex items-center  text-black">
									<IconWithBackground
										icon={Eclipse}
										color="#FA682D"
									/>
									<span className=" mr-2">
										 نام پنل :
									</span>
                                    <span className="text-2xl font-bold text-gray-800 mr-2">
                                        {panelName}
                                    </span>
								</div>
							</div>

                            <div className="flex  text-gray-700 justify-between mt-6 items-center">
								<div className="flex items-center text-black">
									<IconWithBackground
										icon={User}
                                        color="#FA682D"
									/>
									<span className="font-medium mr-2">
										 نام مشتری :
									</span>
                                    <span className="text-2xl font-bold text-gray-800 mr-2"> 
                                        {customerName}
                                    </span>
								</div>
								
							</div>
							
							<div className="flex  text-gray-700 justify-between mt-6 items-center">
								<div className="flex items-center text-black">
									<IconWithBackground
										icon={Battery}
                                        color="#FA682D"
									/>
									<span className="font-medium mr-2">
										 توان مصرفی:
									</span>
                                    <span className='mr-2'> 
                                       {power}{"kW"} 
                                    </span>
								</div>
								
							</div>
						</div>
					</div>
					<div className="flex items-start  text-gray-700 mt-6 ">
						<div className="flex flex-row items-center text-black">
							<IconWithBackground icon={MapPin} color="#FA682D" />
							<div className="font-medium mx-2">استان {address.province}،شهر {address.city}،{address.streetAddress}،پلاک {address.houseNumber}، واحد {address.unit}</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col justify-center gap-2 items-center z-10 min-w-48" >
					
                     <Link href={"#"}>
						<button className="flex items-center justify-between bg-gradient-to-r from-[#EE4334] to-[#D73628] px-4 py-2 text-white cursor-pointer shadow-md rounded-full hover:shadow-lg transition duration-300 hover:scale-105">
							<span className="font-medium">مدیریت پنل</span>
							<MoveLeft className="mr-2 w-4 h-4" />
						</button>
					</Link>
				</div>
			</div>
		</div>
    </>
  )}

export default InstalledPanel;