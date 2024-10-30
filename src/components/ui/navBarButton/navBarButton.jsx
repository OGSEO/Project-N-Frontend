import './navBarButton.css'
import {Link} from "react-router-dom";

export default function NavBarButton({label, linkTo, onClick, type}) {

    return (
        <div className="navbar-button-box">
            {/*<Link to={linkTo}>*/}
                <button type={type} onClick={onClick}>
                    {label}
                </button>
            {/*</Link>*/}
        </div>
    )
}