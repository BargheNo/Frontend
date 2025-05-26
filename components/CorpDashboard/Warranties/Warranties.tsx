import React from 'react'
import WarrantyCard from './WarrantyCard'

const mockData = [
    {
        name: "گارانتی طلایی کمرنگ"
    },
    {
        name: "گارانتی طلایی براق"
    },
    {
        name: "گارانتی قهوه‌ای ملو"
    }
]

const Warranties = () => {
  return (
    <div className='flex flex-col text-gray-800 rounded-2xl overflow-hidden bg-[#F0EDEF] shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]'>
        {mockData.map((WarrantyItem, index) =>
            <WarrantyCard
                key={index}
                name={WarrantyItem.name}
            />
        )}
    </div>
  )
}

export default Warranties