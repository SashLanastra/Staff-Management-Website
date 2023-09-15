import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import vector from '../assets/Vector.svg'
import file from '../assets/FileVector.svg'
import { Button } from '../components/Button'

export const ClaimsDetail = () => {
    const [claimSummary, setClaimSummary] = useState([])
    const [claimeeDetails, setClaimeeDetails] = useState('')

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`https://hr-systema.onrender.com/getclaims/${id}`)
            .then(res => {
                if(res.data.Status === "Success") {
                    console.log(res.data.Result[0].amount)
                    setClaimSummary(res.data.Result)
                    const setEmpDetails = () => {
                        setClaimeeDetails({
                            ...claimeeDetails,
                            avatarUrl: res.data.Result[0].avatarUrl,
                            firstName: res.data.Result[0].firstName,
                            lastName: res.data.Result[0].lastName,
                            staffCode: res.data.Result[0].staffCode
                        })
                    }
                    setEmpDetails()
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handPaidClaims = () => {
        axios.put(`https://hr-systema.onrender.com/updateclaim/${id}`)
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/employeeclaims')
            } else { alert('Error')}
        })
        .catch(err => console.log(err))
    }


    return (
        <div className='flex flex-col items-center mt-8 mb-8 mx-8 gap-8'>
            <img src={`https://hr-systema.onrender.com/images/${claimeeDetails.avatarUrl}`} alt="" className='rounded-full emp-img w-40 sm:w-64' />
            <div className='flex flex-col items-center'>
                <p className='text-2xl'>{claimeeDetails.firstName} {claimeeDetails.lastName}</p>
                <p className='text-lg text-primary'>{claimeeDetails.staffCode}</p>
            </div>
            <Button 
                className='bg-secondary w-full max-w-sm sm:max-w-2xl'
                onClick={handPaidClaims}
            >Mark All As Paid</Button>
            <div className='border rounded-lg border-secondary shadow-lg w-full max-w-2xl'>
                <table className='w-full'>
                    <thead>
                        <tr className='bg-primary rounded-lg'>
                            <th className='rounded-tl-lg py-1 px-2 border-r border-tertiary'>Details</th>
                            <th className='py-1 px-2 border-r border-tertiary'>Amount</th>
                            <th className='hidden sm:table-cell px-2 py-1 border-r border-tertiary'>Date</th>
                            <th className='rounded-tr-lg px-2 py-1'><img src={vector} alt="attachement icon" className='mx-auto' /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {claimSummary.map((claim, index) => {
                            return (
                                <tr key={index} className='border-t border-secondary'>
                                    <td className='px-3 py-2 rounded-bl-lg border-r border-secondary'>{claim.details}</td>
                                    <td className='px-3 py-2 border-r border-secondary text-center'>R{claim.amount}</td>
                                    <td className='hidden sm:table-cell px-3 py-2 border-r border-secondary text-center'>{claim.date}</td>
                                    <td className=' rounded-br-lg'>
                                        <a href={`https://hr-systema.onrender.com/claimages/${claim.proof}`} target='_blank' className='block w-full py-4'>
                                            <img src={file} alt="" className='mx-auto' />
                                        </a>
                                    </td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
