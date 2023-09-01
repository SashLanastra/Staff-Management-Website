import { useState } from 'react'
import { Header } from '../components/Header'
import SideBar from '../components/SiderBar'
import { Outlet } from 'react-router-dom'
import { useForm } from '../Hooks/useForm'
import { useUpdateForm } from '../Hooks/useUpdateForm'


export const MainLayout = () => {
    const [menu, setMenu] = useState(false)
    const { form } = useForm()
    const { updateForm } = useUpdateForm()

    return (
        <div 
            id={menu || form || updateForm ? 'bg-scroll-disable' : ''}
            className='flex flex-col lg:flex-row'
        >
            <SideBar />
            <Header menu={menu} setMenu={setMenu}/>
            <main className='w-full'>
                <Outlet/>
            </main>
                    
        </div>
        
    )
}
