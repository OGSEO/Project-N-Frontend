import './SidebarRight.css';
import PoliticalPartyList from "../../politicalParties/politicalPartyList/PoliticalPartyList.jsx";
import TitleBox from "../ui/titleBox/TitleBox.jsx";
import ContainerBox from "../ui/containerBox/ContainerBox.jsx";
import ContentBox from "../ui/contentBox/ContentBox.jsx";

export default function SidebarRight({party}) {

    return (
        <ContainerBox useCase='sidebar'>
            <TitleBox>
                Politieke Partijen
            </TitleBox>
            <ContentBox padding>
                    <PoliticalPartyList party={party}/>
            </ContentBox>
        </ContainerBox>
    )
}