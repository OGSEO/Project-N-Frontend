import './FeedPage.css'
import {useEffect, useState} from "react";
import ApiService from "../../service/ApiService.js";
import FeedIdeaItem from "../feedIdeaItem/FeedIdeaItem.jsx";
import {Link} from "react-router-dom";

export default function FeedPage() {
    const [ideas, setIdeas] = useState([]);

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
                        <>
                            {console.log(idea)}
                            <FeedIdeaItem idea={idea} key={idea.id}/>
                        </>

                    ))}
                </ul>
            </div>
        ) : (
            <div className="feed-page-container-no-content">
                <h2>Je hebt nog geen ideeen!</h2>
                <Link to="/user/ideas/new-idea">
                    <button>Plaats je eigen idee!</button>
                </Link>

            </div>
        )}
    </>
)
}