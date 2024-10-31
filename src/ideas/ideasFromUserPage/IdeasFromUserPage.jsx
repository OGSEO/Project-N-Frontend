import './IdeasFromUserPage.css'
import {useContext, useEffect, useState} from "react";
import ApiService from "../../service/ApiService.js";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import IdeaItem from "../ideaItem/IdeaItem.jsx";

export default function IdeasFromUserPage() {
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
        return <div className="feed-page-container"><span className="load-message">Ideeen aan het laden...</span></div>
    }

    return (
        <>
            {ideas.length > 0 ? (
                <div className="all-ideas-container">
                    {ideas.map((idea) => (
                        <IdeaItem key={idea.id} idea={idea}/>
                    ))}
                </div>
            ) : (
                <div className="all-ideas-container-no-content">
                    <h2>Je hebt nog geen ideeen!</h2>
                    <Link to="/user/ideas/new-idea">
                        <button>Plaats je eigen idee!</button>
                    </Link>

                </div>
            )}
        </>
    )
}