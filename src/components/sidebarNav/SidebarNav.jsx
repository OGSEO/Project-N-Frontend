import './SidebarNav.css';
import {Link, useNavigate} from "react-router-dom";
import ApiService from "../../service/ApiService.js";

export default function SidebarNav() {
    const navigate = useNavigate();

    function logouthandler() {
        const confirm = window.confirm("Weet u zeker dat u wilt uitloggen?");
        if (confirm) {
            ApiService.logout();
            navigate("/");
        }
    }

    return (
        <div className='sidebar-nav'>
            <h2>Sidebar Nav</h2>
            <Link to="/user">Mijn Account</Link>
            <Link to="/ideas">Alle Ideeen</Link>
            <Link to="/ideas/new-idea">Ik heb een idee</Link>
            <Link to="/user/new-political-party">Aanmelden Politieke Partij</Link>
            <button onClick={logouthandler}>Uitloggen</button>
        </div>
    )
}