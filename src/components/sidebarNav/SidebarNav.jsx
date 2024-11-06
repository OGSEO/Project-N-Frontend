import styles from './SidebarNav.module.css';
import {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext.jsx";
import NavBarButton from "../ui/navBarButton/navBarButton.jsx";
import NavBarCta from "../ui/navBarCta/NavBarCta.jsx";
import NavBarLink from "../ui/navBarLink/NavBarLink.jsx";
import AvatarBlankImg from '../../assets/avatar-blank.png' ;
import {Link} from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa6";
import { GiSmart } from "react-icons/gi";
import { IoLogOutSharp } from "react-icons/io5";
import ContainerBox from "../ui/containerBox/ContainerBox.jsx";
import ContentBox from "../ui/contentBox/ContentBox.jsx";
import AvatarBox from "../ui/avatarBox/AvatarBox.jsx";

export default function SidebarNav({image}) {
    const {logout, user} = useAuth();

    const isPolitician = (user.role === "POLITICIAN");

    function logouthandler() {
        const confirm = window.confirm("Weet u zeker dat u wilt uitloggen?");
        if (confirm) {
            logout();
        }
    }

    return (
        <ContainerBox useCase='sidebar'>
            <AvatarBox image={image} />
            <ContentBox>

            <div className={styles.sidebarUsernameBox}>
                {isPolitician ? (
                        user.partyName != null ? (
                            <>
                                <div className={styles.sidebarUsername}>
                                    {user?.partyName}
                                </div>
                                <div className={styles.sidebarUsernameSmall}>
                                    ( {user?.username} )
                                </div>
                            </>
                        ) : (
                            <div className={styles.sidebarUsername}>
                                {user?.username}
                            </div>
                        )
                ) : (
                    <div className={styles.sidebarUsername}>
                        {user?.username}
                    </div>
                )}
            </div>

            {isPolitician && !user.hasParty && (
                <div className={styles.sidebarCtaBox}>
                    <NavBarCta label="Aanmelden Politieke Partij" linkTo="/user/new-political-party"/>
                </div>
            )}
            {!isPolitician && (
                <div className={styles.sidebarCtaBox}>
                    <NavBarCta label="Ik heb een idee" linkTo="/user/ideas/new-idea"/>
                </div>
            )}

            <div className={styles.sidebarNavMenu}>
                <NavBarLink label="Alle Ideeen" linkTo="/user/feed" icon={<FaHome/>} />
                <NavBarLink label="Mijn Account" linkTo="/user" icon={<FaIdCard />}/>
                {!isPolitician && (
                    <NavBarLink label="Mijn Ideeen" linkTo="/user/ideas" icon={<GiSmart />} />
                )}
                <NavBarButton label="Uitloggen" type={'button'} onClick={logouthandler} icon={<IoLogOutSharp />}/>
            </div>
            </ContentBox>
        </ContainerBox>
    )
}