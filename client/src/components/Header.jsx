import React, { useEffect, useRef } from 'react'
import logo from '../assets/logo.svg'
import menuIcon from '../assets/Menu Icon.svg'
import profile from '../assets/814893.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


export const Header = ({ menu, setMenu }) => {

    const navigate = useNavigate()
    const menuRef = useRef()

    useEffect(() => {
        const handler = (e) => {
            if (!menuRef.current?.contains(e.target)) {
                setMenu(false)
            }
        }

        document.addEventListener("click", handler);

        return () => {
            document.removeEventListener("click", handler)
        }
    }, [])

    const handleMenu = () => {
        setMenu(!menu);
        console.log(menu)
    }

    const handleLogOut = () => {
        axios.get('https://hr-systema.onrender.com/logout')
        .then(res => {
            navigate('/login')
        })
        .catch(err => console.log(err))
    }

    return (
        
        <header className='lg:hidden sticky top-0 left-0 z-10 w-full'>
            <div className='bg-headerbg backdrop-blur-md top-0 z-50 px-8 py-4 text-white flex items-center justify-between'>
                <button ref={menuRef} onClick={handleMenu} className='lg:hidden'>
                    <img src={menuIcon} alt="menu icon" />
                </button>
                <Link to=''>
                    <img className='w-28 lg:w-52' src={logo} alt="logo" />
                </Link>
                <div className='border rounded-full h-fit'>
                    <img src={profile} alt="profile image" className='emp-img rounded-full w-12' />
                </div>
            </div>
            
            {
                menu &&
                <div className='absolute top-0 w-full h-screen bg-opaqueblack backdrop-blur-md overflow-hidden'>
                    <nav className='flex flex-col w-fit min-h-screen flex-grow overflow-y-hidden backdrop-blur-lg shadow-2xl popup-nav'>
                        <ul className='w-fit text-white'>
                            <li onClick={() => setMenu(false)}>
                                <Link to='adminhome'>Staff</Link>
                            </li>
                            <li onClick={() => setMenu(false)}>
                                <Link to='birthdays'>Birthdays</Link>
                            </li>
                            <li onClick={() => setMenu(false)}>
                                <Link to='employeeclaims'>Employee Claims</Link>
                            </li>
                            <li onClick={() => setMenu(false)}>
                                <Link to='dashboard'>Dashboard</Link>
                            </li>
                            <li onClick={handleLogOut}
                                className='px-8 py-2 cursor-pointer hover:bg-secondary hover:text-opaqueblack'
                            >
                                Logout
                            </li>
                        </ul>
                    </nav>
                </div>


            }
        </header>
    )
}
