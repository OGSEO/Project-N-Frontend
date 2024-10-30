import './CommentItem.css';

export default function CommentItem({comment}) {
    console.log(comment)
    return (
        <li>
            <div className="comment-item">
                <div className="comment-item-name">
                    {comment.user.name}
                </div>
                <div className="comment-item-content">
                    {comment.content}
                </div>
            </div>
        </li>
    )
}