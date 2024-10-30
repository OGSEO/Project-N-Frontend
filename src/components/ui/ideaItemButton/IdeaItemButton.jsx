import './IdeaItemButton.css';
import {Link} from "react-router-dom";

export default function IdeaItemButton({label, linkTo, onClick, deleteBtn = false}) {

    let classes;
    if (deleteBtn) {
        classes = "idea-item-button delete-btn"
    } else {
        classes = "idea-item-button"
    }
    return (

        <Link to={linkTo}>
            <button className={classes} onClick={onClick}>
                <span>{label}</span>
            </button>
        </Link>
    )
}