import React, { useContext } from 'react'
import EmployeeContext from '../Context/Employee.Provider'

export const useEmployee = () => {
  return useContext(EmployeeContext)
}
