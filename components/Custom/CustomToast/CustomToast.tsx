import { toast } from "sonner";
export default function CustomToast(
	message: string,
	mode?: "success" | "error" | "warning" | "info" | undefined
) {
	function Toast(message: string) {
		return (
			<div data-test="sonner-toast" className="vazir-bold">
				{/* <div data-test="sonner-toast" className="select-none"> */}
				{message}
			</div>
		);
	}
	const commonOptions = {};
	// const commonOptions = {
	// 	// These styles will be applied to every toast
	// 	style: {
	// 		backgroundColor: baseOrange, // The main background color of the toast
	// 		color: textColor, // Text color for the toast title/message
	// 		borderRadius: "16px", // Rounded corners for a softer neumorphic look
	// 		padding: "18px 25px", // Adjust padding for desired size
	// 		border: "none", // Ensure no default border interferes

	// 		// --- Neumorphism Box Shadow ---
	// 		boxShadow: `
	//             	8px 8px 16px ${darkOrange},
	//             	inset 2px 2px 5px ${darkOrange},
	//             `,
	// 	},
	// 	// Class names for specific internal elements of the toast
	// 	classNames: {
	// 		title: "font-bold", // Make titles bold for emphasis
	// 		description: "text-white/90", // Slightly transparent white for descriptions
	// 		actionButton: "bg-white text-orange-600 hover:bg-orange-100", // Example for action buttons
	// 		cancelButton: "text-white hover:bg-orange-700", // Example for cancel buttons
	// 	},
	// };
	if (mode === "success") return toast.success(Toast(message), commonOptions);
	else if (mode === "error") return toast.error(Toast(message), commonOptions);
	else if (mode === "warning") return toast.warning(Toast(message), commonOptions);
	else if (mode === "info") return toast.info(Toast(message), commonOptions);
	// if (mode === "success") return toast.success(Toast(message));
	// else if (mode === "error") return toast.error(Toast(message));
	// else if (mode === "warning") return toast.warning(Toast(message));
	// else if (mode === "info") return toast.info(Toast(message));
	else return toast(Toast(message));
}
