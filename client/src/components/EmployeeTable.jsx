import React from 'react'
import { Button } from './Button'
import { Link } from 'react-router-dom'
import { useUpdateForm } from '../Hooks/useUpdateForm'

const EmployeeTable = ({ data, setData, handleDelete, handleEmpFetch }) => {
    const { updateFormTrue } =useUpdateForm()
    return (
            <table className='hidden xl:table h-fit mt-8 mx-8 rounded-lg border-collapse'>
                <thead className='bg-primary rounded-t-lg'>
                    <tr className=''>
                        <th className='px-2 py-1 border-r border-tertiary rounded-tl-lg'>Avatar</th>
                        <th className='px-2 py-1 border-r border-tertiary'>Full Name</th>
                        <th className='px-2 py-1 border-r border-tertiary'>Role</th>
                        <th className='px-2 py-1 border-r border-tertiary'>Staff Code</th>
                        <th className='px-2 py-1 border-r border-tertiary'>Email</th>
                        <th className='px-2 py-1 border-r border-tertiary'>Cellphone</th>
                        <th className='px-2 py-1 border-r border-tertiary'>Salary</th>
                        <th className='px-2 py-1 rounded-tr-lg'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((employee, index) => {
                        return (
                            <tr 
                                key={index}
                                className='border-b border-secondary'
                            >
                                <td className='p-2'>
                                    <img
                                        src={`http://localhost:4000/images/${employee.avatarUrl}`}
                                        alt="Employee Avatar"
                                        className=' border border-primary w-12 emp-img rounded-full mx-auto'
                                    />
                                </td>
                                <td className='text-center p-2'>{employee.firstName} {employee.lastName}</td>
                                <td className='text-center p-2'>{employee.role}</td>
                                <td className='text-center p-2'>{employee.staffCode}</td>
                                <td className='text-center p-2'>{employee.email}</td>
                                <td className='text-center p-2'>{employee.cellphone}</td>
                                <td className='text-center p-2'>R{employee.salary}</td>
                                <td className='flex flex-col gap-2 justify-center p-2'>
                                    <Link to={`/staffdetails/${employee.id}`}>
                                    <Button className='bg-secondary'>Update</Button></Link>
                                    <Button 
                                        className='bg-deletecolor text-white'
                                        onClick={(e) => handleDelete(employee.id)}
                                    >Delete</Button>
                                </td>
                            </tr>
                        )

                    })}
                </tbody>
            </table>
      


    )
}

export default EmployeeTable