import './FeedIdeaDetail.css';
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import ApiService from "../../service/ApiService.js";
import CreateComment from "../../comments/createComment/CreateComment.jsx";
import CommentList from "../../comments/commentList/CommentList.jsx";

export default function FeedIdeaDetail() {

    const [currentIdea, setCurrentIdea] = useState({
        "title" : "",
        "description" : ""
    })
    const { ideaId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCurrentIdea() {
            try {
                const response = await ApiService.getIdeaById({params: {
                        ideaId
                    }})
                // const idea = response.idea;
                console.log(response);
                setCurrentIdea(response.idea);
            } catch (e) {
                console.error(e)
            }
        }
        void fetchCurrentIdea();
    }, []);

    // async function deleteIdeaHandler() {
    //     const response = await ApiService.deleteIdea(currentIdea.id);
    //     console.log(response);
    //     if(response.statusCode === 200) {
    //         navigate('/ideas');
    //     }
    //
    // }


    console.log(currentIdea);

    return (
        <>
            <h2>Idea Details</h2>
            <Link to="..">Terug naar ideeen</Link>
            <h3>{currentIdea.title}</h3>
            <h3>{currentIdea.description}</h3>
            {/*<Link to="edit" >Edit Idea</Link>*/}
            {/*<button onClick={deleteIdeaHandler}>Delete Idea</button>*/}
            <div>
                <CreateComment />
            </div>
            {/*<div>*/}
            {/*    <CommentList />*/}
            {/*</div>*/}
        </>
    )
}