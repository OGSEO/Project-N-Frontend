import './SidebarRight.css';
import PoliticalPartyList from "../../politicalParties/politicalPartyList/PoliticalPartyList.jsx";
import {useEffect} from "react";

export default function SidebarRight({party}) {



    return (
        <div className="sidebar-right-container">
            <PoliticalPartyList party={party} />
        </div>
    )
}