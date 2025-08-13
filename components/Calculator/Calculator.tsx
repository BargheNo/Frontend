"use client";

import React from 'react';
import PanelIconWithBackground from '../Panel/PanelCard/PanelIconWithBackground';
import { Battery, CircleDollarSign, Eclipse, Grid3X3, HandCoins, LampCeiling, Leaf, PiggyBankIcon, Zap, AlertCircle } from 'lucide-react';
import wordExpression from '@/src/functions/Calculations';
import CustomInput from '../Custom/CustomInput/CustomInput';
import { Formik, Form } from 'formik';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';



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
    if (sunlightExposure === 'mostly_sunny') {
        annualSunlightHours = 1750;
    } else if (sunlightExposure === 'partly_sunny') {
        annualSunlightHours = 1500;
    } else if (sunlightExposure === 'less_sunny') {
        annualSunlightHours = 1250;
    } else {
        annualSunlightHours = undefined;
    }

    if (!monthlyConsumption || !monthlyCost || !ceilingArea || !annualSunlightHours) {
        return null;
    }

    const annualConsumption = monthlyConsumption * 12;
    const costPerKwh = monthlyCost / monthlyConsumption;
    const suggestedCapacity = annualConsumption / (annualSunlightHours);
    const numberOfPanels = (suggestedCapacity * 1000) / singlePanelWattage;
    const annualProduction = suggestedCapacity * annualSunlightHours;
    const annualSavings = annualProduction * costPerKwh;
    const initialInstallationCost = suggestedCapacity * costPerKwp;
    const paybackPeriod = annualSavings > 0 ? initialInstallationCost / annualSavings : null;
    const carbonReduction = annualProduction * carbonEmissionFactor;

    return {
        suggestedCapacity: suggestedCapacity.toFixed(2),
        numberOfPanels: Math.ceil(numberOfPanels),
        annualProduction: annualProduction.toFixed(2),
        annualSavings: Math.round(annualSavings),
        paybackPeriod: paybackPeriod ? paybackPeriod.toFixed(1) : '-',
        carbonReduction: Math.round(carbonReduction)
    };
}


interface CalculatorFormValues {
    monthlyElectricityConsumption: string;
    monthlyElectricityCost: string;
    ceilingArea: string;
    sunSituation: string;
}

const Calculator: React.FC = () => {
    return (
        <Formik<CalculatorFormValues>
            initialValues={{
                monthlyElectricityConsumption: '',
                monthlyElectricityCost: '',
                ceilingArea: '',
                sunSituation: ''
            }}
            onSubmit={() => {}}
        >
            {({ values, setFieldValue }) => {
                const monthlyConsumption = parseFloat(values.monthlyElectricityConsumption);
                const monthlyCost = parseFloat(values.monthlyElectricityCost);
                const ceilingArea = parseFloat(values.ceilingArea);
                const sunlightExposure = values.sunSituation;
                const results = calculateSolarMetrics(
                    monthlyConsumption,
                    monthlyCost,
                    ceilingArea,
                    sunlightExposure
                );
                const placeholder = '-';
                return (
                    <Form>
                        {/* ...existing code... */}
                        <div
                            className={`vazir w-full mx-auto min-h-full flex flex-col gap-8 text-white py-0 md:py-0 px-3 md:px-14 bg-transparent relative justify-center items-center`}
                        >
                            {/* ...existing code... */}
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default Calculator;