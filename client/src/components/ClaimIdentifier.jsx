import React from 'react'
import { Link } from 'react-router-dom'

export const ClaimIdentifier = ({ singleclaim }) => {

    return (
        <Link to={`/claimsdetails/${singleclaim.employeeId}`}>
            <div className='flex gap-4 items-center justify-center sm:justify-start sm:ml-8'>
                <img src={`https://hr-systema.onrender.com/images/${singleclaim.avatarUrl}`} alt="Employee Avatar" className='emp-img rounded-full w-12' />
                <div>
                    <p className='hidden sm:block'>{singleclaim.firstName} {singleclaim.lastName}</p>
                    <p className='text-opaqueblack'>{singleclaim.staffCode}</p>
                </div>
            </div>
        </Link>
    )
}
