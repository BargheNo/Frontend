"use client";
import React, { useEffect, useState } from "react";
import {
    Tally5,
    DatabaseZap,
    TriangleRight,
    Compass,
    LandPlot,
    MapPinHouse,
    SquareMenu,
    IdCard,
    Plus,
    BellRing,
    House,
    Mailbox
} from "lucide-react";
import style from "./style.module.css";
import SignupButton from "@/components/SignupButton/SignupButton";
import * as Yup from "yup";
import { InitPanel } from "@/src/types/addPanelType";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { Form, Formik } from "formik";
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
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/types";
import generateErrorMessage from "@/src/functions/handleAPIErrors";
import CustomTextArea from "../Custom/CustomTextArea/CustomTextArea";
import addpanelService from "@/src/services/addpanelService";
export default function AddPanel() {
    const [open, setOpen] = useState(false);
    const [disable, Setdisable] = useState(true);
    const [provinceid, Setprovinceid] = useState<number>();
    const [provinces, Setprovinces] = useState<Province[]>([]);
    const [cities, Setcities] = useState<City[]>([]);
    const [building, Setbuilding] = useState("");
    const [cityid, Setcityid] = useState<number>();
    const accessToken = useSelector(
        (state: RootState) => state.user.accessToken
    );
    const Getprovinces = () => {
        provinceService
            .GetProvinces()
            .then((res) => {
                Setprovinces(res.data.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    useEffect(() => {
        Getprovinces();
    }, []);

    const UpdateCityList = (provinceId: number) => {
        provinceService
            .GetCities(provinceId)
            .then((res) => Setcities(res.data.data))
            .catch((err) => console.log(err.message));
    };
    const Findprovinceid = (provinces: Province[], name: string) => {
        const province = provinces.find((p) => p.name === name);
        return province?.ID ?? null;
    };

    const FindCityid = (cities: City[], name: string) => {
        const city = cities.find((p) => p.name === name);
        return city?.ID ?? null;
    };

    useEffect(() => {
        UpdateCityList(provinceid ?? 1);
    }, [provinceid]);

    const handelAddPanelrequest = (panel: InitPanel, token: string) => {
        setOpen(false);
        console.log("hello", token);
        addpanelService.AddPanel
            (panel, token)
            .then((res) => {
                toast(res?.data?.message);
                setOpen(false);
            })
            .catch((err) => {
                console.log(err);
                toast(generateErrorMessage(err));
            });
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <SignupButton type="button">
                    <Plus className={style.icon} />
                </SignupButton>
            </DialogTrigger>
            <DialogContent
                style={{ backgroundColor: "#F1F4FC" }}
                className="min-w-[57vw] overflow-auto"
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
                        province: "",
                        city: "",
                        building:"",
                        code: "",
						unit: "",
						number: "",
                    }}
                    validationSchema={Yup.object({
                        phonenumber: Yup.string()
                                    .matches(/^(9\d{9})$/, ".شماره تلفن وارد شده اشتباه است")
                                    .required(".شماره تلفن الزامی است"),
                        name: Yup.string()
                            .required("این فیلد الزامی است")
                            .max(50, "نام پنل نمی تواند بیش از 50 کارکتر باشد"),
                        address: Yup.string().required("این فیلد الزامی است"),
                        building: Yup.string().required("این فیلد الزامی است"),
                        area: Yup.number().required("این فیلد الزامی است"),
                        power: Yup.number().required(
                            "این فیلد الزامی است"
                        ),
                        modulecount: Yup.number().required("این فیلد الزامی است"),
                        angel: Yup.number().required("این فیلد الزامی است"),
                        direction: Yup.number().required("این فیلد الزامی است"),
                        province: Yup.string().required("این فیلد الزامی است"),
                        city: Yup.string().required("این فیلد الزامی است"),
                        number: Yup.string().required("این فیلد الزامی است"),
                        code: Yup.string().required("این فیلد الزامی است").length(10, "کد پستی وارد شده اشتباه است"),
                        unit: Yup.number().required("این فیلد الزامی است"),
                    })}
                    onSubmit={(values) => {
                        setOpen(false);
                        handelAddPanelrequest
                        (
                            {
                                panelName: values.name,
                                customerPhone:"+98"+values.phonenumber,
                                power: Number(values.power),
                                area: Number(values.area),
                                buildingType: building,
                                tilt: Number(values.angel),
                                azimuth:Number(values.direction),
                                totalNumberOfModules:Number(values.modulecount),
                                provinceID: provinceid ?? 1,
                                cityID: cityid ?? 1,
                                streetAddress: values.address,
                                postalCode: String(values.code),
                                houseNumber: String(values.number),
                                unit: Number(values.unit),
                            },
                            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDY0OTgzOTcsImlhdCI6MTc0MzkwNjM5Nywic3ViIjoxfQ.Pg3qDBshC2Uo92zWr6Fq1WOc-Ovgpy0PePBPl1UfHZHPicKIEISAPvSerP7WcZtbppfcTl_1X_cheDdstueYjgAOHBPsDJe7thdYgsH-IwrLelUU9bJ9-2b0RkrTby41K2cnRb-MvTGTXOfHvnAbtdLHe7pt73xnLwohOzOwVf8"
                        );
                    }}
                >
                    {({ setFieldValue, values }) => (
                        <Form className="flex flex-col items-end w-full h-auto gap-4 rtl">
                            <div
                                className="flex justify-end w-full items-center"
                                style={{ gap: "1vw" }}
                            >
                                <CustomInput
                                    dir="rtl"
                                    placeholder="شماره مشتری"
                                    icon={IdCard}
                                    name="phonenumber"
                                    type="number"
                                >
                                    {" "}
                                </CustomInput>
                                <div className="flex flex-row justify-center mt-5 gap-x-1 text-gray-500 w-full">
                                    {/* <ShieldAlert />
                                    <p className="rtl">
                                        پنل شما با این نام در بخش پنل‌ها ثبت
                                        خواهد شد.
                                    </p> */}
                                </div>
                            </div>
                            <div
                                className="flex justify-end w-full items-center"
                                style={{ gap: "1vw" }}
                            >
                                <CustomInput
                                    dir="rtl"
                                    placeholder="نام پنل"
                                    icon={SquareMenu}
                                    name="name"
                                >
                                    {" "}
                                </CustomInput>
                                <div className="flex flex-row justify-center mt-5 gap-x-1 text-gray-500 w-full">
                                    {/* <ShieldAlert />
                                    <p className="rtl">
                                        پنل شما با این نام در بخش پنل‌ها ثبت
                                        خواهد شد.
                                    </p> */}
                                </div>
                            </div>
                            <div
                                className="flex justify-end w-full -mt-4"
                                style={{ gap: "1vw" }}
                            >
                                <CustomInput
                                    type="number"
                                    dir="rtl"
                                    icon={Tally5}
                                    name="modulecount"
                                    placeholder="تعداد ماژول ها"
        
                                >
                                    {" "}
                                </CustomInput>
                                <CustomInput
                                    type="number"
                                    dir="rtl"
                                    icon={DatabaseZap}
                                    placeholder="مجموع توان تولید شده"
                                    name="power"
                                >
                                    {" "}
                                </CustomInput>
                                <Select
                                    name="building"
                                    onValueChange={(value) =>{
                                        Setbuilding(value);
                                        setFieldValue("building", value);
                                    }
                                    }
                                >
                                    <SelectTrigger
                                        className={`${style.CustomInput} mt-[27px] min-h-[43px]`}>
                                        <SelectValue placeholder="نوع ساختمان" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>
                                                نوع ساختمان
                                            </SelectLabel>
                                            <SelectItem value="residential">
                                                مسکونی
                                            </SelectItem>
                                            <SelectItem value="commercial">
                                                تجاری
                                            </SelectItem>
                                            <SelectItem value="industrial">
                                                صنعتی
                                            </SelectItem>
                                            <SelectItem value="argiculture">
                                                کشاورزی
                                            </SelectItem>
                                            <SelectItem value="more">
                                                سایر
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div
                                className="flex justify-end w-full -mt-4"
                                style={{ gap: "1vw" }}
                            >
                                <CustomInput
                                    type="number"
                                    dir="rtl"
                                    icon={TriangleRight}
                                    name="angel"
                                    placeholder="زاویه نصب"
                                >
                                    {" "}
                                </CustomInput>
                                <CustomInput
                                    type="number"
                                    style={{ width: "12vw" }}
                                    dir="rtl"
                                    icon={Compass}
                                    placeholder="جهت نصب"
                                    name="direction"
                                >
                                    {" "}
                                </CustomInput>
                                <CustomInput
                                    type="number"
                                    style={{ width: "12vw" }}
                                    dir="rtl"
                                    icon={LandPlot}
                                    placeholder="مساحت"
                                    name="area"
                                >
                                    {" "}
                                </CustomInput>
                            </div>

                            <div
                                className="flex justify-between w-full mt-2"
                                style={{ gap: "1vw" }}
                            >
                                <Select
                                    name="province"
                                    onValueChange={(value) => {
                                        Setdisable(false);
                                        setFieldValue("province", value);
                                        setFieldValue("city", "");
                                        const id = Findprovinceid(
                                            provinces,
                                            value
                                        );
                                        Setprovinceid(id ?? 1);
                                        if (id) UpdateCityList(id);
                                    }}
                                >
                                    <SelectTrigger
                                        className={style.CustomInput}
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
                                                            value={
                                                                provincearr.name
                                                            }
                                                        >
                                                            {provincearr.name}
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
                                    name="city"
                                    disabled={disable}
                                    onValueChange={(value) => {
                                        const iD = FindCityid(cities, value);
                                        Setcityid(iD ?? 1);
                                        setFieldValue("city", value);
                                    }}
                                >
                                    <SelectTrigger
                                        disabled={disable}
                                        className={style.CustomInput}
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
                                                        value={city.name}
                                                    >
                                                        {Object.values(
                                                            city.name
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
                                >
                                    {" "}
                                </CustomTextArea>
                            </div>
                            <div
								className="flex justify-end w-full -mt-4"
								style={{ gap: "1vw" }}
							>
								<CustomInput
									type="number"
									// style={{ width: "25vw" }}
									dir="rtl"
									icon={Mailbox}
									name="code"
									placeholder="کد پستی"
								>
									{" "}
								</CustomInput>
								<CustomInput
									type="number"
									style={{ width: "12vw" }}
									dir="rtl"
									icon={House}
									placeholder="پلاک"
									name="number"
								>
									{" "}
								</CustomInput>
								<CustomInput
									type="number"
									style={{ width: "12vw" }}
									dir="rtl"
									icon={BellRing}
									placeholder="واحد"
									name="unit"
								>
									{" "}
								</CustomInput>
							</div>

                            <div className="flex flex-row justify-center items-center self-center">
                                <SignupButton
                                    type="submit"
                                    style={{
                                        marginTop: "10px",
                                        width: "25vw",
                                    }}
                                >
                                    {" "}
                                    ثبت پنل
                                </SignupButton>
                            </div>
                            <DialogFooter>
                                <DialogClose />
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
