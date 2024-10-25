import './IdeasLayout.css';
import {Outlet} from "react-router-dom";
import SidebarNav from "../../components/sidebarNav/SidebarNav.jsx";
import SidebarRight from "../../components/sidebarRight/SidebarRight.jsx";

export default function IdeasLayout() {
    return (
        <main className="idea-main-page">
            <SidebarNav />
            <div className="main-content">
                <Outlet />
            </div>
            <SidebarRight />
        </main>
    )
}