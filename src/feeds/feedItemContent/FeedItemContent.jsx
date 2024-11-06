import './FeedItemContent.css';

export default function FeedItemContent({idea}) {
    return (
        <div className="feed-item-content-box">
            <div>
                <span className="title">{idea.title}</span>
            </div>
            <div>
                <span className="description">{idea.description}</span>
            </div>
        </div>
    )
}