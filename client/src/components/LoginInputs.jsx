import { forwardRef } from "react";


export const LoginInputs = forwardRef(({className, ...rest}, ref) => {
    return (
        <input
            className={`py-2 px-1 border border-secondary focus:border-blue-400 outline-none rounded w-full mb-4 ${className}`}
            {...rest}
            ref={ref}
        />
    )
})