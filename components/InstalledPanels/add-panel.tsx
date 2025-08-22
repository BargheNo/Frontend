"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
    Tally5,
    DatabaseZap,
    TriangleRight,
    Compass,
    LandPlot,
    MapPinHouse,
    SquareMenu,
    IdCard,
    BellRing,
    House,
    Mailbox,
} from "lucide-react";
import style from "./style.module.css";
import { InitPanel } from "@/src/types/addPanelType";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { City, Province } from "@/src/types/provinceType";
import provinceService from "@/src/services/provinceService";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";
import addpanelService from "@/src/services/addpanelService";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import AddComponent from "@/components/AddComponent/AddComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { getData } from "@/src/services/apiHub";
import StickyFooter from "@/components/Dialog/StickyFooter/StickyFooter";
import CancelButton from "@/components/Dialog/CancelButton/CancelButton";
import SubmitButton from "@/components/Dialog/SubmitButton/SubmitButton";

interface BuildingTypeProps {
    id: number;
    name: string;
}

interface GuaranteeProps {
    id: number;
    name: string;
    status: string;
    guaranteeType: string;
    durationMonths: number;
    description: string;
}

export default function AddPanel() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [disable, Setdisable] = useState(true);
    const [provinceid, Setprovinceid] = useState<number>();
    const [provinces, Setprovinces] = useState<Province[]>([]);
    const [cities, Setcities] = useState<City[]>([]);
    const [buildingTypes, setBuildingTypes] = useState<BuildingTypeProps[]>();
    const [guarantees, setGuarantees] = useState<GuaranteeProps[]>([]);

    const corpId = useSelector((state: RootState) => state.user.corpId);

    const Getprovinces = () => {
        provinceService
            .GetProvinces()
            .then((res) => {
                Setprovinces(res?.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const GetGuarantees = useCallback(() => {
        if (corpId) {
            getData({ endPoint: `/v1/corp/${corpId}/guarantee?status=1` })
                .then((data) => {
                    // Filter guarantees with status "فعال"
                    const activeGuarantees = data?.data?.filter((guarantee: GuaranteeProps) => guarantee.status === "فعال");
                    setGuarantees(activeGuarantees || []);
                })
                .catch((err) => console.log(err));
        }
    }, [corpId]);

    useEffect(() => {
        getData({ endPoint: `/v1/installation/request/building` })
            .then((data) => {
                setBuildingTypes(data?.data);
            })
            .catch((err) => console.log(err));
        Getprovinces();
        GetGuarantees();
    }, [GetGuarantees]);

    const UpdateCityList = (provinceId: number) => {
        provinceService
            .GetCities(provinceId)
            .then((res) => {
                Setcities(res?.data);
            })
            .catch((err) => console.log(err));
    };
    const Findprovinceid = (provinces: Province[], name: string) => {
        const province = provinces.find((p) => String(p.ID) === name);
        return province?.ID ?? null;
    };

    useEffect(() => {
        UpdateCityList(provinceid ?? 1);
    }, [provinceid]);
    const handelAddPanelrequest = (panel: InitPanel) => {
        // setOpen(false);
        console.log(panel);
        setLoading(true);
        addpanelService
            .AddPanel(panel, corpId)
            .then((data) => {
                CustomToast(data?.message, "success");
                setOpen(false);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {/* <SignupButton type="button">
					<Plus className={style.icon} />
				</SignupButton> */}
                <AddComponent title="ثبت پنل جدید" />
            </DialogTrigger>
            <DialogContent
                style={{ backgroundColor: "#F1F4FC" }}
                className="w-full dialog-width max-h-[90vh] no-scrollbar mx-auto overflow-y-auto pb-0"
            >
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-end font-bold mt-3.5">
                        ثبت پنل جدید
                    </DialogTitle>
                </DialogHeader>
                <Formik
                    initialValues={{
                        phonenumber: "",
                        name: "",
                        modulecount: "",
                        power: "",
                        angel: "",
                        direction: "",
                        area: "",
                        address: "",
                        provinceID: "",
                        cityID: "",
                        buildingType: "",
                        guaranteeID: "",
                        code: "",
                        unit: "",
                        number: "",
                    }}
                    validationSchema={Yup.object({
                        phonenumber: Yup.string()
                            .matches(
                                /^(9\d{9})$/,
                                "شماره تلفن وارد شده اشتباه است."
                            )
                            .required("این فیلد الزامی است."),
                        name: Yup.string()
                            .required("این فیلد الزامی است.")
                            .max(
                                50,
                                ".نام پنل نمی تواند بیش از 50 کارکتر باشد"
                            ),
                        address: Yup.string().required("این فیلد الزامی است."),
                        buildingType: Yup.number().required(
                            "این فیلد الزامی است."
                        ),
                        guaranteeID: Yup.number().required(
                            "این فیلد الزامی است."
                        ),
                        area: Yup.number().required("این فیلد الزامی است."),
                        power: Yup.number().required("این فیلد الزامی است."),
                        modulecount: Yup.number().required(
                            "این فیلد الزامی است."
                        ),
                        angel: Yup.number().required("این فیلد الزامی است."),
                        direction: Yup.number().required(
                            "این فیلد الزامی است."
                        ),
                        provinceID: Yup.number().required(
                            "این فیلد الزامی است."
                        ),
                        cityID: Yup.number().required("این فیلد الزامی است."),
                        code: Yup.string()
                            .required("این فیلد الزامی است.")
                            .length(10, "کد پستی وارد شده اشتباه است."),
                        unit: Yup.number().required("این فیلد الزامی است."),
                    })}
                    onSubmit={(values) => {
                        // setOpen(false);
                        handelAddPanelrequest({
                            name: values.name,
                            customerPhone: "+98" + values.phonenumber,
                            power: Number(values.power),
                            area: Number(values.area),
                            buildingType: Number(values.buildingType),
                            guaranteeID: Number(values.guaranteeID),
                            tilt: Number(values.angel),
                            azimuth: Number(values.direction),
                            totalNumberOfModules: Number(values.modulecount),
                            provinceID: Number(values.provinceID),
                            cityID: Number(values.cityID),
                            streetAddress: values.address,
                            postalCode: String(values.code),
                            houseNumber: String(values.number),
                            unit: Number(values.unit),
                        });
                    }}
                >
                    {({ setFieldValue, values, errors, touched }) => (
                        <Form className="flex flex-col items-end w-full h-auto gap-4 rtl">
                            <div
                                className="flex md:flex-row flex-col justify-between w-full mt-2"
                                style={{ gap: "1vw" }}
                            >
                                <CustomInput
                                    dir="rtl"
                                    placeholder="شماره مشتری"
                                    icon={IdCard}
                                    name="phonenumber"
                                    inputClassName={
                                        errors.phonenumber &&
                                        touched.phonenumber
                                            ? "!border-red-500 !ring-1 !ring-red-700"
                                            : ""
                                    }
									onlyNumbers
									maxLength={10}
                                />

                                <CustomInput
                                    dir="rtl"
                                    placeholder="نام پنل"
                                    icon={SquareMenu}
                                    name="name"
                                    inputClassName={
                                        errors.name && touched.name
                                            ? "!border-red-500 !ring-1 !ring-red-700"
                                            : ""
                                    }
                                />
                            </div>
                            <div
                                className="flex justify-end w-full -mt-4"
                                style={{ gap: "1vw" }}
                            >
                                <CustomInput
                                    onlyNumbers
                                    dir="rtl"
                                    icon={Tally5}
                                    name="modulecount"
                                    placeholder="تعداد ماژول‌ها"
                                    inputClassName={
                                        errors.modulecount &&
                                        touched.modulecount
                                            ? "!border-red-500 !ring-1 !ring-red-700"
                                            : ""
                                    }
                                />

                                <Select
                                    name="building"
                                    onValueChange={(value) => {
                                        console.log(values);
                                        setFieldValue(
                                            "buildingType",
                                            Number(value)
                                        );
                                    }}
                                >
                                    <SelectTrigger
                                        className={`${style.CustomInput} mt-[27px] min-h-[43px] cursor-pointer`}
                                    >
                                        <SelectValue placeholder="نوع ساختمان" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>
                                                نوع ساختمان
                                            </SelectLabel>
                                            {buildingTypes?.map(
                                                (buildingType, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={String(
                                                            buildingType?.id
                                                        )}
                                                        className="cursor-pointer"
                                                    >
                                                        {buildingType?.name}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div
                                className="flex justify-end w-full -mt-4"
                                style={{ gap: "1vw" }}
                            >
                                <Select
                                    name="guarantee"
                                    onValueChange={(value) => {
                                        setFieldValue(
                                            "guaranteeID",
                                            Number(value)
                                        );
                                    }}
                                >
                                    <SelectTrigger
                                        className={`${style.CustomInput} mt-[27px] min-h-[43px] cursor-pointer ${
                                            errors.guaranteeID && touched.guaranteeID
                                                ? "!border-red-500 !ring-1 !ring-red-700"
                                                : ""
                                        }`}
                                    >
                                        <SelectValue placeholder="گارانتی" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>
                                                گارانتی
                                            </SelectLabel>
                                            {guarantees?.map(
                                                (guarantee, index) => (
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
                            <div
                                className="flex justify-end w-full -mt-4"
                                style={{ gap: "1vw" }}
                            >
                                <CustomInput
                                    onlyNumbers
                                    dir="rtl"
                                    icon={DatabaseZap}
                                    placeholder="ظرفیت"
                                    name="power"
                                    inputClassName={
                                        errors.power && touched.power
                                            ? "!border-red-500 !ring-1 !ring-red-700"
                                            : ""
                                    }
                                />
                                <CustomInput
                                    onlyNumbers
                                    dir="rtl"
                                    icon={TriangleRight}
                                    name="angel"
                                    placeholder="زاویه نصب (درجه)"
                                    inputClassName={
                                        errors.angel && touched.angel
                                            ? "!border-red-500 !ring-1 !ring-red-700"
                                            : ""
                                    }
                                />
                            </div>
                            <div
                                className="flex justify-end w-full -mt-4"
                                style={{ gap: "1vw" }}
                            >
                                <CustomInput
                                    onlyNumbers
                                    style={{ width: "12vw" }}
                                    dir="rtl"
                                    icon={Compass}
                                    placeholder="جهت نصب (درجه)"
                                    name="direction"
                                    inputClassName={
                                        errors.direction && touched.direction
                                            ? "!border-red-500 !ring-1 !ring-red-700"
                                            : ""
                                    }
                                />
                                <CustomInput
                                    onlyNumbers
                                    style={{ width: "12vw" }}
                                    dir="rtl"
                                    icon={LandPlot}
                                    placeholder="مساحت (مترمربع)"
                                    name="area"
                                    inputClassName={
                                        errors.area && touched.area
                                            ? "!border-red-500 !ring-1 !ring-red-700"
                                            : ""
                                    }
                                />
                            </div>
                            <div
                                className={`${style.citypro} flex md:flex-row flex-col justify-between w-full mt-2`}
                            >
                                <Select
                                    name="provinceID"
                                    value={values.provinceID}
                                    onValueChange={(value) => {
                                        setFieldValue("provinceID", value);
                                        setFieldValue("cityID", "");
                                        const id = Findprovinceid(
                                            provinces,
                                            value
                                        );
                                        Setprovinceid(id ?? 1);
                                        if (id) UpdateCityList(id);
                                        Setdisable(false);
                                    }}
                                >
                                    <SelectTrigger
                                        className={`${style.CustomInput} cursor-pointer`}
                                        // style={{ width: "25vw" }}
                                    >
                                        <SelectValue placeholder="استان" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>استان</SelectLabel>
                                            {provinces?.length > 0 ? (
                                                provinces.map(
                                                    (provincearr, index) => (
                                                        <SelectItem
                                                            key={index}
                                                            className="cursor-pointer"
                                                            value={String(
                                                                provincearr?.ID
                                                            )}
                                                        >
                                                            {provincearr?.name}
                                                        </SelectItem>
                                                    )
                                                )
                                            ) : (
                                                <p>هیچ استانی یافت نشد</p>
                                            )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Select
                                    name="cityID"
                                    value={values.cityID}
                                    disabled={disable}
                                    onValueChange={(value) => {
                                        setFieldValue("cityID", value);
                                    }}
                                >
                                    <SelectTrigger
                                        disabled={disable}
                                        className={`${style.CustomInput} cursor-pointer`}
                                    >
                                        <SelectValue placeholder="شهر" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>شهر</SelectLabel>
                                            {cities?.length > 0 ? (
                                                cities.map((city, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={String(city?.ID)}
                                                        className="cursor-pointer"
                                                    >
                                                        {Object.values(
                                                            city?.name
                                                        )}
                                                    </SelectItem>
                                                ))
                                            ) : (
                                                <p>هیچ شهری یافت نشد</p>
                                            )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="-mt-5 w-full">
                                <CustomTextArea
                                    icon={MapPinHouse}
                                    name="address"
                                    placeholder="آدرس"
                                    inputClassName={
                                        errors.address && touched.address
                                            ? "!border-red-500 !ring-1 !ring-red-700"
                                            : ""
                                    }
                                />
                            </div>
                            <div
                                className="flex md:flex-row flex-col justify-end w-full -mt-4"
                                style={{ gap: "1vw" }}
                            >
                                <CustomInput
                                    onlyNumbers
                                    // style={{ width: "25vw" }}
                                    dir="rtl"
                                    icon={Mailbox}
                                    name="code"
                                    placeholder="کد پستی"
                                    inputClassName={
                                        errors.code && touched.code
                                            ? "!border-red-500 !ring-1 !ring-red-700"
                                            : ""
                                    }
									maxLength={10}
                                />
                                <CustomInput
                                    onlyNumbers
                                    style={{ width: "12vw" }}
                                    dir="rtl"
                                    icon={House}
                                    placeholder="پلاک"
                                    name="number"
                                    inputClassName={
                                        errors.number && touched.number
                                            ? "!border-red-500 !ring-1 !ring-red-700"
                                            : ""
                                    }
                                />
                                <CustomInput
                                    onlyNumbers
                                    style={{ width: "12vw" }}
                                    dir="rtl"
                                    icon={BellRing}
                                    placeholder="واحد"
                                    name="unit"
                                    inputClassName={
                                        errors.unit && touched.unit
                                            ? "!border-red-500 !ring-1 !ring-red-700"
                                            : ""
                                    }
                                />
                            </div>
                            <StickyFooter>
                                <CancelButton />
                                <SubmitButton loading={loading}>
                                    ثبت پنل
                                </SubmitButton>
                            </StickyFooter>
                            {/* <DialogFooter className="flex flex-row justify-center items-center self-center">
								<SignupButton
									className="text-[#FA682D]"
									type="submit"
									style={{
										marginTop: "10px",
										width: "25vw",
									}}
								>
									{loading ? (
										<LoadingOnButton />
									) : (
										<p>ثبت پنل</p>
									)}
								</SignupButton>
								<DialogClose />
							</DialogFooter> */}
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
