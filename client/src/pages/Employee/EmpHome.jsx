import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EmpDetails } from '../../empComponents/EmpDetails'

export const EmpHome = () => {
    const [employee, setEmployee] = useState([])

    const { id } = useParams()

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
