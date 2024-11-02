import SidebarNav from "../../components/sidebarNav/SidebarNav.jsx";
import {Outlet} from "react-router-dom";
import './RootLayout.css';
import SidebarRight from "../../components/sidebarRight/SidebarRight.jsx";

export default function RootLayout({image, party}) {

    return (
        <div className='loggedin-page-container'>
            <SidebarNav image={image}/>
            <Outlet/>
            <SidebarRight party={party}/>
        </div>
    )
}