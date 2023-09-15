import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { ClaimIdentifier } from '../components/ClaimIdentifier'
import { Searchbar } from '../components/Searchbar'

export const EmpClaims = () => {
    const [claims, setClaims] = useState([])
    const [ query, setQuery ] = useState('')

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal
        axios.get('https://hr-systema.onrender.com/getclaims', {signal})
            .then(res => {
                console.log(res)
                if (res.data.Status === 'Success') {
                    setClaims(res.data.Result)
                }
            })
            .catch(err => console.log(err))

        return () => {
            controller.abort()
        }
    }, [])

    const filteredItems = useMemo(() => {
        return claims.filter(item => {
            return item.lastName.toLowerCase().includes(query.toLowerCase())
        })
    },[claims, query])
    // const filteredItems = useMemo(() => {
    //     return claims.filter(item => {
    //         return item.firstName
    //     })
    // },[claims, query])

    return (
        <section className='flex flex-col gap-8 max-w-4xl mx-auto'>
            <div className='flex flex-col gap-8 mt-8 sm:mt-24 mx-8'>
                <Searchbar 
                    type='text'
                    placeholder='Search Claim By Employee Name. . .'
                    onChange={e => setQuery(e.target.value)}
                    
                />
            </div>
            {claims.length ? <div className='border border-secondary rounded-lg shadow-lg mx-8'>
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
                        {filteredItems.map((singleclaim, index) => {
                            return (
                                !singleclaim.paid && <tr key={index} className='border-b border-secondary'>
                                    <td className='py-2 border-r border-secondary'>
                                        <ClaimIdentifier singleclaim={singleclaim} />
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
            </div> : <p className='text-center font-bold text-xl'>There are no claims</p>}
        </section>
    )
}
