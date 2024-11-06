import './FeedIdeaItem.css';
import {useEffect, useState} from "react";
import ApiService from "../../service/ApiService.js";
import FeedItemContent from "../feedItemContent/FeedItemContent.jsx";
import FeedItemMeta from "../feedItemMeta/FeedItemMeta.jsx";
import IdeaActionBox from "../../components/ideaActionBox/IdeaActionBox.jsx";

export default function FeedIdeaItem({idea}) {
    const [comments, setComments] = useState([]);

    const ideaId = idea.id;

    useEffect(() => {
        async function fetchComments() {
            try {
                const response = await ApiService.getAllComments(ideaId);
                const newCommentList = response.commentList;
                setComments(newCommentList);
            } catch (e) {
                console.error(e)
            }
        }

        void fetchComments();
    }, [ideaId]);

    return (
        <li className="idea-feed-item">
            <FeedItemMeta idea={idea}/>
            <FeedItemContent idea={idea}/>
            <IdeaActionBox
                idea={idea}
                comments={comments}
            />
        </li>
    )
}

