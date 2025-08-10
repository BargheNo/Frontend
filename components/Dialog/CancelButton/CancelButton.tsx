import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import React from "react";

export default function CancelButton({ children }) {
    return (
        <DialogClose asChild>
            <Button variant="outline" className="bg-gray-300 cursor-pointer">
                {children ? children : <p>انصراف</p>}
            </Button>
        </DialogClose>
    );
}
