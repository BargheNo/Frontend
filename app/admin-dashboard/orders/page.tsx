import Ordercard from '@/components/Entity-Monitoring/Orders/order-card'
import React from 'react'
const Customer={FirstName:"تینا",LastName:"محمدپور",Email:"tina.mpmp2017@gmail.com",Phone:"+989354826686",Status:"بلاک",ProfilePic:""}
export default function orders() {
  return (
    <>
    <Ordercard  Customer={Customer} Status="فعال" MaxCost={12000} Area={120} Name='سیسی سیسی' PowerRequest={1200} BuildingType={'مسکونی'} Address={{
        Province: 'مازندران',
        City: 'آمل',
        StreetAddress: 'خیابان امام رضا، رضوان 20',
        PostalCode: '9837485930',
        HouseNumber: '21',
        Unit: 2
      }} Description={'این سفارش خیلی ضروریههههه'} ></Ordercard>
    </>
  )
}
