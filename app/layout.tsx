import type { Metadata } from "next";
import "./globals.css";
import "./neoStyles.css";

import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";
import NavbarWrapper from "@/src/wrappers/NavbarWrappert/NavbarWrapper";

export const metadata: Metadata = {
    title: "Barghe No",
    description: "Barghe No",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
	const baseOrange = "#FA682D";
	const lightOrange = "#FF9C6F"; // Lightened by ~20%
	const darkOrange = "#C45224"; // Darkened by ~20%
	const textColor = "#FFFFFF"; // White text for contrast
  const shadow = 2;
  const spread = 5;
	return (
		<html lang="fa" className="no-scrollbar">
			<body className="">
				<Providers>
					<NavbarWrapper />
					{children}
					<Toaster
						position="bottom-right" 
						richColors={true} // <--- IMPORTANT: Set to false to apply custom background colors
						duration={7000} 
						toastOptions={{
							style: {
								// backgroundColor: baseOrange,
								backgroundColor: textColor,
								color: 'black',
								borderRadius: "16px", // Rounded corners for a softer neumorphic look
								padding: "18px 25px", // Adjust padding for desired size
								border: "none", // Ensure no default border interferes
								// boxShadow: `-${shadow}px -${shadow}px ${spread}px rgba(255,255,255,0.8), ${shadow}px ${shadow}px ${spread}px rgba(0,0,0,0.2)`,
								// boxShadow: `inset -4px -4px 10px rgba(255,255,255,0.8), inset 4px 4px 10px rgba(0,0,0,0.1)`,
								// boxShadow: `inset 2px 2px 5px rgba(0,0,0,0.2), inset -2px -2px 5px rgba(0,0,0,0.2)`,
								boxShadow: `${shadow}px ${shadow}px ${spread}px rgba(0,0,0,0.2), -${shadow}px -${shadow}px ${spread}px rgba(0,0,0,0.2), inset 2px 2px 5px rgba(0,0,0,0.2), inset -2px -2px 5px rgba(255,255,255,0.8)`,
								// boxShadow: `${shadow}px ${shadow}px ${spread}px rgba(0,0,0,0.2), -${shadow}px -${shadow}px ${spread}px rgba(255,255,255,0.8), inset 2px 2px 5px rgba(0,0,0,0.2), inset -2px -2px 5px rgba(255,255,255,0.8)`,
								// boxShadow: `${shadow}px ${shadow}px ${spread}px ${darkOrange}, -${shadow}px -${shadow}px ${spread}px ${lightOrange}, inset 2px 2px 5px ${darkOrange}, inset -2px -2px 5px ${lightOrange}`,

							},
						}}
					/>
				</Providers>
			</body>
		</html>
	);
}
