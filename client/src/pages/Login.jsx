import React, { useState } from 'react'
import { LoginInputs } from '../components/LoginInputs'
import { LoginButton } from '../components/LoginButton'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        isEmployee: false
    })

    const navigate = useNavigate()

    axios.defaults.withCredentials = true;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setUserData(prevUserData => {
            return {
                ...prevUserData,
                [name]: type === "checkbox" ? checked : value
            }
        })
        console.log(userData)
    }

    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!userData.isEmployee) {
            axios.post('https://hr-systema.onrender.com/login', userData)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/')
                    console.log(res)
                } else {
                    return setError(res.data.Error)
                }
            })
            .catch(err => console.log(err))
        } else {
            axios.post('https://hr-systema.onrender.com/employeelogin', userData)
            .then(res => {
                if(res.data.Status === 'Success') {
                    const id = res.data.id
                    navigate(`/employeehome/${id}`)
                    console.log(res)
                } else {
                    return setError(res.data.Error)
                }
            })
            .catch(err => console.log(err))
        }
        
    }

    return (
        <>
            <div className='text-deletecolor text-sm'>
                {error && error}
            </div>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col'
            >
                <label htmlFor="username">Email</label>
                <LoginInputs
                    type="email"
                    required
                    placeholder="Enter Your Email. . ."
                    name='email'
                    value={userData.email}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <LoginInputs
                    type="password"
                    required
                    placeholder="Enter Your Password. . ."
                    name='password'
                    value={userData.password}
                    onChange={handleChange}
                />
                <div className='flex gap-2 items-center'>
                    <input 
                        type="checkbox" 
                        id="isEmployee" 
                        checked={userData.isEmployee}
                        name='isEmployee'
                        onChange={handleChange}
                    />
                    <label htmlFor="isEmployee">Login As Employee(Not Admin)</label>
                </div>
                
                <LoginButton
                    type='submit'
                    className='mt-4'
                >Sign In
                </LoginButton>
                
            </form>
        </>

    )
}
