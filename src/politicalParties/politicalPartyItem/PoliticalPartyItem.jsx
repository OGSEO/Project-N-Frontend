import './politicalPartyItem.css';
import {useAuth} from "../../context/AuthContext.jsx";
import {Link} from "react-router-dom";

export default function PoliticalPartyItem({politicalParty}) {
    console.log(politicalParty);
    const { user } = useAuth();
    const userId = user.id;
    console.log(userId);

    return (
        <article className='political-party-item'>
            <img className='political-party-item-logo'
                 src={`http://localhost:8080/user/${userId}/avatar`}
                 alt="logo"/>
            <div className='political-party-item-info-box'>
                <div className='party-name'>
                    {politicalParty?.name}
                </div>
                <div className='party-cta'>
                    <Link className='party-cta-link' to=''>Gesteunde ideeen</Link>
                </div>
            </div>
        </article>
    )
}