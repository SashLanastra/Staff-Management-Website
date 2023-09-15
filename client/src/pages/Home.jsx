import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const Home = () => {

    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('https://hr-systema.onrender.com/homepage')
        .then(res => {
            if(res.data.Status === 'Success') {
                if(res.data.role === "admin") {
                    navigate('/adminhome')
                } else if(res.data.role === "employee") {
                    const id = res.data.id;
                    navigate(`/employeehome/${id}`)
                }
            } else {
                navigate('/login')
            }
        })
        .catch(err => console.log(err))
    },[])
  return (
    <div>Home</div>
  )
}
