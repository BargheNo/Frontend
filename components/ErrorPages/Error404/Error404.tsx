import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styles from './Error404.module.css'
import { ArrowLeft } from 'lucide-react';

const Error404 = () => {
  return (
    <div dir='rtl' className="w-full flex flex-col justify-center gap-10
        bg-gradient-to-r from-[#24272C] via-[#2F3035] to-[#24272C] vazir
    ">
        <Image 
          src="/images/error404/err404.svg"
          className='self-center w-[500px] md:w-[600px] lg:w-[700px]'
          alt="404 Error"
          width={700}
          height={700}
        />

        <Image 
          src="/images/error404/cloud1.svg"
          className={`absolute self-center z-50 -translate-y-30 -translate-x-10 sm:-translate-y-40 sm:-translate-x-14 w-[130px] md:w-[160px] lg:w-[180px] ${styles.floating1}`}
          alt=""
          width={180}
          height={180}
        />

        <Image 
          src="/images/error404/cloud2.svg"
          className={`absolute self-center z-50 -translate-y-20 translate-x-8 sm:-translate-y-30 sm:translate-x-12 w-[120px] md:w-[150px] lg:w-[170px] ${styles.floating2}`}
          alt="404 Error"
          width={170}
          height={170}
        />

        <Link href="/" className="self-center">
            <button className="px-8 py-3 flex gap-3 bg-gradient-to-r from-[#F1C495] to-[#BE9B6F] border-2 border-[#F1C495] text-black rounded-full hover:brightness-110 transition-colors cursor-pointer duration-300 vazir">
                بازگشت
                <ArrowLeft />
            </button>
        </Link>
    </div>
  )
}

export default Error404