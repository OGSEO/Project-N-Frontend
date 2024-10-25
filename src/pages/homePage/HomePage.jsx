import './HomePage.css';
import {Link} from "react-router-dom";

export default function HomePage() {
    return (
        <div className="homepage-container">
            <div className="home-left">
                <h2>Registreren voor Burgers</h2>
                <Link to="register/CITIZEN">Registreren</Link>
                <Link to="login">Login</Link>
            </div>
            <div className="home-right">
                <h2>Registreren voor Politici</h2>
                <Link to="register/POLITICIAN">Registreren</Link>
                <Link to="login">Login</Link>
            </div>
        </div>
    )
}