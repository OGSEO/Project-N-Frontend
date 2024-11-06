import './IdeasPage.css'
import {useEffect, useState} from "react";
import ApiService from "../../service/ApiService.js";
import {useAuth} from "../../context/AuthContext.jsx";
import IdeaItem from "../ideaItem/IdeaItem.jsx";
import ContainerBox from "../../components/ui/containerBox/ContainerBox.jsx";
import TitleBox from "../../components/ui/titleBox/TitleBox.jsx";
import NoIdeasYet from "../../components/noIdeasYet/NoIdeasYet.jsx";
import ContentBox from "../../components/ui/contentBox/ContentBox.jsx";

export default function IdeasPage() {
    const [ideas, setIdeas] = useState([]);
    const [ideaDeleted, setIdeaDeleted] = useState(false);
    const {user} = useAuth();

    useEffect(() => {
        async function fetchIdeas() {
            try {
                const response = await ApiService.getAllIdeasFromUser(user.id);
                const ideaList = response.ideaList;
                console.log(response);
                setIdeas(ideaList);
                setIdeaDeleted(false);
            } catch (e) {
                console.error(e)
            }
        }

        void fetchIdeas();
    }, [ideaDeleted]);

    if (!ideas) {
        return <div className="idea-page-container-list"><span className="load-message">Ideeen aan het laden...</span></div>
    }

    return (
        <ContainerBox useCase='main'>
            <TitleBox>
                Mijn ideeen
            </TitleBox>
            <ContentBox paddingAndBg={false}>
                {ideas.length > 0 ? (
                    <ul>
                        {ideas.map((idea) => (
                            <IdeaItem idea={idea} setIdeaDeleted={setIdeaDeleted} key={idea.id}/>
                        ))}
                    </ul>
                ) : (
                    <NoIdeasYet
                        linkText='Plaats je eigen idee!'>
                        Je hebt nog geen idee geplaatst!
                    </NoIdeasYet>
                )}
            </ContentBox>
        </ContainerBox>
    )
}