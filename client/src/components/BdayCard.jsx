import React, { useEffect, useRef, useState } from 'react'
import { useMaildata } from '../Hooks/useMaildata'

export const BdayCard = ({ employee, currentDay, currentMonth}) => {
    const [currentAges, setCurrentAges] = useState('')
    const { mailData, handleMailDetails } = useMaildata()
    const [ updatedData, setUpdatedData ] = useState([])
    const formRef = useRef()

    useEffect(() => {
        const age = (age) => {
            let year = new Date(age).getFullYear()
            let currentYear = new Date().getFullYear()
            let empAge = currentYear - year;
            return empAge
        }
        setCurrentAges(age(employee.dob))

        handleMailDetails(employee.id)
 
    }, [])

    let day = new Date(employee.dob).getDate()
    let month = new Date(employee.dob).getMonth()

    return (
        <>
            <li className='bg-unicolor flex flex-col items-center gap-2 p-4 mt-4 mb-2 rounded-lg shadow-lg '>
                <div className='flex gap-8 items-center'>
                    <img className='emp-img w-16 rounded-full' src={`https://hr-systema.onrender.com/images/${employee.avatarUrl}`} alt="employee image" />
                    <div>
                        <p>{employee.firstName} {employee.lastName}</p>
                        <p>Turning: {currentAges} years</p>
                        <p>{employee.dob}</p>
                    </div>
                </div>
            </li>
        </>


    )
}
