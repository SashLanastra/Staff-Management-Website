import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Searchbar } from '../components/Searchbar';
import { Button } from '../components/Button';
import { AddEmpForm } from '../Forms/AddEmpForm';
import { EmpCard } from '../components/EmpCard';
import axios from 'axios';
import { useForm } from '../Hooks/useForm';
import EmployeeTable from '../components/EmployeeTable';
import { UpdateEmpForm } from '../Forms/UpdateEmpForm';
import { useUpdateForm } from '../Hooks/useUpdateForm';
import logo from '../assets/logo.svg'

export const StaffManagement = () => {
    const [data, setData] = useState([])
    const [query, setQuery] = useState('')
    const{form, formTrue} = useForm()
    const { updateForm } = useUpdateForm()

    const filteredItems = useMemo(() => {
        return data.filter(item => {
            return item.firstName.toLowerCase().includes(query.toLowerCase())
        })
    },[data, query]) 
   
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        axios.get('http://localhost:4000/getemployees')
        .then(res => {
            if(res.data.Status === 'Success') {
                console.log(res.data.Result)
                setData(res.data.Result)
            } else {
                alert("Error")
            }
            console.log(res)
        })
        .catch(err => console.log(err))
    },[])

    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/delete/${id}`)
        .then(res => {
            if(res.data.Status === 'Success') {
                window.location.reload(true);
            } else {
                alert("Error")
            }
        })
        .catch(err => console.log(err))
    }

   

    return (
        <section className='flex flex-col items-center w-full h-full'
        >
            <div className='flex flex-col w-full px-4 items-center mt-8 gap-8 sm:flex-row sm:justify-center sm:gap-12 '>
                <form className='w-full max-w-4xl' onSubmit={handleSubmit}>
                    <Searchbar
                        type='text'
                        placeholder='Search Employee. . .'
                        id='search'
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                    />
                </form>
                <Button
                    className='bg-secondary w-full max-w-4xl lg:py-4 sm:w-44'
                    onClick={() => formTrue()}
                >Add Employee</Button>
            </div>
            {form && <AddEmpForm />}
            {updateForm && <UpdateEmpForm/>}
            <div className='flex flex-col items-center w-full gap-4 mt-8 xl:hidden'>
                {filteredItems.map((employee, index) => {
                    return(
                        <EmpCard 
                        key={index}
                        employee={employee}
                        />
                    )
                })}
            </div>
            <EmployeeTable data={data} setData={setData} handleDelete={handleDelete} />
        </section>
    )
}
