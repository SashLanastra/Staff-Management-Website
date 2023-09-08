import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../components/Button';
import { FormInput } from '../../components/FormInput';
import axios from 'axios';



export const Claims = () => {
    const { id } = useParams()
    const [claimInfo, setClaimInfo] = useState({
        employeeId: id,
        details: '',
        claim: '',
        claimDate: '',
        proof: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClaimInfo({
            ...claimInfo,
            [name] : value
        })
        console.log(claimInfo)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("employeeId", claimInfo.employeeId);
        formData.append("details", claimInfo.details);
        formData.append("claim", claimInfo.claim);
        formData.append("claimDate", claimInfo.claimDate);
        formData.append("proof", claimInfo.proof);
        axios.post('http://localhost:4000/createClaim', formData)
        .then(res => {
            if(res.data.Status === 'Success') {
                alert('Claim has been sent');
                window.location.reload(true)
            } else {
                alert('Error')
                console.log(res)
            }
        })
        .catch(err => console.log(err))
    }


    return (
        <div
            className='flex h-full items-center justify-center  z-20' 
        >
            <div
                className='p-4 w-full max-w-md backdrop-blur-md rounded-lg md:max-w-3xl overflow-y-scroll bg-opaqueblack '
                id='modal-container'
            >
                <form onSubmit={handleSubmit}>
                    <label htmlFor="details" className='text-white'>Details</label>
                    <FormInput
                        id="details"
                        type="text"
                        placeholder="Enter Reason For Claim. . ."
                        required
                        name="details"
                        autoComplete='off'
                        value={claimInfo.details}
                        onChange={handleChange}

                    />
                    <label htmlFor="claim" className='text-white'>Claim Amount</label>
                    <FormInput
                        id="claim"
                        type="text"
                        placeholder="Enter Claim Amount. . ."
                        required
                        name="claim"
                        autoComplete='off'
                        value={claimInfo.claim}
                        onChange={handleChange}

                    />
                    <label htmlFor="claimDate" className='text-white'>Claim Date</label>
                    <FormInput
                        id="claimDate"
                        type="date"
                        required
                        name="claimDate"
                        value={claimInfo.claimDate}
                        onChange={handleChange}
                    />
                    <label htmlFor="proof" className='text-white'>Attachment</label>
                    <FormInput 
                        id="proof"
                        type="file"
                        required
                        onChange={(e) => setClaimInfo({...claimInfo, proof: e.target.files[0]})}
                        className="w-full mb-4"
                    />
                    
                    <Button className="bg-secondary font-semibold">Submit</Button>
                </form>
            </div>
        </div>
    )
}