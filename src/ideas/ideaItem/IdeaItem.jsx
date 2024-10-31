import './IdeaItem.css';
import ApiService from "../../service/ApiService.js";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import CommentList from "../../comments/commentList/CommentList.jsx";
import FormButton from "../../components/ui/formButton/FormButton.jsx";

export default function IdeaItem({idea}) {
    const navigate = useNavigate();
    const [showComments, setShowComments] = useState(false);

    async function editIdeaHandler() {
        navigate("{${idea.id}/edit}");
    }

    async function deleteIdeaHandler() {
        const response = await ApiService.deleteIdea(idea.id);
        console.log(response);
        if (response.statusCode === 200) {
            navigate("/user/ideas");
        }
    }

    return (
        <>
            <div className="idea-item-container">
                <div className="idea-item-title-box">
                    <div className="idea-item-title">
                        {idea.title}
                    </div>
                    <div className="idea-item-date">
                        Geplaatst op: {idea.createdAt}
                    </div>
                </div>
                <div className="idea-item-description">
                    {idea.description}
                </div>
                <div className="like-comment-box">
                    <div className="like-box">likes: {idea.userLikes.length}</div>

                    <div className="comment-box">
                        <button onClick={() => setShowComments(!showComments)}>commentaren</button>
                    </div>
                </div>

                <div className='idea-item-buttons-box'>
                    <FormButton type='button' onSubmit={editIdeaHandler}>Edit</FormButton>
                    <FormButton type='button' onSubmit={deleteIdeaHandler}>Delete</FormButton>
                </div>
            </div>

            {showComments && <CommentList idea={idea}/>}
        </>
    )
}