import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ConfigScreen } from '../components/config/ConfigScreen'
import { DashboardScreen } from '../components/dashboard/DashboardScreen'
import { ProtectScreen } from '../components/protect/ProtectScreen'
import { ProtectHistoryScreen } from '../components/protectHistory/ProtectHistoryScreen'
import { SideBar } from '../components/ui/SideBar'
import { Topbar } from '../components/ui/Topbar'
import { UpdateScreen } from '../components/update/UpdateScreen'
import { UpdateImgScreen } from '../components/updateImg/UpdateImgScreen'
import { VerifyScreen } from '../components/verify/VerifyScreen'

export const DashboardRoutes = () => {
  return (
    <>
        <Topbar />
        <SideBar />

        <Routes>
            <Route path='dashboard' element={<DashboardScreen />} />
            <Route path='protect' element={<ProtectScreen />} />
            <Route path='verify' element={<VerifyScreen />} />
            <Route path='config' element={<ConfigScreen />} />
            <Route path='update' element={<UpdateScreen />} />
            <Route path='update/img' element={<UpdateImgScreen />} />
            <Route path='history/protect' element={<ProtectHistoryScreen />} />
            <Route path='/'/>
        </Routes>

    </>
  )
}
