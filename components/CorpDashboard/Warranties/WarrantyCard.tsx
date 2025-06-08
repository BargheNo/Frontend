import React from 'react'
import { Shapes, Timer } from 'lucide-react'
import MetricBox from '@/components/IconWithBackground/MetricBox'
import TruncatedText from '@/components/ui/TruncatedText'
import WarrantyDetails from './WarrantyDetails';
import { Warranty } from './warrantyTypes.ts';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/store';

type WarrantyCardProps = Warranty;

const WarrantyCard = ({ id, name, guaranteeType, durationMonths, description, terms, isArchived } : WarrantyCardProps) => {
  const { items, /*status, error*/ } = useSelector((state: RootState) => state.warrantyTypes);

  // TODO: handle status === "loading" || status === "failed" cases

  return (
    <div className={`flex flex-col space-y-6 neu-container rounded-3xl justify-between
                    w-full h-full bg-[#F0EDEF] p-8 overflow-hidden relative ${isArchived && "grayscale-100"}`}
         data-test="warranty-card">
        <h1 className='text-2xl font-black' data-test="warranty-name">
          {name}
        </h1>
        <div className='flex justify-around'>
          <MetricBox
            title='نوع گارانتی'
            icon={Shapes}
            className='w-52'
            childClassName='!text-lg'
            data-test="warranty-type"
          >
            {String(items.find(typeItem => typeItem.id == guaranteeType)?.name || guaranteeType)}
          </MetricBox>
          <MetricBox
            title='مدت زمان'
            icon={Timer}
            className='w-52'
            data-test="warranty-duration"
          >
            {String(durationMonths)}
          </MetricBox>
        </div>

        <div>
          <TruncatedText maxLength={70} data-test="warranty-description">
            { description }
          </TruncatedText>
        </div>

        <div className='w-full flex space-x-4'>
          <WarrantyDetails
            id={id}
            name={name}
            description={description}
            type={items.find(typeItem => typeItem.id == guaranteeType)?.name || guaranteeType}
            duration={durationMonths}
            terms={terms}
            isArchived={isArchived}
            data-test="warranty-details"

            durationMonths=""
            status=''
            guaranteeType=""
          />
        </div>
    </div>
  )
}

export default WarrantyCard