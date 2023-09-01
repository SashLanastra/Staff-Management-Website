import { useContext } from "react"
import UpdateFormContext from "../Context/UpdateFormProvider"

export const useUpdateForm = () => {
  return useContext(UpdateFormContext)
}
