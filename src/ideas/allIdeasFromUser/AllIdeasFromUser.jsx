import './AllIdeasFromUser.css'
import {useContext, useEffect, useState} from "react";
import ApiService from "../../service/ApiService.js";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import IdeaItem from "../ideaItem/IdeaItem.jsx";

export default function AllIdeasFromUser() {
    const [ideas, setIdeas] = useState([]);
    const {user} = useContext(AuthContext);
    console.log(user);

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


    console.log(ideas);

    return (
        <>
            {ideas.length > 0 ? (
                <div className="all-ideas">
                        {ideas.map((idea) => (
                                <IdeaItem key={idea.id} idea={idea} />
                        ))}
                </div>
            ) : (
                <div className="all-ideas-no-content">
                    <h2>Je hebt nog geen ideeen!</h2>
                    <Link to="/user/ideas/new-idea">
                        <button>Plaats je eigen idee!</button>
                    </Link>

                </div>
            )}

        </>
    )
}