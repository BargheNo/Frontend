import { vazir } from '@/lib/fonts';

import Neworder from '@/components/New-Order/new-order';
import SignupButton from '@/components/SignupButton/SignupButton';
import { CalendarFold, FileWarning, MapPin, MoveLeft } from 'lucide-react';
import Link from 'next/link';
import IconWithBackground from '@/components/IconWithBackground/IconWithBackground';

export default function Page() {
    

    return (
        <>
        <div className={`${"flex justify-center items-center mt-15"} ${vazir.className}`}>
            <div>
               <Neworder></Neworder>

                <div className='mr-2 mt-4 text-navy-blue'>
                    <p>ثبت سفارش جدید</p>
                </div>
            </div>
        </div>
        <div
			className={` w-95/100 m-auto ${
				0 ? "h-64" : ""
			} border-gray-300 border-b-3`}
		>
			<div className="flex flex-row justify-between w-full h-full bg-[#F0EDEF] p-5 overflow-hidden relative">
				<div className="flex flex-col justify-between w-full z-10">
					<div className="space-y-3 w-full">
						<h2 className="text-2xl font-bold text-gray-800">
                            پنل خانه تهرانپارس
						</h2>
						<div className=" w-full">
							<div className="flex text-gray-700 justify-between items-center">
								<div className="flex items-center  text-black">
									<IconWithBackground
										icon={FileWarning}
										color="#6B7280"
									/>
									<span className=" mr-2">
										وضعیت:
									</span>
                                    <span className='mr-2'>
                                        وضعیت وضعیت وضعیت
                                    </span>
								</div>
							</div>
							
							<div className="flex  text-gray-700 justify-between mt-6 items-center">
								<div className="flex items-center text-black">
									<IconWithBackground
										icon={CalendarFold}
                                        color="#6B7280"
									/>
									<span className="font-medium mr-2">
										تاریخ ثبت درخواست:
									</span>
                                    <span className='mr-2'> 
                                        تاریخ تاریخ تاریخ
                                    </span>
								</div>
								
							</div>
						</div>
					</div>
					<div className="flex items-start  text-gray-700 mt-6 ">
						<div className="flex flex-row items-center text-black">
							<IconWithBackground icon={MapPin} color="#6B7280" />
							<div className="font-medium mx-2"> فلکه اول تهرانپارس</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col justify-center gap-2 items-center z-10 min-w-48" >
					
					<Link href=''>
						<div  className="flex items-center justify-between cursor-pointer rounded-full  ">
							<SignupButton><MoveLeft className='w-9 h-9'></MoveLeft></SignupButton>
						</div>
					</Link>
                    <p>مشاهده جزئیات</p>
				</div>
			</div>
		</div>

        
        
        </>
    )
}
