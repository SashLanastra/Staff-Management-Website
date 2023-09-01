import React, { useEffect, useRef, useState } from 'react'
import { Button } from './Button'
import { useMaildata } from '../Hooks/useMaildata'
import { FormInput } from '../components/FormInput'
import emailjs from '@emailjs/browser';
import axios from 'axios';

export const BdayCard = ({ employee, currentDay, currentMonth}) => {
    const [currentAges, setCurrentAges] = useState('')
    const { mailData, handleMailDetails } = useMaildata()
    const [isBirthday, setIsBirthday ] = useState({
        isBirthday: true
    })
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




    const sendMail = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:4000/updateisBirthday/${employee.id}`, isBirthday)
        .then(res => {})
        .catch(err => console.log(err))

        emailjs.sendForm("service_0jqilh6","template_52yfkca",formRef.current,"fdFAwXrNkBQ3NZOSI")
            .then((result) => {
                console.log(result.text)
                alert('message sent')
                window.location.reload(true)
            }),
            (error) => {
                console.log(error.text)
            }
    }

    const birthdayWish = `Dear ${employee.firstName}\n\nOn behalf of the company, we at HR would like to wish you a Happy Birthday. Here's to turning ${currentAges} !🎈🥂\n\nBest Wishes\nHRSytema`


    let day = new Date(employee.dob).getDate()
    let month = new Date(employee.dob).getMonth()

    return (
        <>
            <li className='bg-unicolor flex flex-col items-center gap-2 p-4 mt-4 mb-2 rounded-lg shadow-lg '>
                <div className='flex gap-8 items-center'>
                    <img className='emp-img w-16 rounded-full' src={`http://localhost:4000/images/${employee.avatarUrl}`} alt="employee image" />
                    <div>
                        <p>{employee.firstName} {employee.lastName}</p>
                        <p>Turning: {currentAges} years</p>
                        <p>{employee.dob}</p>
                    </div>
                </div>
                {employee.isBirthday ==! isBirthday.isBirthday && day === currentDay && month === currentMonth &&
                    <Button className='bg-secondary' onClick={sendMail} >Send Birthday Mail</Button>}
                {employee.isBirthday == 1 && day === currentDay && month === currentMonth && <p className='text-primary'>Message Sent</p>}
            </li>
            <form ref={formRef} hidden>
                <label htmlFor="email" className='text-white'>Email</label>
                <FormInput
                    id="email"
                    type="email"
                    name='mailTo'
                    required
                    readOnly
                    value={employee.email}
                />
                <label htmlFor="subject" className='text-white'>Subject</label>
                <FormInput
                    id="subject"
                    type="text"
                    name='subject'
                    required
                    value='Company Birthday Wish!'
                    readOnly
                />
                <div className='flex flex-col'>
                    <label htmlFor="textarea" className='text-white'>Message</label>
                    <textarea name="message" id="textarea" cols="30" rows="10" className='rounded-lg bg-formbg border border-secondary focus:outline-none p-2 text-unicolor' value={birthdayWish} readOnly></textarea>
                </div>
            </form>
        </>


    )
}
