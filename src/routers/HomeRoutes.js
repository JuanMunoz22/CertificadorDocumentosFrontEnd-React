import React from 'react'
import { Route, Routes } from 'react-router-dom'


import { HomeScreen } from '../components/home/HomeScreen'
import { LoginScreen } from '../components/login/LoginScreen'
import { VerificarScreen } from '../components/verificar/VerificarScreen'
import { RegistroScreen } from '../components/registrar/RegistroScreen'
import { Navbar } from '../components/ui/Navbar'
import { Footer } from '../components/ui/Footer'
import { ValidarEmailScreen } from '../components/email/ValidarEmailScreen'
import { VerificarHashPublic } from '../components/verificar/VerificarHashPublic'


export const HomeRoutes = () => {
  return (
    <>
      <Navbar/>

        <Routes>
            <Route path='/' element={<HomeScreen />}/>
            <Route path='verificar' element={<VerificarScreen />}/>
            <Route path='/verificar/:id' element={<ValidarEmailScreen />} />
            <Route path='/verificar/hash' element={<VerificarHashPublic />} />
            <Route path='login' element={<LoginScreen />}/>
            <Route path='registro' element={<RegistroScreen />}/>
        </Routes>

      <Footer />
    </>
  )
}
