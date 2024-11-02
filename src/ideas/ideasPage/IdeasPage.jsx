import './IdeasPage.css'
import {useContext, useEffect, useState} from "react";
import ApiService from "../../service/ApiService.js";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import IdeaItem from "../ideaItem/IdeaItem.jsx";
import {GiSmart} from "react-icons/gi";

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
        <div className='idea-page-container'>
            <div className='idea-page-title'>
                <span>Mijn ideeen</span>
            </div>
            <div className='idea-page-box'>
                {ideas.length > 0 ? (
                    <div className="idea-page-container-list">
                        {ideas.map((idea) => (
                            <IdeaItem key={idea.id} idea={idea}/>
                        ))}
                    </div>
                ) : (
                    <div className="idea-page-container-no-content">
                        <GiSmart className='no-content-icon'/>
                        <span className='no-content-title'>Je hebt nog geen ideeen geplaatst!</span>
                        <Link className='no-content-cta' to="/user/ideas/new-idea">
                            <span>Plaats je eigen idee!</span>
                        </Link>

                    </div>
                )}
            </div>
        </div>
    )
}