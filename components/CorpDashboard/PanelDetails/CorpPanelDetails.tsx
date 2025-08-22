"use client";
import Header from "@/components/Header/Header";
import { getData, serverIPAndPort } from "@/src/services/apiHub";
import React, { useCallback, useEffect, useState } from "react";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import {
    Eclipse,
    MapPin,
    Building2,
    Route,
    Mail,
    Home,
    Bolt,
    Compass,
    Grid3x3,
    ShieldCheck,
    LandPlot,
    Phone,
    Battery,
    Activity,
    TrendingUp,
    TrendingDown,
    Thermometer,
} from "lucide-react";

import wordExpression from "@/src/functions/Calculations";
import PanelIconWithBackground from "@/components/Panel/PanelCard/PanelIconWithBackground";
import PanelCharts from "@/components/Panel/PanelDetails/PanelCharts";
import CorpPanelEventHistory from "../PanelEventHistory";
import CorpPanelDataHistory from "../PanelDataHistory";
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

interface CorpPanel {
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
    operator: Operator;
    customer: Customer;
    address: Address;
    guarantee: Guarantee;
}

interface Operator {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    emailVerified: boolean;
    nationalID: string;
    profilePic: string;
    status: string;
}

interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    emailVerified: boolean;
    nationalID: string;
    profilePic: string;
    status: string;
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

interface RecordedDataItem {
    datalog_serial: string;
    pv_serial: string;
    pv_status: number;
    pv_power_in: number;
    pv1_voltage: number;
    pv1_current: number;
    pv2_voltage: number;
    pv2_current: number;
    pv_power_out: number;
    ac_freq: number;
    ac_voltage: number;
    ac_output_power: number;
    temperature: number;
    bat_voltage: number;
    bat_current: number;
    bat_power: number;
    grid_export: number;
    grid_import: number;
    energy_today: number;
    energy_total: number;
    timestamp: string;
}

export default function CorpPanelDetails({ id }: { id: string }) {
    const accessToken = useSelector(
        (state: RootState) => state.user.accessToken
    );
    const corpId = useSelector((state: RootState) => state.user.corpId);
    const [liveData, setLiveData] = useState<LiveData | null>(null);
    const [panel, setPanel] = useState<CorpPanel>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isLiveMode, setIsLiveMode] = useState<boolean>(true);
    const [hasReceivedLiveData, setHasReceivedLiveData] = useState<boolean>(false);
    const [recordedData, setRecordedData] = useState<RecordedDataItem[]>([]);
    
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
            return "green-status";
        if (status === "در انتظار نصب")
            return "yellow-status";
        if (status === "خراب")
            return "red-status";
        return "gray-status";
    };
    
    const fetchPanelDetails = useCallback(() => {
        if (!corpId) return;
        setLoading(true);
        getData({ endPoint: `/v1/corp/${corpId}/installation/panel/${id}` })
            .then((data) => {
                console.log(data?.data);
                setPanel(data?.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [id, corpId]);

    const fetchRecordedData = useCallback(() => {
        if (!corpId) return;
        console.log("Fetching recorded data...");
        getData({ endPoint: `/v1/corp/${corpId}/installation/panel/${id}/status` })
            .then((response) => {
                const data: RecordedDataItem[] = response?.data?.data || [];
                console.log("Recorded data fetched:", data);
                setRecordedData(data);
                
                // Process recorded data for charts
                if (data.length > 0) {
                    // Convert timestamps to milliseconds and process data
                    const processedPowerData = data.map((item: RecordedDataItem) => ({
                        x: new Date(item.timestamp).getTime(),
                        y: item.pv_power_in || 0
                    }));
                    
                    const processedVoltageData = {
                        pv1: data.map((item: RecordedDataItem) => ({
                            x: new Date(item.timestamp).getTime(),
                            y: item.pv1_voltage || 0
                        })),
                        pv2: data.map((item: RecordedDataItem) => ({
                            x: new Date(item.timestamp).getTime(),
                            y: item.pv2_voltage || 0
                        })),
                        ac: data.map((item: RecordedDataItem) => ({
                            x: new Date(item.timestamp).getTime(),
                            y: item.ac_voltage || 0
                        })),
                        battery: data.map((item: RecordedDataItem) => ({
                            x: new Date(item.timestamp).getTime(),
                            y: item.bat_voltage || 0
                        }))
                    };
                    
                    const processedCurrentData = {
                        pv1: data.map((item: RecordedDataItem) => ({
                            x: new Date(item.timestamp).getTime(),
                            y: item.pv1_current || 0
                        })),
                        pv2: data.map((item: RecordedDataItem) => ({
                            x: new Date(item.timestamp).getTime(),
                            y: item.pv2_current || 0
                        })),
                        battery: data.map((item: RecordedDataItem) => ({
                            x: new Date(item.timestamp).getTime(),
                            y: item.bat_current || 0
                        }))
                    };
                    
                    const processedTemperatureData = data.map((item: RecordedDataItem) => ({
                        x: new Date(item.timestamp).getTime(),
                        y: item.temperature || 0
                    }));
                    
                    const processedGridData = {
                        export: data.map((item: RecordedDataItem) => ({
                            x: new Date(item.timestamp).getTime(),
                            y: item.grid_export || 0
                        })),
                        import: data.map((item: RecordedDataItem) => ({
                            x: new Date(item.timestamp).getTime(),
                            y: item.grid_import || 0
                        }))
                    };
                    
                    setPowerData(processedPowerData);
                    setVoltageData(processedVoltageData);
                    setCurrentData(processedCurrentData);
                    setTemperatureData(processedTemperatureData);
                    setGridData(processedGridData);
                }
            })
            .catch((err) => {
                console.error("Error fetching recorded data:", err);
            });
    }, [id, corpId]);
    
    useEffect(() => {
        if (corpId) {
            fetchPanelDetails();
        }
    }, [fetchPanelDetails, corpId]);

    useEffect(() => {
        if (!accessToken || !corpId) return;

        const websocketUrl = `ws://${serverIPAndPort}/v1/corp/${corpId}/monitoring/panel/${id}/token/${accessToken}`;
        const ws = new WebSocket(websocketUrl);
        let hasReceivedFirstMessage = false;

        // Set a 40-second timeout to fall back to recorded data
        const fallbackTimeout = setTimeout(() => {
            if (!hasReceivedFirstMessage) {
                console.log("No live data received within 40 seconds, falling back to recorded data");
                setIsLiveMode(false);
                setHasReceivedLiveData(false);
                fetchRecordedData();
            }
        }, 40000);

        ws.onopen = () => {
            console.log("WebSocket connected");
        };

        ws.onmessage = (event) => {
            if (!hasReceivedFirstMessage) {
                hasReceivedFirstMessage = true;
                setHasReceivedLiveData(true);
                setIsLiveMode(true);
                clearTimeout(fallbackTimeout);
            }

            const rawData = JSON.parse(event.data);
            console.log("Raw websocket data", rawData);
            
            // Extract the actual data from the message structure
            const data = rawData.message_type === "status" && rawData.message ? rawData.message : rawData;
            setLiveData(data);
            console.log("Processed data", data);
            
            // Update chart data only in live mode
            const timestamp = Date.now();
            
            // Update power data
            if (data.pvpowerin !== undefined) {
                setPowerData(prevData => [...prevData, { x: timestamp, y: data.pvpowerin }].slice(-50));
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
                setTemperatureData(prevData => [...prevData, { x: timestamp, y: data.temperature }].slice(-50));
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
            // On error, also fall back to recorded data if no data received yet
            if (!hasReceivedFirstMessage) {
                console.log("WebSocket error, falling back to recorded data");
                setIsLiveMode(false);
                setHasReceivedLiveData(false);
                fetchRecordedData();
            }
        };

        ws.onclose = () => {
            console.log("WebSocket disconnected");
            clearTimeout(fallbackTimeout);
        };

        return () => {
            clearTimeout(fallbackTimeout);
            ws.close();
        };
    }, [accessToken, id, corpId, fetchRecordedData]);

    return (
        <>
            <Header header="جزئیات پنل" />
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="relative neu-container p-4 flex flex-col gap-4">
                    {/* Panel Status Badge */}
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-gray-800">{panel?.name}</h1>
                        <div className={`px-4 py-2 rounded-full text-white font-medium ${getStatusColor(panel?.status || "")}`}>
                            {panel?.status}
                        </div>
                    </div>
                    
                    {/* Panel Basic Information */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                        <div className="neu-card p-4">
                            <h3 className="text-lg font-semibold mb-3 text-gray-800">اطلاعات کلی</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Eclipse className="w-5 h-5 text-orange-500" />
                                    <span className="text-gray-600">نام پنل:</span>
                                    <span className="font-medium">{panel?.name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Building2 className="w-5 h-5 text-blue-500" />
                                    <span className="text-gray-600">نوع ساختمان:</span>
                                    <span className="font-medium">{panel?.buildingType}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <LandPlot className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-600">مساحت:</span>
                                    <span className="font-medium">{panel?.area} متر مربع</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Bolt className="w-5 h-5 text-yellow-500" />
                                    <span className="text-gray-600">توان:</span>
                                    <span className="font-medium">{wordExpression(panel?.power || 0, true).value} وات</span>
                                </div>
                            </div>
                        </div>

                        <div className="neu-card p-4">
                            <h3 className="text-lg font-semibold mb-3 text-gray-800">مشخصات فنی</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Compass className="w-5 h-5 text-purple-500" />
                                    <span className="text-gray-600">زاویه شیب:</span>
                                    <span className="font-medium">{panel?.tilt}°</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Route className="w-5 h-5 text-indigo-500" />
                                    <span className="text-gray-600">آزیموت:</span>
                                    <span className="font-medium">{panel?.azimuth}°</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Grid3x3 className="w-5 h-5 text-teal-500" />
                                    <span className="text-gray-600">تعداد ماژول:</span>
                                    <span className="font-medium">{panel?.totalNumberOfModules}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                    <span className="text-gray-600">وضعیت گارانتی:</span>
                                    <span className="font-medium">{panel?.guaranteeStatus}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer and Operator Information */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                        <div className="neu-card p-4">
                            <h3 className="text-lg font-semibold mb-3 text-gray-800">اطلاعات مشتری</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Home className="w-5 h-5 text-blue-500" />
                                    <span className="text-gray-600">نام:</span>
                                    <span className="font-medium">{panel?.customer?.firstName} {panel?.customer?.lastName}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-600">تلفن:</span>
                                    <span className="font-medium">{panel?.customer?.phone}</span>
                                </div>
                                {panel?.customer?.email && (
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-red-500" />
                                        <span className="text-gray-600">ایمیل:</span>
                                        <span className="font-medium">{panel?.customer?.email}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="neu-card p-4">
                            <h3 className="text-lg font-semibold mb-3 text-gray-800">اطلاعات اپراتور</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Home className="w-5 h-5 text-blue-500" />
                                    <span className="text-gray-600">نام:</span>
                                    <span className="font-medium">{panel?.operator?.firstName} {panel?.operator?.lastName}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-600">تلفن:</span>
                                    <span className="font-medium">{panel?.operator?.phone}</span>
                                </div>
                                {panel?.operator?.email && (
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-red-500" />
                                        <span className="text-gray-600">ایمیل:</span>
                                        <span className="font-medium">{panel?.operator?.email}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Address Information */}
                    <div className="neu-card p-4 mb-6">
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">آدرس نصب</h3>
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-red-500 mt-1" />
                            <span className="text-gray-700">
                                استان {panel?.address?.province}، شهر {panel?.address?.city}، {panel?.address?.streetAddress}، پلاک {panel?.address?.houseNumber}، واحد {panel?.address?.unit}
                                {panel?.address?.postalCode && ` - کدپستی: ${panel?.address?.postalCode}`}
                            </span>
                        </div>
                    </div>

                    {/* Live Data Display */}
                    {(hasReceivedLiveData || !isLiveMode) && (
                        <div className="neu-card p-4 mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {isLiveMode ? "داده‌های زنده" : "آخرین داده‌های ثبت شده"}
                                </h3>
                                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                                    isLiveMode ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                    <div className={`w-2 h-2 rounded-full ${
                                        isLiveMode ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
                                    }`}></div>
                                    {isLiveMode ? "زنده" : "آرشیو"}
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                <LiveDataCard
                                    icon={Bolt}
                                    title="ورودی PV (W)"
                                    value={liveData?.pvpowerin?.toFixed(1) || '--'}
                                    color="#EF4444"
                                />
                                <LiveDataCard
                                    icon={Activity}
                                    title="خروجی PV (W)"
                                    value={liveData?.pvpowerout?.toFixed(1) || '--'}
                                    color="#F59E0B"
                                />
                                <LiveDataCard
                                    icon={TrendingUp}
                                    title="ولتاژ PV1 (V)"
                                    value={liveData?.pv1voltage?.toFixed(1) || '--'}
                                    color="#10B981"
                                />
                                <LiveDataCard
                                    icon={TrendingUp}
                                    title="ولتاژ PV2 (V)"
                                    value={liveData?.pv2voltage?.toFixed(1) || '--'}
                                    color="#3B82F6"
                                />
                                <LiveDataCard
                                    icon={Activity}
                                    title="ولتاژ AC (V)"
                                    value={liveData?.acvoltage?.toFixed(1) || '--'}
                                    color="#8B5CF6"
                                />
                                <LiveDataCard
                                    icon={Thermometer}
                                    title="دما (°C)"
                                    value={liveData?.temperature?.toFixed(1) || '--'}
                                    color="#F97316"
                                />
                                <LiveDataCard
                                    icon={Battery}
                                    title="ولتاژ باتری (V)"
                                    value={liveData?.batvoltage?.toFixed(1) || '--'}
                                    color="#06B6D4"
                                    condition={liveData?.batvoltage !== undefined}
                                />
                                <LiveDataCard
                                    icon={Activity}
                                    title="جریان باتری (A)"
                                    value={liveData?.batcurrent?.toFixed(2) || '--'}
                                    color="#EC4899"
                                    condition={liveData?.batcurrent !== undefined}
                                />
                                <LiveDataCard
                                    icon={TrendingDown}
                                    title="صادرات شبکه (W)"
                                    value={liveData?.gridexport?.toFixed(1) || '--'}
                                    color="#84CC16"
                                />
                                <LiveDataCard
                                    icon={TrendingUp}
                                    title="واردات شبکه (W)"
                                    value={liveData?.gridimport?.toFixed(1) || '--'}
                                    color="#EF4444"
                                />
                            </div>
                        </div>
                    )}

                    {/* Charts Section */}
                    <PanelCharts
                        liveData={liveData}
                        powerData={powerData}
                        voltageData={voltageData}
                        currentData={currentData}
                        temperatureData={temperatureData}
                        gridData={gridData}
                        isLiveMode={isLiveMode}
                        recordedData={recordedData}
                    />

                    {/* Event History */}
                    <CorpPanelEventHistory 
                        panelId={id} 
                    />

                    {/* Data History */}
                    <CorpPanelDataHistory 
                        panelId={id}
                    />
                </div>
            )}
        </>
    );
}
