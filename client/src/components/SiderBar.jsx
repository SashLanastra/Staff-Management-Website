import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import axios from 'axios'

const SideBar = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        axios.get('https://hr-systema.onrender.com/logout')
        .then(res => navigate('/login'))
        .catch(err => console.log(err))
    }

    return (
        <aside>
            <nav className='sidebar-nav lg:sticky pt-8 bg-opaqueblack text-unicolor hidden top-0 lg:flex flex-col gap-4 h-[100dvh]'>
                <Link to=''><img className='lg:w-36 mx-auto' src={logo} alt="logo" /></Link>
                <ul className='w-52'>
                    <li className=''>
                        <Link to=''>Staff</Link>
                    </li>
                    <li className=''>
                        <Link to='birthdays'>Birthdays</Link>
                    </li>
                    <li className=''>
                        <Link to='employeeclaims'>Employee Claims</Link>
                    </li>
                    <li className=''>
                        <Link to='dashboard'>Dashboard</Link>
                    </li>
                    <li 
                        className=''
                        onClick={handleLogout}
                    >
                        <Link to='login'>Log Out</Link>
                    </li>
                </ul>
            </nav>
        </aside>



    )
}

export default SideBar