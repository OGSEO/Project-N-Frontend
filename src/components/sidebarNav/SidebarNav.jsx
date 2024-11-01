import './SidebarNav.css';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import NavBarButton from "../ui/navBarButton/navBarButton.jsx";
import NavBarCta from "../ui/navBarCta/NavBarCta.jsx";
// import {Link, useNavigate} from "react-router-dom";
import NavBarLink from "../ui/navBarLink/NavBarLink.jsx";
import AvatarBlankImg from '../../assets/avatar-blank.png' ;
import {Link} from "react-router-dom";

export default function SidebarNav() {
    const {logout, user} = useContext(AuthContext);
    const isPolitician = (user.role === "POLITICIAN");
    console.log(user);

    function logouthandler() {
        const confirm = window.confirm("Weet u zeker dat u wilt uitloggen?");
        if (confirm) {
            logout();
        }
    }

    const [avatarUrl, setAvatarUrl] = useState(`http://localhost:8080/user/${user.id}/avatar`);

    return (
        <aside className='sidebar-nav-container'>
            {user.hasProfileImage ? (
                <div className="sidebar-avatar">
                    <div>
                        <img src={avatarUrl} alt={`Een profielfoto van ${user.username}`}/>
                    </div>
                </div>
            ) : (
                <div className="sidebar-avatar">
                        <Link to={`/user/${user.id}/avatar`}>
                            <img src={AvatarBlankImg} alt="Een placeholder van de profielfoto"/>
                        </Link>
                </div>
            )}

            <div className="sidebar-username">
                {user?.username}
            </div>

            {isPolitician && !user.hasParty && (
                <div className="sidebar-cta-box">
                    <NavBarCta label="Aanmelden Politieke Partij" linkTo="/user/new-political-party"/>
                </div>
            )}
            {!isPolitician && (
                <div className="sidebar-cta-box">
                    <NavBarCta label="Ik heb een idee" linkTo="/user/ideas/new-idea"/>
                </div>
            )}

            <div className="sidebar-nav-menu">
                <NavBarLink label="Home" linkTo="/user/feed"/>
                <NavBarLink label="Mijn Account" linkTo="/user"/>
                <NavBarLink label="Mijn Avatar" linkTo={`/user/${user.id}/avatar`}/>
                <NavBarLink label="Mijn Ideeen" linkTo="/user/ideas"/>
                <NavBarButton label="Uitloggen" type={'button'} onClick={logouthandler}/>
            </div>
        </aside>
    )
}