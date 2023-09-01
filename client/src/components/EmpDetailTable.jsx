import React from 'react'

export const EmpDetailTable = ({employeeData}) => {
     
  return (
    <table className='sm:w-3/5 shadow-lg'>
        <tr className=''>
            <th className='border-b border-tertiary rounded-tl-lg px-4 py-2 bg-primary'>Full Name</th>
            <td className='border-b border-secondary rounded-tr-lg bg-unicolor px-4 py-4'>{employeeData.firstName} {employeeData.lastName}</td>
        </tr>
        <tr className=''>
            <th className='border-b border-tertiary px-4 py-2 bg-primary'>Staff Code</th>
            <td className='bg-unicolor px-4 py-4 border-b border-secondary'>{employeeData.staffCode}</td>
        </tr>
        <tr className=''>
            <th className='border-b border-tertiary px-4 py-2 bg-primary'>Role</th>
            <td className='bg-unicolor px-4 py-4 border-b border-secondary'>{employeeData.role}</td>
        </tr>
        <tr className=''>
            <th className='border-b border-tertiary px-4 py-2 bg-primary'>Email</th>
            <td className='bg-unicolor px-4 py-4 border-b border-secondary'>{employeeData.email}</td>
        </tr>
        <tr className=''>
            <th className='border-b border-tertiary px-4 py-2 bg-primary'>Cellphone</th>
            <td className='bg-unicolor px-4 py-4 border-b border-secondary'>{employeeData.cellphone}</td>
        </tr>
        <tr className=''>
            <th className='border-b border-tertiary px-4 py-2 bg-primary'>ID Number</th>
            <td className='bg-unicolor px-4 py-4 border-b border-secondary'>{employeeData.idNumber}</td>
        </tr>
        <tr className=''>
            <th className='border-b border-tertiary px-4 py-2 bg-primary'>Home Address</th>
            <td className='bg-unicolor px-4 py-4 border-b border-secondary'>{employeeData.address}</td>
        </tr>
        <tr className=''>
            <th className='border-b border-tertiary px-4 py-2 bg-primary'>Date Of Birth</th>
            <td className='bg-unicolor px-4 py-4 border-b border-secondary'>{employeeData.dob}</td>
        </tr>
        <tr className=''>
            <th className='border-b border-tertiary px-4 py-2 bg-primary'>Gender</th>
            <td className='bg-unicolor px-4 py-4 border-b border-secondary'>{employeeData.gender}</td>
        </tr>
        <tr className=''>
            <th className='border-b border-tertiary px-4 py-2 bg-primary sm:w-2/5'>Date Of Employment</th>
            <td className='bg-unicolor px-4 py-4 border-b border-secondary'>{employeeData.doe}</td>
        </tr>
        <tr className=''>
            <th className='border-b rounded-bl-lg border-tertiary px-4 py-2 bg-primary'>Salary</th>
            <td className='bg-unicolor px-4 py-4  rounded-br-lg'>R{employeeData.salary}</td>
        </tr>
        
        
    </table>
  )
}
