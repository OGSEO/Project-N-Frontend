import './NoIdeasYet.css'
import {GiSmart} from "react-icons/gi";
import {Link} from "react-router-dom";

export default function NoIdeasYet({children, linkText}) {
    return (
        <div className='no-ideas-container'>
            <GiSmart className='no-content-icon'/>
            <span className='no-content-title'>{children}</span>
            <Link className='no-content-cta' to="/user/ideas/new-idea">
                {linkText}
            </Link>

        </div>
    )
}