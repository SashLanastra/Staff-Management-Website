import React from 'react';
import { Link } from 'react-router-dom';

export const EmpCard = ({ employee }) => {

    return (
        
            <div className='bg-unicolor w-full max-w-md py-4 px-8 rounded-lg shadow-lg'>
                <Link to={`/staffdetails/${employee.id}`} className='flex items-center gap-8'>
                
                    <img src={`https://hr-systema.onrender.com/images/${employee.avatarUrl}`} alt="Employee Avatar"
                        className=' border border-primary w-20 emp-img rounded-full'
                    />
                
                
                    <div className=''>
                        <p>{employee.firstName} {employee.lastName}</p>
                        <p>{employee.staffCode}</p>
                        <p>{employee.role}</p>
                        <p>{employee.email}</p>
                        <p>{employee.idNumber}</p>
                        <p>{employee.cellphone}</p>
                    </div>
                </Link>
            </div>
       
    )
}
