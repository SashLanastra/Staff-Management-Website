import React from 'react'
import { Outlet } from 'react-router-dom'
import { LoginCard } from '../components/LoginCard'
import logo from '../assets/logo.svg'


export const AuthLayout = () => {
  return (
      <LoginCard>
        <LoginCard.AboveCard>
        <img className='px-4 w-full' src={logo} alt="logo" />
        </LoginCard.AboveCard>
        <LoginCard.Body>
          <Outlet />
        </LoginCard.Body>
        <LoginCard.BelowCard>
          Hello
        </LoginCard.BelowCard>
      </LoginCard>
   
    
  )
}
