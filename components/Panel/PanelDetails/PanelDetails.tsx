"use client";
import Header from "@/components/Header/Header";
import { getData, serverIPAndPort } from "@/src/services/apiHub";
import React, { useCallback, useEffect, useState } from "react";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import styles from "./styles.module.css";
import {
    Eclipse,
    MapPin,
    Building2,
    Route,
    Mail,
    Home,
    DoorOpen,
    Gauge,
    Bolt,
    Compass,
    Grid3x3,
    ShieldCheck,
    LandPlot,
    TriangleRight,
    DatabaseZap,
    Phone,
    CalendarClock,
    ScrollText,
    FileText,
    CircleAlert,
    ListCollapse,
    ReceiptText,
    Battery,
    Activity,
    TrendingUp,
    TrendingDown,
    Thermometer,
} from "lucide-react";

import wordExpression from "@/src/functions/Calculations";
import TruncatedText from "@/components/ui/TruncatedText";
import PanelIconWithBackground from "../PanelCard/PanelIconWithBackground";
import PanelCharts from "./PanelCharts";
import PanelEventHistory from "../PanelEventHistory";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { LucideIcon } from "lucide-react";

// Live Data Card Component
interface LiveDataCardProps {
    icon: LucideIcon;
    title: string;
    value: string | number;
    color: string;
    condition?: boolean;
}

const LiveDataCard: React.FC<LiveDataCardProps> = ({ icon, title, value, color, condition = true }) => {
    if (!condition) return null;
    
    return (
        <div className="w-full overflow-hidden rounded-xl items-center shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)]">
            <div className="flex items-center">
                <PanelIconWithBackground
                    icon={icon}
                    className="w-full justify-between"
                    text={title}
                    color={color}
                />
            </div>
            <div className="flex flex-col m-2 sm:m-3 items-center justify-center">
                <div className="flex flex-row-reverse gap-2 items-center">
                    <span dir="ltr" className="text-lg sm:text-xl font-bold">
                        {value}
                    </span>
                </div>
            </div>
        </div>
    );
};

interface Panel {
    id: number;
    name: string;
    status: string;
    buildingType: string;
    area: number;
    power: number;
    tilt: number;
    azimuth: number;
    totalNumberOfModules: number;
    guaranteeStatus: string;
    corporation: Corporation;
    address: Address;
    guarantee: Guarantee;
}

interface Corporation {
    id: number;
    name: string;
    logo: string;
    status: string;
    contactInfo: ContactInfo[]; // adjust type if you know the structure
    addresses: Address[]; // adjust type if you know the structure
}

interface ContactInfo {
    contactType: { id: number; name: string };
    value: string;
}

interface Address {
    id: number;
    province: string;
    provinceID: number;
    cityID: number;
    city: string;
    streetAddress: string;
    postalCode: string;
    houseNumber: string;
    unit: number;
}

interface Term {
    title: string;
    description: string;
    limitations: string;
}

interface Guarantee {
    id: number;
    name: string;
    status: string;
    guaranteeType: string;
    durationMonths: number;
    description: string;
    terms: Term[];
}

interface LiveData {
    timestamp?: string;
    datalogserial?: string;
    pvserial?: string;
    pvstatus?: number;
    pvpowerin?: number;
    pv1voltage?: number;
    pv1current?: number;
    pv2voltage?: number;
    pv2current?: number;
    pvpowerout?: number;
    acfreq?: number;
    acvoltage?: number;
    acoutputpower?: number;
    temperature?: number;
    batvoltage?: number;
    batcurrent?: number;
    batpower?: number;
    gridexport?: number;
    gridimport?: number;
    [key: string]: unknown;
}

export default function PanelDetails({ id }: { id: string }) {
    const accessToken = useSelector(
        (state: RootState) => state.user.accessToken
    );
    const [liveData, setLiveData] = useState<LiveData | null>(null);
    const [panel, setPanel] = useState<Panel>();
    const [loading, setLoading] = useState<boolean>(true);
    
    // Chart data states
    const [powerData, setPowerData] = useState<{ x: number; y: number }[]>([]);
    const [voltageData, setVoltageData] = useState<{
        pv1: { x: number; y: number }[];
        pv2: { x: number; y: number }[];
        ac: { x: number; y: number }[];
        battery: { x: number; y: number }[];
    }>({ pv1: [], pv2: [], ac: [], battery: [] });
    const [currentData, setCurrentData] = useState<{
        pv1: { x: number; y: number }[];
        pv2: { x: number; y: number }[];
        battery: { x: number; y: number }[];
    }>({ pv1: [], pv2: [], battery: [] });
    const [temperatureData, setTemperatureData] = useState<{ x: number; y: number }[]>([]);
    const [gridData, setGridData] = useState<{
        export: { x: number; y: number }[];
        import: { x: number; y: number }[];
    }>({ export: [], import: [] });
    const getStatusColor = (status: string) => {
        if (status === "فعال")
            // return "bg-gradient-to-br from-green-400 to-green-500 border-1 border-gray-100/50 shadow-sm shadow-green-500";
            return "green-status";
        if (status === "در انتظار نصب")
            // return "bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-yellow-500";
            return "yellow-status";
        if (status === "خراب")
            // return "bg-gradient-to-br from-red-400 to-red-500 shadow-red-500";
            return "red-status";
        return "gray-status";
    };
    const fetchPanelDetails = useCallback(() => {
        setLoading(true);
        getData({ endPoint: `/v1/user/installation/panel/${id}` })
            .then((data) => {
                console.log(data?.data);
                setPanel(data?.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [id]);
    useEffect(() => {
        fetchPanelDetails();
    }, [fetchPanelDetails]);

    useEffect(() => {
        if (!accessToken) return;

        const websocketUrl = `ws://${serverIPAndPort}/v1/user/monitoring/panel/${id}/token/${accessToken}`;
        const ws = new WebSocket(websocketUrl);

        ws.onopen = () => {
            console.log("WebSocket connected");
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setLiveData(data);
            console.log("data", data);
            
            // Update chart data
            const timestamp = Date.now();
            
            // Update power data
            if (data.pvpowerin !== undefined) {
                setPowerData(prevData => {
                    const newData = [...prevData, { x: timestamp, y: data.pvpowerin || 0 }];
                    return newData.slice(-50); // Keep last 50 points
                });
            }
            
            // Update voltage data
            setVoltageData(prevData => ({
                pv1: data.pv1voltage !== undefined 
                    ? [...prevData.pv1, { x: timestamp, y: data.pv1voltage }].slice(-50)
                    : prevData.pv1,
                pv2: data.pv2voltage !== undefined 
                    ? [...prevData.pv2, { x: timestamp, y: data.pv2voltage }].slice(-50)
                    : prevData.pv2,
                ac: data.acvoltage !== undefined 
                    ? [...prevData.ac, { x: timestamp, y: data.acvoltage }].slice(-50)
                    : prevData.ac,
                battery: data.batvoltage !== undefined 
                    ? [...prevData.battery, { x: timestamp, y: data.batvoltage }].slice(-50)
                    : prevData.battery,
            }));
            
            // Update current data
            setCurrentData(prevData => ({
                pv1: data.pv1current !== undefined 
                    ? [...prevData.pv1, { x: timestamp, y: data.pv1current }].slice(-50)
                    : prevData.pv1,
                pv2: data.pv2current !== undefined 
                    ? [...prevData.pv2, { x: timestamp, y: data.pv2current }].slice(-50)
                    : prevData.pv2,
                battery: data.batcurrent !== undefined 
                    ? [...prevData.battery, { x: timestamp, y: data.batcurrent }].slice(-50)
                    : prevData.battery,
            }));
            
            // Update temperature data
            if (data.temperature !== undefined) {
                setTemperatureData(prevData => {
                    const newData = [...prevData, { x: timestamp, y: data.temperature || 0 }];
                    return newData.slice(-50);
                });
            }
            
            // Update grid data
            setGridData(prevData => ({
                export: data.gridexport !== undefined 
                    ? [...prevData.export, { x: timestamp, y: data.gridexport }].slice(-50)
                    : prevData.export,
                import: data.gridimport !== undefined 
                    ? [...prevData.import, { x: timestamp, y: data.gridimport }].slice(-50)
                    : prevData.import,
            }));
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        ws.onclose = () => {
            console.log("WebSocket disconnected");
        };

        return () => {
            ws.close();
        };
    }, [accessToken, id]);

    return (
        <>
            <Header header="جزئیات پنل" />
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="relative neu-container p-4 flex flex-col gap-4">
                    <div className={`flex flex-col gap-4 p-4 rounded-lg rtl h-fit`}>
                        <div className="font-bold text-xl text-blue-800">
                            نمودار تولید
                        </div>
                        <div className="">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">داده‌های زنده</h3>
                                <div className="flex items-center gap-2">
                                    <div 
                                        className={`w-3 h-3 rounded-full ${
                                            liveData ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                                        }`}
                                        title={liveData ? 'متصل' : 'قطع'}
                                    />
                                    <span className="text-sm text-gray-600">
                                        {liveData ? 'زنده' : 'آفلاین'}
                                    </span>
                                </div>
                            </div>
                            
                            {liveData ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {/* Live Data Cards */}
                                    {[
                                        {
                                            icon: Gauge,
                                            title: "توان ورودی PV",
                                            value: `${liveData.pvpowerin?.toFixed(0)} W`,
                                            color: "#10B981",
                                            condition: liveData.pvpowerin !== undefined
                                        },
                                        {
                                            icon: Bolt,
                                            title: "توان خروجی AC",
                                            value: `${liveData.acoutputpower} W`,
                                            color: "#F59E0B",
                                            condition: liveData.acoutputpower !== undefined
                                        },
                                        {
                                            icon: DatabaseZap,
                                            title: "ولتاژ AC",
                                            value: `${liveData.acvoltage} V`,
                                            color: "#8B5CF6",
                                            condition: liveData.acvoltage !== undefined
                                        },
                                        {
                                            icon: Thermometer,
                                            title: "دما",
                                            value: `${liveData.temperature?.toFixed(1)} °C`,
                                            color: "#F97316",
                                            condition: liveData.temperature !== undefined
                                        },
                                        {
                                            icon: Battery,
                                            title: "ولتاژ باتری",
                                            value: `${liveData.batvoltage} V`,
                                            color: "#3B82F6",
                                            condition: liveData.batvoltage !== undefined
                                        },
                                        {
                                            icon: TrendingUp,
                                            title: "صادرات شبکه",
                                            value: `${liveData.gridexport?.toFixed(0)} W`,
                                            color: "#10B981",
                                            condition: liveData.gridexport !== undefined
                                        },
                                        {
                                            icon: TrendingDown,
                                            title: "واردات شبکه",
                                            value: `${liveData.gridimport?.toFixed(0)} W`,
                                            color: "#EF4444",
                                            condition: liveData.gridimport !== undefined
                                        },
                                        {
                                            icon: Activity,
                                            title: "وضعیت PV",
                                            value: liveData.pvstatus === 1 ? "فعال" : "غیرفعال",
                                            color: liveData.pvstatus === 1 ? "#10B981" : "#EF4444",
                                            condition: liveData.pvstatus !== undefined
                                        }
                                    ].map((cardData, index) => (
                                        <LiveDataCard
                                            key={index}
                                            icon={cardData.icon}
                                            title={cardData.title}
                                            value={cardData.value}
                                            color={cardData.color}
                                            condition={cardData.condition}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-gray-500 py-8">
                                    در انتظار دریافت داده‌های زنده...
                                </div>
                            )}
                            
                            {/* Raw data display for debugging */}
                            {/* {liveData && (
                                <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
                                    <strong>داده‌های خام:</strong>
                                    <pre className="text-xs mt-2 overflow-auto">
                                        {JSON.stringify(liveData, null, 2)}
                                    </pre>
                                </div>
                            )} */}
                        </div>
                        
                        {/* Charts Section */}
                        <PanelCharts
                            liveData={liveData}
                            powerData={powerData}
                            voltageData={voltageData}
                            currentData={currentData}
                            temperatureData={temperatureData}
                            gridData={gridData}
                        />
                    </div>
                    
                    {/* Panel Event History Section */}
                    <div className={`flex flex-col gap-4 p-4 rounded-lg rtl ${styles.shadow} h-fit`}>
                        <PanelEventHistory panelId={id} />
                    </div>
                    
                    <div
                        className={`flex flex-col gap-4 p-4 rounded-lg rtl ${styles.shadow} h-fit`}
                    >
                        <div className="font-bold text-xl text-blue-800">
                            اطلاعات کلی
                        </div>
                        <div className="space-y-4 p-4">
                            <div className="grid grid-cols-2 gap-4">
                                {/* نام پنل */}
                                <div className="flex gap-2">
                                    <Eclipse className="text-orange-400" />
                                    <strong>نام پنل:</strong>
                                    <p>{panel?.name}</p>
                                </div>

                                {/* وضعیت */}
                                <div className="flex gap-2">
                                    <div
                                        className={`h-4 w-4 flex place-self-center rounded-full ${getStatusColor(
                                            panel?.status ?? ""
                                        )} shadow-md`}
                                    />
                                    <strong>وضعیت:</strong>
                                    <p>{panel?.status}</p>
                                </div>

                                {/* نوع ساختمان */}
                                <div className="flex gap-2">
                                    <Home className="text-orange-400" />
                                    <strong>نوع ساختمان:</strong>
                                    <p>{panel?.buildingType}</p>
                                </div>

                                {/* تعداد کل ماژول‌ها */}
                                <div className="flex gap-2">
                                    <Grid3x3 className="text-orange-400" />
                                    <strong>تعداد ماژول‌ها:</strong>
                                    <p>
                                        {
                                            wordExpression(
                                                panel?.totalNumberOfModules ??
                                                    "",
                                                false
                                            ).value
                                        }{" "}
                                        عدد
                                    </p>
                                </div>

                                {/* مساحت */}
                                <div className="flex gap-2">
                                    <LandPlot className="text-orange-400" />
                                    <strong>مساحت:</strong>
                                    <p>
                                        {
                                            wordExpression(
                                                panel?.area ?? "",
                                                false
                                            ).value
                                        }{" "}
                                        متر مربع
                                    </p>
                                </div>

                                {/* توان */}
                                <div className="flex gap-2">
                                    <DatabaseZap className="text-orange-400" />
                                    <strong>توان:</strong>
                                    <p>
                                        {
                                            wordExpression(
                                                panel?.power ?? "",
                                                true
                                            ).value
                                        }
                                        W
                                    </p>
                                </div>

                                {/* زاویه شیب */}
                                <div className="flex gap-2">
                                    <TriangleRight className="text-orange-400" />
                                    <strong>زاویه نصب:</strong>
                                    <p>{panel?.tilt} درجه</p>
                                </div>

                                {/* سمت (آزیموت) */}
                                <div className="flex gap-2">
                                    <Compass className="text-orange-400" />
                                    <strong>جهت:</strong>
                                    <p>{panel?.azimuth} درجه</p>
                                </div>

                                {/* وضعیت گارانتی */}
                                {/* <div className="flex gap-2">
                                <ShieldCheck className="text-teal-500" />
                                <strong>وضعیت گارانتی:</strong>
                                <p>{panel?.guaranteeStatus}</p>
                            </div> */}

                                {/* شرکت */}
                                {/* <div className="flex gap-2">
                                <Building2 className="text-gray-600" />
                                <strong>شرکت پیمانکار:</strong>
                                <p>{panel?.corporation?.name}</p>
                            </div> */}
                            </div>
                        </div>
                    </div>
                    <div
                        className={`flex flex-col gap-4 p-4 rounded-lg rtl ${styles.shadow} h-fit`}
                    >
                        <div className="font-bold text-xl text-blue-800">
                            محل نصب پنل
                        </div>
                        <div className="p-4 grid grid-cols-2 gap-4">
                            <div className="flex gap-2">
                                <MapPin className="text-orange-400" />
                                <strong>استان:</strong>
                                <p>{panel?.address.province}</p>
                            </div>
                            <div className="flex gap-2">
                                <Building2 className="text-orange-400 shrink-0" />
                                <strong>شهر:</strong>
                                <p>{panel?.address.city}</p>
                            </div>
                            <div className="flex gap-2">
                                <Route className="text-orange-400 shrink-0" />
                                <strong>خیابان:</strong>
                                <TruncatedText maxLength={70}>
                                    {panel?.address?.streetAddress ?? ""}
                                </TruncatedText>
                            </div>
                            <div className="flex gap-2">
                                <Mail className="text-orange-400" />
                                <strong>کد پستی:</strong>
                                <TruncatedText maxLength={70}>
                                    {panel?.address?.postalCode ?? ""}
                                </TruncatedText>
                            </div>
                            <div className="flex gap-2">
                                <Home className="text-orange-400" />
                                <strong>پلاک:</strong>
                                <p>{panel?.address.houseNumber}</p>
                            </div>
                            <div className="flex gap-2">
                                <DoorOpen className="text-orange-400" />
                                <strong>واحد:</strong>
                                <p>{panel?.address.unit}</p>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`flex flex-col gap-4 p-4 rounded-lg rtl ${styles.shadow} h-fit`}
                    >
                        <div className="font-bold text-xl text-blue-800">
                            شرکت پیمانکار
                        </div>
                        <div className="space-y-4 p-4">
                            <div className="grid grid-cols-2 gap-4">
                                {/* نام شرکت */}
                                <div className="flex gap-2">
                                    <Building2 className="text-orange-400" />
                                    <strong>نام شرکت:</strong>
                                    <p>{panel?.corporation?.name}</p>
                                </div>

                                {/* وضعیت */}
                                <div className="flex gap-2">
                                    <div
                                        className={`${
                                            panel?.corporation?.status ===
                                            "تایید شده"
                                                ? "green-status"
                                                : panel?.corporation?.status ===
                                                  "رد شده"
                                                ? "red-status"
                                                : panel?.corporation?.status ===
                                                  "معلق"
                                                ? "gray-status"
                                                : "yellow-status"
                                        } h-4 w-4 place-self-center rounded-full shadow-md`}
                                    />
                                    <strong>وضعیت:</strong>
                                    <p>{panel?.corporation?.status}</p>
                                </div>
                            </div>
                            <div className="font-bold text-xl text-blue-800">
                                راه‌های ارتباطی
                            </div>
                            <div className="relative neu-container p-4 flex flex-col gap-4">
                                <div className="space-y-4 p-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        {panel?.corporation?.contactInfo &&
                                        panel?.corporation?.contactInfo
                                            ?.length > 0 ? (
                                            panel?.corporation?.contactInfo?.map(
                                                (contact, index) => (
                                                    <div
                                                        className="flex gap-2"
                                                        key={index}
                                                    >
                                                        <Phone className="text-orange-400" />
                                                        <strong>
                                                            {
                                                                contact
                                                                    ?.contactType
                                                                    ?.name
                                                            }
                                                            :{" "}
                                                        </strong>
                                                        <p>{contact?.value}</p>
                                                    </div>
                                                )
                                            )
                                        ) : (
                                            <p>هیچ راه ارتباطی وجود ندارد.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="font-bold text-xl text-blue-800">
                                آدرس‌های شرکت
                            </div>
                            <div className="relative neu-container p-4 flex flex-col gap-4">
                                <div className="space-y-4 p-4">
                                    {panel?.corporation?.addresses &&
                                    panel?.corporation?.addresses?.length >
                                        0 ? (
                                        panel?.corporation?.addresses?.map(
                                            (address, index) => (
                                                <div
                                                    key={index}
                                                    className="border-gray-300 border-t-2 first:border-t-0"
                                                >
                                                    <div className="p-4 grid grid-cols-2 gap-4">
                                                        <div className="flex gap-2">
                                                            <MapPin className="text-orange-400" />
                                                            <strong>
                                                                استان:
                                                            </strong>
                                                            <p>
                                                                {
                                                                    address.province
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Building2 className="text-orange-400" />
                                                            <strong>
                                                                شهر:
                                                            </strong>
                                                            <p>
                                                                {address.city}
                                                            </p>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Route className="text-orange-400" />
                                                            <strong>
                                                                خیابان:
                                                            </strong>
                                                            <TruncatedText
                                                                maxLength={70}
                                                            >
                                                                {address.streetAddress ??
                                                                    ""}
                                                            </TruncatedText>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Mail className="text-orange-400" />
                                                            <strong>
                                                                کد پستی:
                                                            </strong>
                                                            <p>
                                                                {
                                                                    address.postalCode
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Home className="text-orange-400" />
                                                            <strong>
                                                                پلاک:
                                                            </strong>
                                                            <p>
                                                                {
                                                                    address.houseNumber
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <DoorOpen className="text-orange-400" />
                                                            <strong>
                                                                واحد:
                                                            </strong>
                                                            <p>
                                                                {address.unit}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    ) : (
                                        <p>هیچ آدرسی وجود ندارد.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`flex flex-col gap-4 p-4 rounded-lg rtl ${styles.shadow} h-fit`}
                    >
                        <div className="font-bold text-xl text-blue-800">
                            گارانتی
                        </div>
                        {panel?.guaranteeStatus === "فعال" ? (
                            <div className="space-y-4 p-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {/* نام گارانتی */}
                                    <div className="flex gap-2">
                                        <ShieldCheck className="text-orange-400" />
                                        <strong>نام گارانتی:</strong>
                                        <p>{panel?.guarantee?.name}</p>
                                    </div>
                                    {/* وضعیت گارانتی */}
                                    <div className="flex gap-2">
                                        <div
                                            className={`h-4 w-4 flex place-self-center rounded-full ${
                                                panel?.guarantee?.status ===
                                                "فعال"
                                                    ? "green-status"
                                                    : "red-status"
                                            } shadow-md`}
                                        />
                                        <strong>وضعیت گارانتی:</strong>
                                        <p>{panel?.guarantee?.status}</p>
                                    </div>
                                    {/* نوع گارانتی */}
                                    <div className="flex gap-2">
                                        <ScrollText className="text-orange-400" />
                                        <strong>نوع گارانتی:</strong>
                                        <p>{panel?.guarantee?.guaranteeType}</p>
                                    </div>
                                    {/* مدت گارانتی */}
                                    <div className="flex gap-2">
                                        <CalendarClock className="text-orange-400" />
                                        <strong>مدت گارانتی:</strong>
                                        <p>
                                            {panel?.guarantee?.durationMonths}{" "}
                                            ماه
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <FileText className="text-orange-400" />
                                        <strong>توضیحات:</strong>
                                        <p>{panel?.guarantee?.description}</p>
                                    </div>
                                </div>

                                <div className="font-bold text-xl text-blue-800">
                                    شرایط
                                </div>
                                <div className="relative neu-container flex flex-col gap-4">
                                    <div className="space-y-4 p-4 m-4">
                                        {panel?.guarantee?.terms &&
                                        panel?.guarantee?.terms?.length > 0 ? (
                                            panel?.guarantee?.terms?.map(
                                                (term, index) => (
                                                    <div
                                                        key={index}
                                                        className="border-gray-300 border-t-2 first:border-t-0"
                                                    >
                                                        <div className="p-4 flex flex-col gap-4">
                                                            <div className="flex gap-2">
                                                                <ReceiptText className="text-orange-400" />
                                                                <strong>
                                                                    عنوان:
                                                                </strong>
                                                                <TruncatedText
                                                                    maxLength={
                                                                        70
                                                                    }
                                                                >
                                                                    {term?.title ??
                                                                        ""}
                                                                </TruncatedText>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <ListCollapse className="text-orange-400" />
                                                                <strong>
                                                                    توضیحات:
                                                                </strong>
                                                                <TruncatedText
                                                                    maxLength={
                                                                        70
                                                                    }
                                                                >
                                                                    {term?.description ??
                                                                        ""}
                                                                </TruncatedText>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <CircleAlert className="text-orange-400" />
                                                                <strong>
                                                                    محدودیت‌ها:
                                                                </strong>
                                                                <TruncatedText
                                                                    maxLength={
                                                                        70
                                                                    }
                                                                >
                                                                    {term?.limitations ??
                                                                        ""}
                                                                </TruncatedText>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )
                                        ) : (
                                            <p>هیچ شرایطی وجود ندارد.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-4 py-8">
                                <div className="text-6xl text-gray-400 font-bold">
                                    !
                                </div>
                                <p className="text-gray-500">
                                    {panel?.guaranteeStatus}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
