import { useState } from 'react'
import { Header } from '../components/Header'
import { Outlet } from 'react-router-dom'
import { useForm } from '../Hooks/useForm'
import { useUpdateForm } from '../Hooks/useUpdateForm'
import EmpSidebar from '../empComponents/EmpSidebar'
import { EmpHeader } from '../empComponents/EmpHeader'


export const EmpMainLayout = () => {
    const [menu, setMenu] = useState(false)
    const { form } = useForm()
    const { updateForm } = useUpdateForm()

    return (
        <div 
            id={menu || form || updateForm ? 'bg-scroll-disable' : ''}
            className='flex flex-col h-screen lg:flex-row'
        >
            <EmpSidebar />
            <EmpHeader menu={menu} setMenu={setMenu}/>
            <main className='w-full h-full'>
                <Outlet/>
            </main>
                    
        </div>
        
    )
}