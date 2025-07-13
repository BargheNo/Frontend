import { toast } from "sonner";
export default function CustomToast(
	message: string,
	mode?: "success" | "error" | "warning" | "info" | undefined
) {
	function Toast(message: string) {
		return (
			<div data-test="sonner-toast" className="select-none">
				{message}
			</div>
		);
	}
	if (mode === "success") return toast.success(Toast(message));
	else if (mode === "error")
		return toast.error(
			Toast(message)
			// <div data-test="sonner-toast" className="select-none">
			// 	{message}
			// </div>
		);
	else if (mode === "warning")
		return toast.warning(
			Toast(message)
			// <div data-test="sonner-toast" className="select-none">
			// 	{message}
			// </div>
		);
	else if (mode === "info")
		return toast.info(
			Toast(message)
			// <div data-test="sonner-toast" className="select-none">
			// 	{message}
			// </div>
		);
	else
		return toast(
			Toast(message)
			// <div data-test="sonner-toast" className="select-none">
			// 	{message}
			// </div>
		);
}
