import React, { useState } from 'react'
import { Button } from '../components/Button'
import { FormInput } from '../components/FormInput'
import axios from 'axios'
import { useForm } from '../Hooks/useForm'

export const AddEmpForm = () => {
    const {form, formFalse} = useForm()
    const[newEmpData, setNewEmpdata] = useState({
        firstName: '',
        lastName: '',
        email: '',
        staffCode: '',
        idNumber: '',
        password: '',
        address: '',
        role:'',
        cellphone: '',
        gender: '',
        dob: '',
        salary: '',
        doe: '',
        avatarUrl: ''
    })

    const handleForm = (e) => {
        const{name, value} = e.target
        setNewEmpdata(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
        console.log(newEmpData)
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("firstName", newEmpData.firstName);
        formdata.append("lastName", newEmpData.lastName);
        formdata.append("email", newEmpData.email);
        formdata.append("password", newEmpData.password);
        formdata.append("idNumber", newEmpData.idNumber);
        formdata.append("staffCode", newEmpData.staffCode);
        formdata.append("role", newEmpData.role);
        formdata.append("address", newEmpData.address);
        formdata.append("cellphone", newEmpData.cellphone);
        formdata.append("gender", newEmpData.gender);
        formdata.append("dob", newEmpData.dob);
        formdata.append("salary", newEmpData.salary);
        formdata.append("doe", newEmpData.doe);
        formdata.append("avatarUrl", newEmpData.avatarUrl);
        axios.post('http://localhost:4000/create', formdata)
        .then(res => {
            if(res.data.Status === 'Success') {
                window.location.reload(true);
                formFalse();
            } else {
                alert('Error')
            }
            
        })
        .catch(err => console.log(err))
    }

  return (
    <div 
        className='flex h-screen w-full items-center justify-center absolute top-0 left-0 backdrop-blur-lg z-20'
        id={ form ? 'modal-bg': ''}
        onClick={(e) => {
            if(e.target.id === 'modal-bg') {
                formFalse()
            }
        }}
    >
        <div 
            className='flex flex-col gap-4 p-4 w-full h-full max-w-md backdrop-blur-md rounded-lg md:max-w-3xl overflow-y-scroll formCard'
            id='modal-container'
        >
            <Button 
                className='bg-secondary px-4 font-semibold w-fit ml-auto'
                onClick={() => formFalse()}
            >Close</Button>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName" className='text-white'>First Name</label>
                <FormInput 
                    id="firstName"
                    type="text"
                    placeholder="Enter Employee's First Name. . ."
                    required
                    name="firstName"
                    value={newEmpData.firstName}
                    onChange={handleForm}
                    autoComplete='off'
                    
                />
                <label htmlFor="lastName" className='text-white'>Last Name</label>
                <FormInput 
                    id="lastName"
                    type="text"
                    placeholder="Enter Employee's Last Name. . ."
                    required
                    name="lastName"
                    value={newEmpData.lastName}
                    onChange={handleForm}
                    autoComplete='off'
                    
                />
                <label htmlFor="email" className='text-white'>Email</label>
                <FormInput
                    id="email"
                    type="email"
                    placeholder="Enter Employee's email. . ."
                    required
                    name="email"
                    value={newEmpData.email}
                    onChange={handleForm}
                    autoComplete='off'
                    
                />
                <label htmlFor="password" className='text-white'>Password</label>
                <FormInput 
                    id="password"
                    type="password"
                    placeholder="Enter a Password. . ."
                    required
                    name="password"
                    value={newEmpData.password}
                    onChange={handleForm}
                    autoComplete='off'
                    
                />
                <label htmlFor="idNumber" className='text-white'>ID Number</label>
                <FormInput 
                    id="idNumber"
                    type="text"
                    placeholder="Enter Employee's ID Number. . ."
                    required
                    name="idNumber"
                    value={newEmpData.idNumber}
                    onChange={handleForm}
                    autoComplete='off'
                    
                />
                <label htmlFor="staffCode" className='text-white'>Staff Code</label>
                <FormInput 
                    id="staffCode"
                    type="text"
                    placeholder="Enter Employee's Staff Code. . ."
                    required
                    name="staffCode"
                    value={newEmpData.staffCode}
                    onChange={handleForm}
                    autoComplete='off'
                    
                />
                <label htmlFor="role" className='text-white'>Role</label>
                <FormInput 
                    id="role"
                    type="text"
                    placeholder="Enter Employee's Role. . ."
                    required
                    name="role"
                    value={newEmpData.role}
                    onChange={handleForm}
                    autoComplete='off'   
                />
                <label htmlFor="address" className='text-white'>Home Address</label>
                <FormInput 
                    id="address"
                    type="text"
                    placeholder="Enter Employee's Home Address. . ."
                    required
                    name="address"
                    value={newEmpData.address}
                    onChange={handleForm}
                    autoComplete='off'
                    
                />
                <div className='grid grid-cols-2 gap-2 md:justify-between' id='cell-gen-dob'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="address" className='text-white'>Cellphone</label>
                        <FormInput 
                            id="cellphone"
                            type="text"
                            placeholder="Enter Cellphone. . ."
                            required
                            name="cellphone"
                            value={newEmpData.cellphone}
                            onChange={handleForm}
                            autoComplete='off'
                            
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="address" className='text-white'>Gender</label>
                        <select 
                            name="gender" 
                            id="gender"
                            value={newEmpData.gender}
                            onChange={handleForm}
                            className="outline-none appearance-none border border-secondary bg-formbg  rounded-lg text-center p-2 mb-2 text-white"
                        >
                            <option className= "text-slate"value="">--Select--</option>
                            <option className= "text-black"value="male">Male</option>
                            <option className= "text-black"value="female">Female</option>
                            <option className= "text-black"value="nonbinary">Non-binary</option>
                        </select>
                    </div>
                    <div >
                        <label htmlFor="dob" className='text-white'>Date Of Birth</label>
                        <FormInput 
                            id="dob"
                            type="date"
                            required
                            name="dob"
                            value={newEmpData.dob}
                            onChange={handleForm}
                            className=""
                            autoComplete='off'
                            
                        />
                    </div>
                
                
                    <div className='w-full'>
                        <label htmlFor="salary" className='text-white'>Salary</label>
                        <FormInput 
                            id="salary"
                            type="text"
                            placeholder="Enter Salary. . ."
                            required
                            name="salary"
                            value={newEmpData.salary}
                            onChange={handleForm}
                            autoComplete='off'
                        />
                    </div>
                    <div>
                        <label htmlFor="doe" className='text-white'>Date Of Employment</label>
                        <FormInput 
                            id="doe"
                            type="date"
                            required
                            name="doe"
                            value={newEmpData.doe}
                            onChange={handleForm}
                            className="w-full"
                            autoComplete='off'
                            
                        />
                    </div>
                    <div>
                    <label htmlFor="avatarUrl" className='text-white'>Image</label>
                    <FormInput 
                        id="avatarUrl"
                        type="file"
                        required
                        onChange={(e) => setNewEmpdata({...newEmpData, avatarUrl: e.target.files[0]})}
                        className="w-full mb-4"
                        
                    />
                    </div>
                </div>
                <Button className="bg-secondary font-semibold">Submit</Button>
            </form>
        </div>
    </div>
    
  )
}
