"use client";
import AnnouncementBox from "../AnnouncementBox/AnnouncementBox";
import AnnounceCard from "../AnnounceCard/AnnounceCard";
import { getData } from "@/src/services/apiHub";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { toast } from "sonner";

import Image from "next/image";
import panelNotFound from "@/public/images/panelNotFound/panelNotFound.png";
import AnnounceAddCard from "../AnnounceAddCard/AnnounceAddCard";
import Header from "@/components/Header/Header";

interface News {
  id: string;
  title: string;
  content: string;
  status: number;
}

export default function AnnounceView({
  onlyView = false,
}: {
  onlyView?: boolean;
}) {
  //   const [news, setNews] = useState<News[]>([]);
  const { isLoading, data, error } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      if (onlyView) {
        return await getData({ endPoint: "/v1/admin/news?statuses=1" });
      } else {
        const r1 = await getData({ endPoint: "/v1/admin/news?statuses=2" });
        console.log("r1: ", r1);
        const r2 = await getData({ endPoint: "/v1/admin/news?statuses=1" });
        console.log("r2: ", r2);
        r1.data?.push(...r2.data);
        return r1;
      }
    },
  });

  if (error) {
    console.error("error in fetching");
    toast.error("مشکلی پیش آمده است");
  } else {
    console.log("dd:", data?.data);
    return (
      <>
        {/* <div className="flex flex-row w-full items-center"> */}
          {/* <span className="text-3xl self-start">اخبار و اطلاعیه‌ها</span> */}
          {!onlyView && <AnnounceAddCard />}
        {/* </div> */}
        <AnnouncementBox
          className="p-5 bg-warm-white h-[60vh] w-[85vw]!"
          insideClassName="gap-5"
        >
          {isLoading && <LoadingSpinner />}
          {data?.data == 0 && (
            <div className="text-center flex flex-col items-center justify-center gap-4">
              <Image
                className="w-1/3"
                src={panelNotFound}
                alt="orderNotFound"
              />
              <div className="-mt-8">
                <p
                  className=" mt-6 text-navy-blue font-bold rtl"
                  style={{ fontSize: "1.1rem" }}
                >
                  هیچ خبری یافت نشد.
                </p>
              </div>
            </div>
          )}
          {data?.data?.map((item: News) => (
            <AnnounceCard
              onlyView={onlyView}
              key={item.id}
              id={item.id}
              title={item.title}
              status={item.status}
              //   content=
              //   writer="عرفان"
              //   date={new Date().getTime()}
            />
          ))}
        </AnnouncementBox>
      </>
    );
  }
}
