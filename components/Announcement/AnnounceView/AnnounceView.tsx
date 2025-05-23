"use client";
import { useEffect, useState } from "react";
import AnnouncementBox from "../AnnouncementBox/AnnouncementBox";
import AnnounceCard from "../AnnounceCard/AnnounceCard";
import { getData } from "@/src/services/apiHub";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { toast } from "sonner";

interface News {
  id: string;
  title: string;
  content: string;
  status: string;
}

export default function AnnounceView() {
  //   const [news, setNews] = useState<News[]>([]);
  const { isLoading, data, error, isFetching, isFetched } = useQuery({
    queryKey: ["news"],
    queryFn: () => getData({ endPoint: "/v1/admin/news?statuses=1" }),
  });
  //   useEffect(() => {
  //     setNews(data?.data);
  //   }, [data]);
  if (isLoading || isFetching) {
    console.log("all:", isLoading, isFetching, data, error);
    return <LoadingSpinner />;
  }
  if (error) {
    console.error("error in fetching");
    toast.error("مشکلی پیش آمده است");
  }
  if (!error && isFetched) {
    console.log("dd:", data);
    return (
      <>
        <h1 className="text-3xl self-start">اخبار و اطلاعیه‌ها</h1>
        <AnnouncementBox
          className="p-5 bg-[#F0EDEF] h-[60vh] w-[85vw]!"
          insideClassName="gap-5"
        >
          {data?.data?.map((item: News) => (
            <AnnounceCard
              key={item.id}
              id={item.id}
              title={item.title}
              //   content=
              //   writer="عرفان"
              //   date={new Date().getTime()}
            />
          ))}
          {/* <AnnounceBoard id="panel-1" className="w-full rounded-lg panel min-h-[45vh] flex flex-col gap-2 justify-center items-center">
        <AnnounceCard title="اخبار و اطلاعیه‌ها" />
        <AnnounceCard title="اخبار و اطلاعیه‌ها" />
        </AnnounceBoard>x
        <AnnounceBoard id="panel-2" className="w-full rounded-lg panel min-h-[45vh] flex flex-col justify-between items-start">
        <AnnounceCard title="اخبار و اطلاعیه‌ها" />
        <AnnounceCard title="اخبار و اطلاعیه‌ها" />
        </AnnounceBoard>
        <AnnounceBoard id="panel-3" className="w-full rounded-lg panel min-h-[45vh] flex flex-col justify-between items-start">
        <AnnounceCard title="اخبار و اطلاعیه‌ها" />
        <AnnounceCard title="اخبار و اطلاعیه‌ها" />
        </AnnounceBoard> */}
        </AnnouncementBox>
      </>
    );
  }
}
