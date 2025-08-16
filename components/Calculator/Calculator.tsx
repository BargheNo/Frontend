"use client";

import React from "react";
import PanelIconWithBackground from "../Panel/PanelCard/PanelIconWithBackground";
import {
    Battery,
    CircleDollarSign,
    Eclipse,
    Grid3X3,
    HandCoins,
    LampCeiling,
    Leaf,
    PiggyBankIcon,
    Zap,
    AlertCircle,
} from "lucide-react";
import wordExpression from "@/src/functions/Calculations";
import CustomInput from "../Custom/CustomInput/CustomInput";
import { Formik, Form } from "formik";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "@/components/ui/tooltip";

// Calculation function as described
function calculateSolarMetrics(
    monthlyConsumption: number,
    monthlyCost: number,
    ceilingArea: number,
    sunlightExposure: string
): {
    suggestedCapacity: string;
    numberOfPanels: number;
    annualProduction: string;
    annualSavings: number;
    paybackPeriod: string | null;
    carbonReduction: number;
} | null {
    const carbonEmissionFactor = 0.6;
    const singlePanelWattage = 450;
    const costPerKwp = 15000000;

    let annualSunlightHours;
    if (sunlightExposure === "mostly_sunny") {
        annualSunlightHours = 1750;
    } else if (sunlightExposure === "partly_sunny") {
        annualSunlightHours = 1500;
    } else if (sunlightExposure === "less_sunny") {
        annualSunlightHours = 1250;
    } else {
        annualSunlightHours = undefined;
    }

    if (
        !monthlyConsumption ||
        !monthlyCost ||
        !ceilingArea ||
        !annualSunlightHours
    ) {
        return null;
    }

    const annualConsumption = monthlyConsumption * 12;
    const costPerKwh = monthlyCost / monthlyConsumption;
    const suggestedCapacity = annualConsumption / annualSunlightHours;
    const numberOfPanels = (suggestedCapacity * 1000) / singlePanelWattage;
    const annualProduction = suggestedCapacity * annualSunlightHours;
    const annualSavings = annualProduction * costPerKwh;
    const initialInstallationCost = suggestedCapacity * costPerKwp;
    const paybackPeriod =
        annualSavings > 0 ? initialInstallationCost / annualSavings : null;
    const carbonReduction = annualProduction * carbonEmissionFactor;

    return {
        suggestedCapacity: suggestedCapacity.toFixed(2),
        numberOfPanels: Math.ceil(numberOfPanels),
        annualProduction: annualProduction.toFixed(2),
        annualSavings: Math.round(annualSavings),
        paybackPeriod: paybackPeriod ? paybackPeriod.toFixed(1) : "-",
        carbonReduction: Math.round(carbonReduction),
    };
}

const Calculator = () => {
    return (
        <div
            className={`vazir w-full mx-auto min-h-full flex flex-col gap-8 text-white relative justify-center items-center`}
        >
            <Formik
                initialValues={{
                    monthlyElectricityConsumption: "",
                    monthlyElectricityCost: "",
                    ceilingArea: "",
                    sunSituation: "",
                }}
                onSubmit={() => {}}
            >
                {({ values, setFieldValue }) => {
                    const monthlyConsumption = parseFloat(
                        values.monthlyElectricityConsumption
                    );
                    const monthlyCost = parseFloat(
                        values.monthlyElectricityCost
                    );
                    const ceilingArea = parseFloat(values.ceilingArea);
                    const sunlightExposure = values.sunSituation;
                    const results = calculateSolarMetrics(
                        monthlyConsumption,
                        monthlyCost,
                        ceilingArea,
                        sunlightExposure
                    );
                    const placeholder = "-";
                    return (
                        <Form className="w-full">
                            {/* <div
                                className={`vazir w-full mx-auto min-h-full flex flex-col gap-8 text-white py-0 md:py-0 px-3 md:px-14 bg-transparent relative justify-center items-center`}
                            > */}
                            <div className="p-6 flex flex-col md:flex-row justify-between gap-8 sm:gap-8 w-full neu-container">
                                <div className="flex flex-col w-full md:w-1/3">
                                    <CustomInput
                                        dir="rtl"
                                        placeholder="میزان مصرف برق ماهانه (وات ساعت)"
                                        icon={LampCeiling}
                                        name="monthlyElectricityConsumption"
                                        type="number"
                                    />
                                    <CustomInput
                                        dir="rtl"
                                        placeholder="هزینۀ برق ماهانه (تومان)"
                                        icon={CircleDollarSign}
                                        name="monthlyElectricityCost"
                                        type="number"
                                    />
                                    <CustomInput
                                        dir="rtl"
                                        placeholder="مساحت مفید سقف (متر مربع)"
                                        icon={Grid3X3}
                                        name="ceilingArea"
                                        type="number"
                                    />
                                    <div className="flex items-center gap-2 mt-4">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <span className="flex items-center justify-center w-6 h-6 rounded-full text-white cursor-pointer">
                                                    <AlertCircle
                                                        size={20}
                                                        className="text-gray-700"
                                                    />
                                                </span>
                                            </TooltipTrigger>
                                            <TooltipContent
                                                side="top"
                                                className="text-xs max-w-xs text-right leading-6"
                                            >
                                                <div dir="rtl">
                                                    <b>
                                                        راهنمای انتخاب وضعیت
                                                        تابش خورشید:
                                                    </b>
                                                    <br />
                                                    <b>کاملاً آفتابی:</b> حدود
                                                    ۱۷۵۰ ساعت آفتاب سالانه
                                                    (مناطق جنوبی و مرکزی ایران)
                                                    <br />
                                                    <b>نیمه آفتابی:</b> حدود
                                                    ۱۵۰۰ ساعت آفتاب سالانه
                                                    (مناطق معتدل)
                                                    <br />
                                                    <b>کم آفتاب:</b> حدود ۱۲۵۰
                                                    ساعت آفتاب سالانه (مناطق
                                                    شمالی یا ابری)
                                                    <br />
                                                    <b>
                                                        ساعت آفتاب سالانه
                                                    </b>{" "}
                                                    یعنی مجموع ساعاتی که در طول
                                                    سال نور خورشید به پنل‌ها
                                                    می‌تابد و بر تولید برق
                                                    تأثیرگذار است.
                                                </div>
                                            </TooltipContent>
                                        </Tooltip>
                                        <Select
                                            name="sunSituation"
                                            value={values.sunSituation}
                                            onValueChange={(val) =>
                                                setFieldValue(
                                                    "sunSituation",
                                                    val
                                                )
                                            }
                                        >
                                            <SelectTrigger
                                                dir="rtl"
                                                className="min-h-[43px] w-full cursor-pointer bg-[#f1f4fc]"
                                            >
                                                <SelectValue placeholder="وضعیت تابش خورشید" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        وضعیت تابش خورشید
                                                    </SelectLabel>
                                                    <SelectItem value="mostly_sunny">
                                                        کاملاً آفتابی
                                                    </SelectItem>
                                                    <SelectItem value="partly_sunny">
                                                        نیمه آفتابی
                                                    </SelectItem>
                                                    <SelectItem value="less_sunny">
                                                        کم آفتاب
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6 w-full md:w-2/3">
                                    {/* Suggested Capacity */}
                                    <div className="w-full overflow-hidden rounded-xl items-center shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)]">
                                        <div className="flex items-center">
                                            <PanelIconWithBackground
                                                icon={Zap}
                                                className="w-full justify-between"
                                                text={"ظرفیت پیشنهادی"}
                                                color="#F77F00"
                                            />
                                        </div>
                                        <div className="flex flex-col m-2 sm:m-3 items-center justify-center">
                                            <div className="flex flex-row-reverse gap-2 items-center">
                                                <span className="text-xl sm:text-3xl font-bold">
                                                    {results
                                                        ? wordExpression(
                                                              results.suggestedCapacity,
                                                              true
                                                          ).value
                                                        : placeholder}
                                                </span>
                                                <span className="text-xl sm:text-3xl font-bold">
                                                    W
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Number of Panels */}
                                    <div className="w-full overflow-hidden rounded-xl items-center shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)]">
                                        <div className="flex items-center">
                                            <PanelIconWithBackground
                                                icon={Eclipse}
                                                className="w-full justify-between"
                                                text={"تعداد پنل"}
                                                color="#8095E4"
                                            />
                                        </div>
                                        <div className="flex flex-col m-2 sm:m-3 items-center justify-center">
                                            <div
                                                dir="rtl"
                                                className="flex flex-row-reverse gap-2 items-center"
                                            >
                                                {/* <span className="text-xl sm:text-3xl font-bold"></span> */}
                                                <span className="text-xl sm:text-3xl font-bold">
                                                    {results
                                                        ? wordExpression(
                                                              results.numberOfPanels,
                                                              false,
                                                              "simple"
                                                          ).value
                                                        : placeholder}{" "}
                                                    عدد
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Annual Production */}
                                    <div className="w-full overflow-hidden rounded-xl items-center shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)]">
                                        <div className="flex items-center">
                                            <PanelIconWithBackground
                                                icon={Battery}
                                                className="w-full justify-between"
                                                text={"تولید برق سالانه"}
                                                color="#5F9B8C"
                                            />
                                        </div>
                                        <div className="flex flex-col m-2 sm:m-3 items-center justify-center">
                                            <div className="flex flex-row-reverse gap-2 items-center">
                                                <span className="text-xl sm:text-3xl font-bold">
                                                    {results
                                                        ? wordExpression(
                                                              results.annualProduction,
                                                              true
                                                          ).value
                                                        : placeholder}
                                                </span>
                                                <span className="text-xl sm:text-3xl font-bold">
                                                    Wh
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Annual Savings */}
                                    <div className="w-full overflow-hidden rounded-xl items-center shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)]">
                                        <div className="flex items-center">
                                            <PanelIconWithBackground
                                                icon={PiggyBankIcon}
                                                className="w-full justify-between"
                                                text={"صرفه‌جویی سالانه"}
                                                color="#F06293"
                                            />
                                        </div>
                                        <div className="flex flex-col m-2 sm:m-3 items-center justify-center">
                                            <div className="flex flex-row gap-2 items-center">
                                                <span className="text-xl sm:text-3xl font-bold">
                                                    {results
                                                        ? wordExpression(
                                                              results.annualSavings,
                                                              false
                                                          ).value
                                                        : placeholder}{" "}
                                                    تومان
                                                </span>
                                                {/* <span className="text-xl sm:text-3xl font-bold"></span> */}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Payback Period */}
                                    <div className="w-full overflow-hidden rounded-xl items-center shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)]">
                                        <div className="flex items-center">
                                            <PanelIconWithBackground
                                                icon={HandCoins}
                                                className="w-full justify-between"
                                                text={"بازگشت سرمایه"}
                                                color="#D62828"
                                            />
                                        </div>
                                        <div className="flex flex-col m-2 sm:m-3 items-center justify-center">
                                            <div className="flex flex-row gap-2 items-center">
                                                <span className="text-xl sm:text-3xl font-bold">
                                                    {results
                                                        ? wordExpression(
                                                              results.paybackPeriod ??
                                                                  "0",
                                                              false
                                                          ).value || "0"
                                                        : placeholder}{" "}
                                                    سال
                                                </span>
                                                {/* <span className="text-xl sm:text-3xl font-bold"></span> */}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Carbon Reduction */}
                                    <div className="w-full overflow-hidden rounded-xl items-center shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)]">
                                        <div className="flex items-center">
                                            <PanelIconWithBackground
                                                icon={Leaf}
                                                className="w-full justify-between"
                                                text={"اثر زیست‌محیطی"}
                                                color="#50C878"
                                            />
                                        </div>
                                        <div className="flex flex-col m-2 sm:m-3 items-center justify-center">
                                            <div className="flex flex-row-reverse gap-2 items-center">
                                                <span className="text-xl sm:text-3xl font-bold">
                                                    {results
                                                        ? wordExpression(
                                                              results.carbonReduction,
                                                              true
                                                          ).value
                                                        : placeholder}
                                                </span>
                                                <span className="text-xl sm:text-3xl font-bold">
                                                    G CO₂
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* </div> */}
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default Calculator;
