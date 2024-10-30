import './FeedLayout.css';
import {Outlet} from "react-router-dom";
import SidebarRight from "../../components/sidebarRight/SidebarRight.jsx";

export default function FeedLayout() {
    return (
        <>
            <Outlet/>
            <SidebarRight/>
        </>
    )
}