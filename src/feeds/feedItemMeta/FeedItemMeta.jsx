import './FeedItemMeta.css';
import {generateDate} from "../../helpers/generateDate.js";

export default function FeedItemMeta({idea}) {
    return (
        <div className="meta-box">
            <div>
                <span className="username">{idea.user}</span>
            </div>
            <div>
                <span className="post-date">Gepost op: {generateDate(idea)}</span>
            </div>
        </div>
    )
}