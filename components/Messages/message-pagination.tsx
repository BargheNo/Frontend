"use client";

import { Save,Settings } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
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
import SignupButton from "../SignupButton/SignupButton";
import { Switch } from "@/components/ui/switch"
import { notificationSetting, notifType } from "@/src/types/notificationTypes";
import notificationService from "@/src/services/notificationService";
import { skip } from "node:test";
import { toast } from "sonner";


// import { RootState } from "@/src/store/types";

export default function CorpMessagesPagination() {
  //   const [history, sethistory] = useState<Orderhistory[]>([]);
  const [currpage, Setcurrpage] = useState<string>("1");
  const[notifTypes,setNotifTypes]=useState<notifType[]>([]);
  const[notifSetting,setNotifSetting]=useState<notificationSetting[]>([]);
  const[disable,setDisable]=useState(true);
  const [nameFields, setNameFields] = useState<{ id:number,name: string, isPushEnabled: boolean, isEmailEnabled: boolean}[]>([]);
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

  const from = { firstName: "تینا", lastName: "محمدپور" };
  const topic = "این یک پیام خیلی خیلی مهم است";
  const body =
    "ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آیندلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.";
  const date = "1404/2/12";
  useEffect(()=>{
    notificationService.getNotificationType().then(res=>{setNotifTypes(res.data)}).catch(err=>console.log(err.message));
    notificationService.getNotificationSetting().then(res=>setNotifSetting(res.data)).catch(err=>console.log(err.message));
  },[])

  
  useEffect(() => {
    if (notifSetting && notifSetting.length > 0) {
      const values = notifSetting.map(item => ({
        id:item.id,
        name: item.notificationType.name,
        isPushEnabled: item.isPushEnabled,
        isEmailEnabled: item.isEmailEnabled
      }));
      setNameFields(values);
    }
  }, [notifSetting]);
  
  return (
    <>
      {/* {false ? (
        <LoadingSpinner />
      ) : history?.length > 0 ? ( */}
      <>
      
      <h1 className="font-bold text-xl mb-4  md:mr-14 mr-4"> تنظیمات اعلان ها</h1>
      <div className="flex flex-col text-white md:px-14 bg-transparent px-2 w-full">
          <div className="relative flex flex-col bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2] text-gray-800 w-full rounded-2xl overflow-auto shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]  mb-5">
              <div className="flex flex-row mr-auto md:ml-30 m-auto md:gap-17 gap-6">
                    <p className="mt-8 whitespace-nowrap">دریافت از طریق وبسایت</p>
                    <p className="mt-8 whitespace-nowrap">دریافت از طریق ایمیل</p>
                    
              </div>
              <div className="flex flex-col bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2] text-gray-800 w-90/100 rounded-2xl  shadow-[inset_-6px_-6px_16px_rgba(255,255,255,0.8),inset_6px_6px_16px_rgba(0,0,0,0.2)] mt-14 m-auto md:h-65 h-60">
              {notifSetting.length <= 0 ? (
                <div className="flex flex-1 items-center justify-center h-full">
                <LoadingSpinner />
                </div>
              ) : (
                notifSetting.map((item, index) => (
                  <div key={index} className="flex flex-row justify-between border-b-2 border-gray-300 h-1/3 items-center px-4">
                    <p className="text-gray-600 whitespace-nowrap md:mb-0 mb-9">
                      {item.notificationType.name}
                    </p>

                    <div className="flex flex-col">
                      <div className="flex flex-row md:gap-37 gap-17 md:mt-0 mt-9 md:ml-23">
                        <Switch
                          onClick={() => {
                            setNameFields(prev =>
                              prev.map(Item =>
                                Item.name === item.notificationType.name
                                  ? { ...Item, isPushEnabled: !Item.isPushEnabled }
                                  : Item
                              )
                            );
                          }}
                          disabled={disable}
                          checked={
                            nameFields.find(Item => Item.name === item.notificationType.name)?.isPushEnabled
                          }
                        />
                        <Switch
                          onClick={() => {
                            setNameFields(prev =>
                              prev.map(Item =>
                                Item.name === item.notificationType.name
                                  ? { ...Item, isEmailEnabled: !Item.isEmailEnabled }
                                  : Item
                              )
                            );
                          }}
                          disabled={item.notificationType.supportsEmail==false?true:disable}
                          checked={
                            nameFields.find(Item => Item.name === item.notificationType.name)?.isEmailEnabled
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
              </div>

              <div className="md:w-3/10 w-6/10 mr-auto ml-auto mb-5">
                <SignupButton onClick={async () => {
                  if (!disable) {
                    try {
                      const responses = await Promise.all(
                        nameFields.map((item) =>
                          notificationService.changeNotificationSetting(item.id, 
                            {
                            isPushEnabled: item.isPushEnabled,
                            isEmailEnabled: item.isEmailEnabled})
                        ));
                      const successMessage = responses[responses.length - 1]?.message ;
                      toast.success(successMessage);
                    } catch (error) {
                toast.error("خطا در ذخیره‌سازی تنظیمات");
                console.error(error);
                  }
                }
                setDisable(!disable);}} 
                className="bg-[#FA682D]  text-white">{disable?"تنظیمات اعلان ها":"ذخیرۀ تغییرات"}{disable?<Settings/>:<Save/>}</SignupButton>
              </div>
          </div>
      </div>

      <h1 className="font-bold text-xl mb-4  md:mr-14 mr-4">اعلان ها</h1>
        <div className="flex flex-col text-white md:px-14 bg-transparent px-2 w-full">
            <div className="relative flex flex-col bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2] text-gray-800 w-full rounded-2xl overflow-auto shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)] h-20 mb-5">
                <div className={`${style.citypro} flex flex-row mr-4 justify-between m-auto md:w-2/10 w-5/10`}>
                  <Select
                    name="notiftype">
                    <SelectTrigger
                      className={style.CustomInput}
                      id="notiftype"
                      // style={{ width: "25vw" }}
                    >
                      <SelectValue placeholder="دسته بندی اعلان ها" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>اعلان ها</SelectLabel>
                              {notifTypes.map((item,index)=>
                                (<SelectItem                            
                                value={item?.name}
                                key={index}
                              >
                                {item?.name}
                              </SelectItem>)
                              )}    
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {/* <Select
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
                  </Select> */}
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
