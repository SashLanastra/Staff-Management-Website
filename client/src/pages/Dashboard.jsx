import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardCards } from '../components/DashboardCards'

const Dashboard = () => {

    return (
        <section className='flex flex-wrap gap-4 mx-8 mt-24 justify-center h-fit'>
            <DashboardCards/>
        </section>
    )
}

export default Dashboard
