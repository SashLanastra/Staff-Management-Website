import { useContext } from "react"
import FormContext from "../Context/FormProvider"

export const useForm = () => {
    return useContext(FormContext)
}