"use client";

import Image from "next/image";
import React, { useEffect, use, useState } from "react";
import woman_solar from "@/public/images/Landing/woman-solar.svg";
import man_solar from "@/public/images/Landing/man-solar.svg";
import woman_solar_pic from "@/public/images/Landing/woman-solar.png";
import man_solar_pic from "@/public/images/Landing/man-solar.png";
import styles from "./AboutUsLanding.module.css";
import { useMediaQuery } from "react-responsive";
import NeuFrame from "@/components/Custom/NeuFrame/NeuFrame";
export default function AboutUsLanding() {
  const [page, setPage] = useState("AboutUs");
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  useEffect(() => {
    console.log("is Mobile: ", isMobile);
  }, [isMobile]);
  return (
    <div className="w-full h-screen flex justify-center items-center gap-8 px-5">
      {!isMobile && (
        <div className="w-2/5 relative z-10">
          {page === "ContactUs" ? (
            <Image src={woman_solar_pic} alt="woman solar" />
          ) : (
            <Image src={man_solar_pic} alt="man solar" />
          )}
        </div>
      )}
      <div className={`${isMobile ? "w-full" : "w-3/5"} h-fit`}>
        <div className="flex flex-col w-full h-fit">
          <div className="flex w-full md:w-2/3 gap-2">
            <NeuFrame className="w-full h-16 rounded-b-none bg-warm-white">
              <button
                className="w-full h-full bg-green-500 flex items-center justify-center text-white text-lg font-bold cursor-pointer"
                onClick={() => {
                  setPage("AboutUs");
                }}
              >
                درباره ما
              </button>
            </NeuFrame>
            <NeuFrame className="w-full h-16 rounded-b-none bg-warm-white">
              <button
                className="w-full h-full bg-pink-500 flex items-center justify-center text-white text-lg font-bold cursor-pointer"
                onClick={() => {
                  setPage("ContactUs");
                }}
              >
                تماس با ما
              </button>
            </NeuFrame>
          </div>
          {/* <NeuFrame className="w-full h-full bg-warm-white rounded-tr-none"> */}
          <div className="neo-card p-4 bg-warm-white h-fit rounded-xl rounded-tr-none text-lg font-medium text-justify">
            {page == "AboutUs" ? (
              <div>
                <p>
                  شرکت ما، پیشرو در زمینه{" "}
                  <strong>نصب و نگهداری پنل‌های خورشیدی</strong>، با سال‌ها
                  تجربه و تخصص در حوزه انرژی‌های تجدیدپذیر، راه‌حل‌های بهینه و
                  مقرون‌به‌صرفه‌ای برای تأمین انرژی پاک ارائه می‌دهد.
                </p>

                <p>
                  ما با استفاده از <strong>فناوری‌های روز دنیا</strong> و تیمی
                  متشکل از <strong>مهندسان مجرب</strong>، خدمات جامعی از{" "}
                  <strong>
                    طراحی، نصب، راه‌اندازی و نگهداری سیستم‌های خورشیدی
                  </strong>{" "}
                  را برای مشتریان خانگی، تجاری و صنعتی فراهم می‌کنیم.
                </p>

                <p>
                  هدف ما نه تنها <strong>کاهش هزینه‌های انرژی</strong>، بلکه
                  همراهی در حرکت به سوی{" "}
                  <strong>آینده‌ای پایدار و دوستدار محیط زیست</strong> است.
                </p>

                <p className="mt-8">
                  با اعتماد به شرکت ما، از{" "}
                  <strong>انرژی خورشیدی مطمئن، کارآمد و باکیفیت</strong>{" "}
                  بهره‌مند شوید.
                </p>
              </div>
            ) : (
              <div>
                <p>
                  شرکت فناوری انرژی سبز با افتخار آماده ارائه خدمات تخصصی در
                  زمینه طراحی، نصب و نگهداری سیستم‌های خورشیدی به شما عزیزان
                  است. برای دریافت مشاوره رایگان، استعلام قیمت و یا هرگونه سوال،
                  می‌توانید از طریق راه‌های ارتباطی زیر با ما در تماس باشید:
                </p>

                <div className="m-[8">
                  📞 <strong>تلفن تماس</strong>: ۰۲۱-۱۲۳۴۵۶۷۸
                  <br />
                  📱 <strong>واتساپ</strong>: ۰۹۱۲۳۴۵۶۷۸۹
                  <br />
                  📧 <strong>ایمیل</strong>: info@solar-energy.ir
                  <br />
                  🏢 <strong>آدرس</strong>: تهران، خیابان آزادی، بلوار اکباتان،
                  پلاک ۱۲، طبقه سوم
                </div>

                <p>
                  <strong>ساعات کاری</strong>: شنبه تا چهارشنبه، ۸:۳۰ الی ۱۷ |
                  پنجشنبه‌ها، ۸:۳۰ الی ۱۳
                </p>

                <p>
                  همچنین می‌توانید فرم <strong>درخواست مشاوره</strong> را در
                  وبسایت ما پر کنید تا کارشناسان ما در سریع‌ترین زمان با شما
                  تماس بگیرند.
                </p>

                <p className="mt-8 text-center">
                  🌱 <strong>انرژی پاک، آینده‌ای روشن</strong> 🌱
                </p>
              </div>
            )}
          </div>
          {/* </NeuFrame> */}
        </div>
        {/* <div className="flex">
          <div
            className={`${styles.placeholder} p-2`}
            onClick={() => setPage("ContactUs")}
          >
            <div
              className={`${
                styles.inner_placeholder
              } content-center text-center text-2xl ${
                page === "ContactUs" ? styles.contactus : ""
              }`}
            >
              تماس با ما
            </div>
          </div>
          <div
            className={`${styles.placeholder} p-2`}
            onClick={() => setPage("AboutUs")}
          >
            <div
              className={`${
                styles.inner_placeholder
              } content-center text-center text-2xl ${
                page === "AboutUs" ? styles.aboutus : ""
              }`}
            >
              درباره ما
            </div>
          </div>
        </div>
        <div className={`${styles.bottom} p-8 text-3xl`} dir="rtl">
          {page === "ContactUs"
            ? "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با ن"
            : "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص "}
        </div> */}
      </div>
    </div>
  );
}
