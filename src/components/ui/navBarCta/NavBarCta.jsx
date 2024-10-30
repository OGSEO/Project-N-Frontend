import './NavBarCta.css';
import {Link} from "react-router-dom";

export default function NavBarCta({label, linkTo}) {
    return (
        <div className="navbar-cta-box">
            <Link to={linkTo}>
                <button>
                    {label}
                </button>
            </Link>
        </div>
    )
}