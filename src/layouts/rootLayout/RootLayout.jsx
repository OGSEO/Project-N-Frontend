import SidebarNav from "../../components/sidebarNav/SidebarNav.jsx";
import {Outlet} from "react-router-dom";
import './RootLayout.css';
import SidebarRight from "../../components/sidebarRight/SidebarRight.jsx";

export default function RootLayout({image, party}) {

    return (
        // <main className="user-main-page">
        <>
            <SidebarNav image={image}/>
            <Outlet/>
            <SidebarRight party={party}/>
        </>
        // </main>
    )
}