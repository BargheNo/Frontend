import { toast } from "sonner";
export default function CustomToast(message: string, mode?: string) {
	if (mode === "success")
		return toast.success(<div data-test="sonner-toast">{message}</div>);
	else if (mode === "error")
		return toast.error(<div data-test="sonner-toast">{message}</div>);
	else if (mode === "warning")
		return toast.warning(<div data-test="sonner-toast">{message}</div>);
	else if (mode === "info")
		return toast.info(<div data-test="sonner-toast">{message}</div>);
	else return toast(<div data-test="sonner-toast">{message}</div>);
}
