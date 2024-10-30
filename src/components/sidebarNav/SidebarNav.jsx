import './SidebarNav.css';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import NavBarButton from "../ui/navBarButton/navBarButton.jsx";
import NavBarCta from "../ui/navBarCta/NavBarCta.jsx";
import {Link, useNavigate} from "react-router-dom";

export default function SidebarNav() {
    const { logout, user } = useContext(AuthContext);

    function logouthandler() {
        const confirm = window.confirm("Weet u zeker dat u wilt uitloggen?");
        if (confirm) {
            logout();
        }
    }
    const [avatarUrl, setAvatarUrl] = useState("http://localhost:8080/user/1/avatar");

    // useEffect(() => {
    //     if (auth.user.avatar === null ) {
    //         setAvatarUrl(`http://localhost:8080/user/0/avatar`)
    //     } else {
    //         setAvatarUrl(`http://localhost:8080/user/1/avatar`)
    //     }
    // }, [avatarUrl]);

    return (
        <aside className='sidebar-nav-container'>
            <div className="sidebar-avatar">
                <div>
                    {/*<Link to={`/users/1/avatar`}>*/}
                        {}
                        <img src={avatarUrl}/>
                    {/*</Link>*/}
                    IMG
                </div>
            </div>
            <div className="sidebar-username">
                {user?.username}
            </div>
            <div className="sidebar-cta-box">
                <NavBarCta label="Ik heb een idee" linkTo="/user/ideas/new-idea"/>
            </div>
            <div className="sidebar-cta-box">
                <NavBarCta label="Aanmelden Politieke Partij" linkTo="/user/new-political-party"/>
            </div>
            <div className="sidebar-nav-menu">
                <NavBarButton label="Mijn Account" linkTo="/user"/>
                <NavBarButton label="Mijn Avatar" linkTo="/user/1/avatar"/>
                <NavBarButton label="Mijn Feed" linkTo="/user/feed"/>
                <NavBarButton label="Mijn Ideeen" linkTo="/user/ideas"/>
                <NavBarButton label="Uitloggen" type={'button'} onClick={logouthandler}/>
            </div>
        </aside>
    )
}