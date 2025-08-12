import React from 'react'
import IconWithBackground from './IconWithBackground'

interface MetricBoxProps {
    icon: React.ComponentType;
    title: string;
    color?: string;
    className: string;
    childClassName?: string;
    horizontal?: boolean;
    children: string;
}

// TODO: Add horizontal style

const MetricBox = ({icon, title, color, className, childClassName, horizontal, children}: MetricBoxProps) => {
  return (
    <div className={`rounded-xl items-center ${className} shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)]`}>
        <div className="flex items-center">
        <IconWithBackground icon={icon} className="w-full justify-between" text={title} color={color} />
        </div>
        <div className="flex flex-col m-2 sm:m-3 items-center justify-center">
        <div className="flex flex-row-reverse items-center gap-1">
            <span className={`text-xl sm:text-3xl font-bold ${childClassName}`}>{children}</span>
        </div>
        </div>
    </div>
  )
}

export default MetricBox