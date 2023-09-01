import React from 'react'
import { Link, useParams } from 'react-router-dom'
import logo from '../assets/logo.svg'

const EmpSidebar = () => {

    const { id } = useParams()
    return (
        <aside>
            <nav className='sidebar-nav lg:sticky pt-8 bg-opaqueblack text-unicolor hidden top-0 lg:flex flex-col gap-4 h-[100dvh]'>
                <Link to={`employeehome/${id}`}><img className='lg:w-36 mx-auto' src={logo} alt="logo" /></Link>
                <ul className='w-52'>
                    <li className=''>
                        <Link to={`employeehome/${id}`}>Home</Link>
                    </li>
                    <li className=''>
                        <Link to={`claims/${id}`}>Claims</Link>
                    </li>
                    <li className=''>
                        <Link to='login'>Log Out</Link>
                    </li>
                </ul>
            </nav>
        </aside>



    )
}

export default EmpSidebar