import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import logo from '../assets/logo.svg'
import axios from 'axios'

const EmpSidebar = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const handleLogout = () => {
        axios.get('https://hr-systema.onrender.com/logout')
        .then(res => navigate('/login'))
        .catch(err => console.log(err))
    }

    return (
        <aside>
            <nav className='sidebar-nav lg:sticky pt-8 bg-opaqueblack text-unicolor hidden top-0 lg:flex flex-col gap-4 h-[100dvh]'>
                <Link to={`employeehome/${id}`}><img className='lg:w-36 mx-auto' src={logo} alt="logo" /></Link>
                <ul className='w-52 text-center'>
                    <li className=''>
                        <Link to={`employeehome/${id}`}>Home</Link>
                    </li>
                    <li className=''>
                        <Link to={`claims/${id}`}>Claims</Link>
                    </li>
                    <li 
                        className='block w-full cursor-pointer py-4'
                        onClick={handleLogout}
                    >Log Out
                    </li>
                </ul>
            </nav>
        </aside>



    )
}

export default EmpSidebar