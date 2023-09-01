import React from 'react'

export const LoginCard = ({children}) => {
  return (
    <div className='flex justify-center items-center min-h-screen bg-tertiary'>
        <div className='flex flex-col max-w-md w-full gap-4'>{children}</div>
    </div>
  )
}

LoginCard.AboveCard = function ({children}) {
  return <div className='w-full'>{children}</div>
}

LoginCard.Body = function({children}) {
    return <div className='shadow bg-white p-6 rounded-lg'>{children}</div>
}

LoginCard.BelowCard = function({children}) {
    return <div className='flex justify-center'>{children}</div>
}
