import React from 'react'
import { BdayBoard } from '../components/BdayBoard'
import { useForm } from '../Hooks/useForm'

export const Birthdays = () => {
  const { form, setForm } = useForm()
  return (
    <section className='mt-8'>
      <BdayBoard/>
    </section>
  )
}
