"use client";

import React, { JSX } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const XAXISRANGE: number = 60000;
const lastDate: Date = new Date();

const getNewSeries = (lastDate: Date, range: { min: number; max: number }) => {
	const newDate = new Date(lastDate.getTime() + 1000); // Increment by 1 second
	const newDataPoint =
		Math.floor(Math.random() * (range.max - range.min + 1)) + range.min; // Generate random data
	return { x: newDate.getTime(), y: newDataPoint }; // Return new data point
};

export default function LiveChart(): JSX.Element {
	const [state, setState] = React.useState<{
		series: { data: { x: number; y: number }[] }[];
		options: ApexOptions;
	}>({
		series: [
			{
				data: [],
			},
		],
		options: {
			chart: {
				id: "realtime",
				height: 350,
				type: "line",
				animations: {
					enabled: true,
					dynamicAnimation: {
						speed: 1000,
					},
				},
				toolbar: {
					show: false,
				},
				zoom: {
					enabled: false,
				},
				background: "#f9f9f9", // Light background for the chart
			},
			stroke: {
				curve: "smooth",
				width: 3,
				colors: ["#FA682D"],
			},
			title: {
				text: "میزان برق تولیدی",
				offsetX: -5,
				offsetY: 10,
				align: "right",
				style: {
					fontSize: "24px",
					color: "#333",
					fontFamily: "vazir",
					fontWeight: "bold",
				},
			},
			xaxis: {
				type: "datetime",
				range: XAXISRANGE,
				title: {
					text: "زمان",
					offsetY: 5,
					style: {
						color: "#333",
						fontFamily: "vazir",
						fontSize: "16px",
					},
				},
				labels: {
					style: {
						fontSize: "12px", // Smaller x-axis labels
						colors: ["#666"], // Lighter color for labels
					},
				},
			},
			yaxis: {
				max: 100,
				title: {
					text: "مگاوات",
					style: {
						color: "#333",
						fontFamily: "vazir",
						fontSize: "16px",
					},
				},
				labels: {
					style: {
						fontSize: "12px", // Smaller y-axis labels
						colors: ["#666"], // Lighter color for labels
					},
				},
			},
			legend: {
				show: false,
			},
			tooltip: {
				enabled: true,
				style: {
					fontSize: "14px",
				},
				x: {
					format: "dd MMM HH:mm",
				},
			},
			grid: {
				borderColor: "#e0e0e0",
				strokeDashArray: 5,
			},
		},
	});

	React.useEffect(() => {
		if (typeof window !== "undefined") {
			const interval = window?.setInterval(() => {
				const newPoint = getNewSeries(lastDate, {
					min: 10,
					max: 90,
				});
				lastDate.setTime(newPoint.x);

				setState((prevState) => ({
					...prevState,
					series: [
						{
							data: [...prevState.series[0].data, newPoint],
						},
					],
				}));
			}, 1000);

			return () => clearInterval(interval);
		}
	}, []);

	return (
		<div className="p-5 bg-[#f9f9f9] shadow-lg rounded-lg">
			<div id="chart">
				<ReactApexChart
					options={state.options}
					series={state.series}
					type="line"
					height={350}
					className="w-full"
				/>
			</div>
			<div id="html-dist"></div>
		</div>
	);
}
