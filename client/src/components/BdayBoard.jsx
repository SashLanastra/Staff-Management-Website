import React, { useState, useEffect, useRef } from 'react'
import { BdayCard } from './BdayCard'
import axios from 'axios'
import emailjs from '@emailjs/browser';



export const BdayBoard = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('https://hr-systema.onrender.com/getemployees')
            .then(res => {
                if (res.data.Status === 'Success') {
                    setData(res.data.Result)
                    console.log(res.data.Result[0].isBirthday)
                    
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err))
    },[])


    let currentDay = new Date().getDate()
    let currentMonth = new Date().getMonth()

    const currentBday = data.filter(emp => {
        let day = new Date(emp.dob).getDate()
        let month = new Date(emp.dob).getMonth()

        return currentDay === day && currentMonth === month
    })

    const upcomingBday = data.filter(emp => {
        let month = new Date(emp.dob).getMonth()
        let day = new Date(emp.dob).getDate()

        if (day <= currentDay && currentMonth === month) return
        return month >= currentMonth && month <= currentMonth + 3
    })

    return (
        <>
            <div className='flex flex-col gap-4 items-center'>
                <h1 className='text-4xl'>Birthday Board</h1>
                <h3 className='text-xl font-semibold'>Today's Birthdays</h3>
                <ul>
                    {currentBday.map((employee, index) => {
                        return ( 
                            <BdayCard
                                key={index}
                                employee={employee}
                                currentDay={currentDay}
                                currentMonth={currentMonth}
                                
                            />
                           
                        )
                    })}
                </ul>
                <h3 className='text-xl font-semibold'>Upcoming Birthdays</h3>
                <ul>
                    {upcomingBday.map((employee, index) => {
                        return (
                            <BdayCard
                                key={index}
                                employee={employee}
                                currentDay={currentDay}
                                currentMonth={currentMonth}
                            />
                        )
                    })}
                </ul>
            </div>
            
        </>

    )
}
