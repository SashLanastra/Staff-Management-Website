import { useState, createContext } from "react";


const EmployeeContext = createContext();

export const EmployeeProvider = ({children}) => {
    const [updateData, setUpdateData] = useState({
        lastName: '',
        address: '',
        role: '',
        cellphone: '',
        salary: '',
    })

    return (
        <EmployeeContext.Provider value={{updateData, setUpdateData}}>
            {children}
        </EmployeeContext.Provider>
    )
}

export default EmployeeContext