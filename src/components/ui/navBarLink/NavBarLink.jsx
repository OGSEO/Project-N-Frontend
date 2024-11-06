import './navBarLink.css'
import {NavLink} from "react-router-dom";

export default function NavBarLink({label, linkTo, icon}) {

    return (
        <NavLink className="navbar-link" to={linkTo}>
            <div className="navbar-link-box">
                <div className='navbar-link-icon'>
                    {icon}
                </div>
                <div className='navbar-link-title'>{label}</div>
            </div>
        </NavLink>
    )
}