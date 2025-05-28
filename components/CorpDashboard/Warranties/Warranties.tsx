import React from 'react'
import WarrantyCard from './WarrantyCard'
import TwoColsLayout from '@/components/Dashboard/PageContainer/TwoColsLayout'

const mockData = [
    {
        name: "گارانتی طلایی کمرنگ"
    },
    {
        name: "گارانتی طلایی براق"
    },
    {
        name: "گارانتی قهوه‌ای ملو"
    },
    {
        name: "گارانتی سبز فسفری"
    },
    {
        name: "گارانتی قرمز بدرنگ"
    },
    {
        name: "گارانتی آبی حنایی"
    }
]

const Warranties = () => {
  return (
    <TwoColsLayout>
        {mockData.map((WarrantyItem, index) =>
            <WarrantyCard
                key={index}
                name={WarrantyItem.name}
            />
        )}
    </TwoColsLayout>
  )
}

export default Warranties