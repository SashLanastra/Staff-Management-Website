import { forwardRef } from "react";
import { FaSearch } from "react-icons/fa";


export const Searchbar = forwardRef(({className, ...rest}, ref) => {
    return (
        <input 
            type="text" 
            className={`p-2 rounded-md w-full focus:outline-none lg:py-4 ${className}`} 
            {...rest} 
            ref={ref}
        />
    )
})