import './SidebarNav.css';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import NavBarButton from "../ui/navBarButton/navBarButton.jsx";
import NavBarCta from "../ui/navBarCta/NavBarCta.jsx";
// import {Link, useNavigate} from "react-router-dom";
import NavBarLink from "../ui/navBarLink/NavBarLink.jsx";
import AvatarBlankImg from '../../assets/avatar-blank.png' ;
import {Link} from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa6";
import { GiSmart } from "react-icons/gi";
import { IoLogOutSharp } from "react-icons/io5";

export default function SidebarNav({image}) {
    const {logout, user} = useContext(AuthContext);
    const [profileImage, setProfileImage] = useState('')

    const isPolitician = (user.role === "POLITICIAN");
    console.log(user);

    useEffect(() => {
        setProfileImage(user.imgUrl)
    }, [image]);

    function logouthandler() {
        const confirm = window.confirm("Weet u zeker dat u wilt uitloggen?");
        if (confirm) {
            logout();
        }
    }


    return (
        <aside className='sidebar-nav-container'>
            {image ? (
                <div className="sidebar-avatar">
                    <div>
                        <img src={profileImage} alt={`Een profielfoto van ${user.username}`}/>
                    </div>
                </div>
            ) : (
                <div className="sidebar-avatar">
                    <Link to={`/user/${user.id}/avatar`}>
                        <img src={AvatarBlankImg} alt="Een placeholder van de profielfoto"/>
                    </Link>
                </div>
            )}

            <div className="sidebar-username-box">
                {isPolitician ? (
                        user.partyName != null ? (
                            <>
                                <div className="sidebar-username">
                                    {user?.partyName}
                                </div>
                                <div className="sidebar-username-small">
                                    ( {user?.username} )
                                </div>
                            </>
                        ) : (
                            <div className="sidebar-username">
                                {user?.username}
                            </div>
                        )
                ) : (
                    <div className="sidebar-username">
                        {user?.username}
                    </div>
                )}
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
                <NavBarLink label="Alle Ideeen" linkTo="/user/feed" icon={<FaHome/>} />
                <NavBarLink label="Mijn Account" linkTo="/user" icon={<FaIdCard />} />
                {!isPolitician && (
                    <NavBarLink label="Mijn Ideeen" linkTo="/user/ideas" icon={<GiSmart />} />
                )}
                <NavBarButton label="Uitloggen" type={'button'} onClick={logouthandler} icon={<IoLogOutSharp />}/>
            </div>
        </aside>
    )
}