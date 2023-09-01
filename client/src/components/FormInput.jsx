import { forwardRef } from "react"


export const FormInput = forwardRef(({className, ...rest}, ref) => {
    return (
        <input 
            className={`p-2 rounded-lg w-full border border-secondary bg-formbg text-white focus:outline-none focus:bg-none mb-2 ${className}`}
            {...rest}
            ref={ref}
        />
    )
})