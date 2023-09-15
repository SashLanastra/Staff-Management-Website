import React from 'react'
import logo from '../assets/logo.svg'
import { Outlet } from 'react-router-dom'

export const HomeLayout = () => {
  return (
    <div className='min-h-screen w-full bg-tertiary'>
        <Outlet/>
    </div>
  )
}
