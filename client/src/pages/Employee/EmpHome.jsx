import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EmpDetails } from '../../empComponents/EmpDetails'

export const EmpHome = () => {
    const [employee, setEmployee] = useState([])

    const { id } = useParams()
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('https://hr-systema.onrender.com/homepage')
        .then(res => {
            if(res.data.Status === "Success" && res.data.role === "employee") {
                const employeeId = res.data.id;
                navigate(`/employeehome/${employeeId}`)
            } else {
                navigate('/login')
            }
        })
        .catch(err => console.log(err))
    },[])

    useEffect(() => {
        axios.get(`https://hr-systema.onrender.com/get/${id}`)
        .then(res => {
            setEmployee(res.data.Result[0]);
        })
        .catch(err => console.log(err))
    }, [])
    return (
        <div className='mt-8 flex flex-col items-center gap-8'>
            <img 
                src={`https://hr-systema.onrender.com/images/${employee.avatarUrl}`} 
                alt="Employee Avatar"
                className=' border border-primary w-52 emp-img rounded-full'
            />
            <EmpDetails employee={employee}/>
        </div>
    )
}
