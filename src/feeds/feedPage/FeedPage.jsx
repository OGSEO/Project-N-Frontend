import './FeedPage.css'
import {useContext, useEffect, useState} from "react";
import ApiService from "../../service/ApiService.js";
import FeedIdeaItem from "../feedIdeaItem/FeedIdeaItem.jsx";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import { GiSmart } from "react-icons/gi";

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
        <div className='feed-page-container'>
            <div className='feed-page-title'>
                <span>Ideeen van burgers</span>
            </div>
            <div className='feed-page-box'>
                {ideas.length > 0 ? (
                    <div className="feed-page-container-list">
                        {ideas.map((idea) => (
                            <FeedIdeaItem idea={idea} key={idea.id}/>
                        ))}
                    </div>
                ) : (
                    <div className="feed-page-container-no-content">
                        <GiSmart className='no-content-icon'/>
                            <span className='no-content-title' >Er zijn nog geen ideeen geplaatst!</span>
                            {!isPolitician && (
                                <Link className='no-content-cta' to="/user/ideas/new-idea">
                                    <span>Plaats als eerste een idee!</span>
                                </Link>
                            )}
                    </div>
                )}
            </div>
        </div>
    )
}