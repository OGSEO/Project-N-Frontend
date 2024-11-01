import './FeedIdeaItem.css';
import LikeBox from "../../components/likeBox/LikeBox.jsx";
import IdeaItemActionButton from "../../components/ui/ideaItemActionButton/IdeaItemActionButton.jsx";
import {useNavigate} from "react-router-dom";
import {BsChatRightText} from "react-icons/bs";
import CommentList from "../../comments/commentList/CommentList.jsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import SteunBox from "../../components/steunBox/SteunBox.jsx";
import ApiService from "../../service/ApiService.js";

export default function FeedIdeaItem({idea}) {
    const [showComments, setShowComments] = useState(false);
    const [ideaLikedArray, setIdeaLikedArray] = useState(idea.userLikes);
    const [ideaSupportedArray, setIdeaSupportedArray] = useState(idea.politicalSupports)
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    // console.log(user);
    const isPolitician = (user.role === "POLITICIAN");

    /////////////////////////////////////////////////

    const [comments, setComments] = useState([]);
    // const [ideaId, setIdeaId] = useState(0);

    // console.log(idea);

    useEffect(() => {

        // setIdeaId(idea.id)

        async function fetchComments() {
            try {
                const response = await ApiService.getAllComments(idea.id);
                // console.log(response);
                const newCommentList = response.commentList;
                setComments(newCommentList);
                // console.log(newCommentList)
            } catch (e) {
                console.error(e)
            }
        }

        void fetchComments();

    }, [idea.id]);

    ////////////////////////////////////////////////////////////

    // console.log(idea)

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
                    {/*{console.log(ideaLikedArray)}*/}
                    {/*{console.log(ideaSupportedArray)}*/}
                    <div className="like-box">likes: {ideaLikedArray.length}</div>

                    <div className="comment-box">
                        {comments.length > 0 ? (
                            <button className="comment-box-button" onClick={() => setShowComments(!showComments)}>
                                {showComments ? (
                                    <span>Hide {comments.length} commentaren</span>
                                ) : (
                                   <span>Show {comments.length} commentaren</span>
                                )}
                            </button>
                        ) :(
                            <span>0 opmerkingen</span>
                        )}

                    </div>
                </div>

                <div className='support-box'>
                    <ul>
                        {
                            ideaSupportedArray.map((supporter) => (
                                <li key={supporter}>
                                    {supporter}
                                </li>
                            ))

                        } </ul>
                </div>


                <div className='cta-box'>
                    {isPolitician ? (
                        <div>
                            <SteunBox supported={ideaSupportedArray} setSupported={setIdeaSupportedArray} idea={idea}/>
                        </div>
                    ) : (
                        <div>
                            <LikeBox liked={ideaLikedArray} setLiked={setIdeaLikedArray} idea={idea}/>
                        </div>
                    )}
                    <div>
                        <IdeaItemActionButton label="Opmerking" clickEvent={commentHandler} icon={<BsChatRightText/>}/>
                    </div>
                </div>

                    {showComments && <CommentList comments={comments}/>}


            </article>
    )
}

