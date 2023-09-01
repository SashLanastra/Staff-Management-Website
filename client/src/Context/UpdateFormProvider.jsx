import { createContext, useState } from "react";


const UpdateFormContext = createContext();

export const UpdateFormProvider = ({children}) => {
    const [updateForm, setUpdateForm] = useState(false)

    const updateFormTrue = () => {
        setUpdateForm(true)
    };

    const updateFormFalse = () => {
        setUpdateForm(false)
    };

    const updateFormToggle = () => {
        setUpdateForm(!updateForm)
    }

    return (
        <UpdateFormContext.Provider value ={{updateForm, updateFormTrue, updateFormFalse, updateFormToggle}}>
            {children}
        </UpdateFormContext.Provider>
    )

}

export default UpdateFormContext;