import SidebarNav from "../../components/sidebarNav/SidebarNav.jsx";
import {Outlet} from "react-router-dom";
import './UserLayout.css';

export default function UserLayout() {
    return (
        <main className="user-main-page">
            <SidebarNav />
            <div className="main-content">
                <Outlet />
            </div>
        </main>
    )
}