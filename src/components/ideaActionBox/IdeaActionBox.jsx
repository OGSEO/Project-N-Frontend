import './IdeaActionBox.css'
import SteunBox from "../steunBox/SteunBox.jsx";
import LikeBox from "../likeBox/LikeBox.jsx";
import IdeaItemActionButton from "../ui/ideaItemActionButton/IdeaItemActionButton.jsx";
import {BsChatRightText} from "react-icons/bs";
import {useAuth} from "../../context/AuthContext.jsx";
import {useState} from "react";
import CommentList from "../../comments/commentList/CommentList.jsx";
import {useNavigate} from "react-router-dom";


export default function IdeaActionBox({idea, comments,}) {

    const [ideaLikes, setIdeaLikes] = useState(idea.userLikes);
    const [ideaSupports, setIdeaSupports] = useState(idea.politicalSupports);
    const [showComments, setShowComments] = useState(false);
    const {user} = useAuth();
    const isPolitician = (user.role === "POLITICIAN");
    const ideaId = idea.id;
    const numLikes = ideaLikes.length;
    const numComments = comments.length;
    const navigate = useNavigate();

    function commentHandler() {
        navigate(`/user/feed/${ideaId}`);
    }

    return (
        <>
            <div className="like-comment-box">
                <div className="like-box">likes: {numLikes}</div>

                <div className="comment-box">
                    {numComments > 0 ? (
                        <button className="comment-box-button" onClick={() =>
                            setShowComments((sc) => !sc)}>
                            {showComments ? (
                                <span>Verberg {numComments} opmerkingen</span>
                            ) : (
                                <span>Laat {numComments} opmerkingen</span>
                            )}
                        </button>
                    ) : (
                        <span className='no-comments-title'>0 opmerkingen</span>
                    )}

                </div>
            </div>

            <div className='support-box'>
                <ul>
                    {
                        ideaSupports.map((supporter) => (
                            <li key={supporter}>
                                {supporter}
                            </li>
                        ))

                    } </ul>
            </div>


            <div className='cta-box'>
                {isPolitician ? (
                    <div>
                        <SteunBox ideaId={ideaId} ideaSupports={ideaSupports} setIdeaSupports={setIdeaSupports}/>
                    </div>
                ) : (
                    <div>
                        <LikeBox ideaId={ideaId} ideaLikes={ideaLikes} setIdeaLikes={setIdeaLikes}/>
                    </div>
                )}
                <div>
                    <IdeaItemActionButton label="Opmerking" clickEvent={commentHandler} icon={<BsChatRightText/>}/>
                </div>
            </div>

            {showComments && <CommentList comments={comments}/>}
        </>
    )
}