import { ReactNode } from "react";
import ReactDOM from "react-dom";
import { vazir } from "@/lib/fonts";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	if (!isOpen) return null;
	return ReactDOM.createPortal(
		<div
			className={`fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center ${vazir.className}`}
		>
			<div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
				<button
					onClick={onClose}
					className="absolute top-3 left-3 text-gray-500 hover:text-gray-700"
				>
					×
				</button>
				{children}
			</div>
		</div>,
		document.body
	);
};

export default Modal;
