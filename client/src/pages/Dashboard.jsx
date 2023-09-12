import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardCards } from '../components/DashboardCards'

const Dashboard = () => {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    useEffect(() => {
        const controller = new AbortController;
        const signal = controller.signal
        axios.get('https://hr-systema.onrender.com/dashboard', signal)
        .then(res => {
            if(res.data.Status === 'Success') {
                if( res.data.role === "admin") {
                    navigate('/')
                } else {
                    const id = res.data.id;
                    navigate(`/employeehome/${id}`)
                }
            } else {
                navigate('/login')
            }
        })
        .catch(err => console.log(err))

        return () => {
            controller.abort()
        }
    },[])

    

    return (
        <section className='flex flex-wrap gap-4 mx-8 mt-24 justify-center h-fit'>
            <DashboardCards/>
        </section>
    )
}

export default Dashboard
