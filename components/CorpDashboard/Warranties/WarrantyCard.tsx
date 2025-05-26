import IconWithBackground from '@/components/IconWithBackground/IconWithBackground'
import React from 'react'
import { Wrench } from 'lucide-react'

const WarrantyCard = ({name}) => {
  return (
    <div>
        { name }
        <IconWithBackground
            icon={Wrench}
            
        />
    </div>
  )
}

export default WarrantyCard