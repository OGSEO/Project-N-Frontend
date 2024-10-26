import './CommentList.css';
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import ApiService from "../../service/ApiService.js";

export default function CommentList() {
    const [commentList, setCommentList] = useState([]);
    const {ideaId} = useParams();

    useEffect(() => {
        async function fetchComments() {
            try {
            const response = await ApiService.getAllComments(ideaId);
            console.log(response);
            const newCommentList = response.commentList;
            setCommentList(newCommentList);
        } catch (e) {
            console.error(e)
        }
    }
        void fetchComments();

    }, [ideaId]);

    return (
        <div className="all-comments">
            <h2>All Comments</h2>
            <ul>
                {commentList.map((comment) => (
                    <Link to={`${comment.id}`} key={comment.id}>
                        <li>
                            <h1>{comment.title}</h1>
                            <h3>comment van: {comment.user.name}</h3>
                            <h3>{comment.content}</h3>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}