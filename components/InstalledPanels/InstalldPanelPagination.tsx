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
import {
    useCallback,
    useEffect,
    useState,
    forwardRef,
    useImperativeHandle,
} from "react";
import { installedpanel } from "@/src/types/installedpanelType";
import InstalledPanel from "@/components/InstalledPanels/InstalledPanels";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../Loading/LoadingSpinner/LoadingSpinner";
import { getData } from "@/src/services/apiHub";
import NoRecordFound from "../NoRecordFound/NoRecordFound";
import FilterSection from "../FilterSection/FilterSection";
import CustomPagination from "../Custom/CustomPagination/CustomPagination";
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
    Mailbox,
    Eclipse,
    Grid3x3,
} from "lucide-react";
import style from "./style.module.css";
import SignupButton from "@/components/SignupButton/SignupButton";
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
import StickyFooter from "@/components/Dialog/StickyFooter/StickyFooter";
import CancelButton from "@/components/Dialog/CancelButton/CancelButton";
import SubmitButton from "@/components/Dialog/SubmitButton/SubmitButton";

interface BuildingTypeProps {
    id: number;
    name: string;
}

const InstalledPanelPagination = forwardRef<{ handelHistory: () => void }, {}>(
    (props, ref) => {
        const [open, setOpen] = useState(false);
        const [loading, setLoading] = useState<boolean>(false);
        const [disable, Setdisable] = useState(true);
        const [provinceid, Setprovinceid] = useState<number>();
        const [provinces, Setprovinces] = useState<Province[]>([]);
        const [cities, Setcities] = useState<City[]>([]);
        const [buildingTypes, setBuildingTypes] =
            useState<BuildingTypeProps[]>();

        const dispatch = useDispatch();
        const [history, sethistory] = useState<installedpanel[]>([]);
        const [isLoading, setIsLoading] = useState(true);
        const [status, setStatus] = useState<string>("");
        const [resultPerPage, setResultPerPage] = useState<string>("");
        const [paginationInfo, setPaginationInfo] = useState<
            paginationInfoType | undefined
        >(undefined);
        const [page, setPage] = useState<number>(1);
        const [sortBy, setSortBy] = useState<string>("");
        const [asc, setAsc] = useState<boolean>(false);

        const [query, setQuery] = useState<string>("");

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
        useEffect(() => {
            getData({ endPoint: `/v1/installation/request/building` })
                .then((data) => {
                    setBuildingTypes(data?.data);
                })
                .catch((err) => console.log(err));
            Getprovinces();
        }, []);

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
                    handelHistory();
                })
                .catch((err) => console.log(err))
                .finally(() => setLoading(false));
        };
        const handelHistory = useCallback(() => {
            if (corpId) {
                setIsLoading(true);
                console.log("corpId", corpId);
                getData({
                    endPoint: `/v1/corp/${corpId}/installation/panel`,
                    params: {
                        status,
                        page,
                        sortBy,
                        asc,
                        pageSize: resultPerPage,
                        query,
                    },
                })
                    .then((res) => {
                        sethistory(res?.data?.data);
                        setPaginationInfo(res?.data?.pagination);
                    })
                    .catch((err) => console.log(err))
                    .finally(() => setIsLoading(false));
            }
        }, [status, resultPerPage, corpId, page, sortBy, asc, query]);

        useEffect(() => {
            handelHistory();
        }, [handelHistory]);

        useImperativeHandle(ref, () => ({
            handelHistory,
        }));

        return (
            <>
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
                                address: Yup.string().required(
                                    "این فیلد الزامی است."
                                ),
                                buildingType: Yup.number().required(
                                    "این فیلد الزامی است."
                                ),
                                area: Yup.number().required(
                                    "این فیلد الزامی است."
                                ),
                                power: Yup.number().required(
                                    "این فیلد الزامی است."
                                ),
                                modulecount: Yup.number().required(
                                    "این فیلد الزامی است."
                                ),
                                angel: Yup.number()
                                    .required("این فیلد الزامی است.")
                                    .max(
                                        180,
                                        "زاویه نمیتواند بیش از 180 درجه باشد."
                                    ),
                                direction: Yup.number()
                                    .required("این فیلد الزامی است.")
                                    .max(
                                        360,
                                        "جهت نمیتواند بیش از 360 درجه باشد."
                                    ),
                                provinceID: Yup.number().required(
                                    "این فیلد الزامی است."
                                ),
                                cityID: Yup.number().required(
                                    "این فیلد الزامی است."
                                ),
                                code: Yup.string()
                                    .required("این فیلد الزامی است.")
                                    .length(10, "کد پستی وارد شده اشتباه است."),
                                unit: Yup.number().required(
                                    "این فیلد الزامی است."
                                ),
                            })}
                            onSubmit={(values) => {
                                // setOpen(false);
                                handelAddPanelrequest({
                                    name: values.name,
                                    customerPhone: "+98" + values.phonenumber,
                                    power: Number(values.power),
                                    area: Number(values.area),
                                    buildingType: Number(values.buildingType),
                                    tilt: Number(values.angel),
                                    azimuth: Number(values.direction),
                                    totalNumberOfModules: Number(
                                        values.modulecount
                                    ),
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
                                            icon={Eclipse}
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
                                            icon={Grid3x3}
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
                                                        (
                                                            buildingType,
                                                            index
                                                        ) => (
                                                            <SelectItem
                                                                key={index}
                                                                value={String(
                                                                    buildingType?.id
                                                                )}
                                                                className="cursor-pointer"
                                                            >
                                                                {
                                                                    buildingType?.name
                                                                }
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
                                            placeholder="ظرفیت تولیدی"
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
                                                errors.direction &&
                                                touched.direction
                                                    ? "!border-red-500 !ring-1 !ring-red-700"
                                                    : ""
                                            }
                                        />
                                        <CustomInput
                                            onlyNumbers
                                            style={{ width: "12vw" }}
                                            dir="rtl"
                                            icon={LandPlot}
                                            placeholder="مساحت (متر مربع)"
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
                                                setFieldValue(
                                                    "provinceID",
                                                    value
                                                );
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
                                                    <SelectLabel>
                                                        استان
                                                    </SelectLabel>
                                                    {provinces?.length > 0 ? (
                                                        provinces.map(
                                                            (
                                                                provincearr,
                                                                index
                                                            ) => (
                                                                <SelectItem
                                                                    key={index}
                                                                    className="cursor-pointer"
                                                                    value={String(
                                                                        provincearr?.ID
                                                                    )}
                                                                >
                                                                    {
                                                                        provincearr?.name
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )
                                                    ) : (
                                                        <p>
                                                            هیچ استانی یافت نشد
                                                        </p>
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
                                                    <SelectLabel>
                                                        شهر
                                                    </SelectLabel>
                                                    {cities?.length > 0 ? (
                                                        cities.map(
                                                            (city, index) => (
                                                                <SelectItem
                                                                    key={index}
                                                                    value={String(
                                                                        city?.ID
                                                                    )}
                                                                    className="cursor-pointer"
                                                                >
                                                                    {Object.values(
                                                                        city?.name
                                                                    )}
                                                                </SelectItem>
                                                            )
                                                        )
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
                                                errors.address &&
                                                touched.address
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
                <FilterSection
                    header="پنل‌های نصب‌ شده"
                    fieldName="پنل"
                    statusesListApiRoute={`/v1/installation/panel/status`}
                    status={status}
                    setStatus={setStatus}
                    resultPerPage={resultPerPage}
                    setResultPerPage={setResultPerPage}
                    setPage={setPage}
                    columnsListApiRoute={`/v1/installation/panel/sortable`}
                    asc={asc}
                    setAsc={setAsc}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    query={query}
                    setQuery={setQuery}
                    onSearchSubmit={() => handelHistory()}
                />
                {isLoading ? (
                    <LoadingSpinner />
                ) : history?.length > 0 ? (
                    <div className="flex flex-col text-white bg-transparent w-full">
                        <div className="flex flex-col text-gray-800  rounded-2xl overflow-auto shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
                            {history.map((order: installedpanel, index) => (
                                <InstalledPanel
                                    key={index}
                                    id={order?.id}
                                    customer={order?.customer}
                                    name={order?.name}
                                    power={order?.power}
                                    address={order?.address}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="neu-container">
                        <NoRecordFound />
                    </div>
                )}
                <CustomPagination
                    currentPage={page}
                    setCurrentPage={setPage}
                    paginationInfo={paginationInfo}
                />
            </>
        );
    }
);

InstalledPanelPagination.displayName = "InstalledPanelPagination";

export default InstalledPanelPagination;
