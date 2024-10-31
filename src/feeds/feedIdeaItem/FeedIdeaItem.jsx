import './FeedIdeaItem.css';
import LikeBox from "../../components/likeBox/LikeBox.jsx";
import IdeaItemActionButton from "../../components/ui/ideaItemActionButton/IdeaItemActionButton.jsx";
import {useNavigate} from "react-router-dom";
import {BsChatRightText} from "react-icons/bs";
import CommentList from "../../comments/commentList/CommentList.jsx";
import {useState} from "react";

export default function FeedIdeaItem({idea}) {
    const [showComments, setShowComments] = useState(false);
    const [ideaLikedArray, setIdeaLikedArray] = useState(idea.userLikes)
    const navigate = useNavigate();

    console.log(idea)

    function commentHandler() {
        navigate(`/user/feed/${idea.id}`);
    }

    return (
            <article className="idea-feed-item">
                <div className="idea-feed-item-info-box">
                    <div>
                        <span className="username">{idea.user}</span>
                    </div>
                    <div>
                        <span className="create-date">Gepost op: {idea.createdAt}</span>
                    </div>
                </div>

                <div className="idea-feed-item-body">
                    <div>
                        <span className="title">{idea.title}</span>
                    </div>
                    <div>
                        <span className="description">{idea.description}</span>
                    </div>
                </div>

                <div className="like-comment-box">
                    {console.log(ideaLikedArray)}
                    <div className="like-box">likes: {ideaLikedArray.length}</div>

                    <div className="comment-box">
                        <button onClick={() => setShowComments(!showComments)}>commentaren</button>
                    </div>
                </div>


                <div className='cta-box'>
                    <div>
                        <LikeBox liked={ideaLikedArray} setLiked={setIdeaLikedArray} idea={idea}/>
                    </div>
                    <div>Steun</div>
                    <div>
                        <IdeaItemActionButton label="Opmerking" clickEvent={commentHandler} icon={<BsChatRightText/>}/>
                    </div>
                </div>

                    {showComments && <CommentList idea={idea}/>}


            </article>
    )
}

