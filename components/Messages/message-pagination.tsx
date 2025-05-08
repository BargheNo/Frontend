"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import MessageCard from "@/components/Messages/message-card";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import style from "./style.module.css"
import panelNotFound from "../../public/images/panelNotFound/panelNotFound.png";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

// import { RootState } from "@/src/store/types";

export default function CorpMessagesPagination() {
  //   const [history, sethistory] = useState<Orderhistory[]>([]);
  const [currpage, Setcurrpage] = useState<string>("1");
  //   const [isLoading, setIsLoading] = useState(true);
  //   const accessToken = useSelector((state: RootState) => state.user.accessToken);
  //   const handelHistory = (page: string, pageSize: string) => {
  //     orderService
  //       .orderHistory({ page: page, pageSize: pageSize }, accessToken)
  //       .then((res) => {
  //         sethistory(res.data);
  //         setIsLoading(false);
  //       })
  //       .catch((err) => console.log(err));
  //   };
  //   useEffect(() => {
  //     handelHistory(currpage, "3");
  //   }, [currpage]);
  // const address = {
  //   ID: 2,
  //   province: "mazandaran",
  //   city: "amol",
  //   streetAddress: "khiaban haraz",
  //   postalCode: "9473647546",
  //   houseNumber: "1",
  //   unit: 1,
  // };
  const from = { firstName: "تینا", lastName: "محمدپور" };
  const topic = "این یک پیام خیلی خیلی مهم است";
  const body =
    "ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آیندلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.";
  const date = "1404/2/12";

  return (
    <>
      {/* {false ? (
        <LoadingSpinner />
      ) : history?.length > 0 ? ( */}
      <>
        <div className="flex flex-col text-white md:px-14 bg-transparent px-2 w-full">
            <div className="flex flex-col bg-[#F0EDEF] text-gray-800 w-full rounded-2xl overflow-auto shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)] md:h-20 h-30 mb-5">
                <div className={`${style.citypro} flex flex-row mr-4 justify-between m-auto md:w-4/10 w-8/10`}>
                  <Select
                    name="filter1">
                    <SelectTrigger
                      className={style.CustomInput}
                      id="filter1"
                      // style={{ width: "25vw" }}
                    >
                      <SelectValue placeholder="فیلتر1" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>فیلتر</SelectLabel>
                        
                              <SelectItem                            
                                value="آیتم 1"
                              >
                                آیتم 1
                              </SelectItem>
                              <SelectItem                            
                                value="آیتم 2"
                              >
                                آیتم 2
                              </SelectItem>
                            
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Select
                    name="filter2">
                    <SelectTrigger
                      className={style.CustomInput}
                      id="filter2"
                      // style={{ width: "25vw" }}
                    >
                      <SelectValue placeholder="فیلتر2" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>فیلتر</SelectLabel>
                        
                              <SelectItem                            
                                value="آیتم 1"
                              >
                                آیتم 1
                              </SelectItem>
                              <SelectItem                            
                                value="آیتم 2"
                              >
                                آیتم 2
                              </SelectItem>
                            
                      </SelectGroup>
                    </SelectContent>
                  </Select>
              </div>

            </div>
          <div className="flex flex-col text-gray-800 w-full rounded-2xl overflow-auto shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
            <MessageCard
              from={from}
              date={date}
              topic={topic}
              body={body}
            ></MessageCard>
            <MessageCard
              from={from}
              date={date}
              topic={topic}
              body={body}
            ></MessageCard>
            <MessageCard
              from={from}
              date={date}
              topic={topic}
              body={body}
            ></MessageCard>
            {/* {history.map((order: Orderhistory, index) => (
                            <OrderHistory
                            key={index}
                            id={index}
                                name={order.name}
                                address={order.address}
                                status={order.status}
                                createdTime={order.createdTime}
                                />
                                ))} */}
          </div>
        </div>
      </>
      {/* ) : (
        <div className="text-center place-items-center mt-6">
          <Image className="w-1/3" src={panelNotFound} alt="orderNotFound" />
          <div className="-mt-8">
            <p
              className=" mt-6 text-navy-blue font-bold rtl"
              style={{ fontSize: "1.1rem" }}
            >
              هیچ سفارشی یافت نشد.
            </p>
          </div>
        </div>
      )} */}

      <div className="flex justify-center w-full p-5 rtl mt-5">
        <Pagination className="lg:mb-0 mb-20 ">
          <PaginationContent>
            <PaginationItem>
              {Number(currpage) > 1 && (
                <PaginationPrevious
                  href="#"
                  onClick={() =>
                    Setcurrpage((prev) => String(Math.max(Number(prev) - 1, 1)))
                  }
                />
              )}
            </PaginationItem>
            {["1", "2", "3"].map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={() => Setcurrpage(page)}
                  isActive={page === currpage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              {currpage != "3" && <PaginationEllipsis />}
            </PaginationItem>
            <PaginationItem>
              {currpage != "3" && (
                <PaginationNext
                  href="#"
                  onClick={() =>
                    Setcurrpage((prev) => String(Number(prev) + 1))
                  }
                />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
