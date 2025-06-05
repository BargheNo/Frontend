import AddComponent from '@/components/AddComponent/AddComponent';
import CustomToast from '@/components/Custom/CustomToast/CustomToast';
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { baseURL, getData } from '@/src/services/apiHub';
import React, { useState, useEffect } from 'react';
import { FormValues, WarrantyType } from './warrantyTypes';
import WarrantyForm from './WarrantyForm';

const AddWarranty = () => {
  const [open, setOpen] = useState(false);
  const [warrantyTypes, setWarrantyTypes] = useState<WarrantyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (open) {
      getData({
        endPoint: `${baseURL}/apiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii`,
      }).then(
        res => {
          setWarrantyTypes(res.data);
          setIsLoading(false);
        }
      ).catch(() => {
        CustomToast("خطا در دریافت انواع گارانتی", "error");
        setIsLoading(false);
        setWarrantyTypes([{id: "1", name: "گارانتی نوع 1"}, {id: "2", name: "گارانتی نوع 2"}]);
      })
    }
  }, [open]);

  const handleSubmit = (values: FormValues) => {
    console.log('Form submitted:', values);
    // TODO: Implement API call
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AddComponent title='ثبت گارانتی جدید' />
      </DialogTrigger>
      <DialogContent
        style={{ backgroundColor: "#F1F4FC" }}
        className="w-full sm:min-w-[750px] max-w-xl mx-auto p-4 overflow-auto py-4"
      >
        <DialogHeader>
          <DialogTitle className="flex justify-center items-end font-bold mt-3.5">
            ثبت گارانتی جدید
          </DialogTitle>
        </DialogHeader>
        
        <WarrantyForm
          warrantyTypes={warrantyTypes}
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddWarranty;