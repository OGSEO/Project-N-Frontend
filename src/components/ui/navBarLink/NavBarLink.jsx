import './navBarLink.css'
import {Link} from "react-router-dom";

export default function NavBarLink({label, linkTo}) {

    return (
        <div className="navbar-link-box">
            <Link className="navbar-link" to={linkTo}>
                <div>{label}</div>
            </Link>
        </div>
    )
}