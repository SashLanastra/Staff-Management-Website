import { forwardRef } from 'react'

export const LoginButton = forwardRef(({className,children,...rest}, ref) => {
    return (
        <button
        className={`bg-primary rounded p-2 w-full text-black font-bold hover:bg-slate focus:bg-slate-600 ${className}`}
        {...rest}
        ref={ref}
        >
            {children}
        </button>
    ) 
}) 