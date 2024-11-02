import './SidebarRight.css';
import PoliticalPartyList from "../../politicalParties/politicalPartyList/PoliticalPartyList.jsx";

export default function SidebarRight({party}) {

    return (
        <div className='sidebar-right-container'>
            <div className='sidebar-right-title-box'>
                <span>Politieke Partijen</span>
            </div>
            <div className='sidebar-right-box'>
                <PoliticalPartyList party={party} />
            </div>
        </div>
    )
}