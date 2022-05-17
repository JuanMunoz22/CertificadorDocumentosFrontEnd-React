import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


import { DashboardRoutes } from './DashboardRoutes'
import { HomeRoutes } from './HomeRoutes'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {
  return (
    <BrowserRouter>

      <Routes>
          <Route path='/*' element={
            <PublicRoute>
              <HomeRoutes />
            </PublicRoute>
          } />

          <Route path='/user/*' element={
            <PrivateRoute>
              <DashboardRoutes/>
            </PrivateRoute>
          } />

      </Routes>

    </BrowserRouter>
  )
}
