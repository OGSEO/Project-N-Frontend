import './IdeasPage.css'
import {useContext, useEffect, useState} from "react";
import ApiService from "../../service/ApiService.js";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import IdeaItem from "../ideaItem/IdeaItem.jsx";
import ContainerBox from "../../components/ui/containerBox/ContainerBox.jsx";
import TitleBox from "../../components/ui/titleBox/TitleBox.jsx";
import NoIdeasYet from "../../components/noIdeasYet/NoIdeasYet.jsx";

export default function IdeasPage() {
    const [ideas, setIdeas] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        async function fetchIdeas() {
            try {
                const response = await ApiService.getAllIdeasFromUser(user.id);
                const ideaList = response.ideaList;
                console.log(response);
                setIdeas(ideaList);
            } catch (e) {
                console.error(e)
            }
        }

        void fetchIdeas();
    }, [user.id]);

    if (!ideas) {
        return <div className="idea-page-container-list"><span className="load-message">Ideeen aan het laden...</span></div>
    }

    return (
        <ContainerBox useCase='main'>
            <TitleBox>
                Mijn ideeen
            </TitleBox>
            <div className='idea-page-box'>
                {ideas.length > 0 ? (
                    <ul className="idea-page-container-list">
                        {ideas.map((idea) => (
                            <IdeaItem idea={idea} key={idea.id}/>
                        ))}
                    </ul>
                ) : (
                    <NoIdeasYet
                        linkText='Plaats je eigen idee!'>
                        Je hebt nog geen idee geplaatst!
                    </NoIdeasYet>
                )}
            </div>
        </ContainerBox>
    )
}