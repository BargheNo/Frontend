import BlogCard from "@/components/blog/BlogCard/BlogCard";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";
import React from "react";

const mockBlogs = [
  {
    id: 1,
    className: "tech-blog",
    imageUrl: "https://picsum.photos/id/1/500",
    title: "آینده هوش مصنوعی",
    description:
      "بررسی تحولاتی که هوش مصنوعی در دهه آینده در صنایع ایجاد خواهد کرد. یبمیبسئلم بمنلئمسیئل یمبن لمیبئلم بلتد اتد یسدلیبس لمیبسلئ میل شگمش سملس یمللنمی نلیبملئ نملنمسیبل .لیسل ل سیدلنیبد لنس نلنتس لدن ینل ینسنتی لنتیبنت نتل یل",
    writer: "سارا جانسون",
    date: "1402-02-25", // 2023-05-15 in Persian calendar
  },
  {
    id: 2,
    className: "travel-blog",
    imageUrl: "https://picsum.photos/id/2/500",
    title: "گنجینه های پنهان جنوب شرق آسیا",
    description: "کشف مقاصد کمتر شناخته شده اما نفس‌گیر در جنوب شرق آسیا.",
    writer: "مایکل چن",
    date: "1402-02-02", // 2023-04-22
  },
  {
    id: 3,
    className: "food-blog",
    imageUrl: "https://picsum.photos/id/39/500",
    title: "دستورپخت گیاهی برای مبتدیان",
    description:
      "دستورات ساده و خوشمزه مبتنی بر گیاهان که هر کسی می‌تواند درست کند.",
    writer: "اما رودریگز",
    date: "1401-12-19", // 2023-03-10
  },
  {
    id: 4,
    className: "fitness-blog",
    imageUrl: "https://picsum.photos/id/24/500",
    title: "تمرینات خانگی بدون تجهیزات",
    description:
      "تمرینات مؤثری که می‌توانید در هر جایی فقط با وزن بدن خود انجام دهید.",
    writer: "دیوید پارک",
    date: "1402-03-15", // 2023-06-05
  },
  {
    id: 5,
    className: "finance-blog",
    imageUrl: "https://picsum.photos/id/45/500",
    title: "سرمایه گذاری در دهه ۲۰ زندگی: راهنمای کامل",
    description: "چگونه با تصمیمات مالی هوشمندانه از جوانی ثروت بسازید.",
    writer: "جسیکا ویلیامز",
    date: "1401-11-29", // 2023-02-18
  },
  {
    id: 6,
    className: "lifestyle-blog",
    imageUrl: "https://picsum.photos/id/64/500",
    title: "مینیمالیسم: زندگی با کمتر",
    description: "مزایای ساده‌سازی زندگی و تمرکز بر آنچه واقعاً مهم است.",
    writer: "توماس لی",
    date: "1401-11-10", // 2023-01-30
  },
  {
    id: 7,
    className: "tech-blog",
    imageUrl: "https://picsum.photos/id/47/500",
    title: "فناوری بلاکچین به زبان ساده",
    description: "درک اصول اولیه بلاکچین فراتر از ارزهای دیجیتال.",
    writer: "آلن اسمیت",
    date: "1402-04-21", // 2023-07-12
  },
  {
    id: 8,
    className: "education-blog",
    imageUrl: "https://picsum.photos/id/38/500",
    title: "مقایسه پلتفرم‌های آموزش آنلاین",
    description: "مرور جامع بهترین منابع آموزش آنلاین در سال 1402.",
    writer: "پریا پاتل",
    date: "1402-05-12", // 2023-08-03
  },
  {
    id: 9,
    className: "health-blog",
    imageUrl: "https://picsum.photos/id/29/500",
    title: "بهداشت خواب: علم استراحت بهتر",
    description: "راهکارهای مبتنی بر شواهد برای بهبود کیفیت خواب و سطح انرژی.",
    writer: "دکتر رابرت کیم",
    date: "1402-06-23", // 2023-09-14
  },
  {
    id: 10,
    className: "parenting-blog",
    imageUrl: "https://picsum.photos/id/110/500",
    title: "تکنیک‌های تربیت مثبت",
    description: "چگونه رفتار کودکان را با احترام و همدلی هدایت کنیم.",
    writer: "لیزا تامپسون",
    date: "1402-07-16", // 2023-10-08
  },
];

export default function page() {
  return (
    <PageContainer>
      <Header header="مطالب" />
      {/* <AddBlog /> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[2vw] mx-auto">
              {mockBlogs.map((blog: Blog) => {
            
         return <BlogCard
            key={blog.id}
            imageUrl={blog.imageUrl}
            title={blog.title}
            description={blog.description}
            writer={blog.writer}
             date={blog.date}
             className="w-full"
          />;
        })}
      </div>
    </PageContainer>
  );
}
