import './politicalPartyItem.css';

export default function PoliticalPartyItem({politicalParty}) {

    console.log(politicalParty);

    return (
        <article className='political-party-item'>
            <div className='party-name'>
                {politicalParty?.name}
            </div>
            <div className='party-contact'>
                contact: {politicalParty?.user.name}
            </div>
            {/*<div>*/}

            {/*</div>*/}
        </article>
    )
}