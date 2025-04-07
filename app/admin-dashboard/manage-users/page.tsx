"use client";
import Users from '@/components/admin-dashboard/Users/Users';
import FilterSection from '@/components/CorpDashboard/FilterSection'
import { User } from 'lucide-react'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col items-center gap-12 p-12 w-full bg-[#F0EDEF] min-h-[100vh]'>
      <div className='flex gap-12'>
        <button className='bg-white rounded-2xl px-4 py-2 neu-shadow flex'><p>خریداران</p><User /></button>
        <button className='bg-[#F0EDEF] rounded-2xl px-4 py-2 neu-shadow flex'><p>فروشندگان</p><User /></button>
        <button className='bg-[#F0EDEF] rounded-2xl px-4 py-2 neu-shadow flex'><p>متخصصین</p><User /></button>
        <button className='bg-[#F0EDEF] rounded-2xl px-4 py-2 neu-shadow flex'><p>ادمین‌ها</p><User /></button>
      </div>
      <FilterSection />
      <Users />
    </div>
  )
}
