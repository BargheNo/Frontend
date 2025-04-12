import localFont from "next/font/local";

export const vazir = localFont({
  src: [
    {
      path: "../public/fonts/vazir/Vazir.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/vazir/Vazir.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/vazir/Vazir.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-vazir", // Optional: for CSS variables
  display: "swap",
});

export const vazirBold = localFont({
  src: [
    {
      path: "../public/fonts/vazir/Vazir-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/vazir/Vazir-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/vazir/Vazir-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-vazir-bold", // Optional: for CSS variables
  display: "swap",
});

export const vazirLight = localFont({
  src: [
    {
      path: "../public/fonts/vazir/Vazir-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/vazir/Vazir-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/vazir/Vazir-Light.ttf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-vazir-light", // Optional: for CSS variables
  display: "swap",
});

export const vazirMedium = localFont({
  src: [
    {
      path: "../public/fonts/vazir/Vazir-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/vazir/Vazir-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/vazir/Vazir-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-vazir-medium", // Optional: for CSS variables
  display: "swap",
});

export const vazirThin = localFont({
  src: [
    {
      path: "../public/fonts/vazir/Vazir-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/vazir/Vazir-Thin.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/vazir/Vazir-Thin.ttf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-vazir-thin", // Optional: for CSS variables
  display: "swap",
});
