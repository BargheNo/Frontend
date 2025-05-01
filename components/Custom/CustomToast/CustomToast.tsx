import { toast } from "sonner";
export default function CustomToast(message: string) {
	return toast(<div data-test="sonner-toast">{message}</div>);
}
