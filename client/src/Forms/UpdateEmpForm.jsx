import React, { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { FormInput } from '../components/FormInput'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from '../Hooks/useForm'
import { useUpdateForm } from '../Hooks/useUpdateForm'
import { useEmployee } from '../Hooks/useEmployee'

export const UpdateEmpForm = () => {
    const { updateForm, updateFormFalse } = useUpdateForm()
    const { updateData, setUpdateData } = useEmployee()


    const handleForm = (e) => {
        const { name, value } = e.target
        setUpdateData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
        console.log(updateData)
    }

    const { id } = useParams()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:4000/update/${id}`, updateData)
            .then(res => {
                if (res.data.Status === "Success") {
                    window.location.reload(true)
                    updateFormFalse()
                } else {
                    alert('Error')
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get(`http://localhost:4000/get/${id}`)
        .then(res => {
            if(res.data.Status === 'Success') {
                setUpdateData({
                    ...updateData,
                    lastName: res.data.Result[0].lastName,
                    role: res.data.Result[0].role,
                    address: res.data.Result[0].address,
                    cellphone: res.data.Result[0].cellphone,
                    salary: res.data.Result[0].salary
    
                })
            } else {
                alert('Error')
            }
        })
        .catch(err => console.log(err))
    },[])

    return (
        <div
            className='flex h-screen w-full items-center justify-center absolute top-0 left-0 backdrop-blur-lg z-20'
            id={updateForm ? 'modal-bg' : ''}
            onClick={(e) => {
                if (e.target.id === 'modal-bg') {
                    updateFormFalse()
                }
            }}
        >
            <div
                className='flex flex-col gap-4 p-4 w-full max-w-md backdrop-blur-md rounded-lg md:max-w-3xl overflow-y-scroll bg-opaqueblack '
                id='modal-container'
            >
                <Button
                    className='bg-secondary px-4 font-semibold w-fit ml-auto'
                    onClick={() => updateFormFalse()}
                >Close</Button>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="lastName" className='text-white'>Last Name</label>
                    <FormInput
                        id="lastName"
                        type="text"
                        placeholder="Enter Employee's Last Name. . ."
                        required
                        name="lastName"
                        value={updateData.lastName}
                        onChange={handleForm}
                        autoComplete='off'

                    />
                    <label htmlFor="role" className='text-white'>Role</label>
                    <FormInput
                        id="role"
                        type="text"
                        placeholder="Enter Employee's Role. . ."
                        required
                        name="role"
                        value={updateData.role}
                        onChange={handleForm}
                        autoComplete='off'
                    />
                    <label htmlFor="address" className='text-white'>Home Address</label>
                    <FormInput
                        id="address"
                        type="text"
                        placeholder="Enter Employee's Home Address. . ."
                        required
                        name="address"
                        value={updateData.address}
                        onChange={handleForm}
                        autoComplete='off'

                    />
                    <div className='grid grid-cols-2 gap-2 md:justify-between' id='cell-gen-dob'>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="address" className='text-white'>Cellphone</label>
                            <FormInput
                                id="cellphone"
                                type="text"
                                placeholder="Enter Cellphone. . ."
                                required
                                name="cellphone"
                                value={updateData.cellphone}
                                onChange={handleForm}
                                autoComplete='off'

                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="salary" className='text-white'>Salary</label>
                            <FormInput
                                id="salary"
                                type="text"
                                placeholder="Enter Salary. . ."
                                required
                                name="salary"
                                value={updateData.salary}
                                onChange={handleForm}
                                autoComplete='off'
                            />
                        </div>
                    </div>
                    <Button className="bg-secondary font-semibold">Update</Button>
                </form>
            </div>
        </div>



    )
}
