import './TextField.css';
import {forwardRef} from "react";

export const TextField = forwardRef(({
                                         type = "text",
                                         className = "",
                                         label,
                                         error,
                                         ...other
                                     }, ref) => {
    return (
        <div className="form-input">
            <input
                type={type}
                className={`form-control ${className}`}
                placeholder={label}
                ref={ref}
                {...other}
            />
            {error && (
                <div className="error-feedback">{error.message}</div>
            )}
        </div>
    )
})