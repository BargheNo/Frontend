"use client"
import React, { useState } from 'react'
import { Plus, ShieldAlert, SquareMenu } from 'lucide-react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


const CustomerRepairRequest = () => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex flex-col items-center gap-4">
                    <button 
                        className="cta-neu-button !w-fit !rounded-4xl" 
                        aria-label="درخواست تعمیرات فوری"
                    >
                        <Plus className='w-28 h-28' />
                    </button>
                    <span className='text-navy-blue'>درخواست تعمیرات فوری</span>
                </div>
            </DialogTrigger>
            <DialogContent style={{backgroundColor:"#F1F4FC"}} className='min-w-[57vw]'>
                <br />
                <br />
                hi
            </DialogContent>
        </Dialog>
    )
}

export default CustomerRepairRequest