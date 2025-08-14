import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import {
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { vazir } from "@/lib/fonts";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { getData, postData } from "@/src/services/apiHub";
import {
    Battery,
    Building2,
    CalendarRange,
    DollarSign,
    Eclipse,
    LandPlot,
    MapPin,
    MessageCircle,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import styles from "./PlaceBidForm.module.css";
import React, { useEffect, useState } from "react";
import { BidFormProps } from "@/src/types/RequestCardTypes";
import wordExpression from "@/src/functions/Calculations";
import { useSelector } from "react-redux";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";
import { CustomDatePicker } from "@/components/Custom/CustomDatePicker/CustomDatePicker";
import { GuaranteeProps } from "@/src/types/BidCardTypes";
import StickyFooter from "@/components/Dialog/StickyFooter/StickyFooter";
import CancelButton from "@/components/Dialog/CancelButton/CancelButton";
import SubmitButton from "@/components/Dialog/SubmitButton/SubmitButton";

const Item = ({
    icon: Icon,
    fieldName,
    fieldValue,
    english = false,
    prefix,
    className,
}: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    fieldName: string;
    fieldValue: string | number;
    english?: boolean;
    prefix?: string;
    className?: string;
}) => {
    const { value, changed } = wordExpression(fieldValue, english);
    return (
        <div
            className={`flex items-start gap-2 border-t-2 first:border-t-0 border-gray-300 w-full py-2 ${className}`}
        >
            <Icon className="min-w-6 min-h-6 transition-transform duration-200 hover:scale-115 text-[#FA682D]" />
            <div className="flex gap-1">
                <span className="text-nowrap">{fieldName}: </span>
                <span className="text-[#5E5E5E]">
                    {value}
                    {changed && english ? "" : " "}
                    {prefix}
                </span>
            </div>
        </div>
    );
};

const initialValues = {
    cost: "",
    area: "",
    power: "",
    description: "",
    installationTime: "",
    guaranteeID: "",
    paymentTerms: { method: 0 },
};

const validateSchema = Yup.object({
    cost: Yup.string().required("قیمت پیشنهادی الزامی است"),
    area: Yup.string().required("مساحت الزامی است"),
    power: Yup.string().required("ظرفیت الزامی است"),
    installationTime: Yup.string().required("زمان تخمینی نصب الزامی است"),
    description: Yup.string().max(500, "توضیحات طولانی است"),
    guaranteeID: Yup.string().required("نوع گارانتی الزامی است"),
    paymentTerms: Yup.object().shape({
        method: Yup.string().required("نحوه پرداخت الزامی است"),
    }),
});

export default function PlaceBidForm({
    requestId,
    panelDetails,
    setOpen,
}: BidFormProps) {
    const [guarantees, setGuarantees] = useState<GuaranteeProps[]>([]);
    const corpId = useSelector((state: RootState) => state.user.corpId);
    const handleBid = async (
        requestId: number,
        cost: number,
        area: number,
        power: number,
        description: string,
        installationTime: string,
        guaranteeID?: number,
        paymentTerms?: {
            method: number;
            installmentPlan?: {
                numberOfMonths: number;
                downPaymentAmount: number;
                monthlyAmount: number;
                notes: string;
            };
        }
    ) => {
        const formData = {
            cost: cost,
            area: area,
            power: power,
            description: description,
            installationTime: installationTime,
            guaranteeID: guaranteeID,
            paymentTerms: paymentTerms,
        };
        console.log("formData", formData);
        postData({
            endPoint: `/v1/corp/${corpId}/installation/request/${requestId}/bid`,
            data: formData,
        })
            .then((data) => {
                CustomToast(data?.message, "success");
                setOpen(false);
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        getData({ endPoint: `/v1/corp/${corpId}/guarantee?status=1` })
            .then((data) => {
                setGuarantees(
                    data?.data?.filter(
                        (guarantee: GuaranteeProps) =>
                            guarantee.status === "فعال"
                    )
                );
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validateSchema}
            onSubmit={(values) => {
                handleBid(
                    requestId,
                    Number(values.cost),
                    Number(values.area),
                    Number(values.power),
                    values.description,
                    values.installationTime,
                    Number(values.guaranteeID),
                    {
                        method: 1,
                        installmentPlan: {
                            numberOfMonths: 12,
                            downPaymentAmount: 2000,
                            monthlyAmount: 833,
                            notes: "Payment plan with 12 monthly installments after initial down payment",
                        },
                    }
                );
            }}
        >
            {({ setFieldValue, values, errors, touched }) => (
                <Form className="w-full flex flex-col gap-6">
                    <DialogHeader>
                        <DialogTitle
                            className={`flex ${vazir.className} text-2xl`}
                        >
                            ثبت پیشنهاد
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-1">
                        <span className="text-lg font-bold">
                            مشخصات درخواست
                        </span>
                        <div className={styles.Box}>
                            <div className="flex md:flex-row flex-col">
                                <Item
                                    icon={Eclipse}
                                    fieldName="نام پنل"
                                    fieldValue={panelDetails.panelName}
                                />
                                <Item
                                    icon={Building2}
                                    fieldName="نوع ساختمان"
                                    fieldValue={panelDetails.buildingType}
                                />
                            </div>
                            <div className="flex md:flex-row flex-col">
                                <Item
                                    className="first:border-t-2"
                                    icon={Battery}
                                    fieldName="ظرفیت"
                                    fieldValue={panelDetails.capacity}
                                    english={true}
                                    prefix="W"
                                />
                                <Item
                                    icon={CalendarRange}
                                    fieldName="زمان درخواست"
                                    fieldValue={panelDetails.createdTime}
                                />
                            </div>
                            <Item
                                icon={MapPin}
                                fieldName="آدرس"
                                fieldValue={panelDetails.address}
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="flex flex-row justify-evenly gap-6">
                            <CustomInput
                                placeholder="قیمت پیشنهادی (تومان)"
                                name="cost"
                                icon={DollarSign}
                                onlyNumbers
                                autoFocus={true}
                                containerClassName="w-1/2"
                                inputClassName={
                                    errors.cost && touched.cost
                                        ? "!border-red-500 !ring-1 !ring-red-700"
                                        : ""
                                }
                            />
                            <div className="w-full">
                                <CustomDatePicker
                                    placeholder="زمان تخمینی نصب"
                                    date={values.installationTime}
                                    setDate={(date: string) => {
                                        setFieldValue("installationTime", date);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row justify-evenly gap-6">
                            <CustomInput
                                placeholder="ظرفیت (وات)"
                                name="power"
                                icon={Battery}
                                onlyNumbers
                                containerClassName="w-1/2"
                                inputClassName={
                                    errors.power && touched.power
                                        ? "!border-red-500 !ring-1 !ring-red-700"
                                        : ""
                                }
                            />
                            <CustomInput
                                placeholder="مساحت (متر مربع)"
                                name="area"
                                icon={LandPlot}
                                onlyNumbers
                                containerClassName="w-1/2"
                                inputClassName={
                                    errors.area && touched.area
                                        ? "!border-red-500 !ring-1 !ring-red-700"
                                        : ""
                                }
                            />
                        </div>
                        <div className="flex flex-row justify-evenly gap-6">
                            <Select
                                name="guaranteeID"
                                onValueChange={(value) => {
                                    setFieldValue("guaranteeID", Number(value));
                                }}
                            >
                                <SelectTrigger
                                    className={`${styles.CustomInput} mt-[27px] min-h-[43px] cursor-pointer`}
                                >
                                    <SelectValue placeholder="نوع گارانتی" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>نوع گارانتی</SelectLabel>
                                        {guarantees.map(
                                            (
                                                guarantee: GuaranteeProps,
                                                index: number
                                            ) => (
                                                <SelectItem
                                                    key={index}
                                                    value={String(
                                                        guarantee?.id
                                                    )}
                                                    className="cursor-pointer"
                                                >
                                                    {guarantee?.name}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <CustomTextArea
                            placeholder="جزئیات بیشتر"
                            name="description"
                            icon={MessageCircle}
                            containerClassName="w-full"
                            inputClassName={
                                errors.description && touched.description
                                    ? "!border-red-500 !ring-1 !ring-red-700"
                                    : ""
                            }
                        />
                    </div>
                    <StickyFooter>
                        <CancelButton />
                        <SubmitButton>ارسال پیشنهاد</SubmitButton>
                    </StickyFooter>
                    {/* <DialogFooter>
						<button
							type="submit"
							className={`${vazir.className} ml-3 bg-[#11B33A] hover:cursor-pointer shadow-md rounded-md px-2 py-1 text-white`}
						>
							ارسال پیشنهاد
						</button>
					</DialogFooter> */}
                </Form>
            )}
        </Formik>
    );
}
