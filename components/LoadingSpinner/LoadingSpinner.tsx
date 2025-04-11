import React from 'react'
import './style.css'

const LoadingSpinner = ({scale = 30}: {scale?: number}) => {
  return (
    <div className='flex justify-center items-center h-full bg-black/50'>
      <div 
        className='bg-[#F1F4FC] w-fit p-16 rounded-4xl shadow-2xl'
        style={{ transform: `scale(${scale / 100})` }}
      >
        <div className='loading-spinner-wrapper'>
            <span></span>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner