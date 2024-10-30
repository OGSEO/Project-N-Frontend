import './FeedPage.css'
import {useContext, useEffect, useState} from "react";
import ApiService from "../../service/ApiService.js";
import FeedIdeaItem from "../feedIdeaItem/FeedIdeaItem.jsx";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";

export default function FeedPage() {
    const [ideas, setIdeas] = useState([]);
    const {user} = useContext(AuthContext);
    const isPolitician = (user.role === "POLITICIAN");

    useEffect(() => {
        async function fetchIdeas() {
            try {
                const response = await ApiService.getAllIdeas();
                const ideaList = response.ideaList;
                console.log(response);
                setIdeas(ideaList);
            } catch (e) {
                console.error(e)
            }
        }

        void fetchIdeas();
    }, []);


    console.log(ideas);

    return (<>
        {ideas.length > 0 ? (
            <div className="feed-page-container">
                <ul>
                    {ideas.map((idea) => (
                            <FeedIdeaItem idea={idea} key={idea.id}/>
                    ))}
                </ul>
            </div>
        ) : (
            <div className="feed-page-container-no-content">
                <h2>Er zijn nog geen ideeen!</h2>
                {!isPolitician && (
                    <Link to="/user/ideas/new-idea">
                        <button>Plaats als eerste een idee!</button>
                    </Link>
                )}
            </div>
        )}
    </>
)
}