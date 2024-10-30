import SidebarNav from "../../components/sidebarNav/SidebarNav.jsx";
import {Outlet} from "react-router-dom";
import './RootLayout.css';

export default function RootLayout() {
    return (
        // <main className="user-main-page">
        <>
            <SidebarNav/>
            <main className="main-container">
                <Outlet/>
            </main>
        </>
        // </main>
    )
}