import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { FormProvider } from './Context/FormProvider'
import { UpdateFormProvider } from './Context/UpdateFormProvider'
import { EmployeeProvider } from './Context/Employee.Provider'
import { MailProvider } from './Context/MaildataProvider'



ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <FormProvider>
            <UpdateFormProvider>
                <EmployeeProvider>
                    <MailProvider>
                        <RouterProvider router={router} />
                    </MailProvider>
                </EmployeeProvider>
            </UpdateFormProvider>
        </FormProvider>
    </React.StrictMode>
)
