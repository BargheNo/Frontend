"use client";
import React, { useState } from "react";
import styles from "./NewNews.module.css";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import SignupButton from "@/components/SignupButton/SignupButton";
import { Plus } from "lucide-react";
export default function NewNews() {
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<SignupButton type="button" className="bg-white">
					<Plus className={styles.icon} />
				</SignupButton>
			</DialogTrigger>
			<DialogContent
				style={{ backgroundColor: "#F1F4FC" }}
				className="min-w-[57vw] overflow-auto"
			>
				<DialogHeader>
					<DialogTitle className="flex justify-center items-end font-bold mt-3.5">
						ثبت خبر جدید
					</DialogTitle>
				</DialogHeader>
				اطلاعات یک خبر
				<DialogFooter>
					<DialogClose />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
