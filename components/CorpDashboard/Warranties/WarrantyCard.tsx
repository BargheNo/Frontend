import React from 'react'
import { Shapes, Timer } from 'lucide-react'
import MetricBox from '@/components/IconWithBackground/MetricBox'
import TruncatedText from '@/components/ui/TruncatedText'
import WarrantyDetails from './WarrantyDetails';
import { Warranty } from './warrantyTypes.ts';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/store';

type WarrantyCardProps = Warranty;

const WarrantyCard = ({ name, type, duration, description, terms } : WarrantyCardProps) => {
  const { items, status, error } = useSelector((state: RootState) => state.warrantyTypes);

  // TODO: handle status === "loading" || status === "failed" cases

  return (
    <div className='flex flex-col space-y-6 neu-container rounded-3xl justify-between
                    w-full h-full bg-[#F0EDEF] p-8 overflow-hidden relative'>
        <h1 className='text-2xl font-black'>
          {name}
        </h1>
        <div className='flex justify-around'>
          <MetricBox
            title='نوع گارانتی'
            icon={Shapes}
            className='w-52'
          >
            {String(type)}
          </MetricBox>
          <MetricBox
            title='مدت زمان'
            icon={Timer}
            className='w-52'
          >
            {String(duration)}
          </MetricBox>
        </div>

        <div>
          <TruncatedText maxLength={70}>
            { description }
          </TruncatedText>
        </div>

        <div className='w-full flex space-x-4'>
          <WarrantyDetails
            name={name}
            description={description}
            type={type}
            duration={duration}
            terms={terms}
          />
        </div>
    </div>
  )
}

export default WarrantyCard