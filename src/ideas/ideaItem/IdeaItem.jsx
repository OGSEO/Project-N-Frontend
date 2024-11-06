import './IdeaItem.css';
import ApiService from "../../service/ApiService.js";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import CommentList from "../../comments/commentList/CommentList.jsx";
import FormButton from "../../components/ui/formButton/FormButton.jsx";
import {generateDate} from "../../helpers/generateDate.js";

export default function IdeaItem({idea, setIdeaDeleted}) {
    const navigate = useNavigate();
    const [showComments, setShowComments] = useState(false);

    async function editIdeaHandler() {
        console.log(idea.id);
        navigate(`${idea.id}/edit`);
    }

    async function deleteIdeaHandler() {
        const response = await ApiService.deleteIdea(idea.id);
        console.log(response);
        if (response.statusCode === 200) {
            navigate("/user/ideas");
            setIdeaDeleted(true);
        }
    }

    console.log(idea)

    return (
            <li className="idea-item-container">
                <div className="idea-item-title-box">
                    <div className="idea-item-title">
                        {idea.title}
                    </div>
                    <div className="idea-item-date">
                        Geplaatst op: {generateDate(idea)}
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
                    <FormButton handler={editIdeaHandler}>Edit</FormButton>
                    <FormButton handler={deleteIdeaHandler} btnColor='delete'>Delete</FormButton>
                </div>
                {showComments && <CommentList idea={idea}/>}
            </li>
    )
}