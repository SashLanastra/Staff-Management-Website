import axios from "axios";
import { createContext, useState } from "react";


const MaildataContext = createContext()

export const MailProvider = ({children}) => {
    const [ mailData, setMailData ] = useState({
        firstName: '',
        email: '',
        dob: '',
        isBirthday: false
    })

    const handleMailDetails = (id) => {
        axios.get(`http://localhost:4000/get/${id}`)
            .then(res => {

                if (res.data.Status === 'Success') {
                    setMailData({
                        ...mailData,
                        firstName: res.data.Result[0].firstName,
                        email: res.data.Result[0].email,
                        dob: res.data.Result[0].dob,
                        isBirthday: true
                    })
                } else {
                    alert('Error')
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <MaildataContext.Provider value={{mailData, handleMailDetails}}>
            {children}
        </MaildataContext.Provider>
    )
}

export default MaildataContext