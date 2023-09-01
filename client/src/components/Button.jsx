import { forwardRef } from "react"


export const Button = forwardRef(({className, children,...rest}, ref) => {
    return (
        <button 
            className={`p-2 rounded-md hover:bg-slate hover:text-white ${className}`}
            {...rest}
            ref={ref}
        >               
            {children}
        </button>
    )
}) 