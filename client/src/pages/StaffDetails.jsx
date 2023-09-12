import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { EmpDetailTable } from '../components/EmpDetailTable'
import { Button } from '../components/Button'
import { useUpdateForm } from '../Hooks/useUpdateForm'
import { UpdateEmpForm } from '../Forms/UpdateEmpForm'

export const StaffDetails = () => {
    const[employeeData, setEmployeeData] = useState('')
    const {updateForm, updateFormTrue} = useUpdateForm()

    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`https://hr-systema.onrender.com/get/${id}`)
            .then(res => {
                if(res.data.Status === 'Success') {
                    setEmployeeData(res.data.Result[0])
                    console.log(res.data.Result[0])
                } else {
                    alert('Error')
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleDelete = () => {
        axios.delete(`https://hr-systema.onrender.com/delete/${id}`)
        .then(res => {
            if(res.data.Status === 'Success') {
                navigate('/staff')
            } else {
                alert('Error')
            }
        })
        .catch(err => console.log(err))

    }
    return (
        <section className='my-8 lg:my-24 flex flex-col items-center gap-8'>
            <img src={`https://hr-systema.onrender.com/images/${employeeData.avatarUrl}`} alt="Employee Image" 
            className='emp-img w-52 rounded-full'
            />
            <div className='flex gap-4 px-4 sm:w-fit'>
                <Button 
                    className='bg-secondary w-full sm:w-40'
                    onClick={() => updateFormTrue()}
                >Update</Button>
                <Button 
                    className='bg-deletecolor text-white w-full sm:w-40'
                    onClick={handleDelete}
                >Delete</Button>
            </div>
            <EmpDetailTable employeeData={employeeData}/>
            { updateForm && <UpdateEmpForm/>}
        </section>
    )
}
