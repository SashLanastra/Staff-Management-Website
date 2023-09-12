import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const ClaimIndentifier = ({ singleclaim }) => {
    const [claimId, setClaimId] = useState('')

    useEffect(() => {
        const controller = new AbortController;
        const signal = controller.signal;
        axios.get(`https://hr-systema.onrender.com/get/${parseInt(singleclaim.employeeId)}`, signal)
            .then(res => {
                if (res.data.Status === 'Success') {
                    setClaimId(res.data.Result[0])
                }
            })
            .catch(err => console.log(err))

            return () => {
                controller.abort()
            }
    }, [])

    return (
        <Link to={`/claimsdetails/${claimId.id}`}>
            <div className='flex gap-4 items-center justify-center sm:justify-start sm:ml-8'>
                <img src={`https://hr-systema.onrender.com/${claimId.avatarUrl}`} alt="Employee Avatar" className='emp-img rounded-full w-12' />
                <div>
                    <p className='hidden sm:block'>{claimId.firstName} {claimId.lastName}</p>
                    <p className='text-opaqueblack'>{claimId.staffCode}</p>
                </div>
            </div>
        </Link>
    )
}
