import React from 'react'

const TwoColsLayout = ({ children } : {children: React.ReactNode | React.ReactNode[]}) => {
  const childArray = React.Children.toArray(children);
  const leftCol = childArray.filter((_, idx) => idx % 2 === 0);
  const rightCol = childArray.filter((_, idx) => idx % 2 === 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        {leftCol}
      </div>
      <div className="flex flex-col gap-4">
        {rightCol}
      </div>
    </div>
  )
}

export default TwoColsLayout