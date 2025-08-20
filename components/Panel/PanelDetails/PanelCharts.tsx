"use client";

import React from "react";
import dynamic from "next/dynamic";
import {
    BarChart3,
    LineChart,
    Thermometer,
    Zap,
    Activity,
    Battery,
} from "lucide-react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

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

interface PanelChartsProps {
    liveData: LiveData | null;
    powerData: { x: number; y: number }[];
    voltageData: {
        pv1: { x: number; y: number }[];
        pv2: { x: number; y: number }[];
        ac: { x: number; y: number }[];
        battery: { x: number; y: number }[];
    };
    currentData: {
        pv1: { x: number; y: number }[];
        pv2: { x: number; y: number }[];
        battery: { x: number; y: number }[];
    };
    temperatureData: { x: number; y: number }[];
    gridData: {
        export: { x: number; y: number }[];
        import: { x: number; y: number }[];
    };
    isLiveMode?: boolean;
    recordedData?: unknown[];
}

export default function PanelCharts({
    liveData,
    powerData,
    voltageData,
    currentData,
    temperatureData,
    gridData,
    isLiveMode = true,
    recordedData = [],
}: PanelChartsProps) {
    return (
        <div className="mt-6 space-y-6">
            {/* Power Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Power Generation Chart */}
                <div className="inset-neu-container !w-full !p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <BarChart3 className="text-green-500" />
                        <h4 className="text-lg font-semibold">
                            {isLiveMode ? "تولید توان - زنده" : "تولید توان - ضبط شده"}
                        </h4>
                    </div>
                    {powerData.length > 0 ? (
                        <ReactApexChart
                            options={{
                                chart: {
                                    type: 'line',
                                    animations: { enabled: true, dynamicAnimation: { speed: 1000 } },
                                    toolbar: { show: false },
                                    zoom: { enabled: false }
                                },
                                stroke: { curve: 'smooth', width: 3 },
                                colors: ['#10B981'],
                                xaxis: {
                                    type: 'datetime',
                                    labels: { 
                                        format: 'HH:mm:ss',
                                        style: { fontSize: '12px' }
                                    }
                                },
                                yaxis: {
                                    title: { text: 'توان (W)', style: { fontSize: '14px' } },
                                    labels: { 
                                        style: { fontSize: '12px' },
                                        formatter: (val: number) => val.toFixed(0)
                                    }
                                },
                                grid: { strokeDashArray: 4, borderColor: '#f1f5f9' },
                                tooltip: {
                                    x: { format: 'HH:mm:ss' },
                                    y: { formatter: (val: number) => `${val.toFixed(2)} W` }
                                }
                            }}
                            series={[{ name: 'توان PV', data: powerData }]}
                            type="line"
                            height={200}
                        />
                    ) : (
                        <div className="text-center text-gray-500 py-8">
                            {isLiveMode ? "در انتظار داده‌های زنده..." : "در انتظار داده‌های ضبط شده..."}
                        </div>
                    )}
                </div>

                {/* Temperature Chart */}
                <div className="inset-neu-container !w-full !p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <Thermometer className="text-orange-500" />
                        <h4 className="text-lg font-semibold">
                            {isLiveMode ? "دما - زنده" : "دما - ضبط شده"}
                        </h4>
                    </div>
                    {temperatureData.length > 0 ? (
                        <ReactApexChart
                            options={{
                                chart: {
                                    type: 'line',
                                    animations: { enabled: true, dynamicAnimation: { speed: 1000 } },
                                    toolbar: { show: false },
                                    zoom: { enabled: false }
                                },
                                stroke: { curve: 'smooth', width: 3 },
                                colors: ['#F59E0B'],
                                xaxis: {
                                    type: 'datetime',
                                    labels: { 
                                        format: 'HH:mm:ss',
                                        style: { fontSize: '12px' }
                                    }
                                },
                                yaxis: {
                                    title: { text: 'دما (°C)', style: { fontSize: '14px' } },
                                    labels: { 
                                        style: { fontSize: '12px' },
                                        formatter: (val: number) => val.toFixed(1)
                                    }
                                },
                                grid: { strokeDashArray: 4, borderColor: '#f1f5f9' },
                                tooltip: {
                                    x: { format: 'HH:mm:ss' },
                                    y: { formatter: (val: number) => `${val.toFixed(1)} °C` }
                                }
                            }}
                            series={[{ name: 'دما', data: temperatureData }]}
                            type="line"
                            height={200}
                        />
                    ) : (
                        <div className="text-center text-gray-500 py-8">در انتظار داده...</div>
                    )}
                </div>
            </div>

            {/* Voltage Charts */}
            <div className="inset-neu-container !w-full !p-5">
                <div className="flex items-center gap-2 mb-4">
                    <Zap className="text-purple-500" />
                    <h4 className="text-lg font-semibold">
                        {isLiveMode ? "ولتاژ - زنده" : "ولتاژ - ضبط شده"}
                    </h4>
                </div>
                {(voltageData.pv1.length > 0 || voltageData.pv2.length > 0 || voltageData.ac.length > 0 || voltageData.battery.length > 0) ? (
                    <ReactApexChart
                        options={{
                            chart: {
                                type: 'line',
                                animations: { enabled: true, dynamicAnimation: { speed: 1000 } },
                                toolbar: { show: false },
                                zoom: { enabled: false }
                            },
                            stroke: { curve: 'smooth', width: 2 },
                            colors: ['#8B5CF6', '#06B6D4', '#EF4444', '#10B981'],
                            xaxis: {
                                type: 'datetime',
                                labels: { 
                                    format: 'HH:mm:ss',
                                    style: { fontSize: '12px' }
                                }
                            },
                            yaxis: {
                                title: { text: 'ولتاژ (V)', style: { fontSize: '14px' } },
                                labels: { 
                                    style: { fontSize: '12px' },
                                    formatter: (val: number) => val.toFixed(1)
                                }
                            },
                            grid: { strokeDashArray: 4, borderColor: '#f1f5f9' },
                            legend: { position: 'top', horizontalAlign: 'center' },
                            tooltip: {
                                x: { format: 'HH:mm:ss' },
                                y: { formatter: (val: number) => `${val.toFixed(1)} V` }
                            }
                        }}
                        series={[
                            { name: 'PV1', data: voltageData.pv1 },
                            { name: 'PV2', data: voltageData.pv2 },
                            { name: 'AC', data: voltageData.ac },
                            { name: 'باتری', data: voltageData.battery },
                        ].filter(series => series.data.length > 0)}
                        type="line"
                        height={250}
                    />
                ) : (
                    <div className="text-center text-gray-500 py-8">در انتظار داده...</div>
                )}
            </div>

            {/* Current Charts */}
            <div className="inset-neu-container !w-full !p-5">
                <div className="flex items-center gap-2 mb-4">
                    <Activity className="text-blue-500" />
                    <h4 className="text-lg font-semibold">
                        {isLiveMode ? "جریان - زنده" : "جریان - ضبط شده"}
                    </h4>
                </div>
                {(currentData.pv1.length > 0 || currentData.pv2.length > 0 || currentData.battery.length > 0) ? (
                    <ReactApexChart
                        options={{
                            chart: {
                                type: 'line',
                                animations: { enabled: true, dynamicAnimation: { speed: 1000 } },
                                toolbar: { show: false },
                                zoom: { enabled: false }
                            },
                            stroke: { curve: 'smooth', width: 2 },
                            colors: ['#3B82F6', '#06B6D4', '#EF4444'],
                            xaxis: {
                                type: 'datetime',
                                labels: { 
                                    format: 'HH:mm:ss',
                                    style: { fontSize: '12px' }
                                }
                            },
                            yaxis: {
                                title: { text: 'جریان (A)', style: { fontSize: '14px' } },
                                labels: { 
                                    style: { fontSize: '12px' },
                                    formatter: (val: number) => val.toFixed(2)
                                }
                            },
                            grid: { strokeDashArray: 4, borderColor: '#f1f5f9' },
                            legend: { position: 'top', horizontalAlign: 'center' },
                            tooltip: {
                                x: { format: 'HH:mm:ss' },
                                y: { formatter: (val: number) => `${val.toFixed(2)} A` }
                            }
                        }}
                        series={[
                            { name: 'PV1', data: currentData.pv1 },
                            { name: 'PV2', data: currentData.pv2 },
                            { name: 'باتری', data: currentData.battery },
                        ].filter(series => series.data.length > 0)}
                        type="line"
                        height={250}
                    />
                ) : (
                    <div className="text-center text-gray-500 py-8">در انتظار داده...</div>
                )}
            </div>

            {/* Grid Import/Export Chart */}
            <div className="inset-neu-container !w-full !p-5">
                <div className="flex items-center gap-2 mb-4">
                    <LineChart className="text-indigo-500" />
                    <h4 className="text-lg font-semibold">
                        {isLiveMode ? "تبادل انرژی با شبکه - زنده" : "تبادل انرژی با شبکه - ضبط شده"}
                    </h4>
                </div>
                {(gridData.export.length > 0 || gridData.import.length > 0) ? (
                    <ReactApexChart
                        options={{
                            chart: {
                                type: 'line',
                                animations: { enabled: true, dynamicAnimation: { speed: 1000 } },
                                toolbar: { show: false },
                                zoom: { enabled: false }
                            },
                            stroke: { curve: 'smooth', width: 3 },
                            colors: ['#10B981', '#EF4444'],
                            xaxis: {
                                type: 'datetime',
                                labels: { 
                                    format: 'HH:mm:ss',
                                    style: { fontSize: '12px' }
                                }
                            },
                            yaxis: {
                                title: { text: 'توان (W)', style: { fontSize: '14px' } },
                                labels: { 
                                    style: { fontSize: '12px' },
                                    formatter: (val: number) => val.toFixed(0)
                                }
                            },
                            grid: { strokeDashArray: 4, borderColor: '#f1f5f9' },
                            legend: { position: 'top', horizontalAlign: 'center' },
                            tooltip: {
                                x: { format: 'HH:mm:ss' },
                                y: { formatter: (val: number) => `${val.toFixed(2)} W` }
                            }
                        }}
                        series={[
                            { name: 'صادرات', data: gridData.export },
                            { name: 'واردات', data: gridData.import },
                        ].filter(series => series.data.length > 0)}
                        type="line"
                        height={250}
                    />
                ) : (
                    <div className="text-center text-gray-500 py-8">در انتظار داده...</div>
                )}
            </div>

            {/* Battery Status Chart */}
            <div className="inset-neu-container !w-full !p-5">
                <div className="flex items-center gap-2 mb-4">
                    <Battery className="text-green-500" />
                    <h4 className="text-lg font-semibold">
                        {isLiveMode ? "وضعیت باتری - زنده" : "وضعیت باتری - ضبط شده"}
                    </h4>
                </div>
                {liveData && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {/* Battery Voltage */}
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-l from-green-600 to-green-300 p-4 h-24">
                            {/* Large background unit text */}
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-8xl font-black text-white opacity-20 select-none pointer-events-none">
                                <Zap className="h-24 w-24 text-white" />
                            </div>
                            
                            {/* Content container */}
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                {/* Icon and title */}
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-white font-medium">ولتاژ باتری (V)</span>
                                </div>
                                
                                {/* Value */}
                                <div className="text-2xl font-bold text-white">
                                    <span dir="ltr">{liveData.batvoltage?.toFixed(1) || '--'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Battery Current */}
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-l from-blue-600 to-blue-300 p-4 h-24">
                            {/* Large background unit text */}
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-8xl font-black text-white opacity-20 select-none pointer-events-none">
                                <Activity className="h-24 w-24 text-white" />
                            </div>
                            
                            {/* Content container */}
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                {/* Icon and title */}
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-white font-medium">جریان باتری (A)</span>
                                </div>
                                
                                {/* Value */}
                                <div className="text-2xl font-bold text-white">
                                    <span dir="ltr">{liveData.batcurrent?.toFixed(2) || '--'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Battery Power */}
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-l from-purple-600 to-purple-300 p-4 h-24">
                            {/* Large background unit text */}
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-8xl font-black text-white opacity-20 select-none pointer-events-none">
                                <Battery className="h-24 w-24 text-white" />
                            </div>
                            
                            {/* Content container */}
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                {/* Icon and title */}
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-white font-medium">توان باتری (W)</span>
                                </div>
                                
                                {/* Value */}
                                <div className="text-2xl font-bold text-white">
                                    <span dir="ltr">{liveData.batpower?.toFixed(1) || '--'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
