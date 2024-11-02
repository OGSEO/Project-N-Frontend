import './CommentList.css';
import {useEffect, useState} from "react";
import ApiService from "../../service/ApiService.js";
import CommentItem from "../commentItem/CommentItem.jsx";

export default function CommentList({comments}) {
    // const [commentList, setCommentList] = useState([]);
    // const [ideaId, setIdeaId] = useState(0);
    //
    // console.log(idea);
    //
    // useEffect(() => {
    //
    //     setIdeaId(idea.id)
    //
    //     async function fetchComments() {
    //         try {
    //             const response = await ApiService.getAllComments(ideaId);
    //             console.log(response);
    //             const newCommentList = response.commentList;
    //             setCommentList(newCommentList);
    //             console.log(newCommentList)
    //         } catch (e) {
    //             console.error(e)
    //         }
    //     }
    //
    //     void fetchComments();
    //
    // }, [idea.id, ideaId]);

    return (
        <>
            {comments.length > 0 ? (
                <div className="all-comments">
                        {comments.map((comment) => (
                            <CommentItem key={comment.id} comment={comment}/>
                        ))}
                </div>
            ) : null
            }
        </>
    )
}