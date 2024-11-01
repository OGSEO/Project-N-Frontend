import './FeedIdeaCommenting.css';
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import ApiService from "../../service/ApiService.js";
import CreateComment from "../../comments/createComment/CreateComment.jsx";
import CommentList from "../../comments/commentList/CommentList.jsx";

export default function FeedIdeaCommenting() {

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
        <div className='idea-commenting-container'>
            <div className='idea-commenting-title'>
                {currentIdea.title}
            </div>
            <div className='idea-commenting-description'>
                {currentIdea.description}
            </div>
            <div className='idea-commenting-comment-box'>
                <CreateComment />
            </div>
        </div>
    )
}