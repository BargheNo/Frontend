import React from 'react'
import CorpManagement from '@/components/admin-dashboard/CorpManagement/CorpManagement'
import PageContainer from '@/components/Dashboard/PageContainer/PageContainer'
import Header from '@/components/Header/Header'

const page = () => {
  return (
    <PageContainer>
      <Header header='شرکت های فعلی' />
      <CorpManagement/>
    </PageContainer>
  )
}

export default page
