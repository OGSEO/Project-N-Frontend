import './SidebarRight.css';
import PoliticalPartyList from "../../politicalParties/politicalPartyList/PoliticalPartyList.jsx";

export default function SidebarRight() {
    return (
        <div className="sidebar-right-container">
            <h2>Sidebar Right</h2>
            <PoliticalPartyList />
        </div>
    )
}