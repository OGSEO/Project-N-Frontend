import './FormLink.css'
import {Link} from "react-router-dom";

export default function FormLink({children, linkTo, relativeTo}) {
    return (
        <Link to={linkTo} relative={relativeTo} className='form-link'>
            {children}
        </Link>
    )
}