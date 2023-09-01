import { createContext, useState } from "react"


const FormContext = createContext()

export const FormProvider = ({ children }) => {
    const [form, setForm] = useState(false)

    const formTrue = () => {
        setForm(true)
    }

    const formFalse = () => {
        setForm(false)
    }

    const formToggle = () => {
        setForm(!form)
    }

    return (
        <FormContext.Provider value={{form, formTrue, formFalse, formToggle}}>
            {children}
        </FormContext.Provider>
    )
}

export default FormContext;

