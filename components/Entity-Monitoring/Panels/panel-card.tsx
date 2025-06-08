"use client";
import React, { useRef, useState } from "react";
import {
  Ellipsis,
  CheckIcon,
  CopyIcon,
  Share2Icon,
  Pencil,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/react-hover-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NotificationsDialogFields from "@/components/Messages/Notfication/NotificationBox/NotificationsDialogFields";
import PanelService from "@/src/services/entityMonitoringPanel";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { Form, Formik, FormikHelpers } from "formik";
import SignupButton from "@/components/SignupButton/SignupButton";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import style from "./style.module.css";
import { toast } from "sonner";
import { getPanel } from "@/src/types/Entity-Monitoring/panelType";

export default function PanelCard({
  id,
  name,
  status,
  customer,
  area,
  power,
  tilt,
  buildingType,
  azimuth,
  address,
  totalNumberOfModules,
  guaranteeStatus,
  operator,
  corporation,
  guarantee,
}: getPanel) {
  const getStatusColor = () => {
    if (status === "فعال") return " text-green-600";
    else if (status === "منقضی") return "text-gray-500";
    else if (status === "خراب") return "text-red-600";
    if (status === "سپرده شده") return "text-yellow-600";
    return "text-yellow-600";
  };
  const buildingTypeMap = {
    active: "1",
    residential: "2",
    commercial: "3",
    agriculture: "4",
    educational: "5",
    goverment: "6",
  };
  const panelStatusTypeMap = {
    active: "1",
    expired: "2",
    cancled: "3",
    deposited: "4",
    all: "5",
  } as const;
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [buildingId, setBuildingId] = useState("");
  const [statusId, setStatusId] = useState("");
  const panelDetailRef = useRef<HTMLDivElement>(null);
  const handleCopy = () => {
    navigator.clipboard.writeText(panelDetailRef.current?.innerText || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className="  border-gray-300 border-1 cursor-pointer w-full py-3  bg-warm-white"
      >
        <div className="flex flex-row justify-between items-center w-full rtl ">
          <div className="flex w-full justify-between items-center text-sm text-gray-700 px-7 text-center">
            <span className="w-[16%] flex justify-center">{name}</span>
            <span className="w-[16%] flex justify-center">
              {customer.firstName + " " + customer.lastName}
            </span>
            <span className="w-[16%] flex justify-center">{corporation.name}</span>
            <span className={`w-[16%] flex justify-center ${getStatusColor()}`}>
              {status}
            </span>
            <span className="w-[16%] flex justify-center">{power}</span>
            
            <span className="w-[16%] flex justify-center">{guaranteeStatus}</span>
          </div>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button
                className="cursor-pointer"
                variant="link"
                onClick={(e) => e.stopPropagation()}
              >
                <Ellipsis />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-34 h-auto border-0 p-4 flex flex-col gap-2 rtl bg-warm-white">
              <div className="flex flex-col neo-btn bg-white h-8">
                <div
                  className="w-full cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    PanelService.deletePanel(id).then((res) =>
                      toast.success("پنل با موفقیت حذف شد.")
                    );
                  }}
                >
                  <p className="mt-1 mr-2">حذف</p>
                </div>
              </div>
              <div className="flex flex-col neo-btn bg-white h-8">
                <div
                  className="w-full cursor-pointer"
                  onClick={(e) => {
                    setEditOpen(!editOpen);
                    e.stopPropagation();
                  }}
                >
                  <p className="mt-1 mr-2">ویرایش</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          style={{ backgroundColor: "#F1F4FC" }}
          className="w-full sm:min-w-[690px] max-w-xl max-h-[90vh] no-scrollbar mx-auto p-4 overflow-y-auto py-4"
        >
          <DialogHeader>
            <DialogTitle className="flex justify-center items-end font-bold mt-3.5">
              جزئیات پنل
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-y-2 py-3" ref={panelDetailRef}>
            <NotificationsDialogFields title="   نام پنل: " detail={name} />
            <NotificationsDialogFields
              title="    وضعیت سفارش: "
              detail={status}
            />

            <NotificationsDialogFields
              title="    مساحت: "
              detail={area.toString() + "متر مربع"}
            />
            <NotificationsDialogFields
              title="    توان مصرفی: "
              detail={power.toString() + "کیلووات"}
            />
            <NotificationsDialogFields
              title="     زاویه نصب: "
              detail={tilt.toString() + "درجه"}
            />
            <NotificationsDialogFields
              title="    جهت نصب:"
              detail={azimuth.toString()}
            />
            <NotificationsDialogFields
              title="     تعداد ماژول ها:"
              detail={totalNumberOfModules.toString()}
            />
            <NotificationsDialogFields
              title="    نوع ساختمان: "
              detail={buildingType}
            />
            <NotificationsDialogFields
              title="     وضعیت گارانتی: "
              detail={guaranteeStatus}
            />
            <NotificationsDialogFields
              title="    نام مشتری: "
              detail={customer.firstName + " " + customer.lastName}
            />
            <NotificationsDialogFields
              title="    شماره تماس مشتری: "
              detail={customer.phone}
            />
            {customer.email && (
              <NotificationsDialogFields
                title="     ایمیل مشتری:"
                detail={customer.email}
              />
            )}
            <NotificationsDialogFields
              title="    وضعیت مشتری:"
              detail={customer.status}
            />
            <NotificationsDialogFields
              title="    آدرس:"
              detail={
                "استان " +
                address.province +
                "،شهر " +
                address.city +
                "،" +
                address.streetAddress +
                "،پلاک " +
                address.houseNumber +
                "، واحد" +
                address.unit
              }
            />
            <NotificationsDialogFields
              title="    کدپستی:"
              detail={address.postalCode}
            />

            <NotificationsDialogFields
              title="    نام اوپراتور: "
              detail={operator.firstName + " " + operator.lastName}
            />
            <NotificationsDialogFields
              title="    شماره تماس اوپراتور: "
              detail={operator.phone}
            />
            {operator.email && (
              <NotificationsDialogFields
                title="      ایمیل اوپراتور:"
                detail={operator.email}
              />
            )}
            <NotificationsDialogFields
              title="    وضعیت اوپراتور:"
              detail={operator.status}
            />
             <NotificationsDialogFields
              title="    نام شرکت: "
              detail={customer.firstName + " " + customer.lastName}
            />

            {/* <NotificationsDialogFields
              title="    آدرس شرکت:"
              detail={
                "استان " +
                corporation.addresses[0].province +
                "،شهر " +
                corporation.addresses[0].city +
                "،" +
                corporation.addresses[0].streetAddress +
                "،پلاک " +
                corporation.addresses[0].houseNumber +
                "، واحد" +
                corporation.addresses[0].unit
              }
            /> */}
            <NotificationsDialogFields
              title="    کدپستی شرکت:"
              detail={address.postalCode}
            />




          </div>

          <DialogFooter className="flex flex-row justify-center items-center rounded-l self-center mr-auto">
            <button
              onClick={handleCopy}
              className=" flex items-center gap-1 border-1 rounded px-2 py-1 text-sm text-muted-foreground cursor-pointer hover:text-primary"
            >
              {copied ? (
                <>
                  <CheckIcon className="h-4 w-4" /> کپی شد
                </>
              ) : (
                <>
                  <CopyIcon className="h-4 w-4" /> کپی
                </>
              )}
            </button>
            <button
              onClick={() => {
                const text = panelDetailRef.current?.innerText || "";
                navigator.share({
                  title: "جزئیات پنل",
                  text,
                });
              }}
              className="flex items-center gap-1 border-1 rounded px-2 py-1 text-sm text-muted-foreground hover:text-primary"
            >
              <Share2Icon className="h-4 w-4" /> ارسال
            </button>
            <DialogClose />
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent
          style={{ backgroundColor: "#F1F4FC" }}
          className="w-full sm:min-w-[500px] max-w-xl max-h-[90vh] no-scrollbar mx-auto p-4 overflow-y-auto py-4"
        >
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center font-bold mt-3.5">
              ویرایش اطلاعات پنل
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-y-2 py-3">
            <Formik
              initialValues={{
                name: "",
                status: "",
                buildingType: "",
                area: "",
                power: "",
                tilt: "",
                azimuth: "",
                totalNumberOfModules: ""
              }}
              onSubmit={(values) => {
                setTimeout(() => setEditOpen(false), 1000);
              
                const typeCasting = (val: any) =>
                  String(val).trim() === "" ? null : Number(val);
              
                const body = {
                  name: String(values.name).trim() === "" ? null : values.name,
                  area: typeCasting(values.area),
                  power: typeCasting(values.power),
                  tilt: typeCasting(values.tilt),
                  azimuth: typeCasting(values.azimuth),
                  totalNumberOfModules: typeCasting(values.totalNumberOfModules),
                  buildingType: buildingId ? Number(buildingId) : null,
                  status: statusId ? Number(statusId) : null,
                };
              
                PanelService.updatePanel(id, body)
                  .then((res) => {
                    toast.success(res.message);
                  })
                  .catch((err) => console.log(err));
              }}
              
            >
              {({ setFieldValue, values }) => (
                <Form className="flex flex-col items-center  h-auto gap-3 rtl w-[70%] m-auto">
                  <div className="flex rtl md:flex-col  flex-row w-full mt-2">
                    <CustomInput
                      dir="rtl"
                      placeholder="نام پنل"
                      name="name"
                      type="text"
                    />
                    <CustomInput
                      dir="rtl"
                      placeholder="مساحت محل نصب"
                      name="area"
                      type="number"
                    />
                    <CustomInput
                      dir="rtl"
                      placeholder="توان مصرفی"
                      name="power"
                      type="number"
                    />
                    <CustomInput
                      dir="rtl"
                      placeholder="زاویه نصب"
                      name="tilt"
                      type="number"
                    />
                    <CustomInput
                      dir="rtl"
                      placeholder="جهت نصب"
                      name="azimuth"
                      type="number"
                    />
                    <CustomInput
                      dir="rtl"
                      placeholder="تعداد ماژول ها"
                      name="totalNumberOfModules"
                      type="number"
                    />
                    <Select
                      name="building type"
                      onValueChange={(value: string) => {
                        if (value in buildingTypeMap) {
                          const id =
                            buildingTypeMap[
                              value as keyof typeof buildingTypeMap
                            ];
                          setBuildingId(id);
                        }
                      }}
                    >
                      <SelectTrigger
                        className={`${style.CustomInput} ltr px-6 mt-[27px] min-h-[43px] cursor-pointer`}
                      >
                        <SelectValue placeholder="نوع ساختمان" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>نوع ساختمان</SelectLabel>
                          <SelectItem value="active" className="cursor-pointer">
                            مسکونی
                          </SelectItem>
                          <SelectItem
                            value="residential"
                            className="cursor-pointer"
                          >
                            تجاری
                          </SelectItem>
                          <SelectItem
                            value="commercial"
                            className="cursor-pointer"
                          >
                            صنعتی
                          </SelectItem>
                          <SelectItem
                            value="agriculture"
                            className="cursor-pointer"
                          >
                            کشاورزی
                          </SelectItem>
                          <SelectItem
                            value="educational"
                            className="cursor-pointer"
                          >
                            آموزشی
                          </SelectItem>
                          <SelectItem
                            value="goverment"
                            className="cursor-pointer"
                          >
                            دولتی
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <Select
                      name="building type"
                      onValueChange={(value: string) => {
                        if (value in panelStatusTypeMap) {
                          const id =
                            panelStatusTypeMap[
                              value as keyof typeof panelStatusTypeMap
                            ];
                          setStatusId(id);
                        }
                      }}
                    >
                      <SelectTrigger
                        className={`${style.CustomInput} ltr px-6 mt-[27px] min-h-[43px] cursor-pointer`}
                      >
                        <SelectValue placeholder="وضعیت پنل" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>وضعیت پنل</SelectLabel>
                          <SelectItem value="active" className="cursor-pointer">
                            فعال
                          </SelectItem>
                          <SelectItem
                            value="expired"
                            className="cursor-pointer"
                          >
                             در انتظار نصب
                          </SelectItem>
                          <SelectItem
                            value="cancled"
                            className="cursor-pointer"
                          >
                             خراب
                          </SelectItem>


                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    
                  </div>

                  <DialogFooter className="flex flex-row justify-center w-full items-center self-center">
                    <SignupButton
                      className=" text-gray-700 font-medium"
                      type="submit"
                    >
                      اعمال ویرایش
                      <Pencil className="text-sunset-orange" />
                    </SignupButton>
                    <DialogClose />
                  </DialogFooter>
                </Form>
              )}
            </Formik>
          </div>

          <DialogFooter className="flex flex-row justify-center items-center rounded-l self-center mr-auto">
            <DialogClose />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
