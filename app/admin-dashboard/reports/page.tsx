import Reports from "@/components/admin-dashboard/Reports/Reports";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";
import React from 'react'

const page = () => {
  return (
    <PageContainer>
      <Header header="گزارشات" />
      <Reports/>
    </PageContainer>
  )
}

export default page
