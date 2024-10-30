import './IdeaItemActionButton.css';

export default function IdeaItemActionButton({clickEvent, label, icon, className = ''}) {
    return (
        <button type="button" className={`icon-btn ${className}`} onClick={clickEvent}>
            <div>
                {icon}
            </div>
            <div>
                {label}
            </div>
        </button>
    )
}