import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '../components/Button'
import { ClaimIndentifier } from '../components/ClaimIndentifier'
import { FormInput } from '../components/FormInput'

export const EmpClaims = () => {
    const [claims, setClaims] = useState([])

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal
        axios.get('http://localhost:4000/getclaims', {signal})
            .then(res => {
                if (res.data.Status === 'Success') {
                    setClaims(res.data.Result)
                }
            })
            .catch(err => console.log(err))

        return () => {
            controller.abort()
        }

    }, [])

    console.log(claims)

    // const filteredItems = useMemo(() => {
    //     return claims.filter(item => {
    //         return item.firstName
    //     })
    // },[claims, query])

    return (
        <section className='flex flex-col gap-8 max-w-4xl mx-auto'>
            <div className='flex flex-col gap-8 mt-8 sm:mt-24 mx-8'>
                
                <FormInput 
                    className='bg-white border-none'
                    placeholder='Search Employee Claim. . .'
                />
            </div>
            <div className='border border-secondary rounded-lg shadow-lg mx-8'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th className='bg-primary border-r border-collapse border-tertiary w-1/2 rounded-tl-lg lg:w-1/3'>
                                Employee
                            </th>
                            <th className='hidden lg:block bg-primary border-r border-collapse border-tertiary'>
                                Claim Date
                            </th>
                            <th className='bg-primary border-collapse rounded-tr-lg'>
                                Claims Total
                            </th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {claims.map((singleclaim, index) => {
                            return (
                                <tr key={index} className='border-b border-secondary'>
                                    <td className='py-2 border-r border-secondary'>
                                        <ClaimIndentifier singleclaim={singleclaim} />
                                    </td>
                                    <td className='hidden lg:table-cell border-r text-center border-secondary'>
                                        {singleclaim.date}
                                    </td>
                                    <td className='font-bold text-center'>
                                        R{singleclaim.amount}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
