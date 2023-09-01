import React, { useContext } from 'react'
import MaildataContext from '../Context/MaildataProvider'

export const useMaildata = () => {
  return useContext(MaildataContext)
}
