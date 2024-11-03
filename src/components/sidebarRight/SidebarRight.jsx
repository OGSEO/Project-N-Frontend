import './SidebarRight.css';
import PoliticalPartyList from "../../politicalParties/politicalPartyList/PoliticalPartyList.jsx";
import TitleBox from "../ui/titleBox/TitleBox.jsx";
import ContainerBox from "../ui/containerBox/ContainerBox.jsx";

export default function SidebarRight({party}) {

    return (
        <ContainerBox useCase='sidebar'>
            <TitleBox>
                Politieke Partijen
            </TitleBox>
            <div className='sidebar-right-box'>
                <PoliticalPartyList party={party} />
            </div>
        </ContainerBox>
    )
}