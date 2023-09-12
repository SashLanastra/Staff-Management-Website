import axios from 'axios'
import React, { useState, useEffect } from 'react'

export const DashboardCards = () => {
    const [staffCount, setStaffCount] = useState()
    const [adminCount, setAdminCount] = useState()
    const [salaryCount, setSalaryCount] = useState()

    useEffect(() => {
        axios.get('https://hr-systema.onrender.com/staffcount')
            .then(res => {
                if (res.data.Status === 'Success') {
                    setStaffCount(res.data.Result[0].staff)
                } else {
                    alert('Error')
                }
            })
            .catch(err => console.log(err))

        axios.get('https://hr-systema.onrender.com/admincount')
        .then(res => {
            if(res.data.Status === 'Success') {
                setAdminCount(res.data.Result[0].admin)
            } else {
                alert('Error')
            }
        })
        .catch(err => console.log(err))

        axios.get('https://hr-systema.onrender.com/salarycount')
        .then(res => {
            if(res.data.Status === 'Success') {
                setSalaryCount(res.data.Result[0].salarycount)
            } else {
                alert('Error')
            }
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <>
            <div className='bg-unicolor flex flex-col items-center rounded-md py-8 px-8 shadow-lg sm:w-48 md:w-56'>
                <h4 className='text-xl'>Total Staff:</h4>
                <p className='text-2xl font-bold'>{staffCount}</p>
            </div>
            <div className='bg-unicolor flex flex-col items-center rounded-md py-8 px-8 shadow-lg sm:w-48 md:w-56'>
                <h4 className='text-xl'>Total Admin:</h4>
                <p className='text-2xl font-bold'>{adminCount}</p>
            </div>
            <div className='bg-unicolor flex flex-col items-center rounded-md py-8 px-8 shadow-lg sm:w-48 md:w-56'>
                <h4 className='text-xl'>Salary Total:</h4>
                <p className='text-2xl font-bold'>R{salaryCount}</p>
            </div>
        </>

    )
}
