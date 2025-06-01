import React, { ReactNode } from 'react'

export default function NotificationsDialogFields({children,title,detail}:{children?:ReactNode,title:string,detail:string}) {
  return (
    <>
    <span className="mr-2 rtl"><span className="font-bold">{title} {children}</span>{detail}</span>
    </>
  )
}
