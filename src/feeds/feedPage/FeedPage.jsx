import './FeedPage.css'
import {useContext, useEffect, useState} from "react";
import ApiService from "../../service/ApiService.js";
import FeedIdeaItem from "../feedIdeaItem/FeedIdeaItem.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import TitleBox from "../../components/ui/titleBox/TitleBox.jsx";
import ContainerBox from "../../components/ui/containerBox/ContainerBox.jsx";
import NoIdeasYet from "../../components/noIdeasYet/NoIdeasYet.jsx";

export default function FeedPage() {
    const [ideas, setIdeas] = useState([]);
    const {user} = useContext(AuthContext);
    const isPolitician = (user.role === "POLITICIAN");

    useEffect(() => {
        async function fetchIdeas() {
            try {
                const response = await ApiService.getAllIdeas();
                const ideaList = response.ideaList;
                // console.log(response);
                setIdeas(ideaList);
            } catch (e) {
                console.error(e)
            }
        }

        void fetchIdeas();
    }, []);

    if (!ideas) {
        return <div className="feed-page-container-list"><span className="load-message">Ideeen aan het laden...</span></div>
    }

    return (
        <ContainerBox useCase='main'>
            <TitleBox>
                Ideeen van burgers
            </TitleBox>
            <div className='feed-page-box'>
                {ideas.length > 0 ? (
                    <div className="feed-page-container-list">
                        {ideas.map((idea) => (
                            <FeedIdeaItem idea={idea} key={idea.id}/>
                        ))}
                    </div>
                ) : (
                    <NoIdeasYet
                        linkText='Plaats als eerste idee!'>
                        Er zijn nog geen ideeen geplaatst!
                    </NoIdeasYet>
                )}
            </div>
        </ContainerBox>
    )
}