import AddComponent from '@/components/AddComponent/AddComponent';
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Form, Formik } from 'formik';
import React, { useState } from 'react'

const AddWarranty = () => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}  >
            <DialogTrigger asChild>
                <AddComponent title='ثبت گارانتی جدید' />
            </DialogTrigger>
            <DialogContent
                style={{ backgroundColor: "#F1F4FC" }}
				className="w-full sm:min-w-[750px] max-w-xl mx-auto p-4  overflow-auto py-4"
            >
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-end font-bold mt-3.5">
                        ثبت گارانتی جدید
                    </DialogTitle>
                </DialogHeader>
                <Formik
                    initialValues={{}}
                    validationSchema={{}}
                    onSubmit={(values) => {}}
                >
                    {({ setFieldValue, values }) => (
                        <Form className="flex flex-col items-end w-full h-auto gap-4 rtl">
                            hiii
                        </Form>
                    )}

                </Formik>
            </DialogContent>
        </Dialog>
    )
}

export default AddWarranty