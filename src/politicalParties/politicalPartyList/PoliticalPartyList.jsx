import {useEffect, useState} from "react";
import ApiService from "../../service/ApiService.js";
import PoliticalPartyItem from "../politicalPartyItem/PoliticalPartyItem.jsx";
import './PoliticalPartyList.css';

export default function PoliticalPartyList({party}) {
    const [politicalParties, setPoliticalParties] = useState([]);

    useEffect(() => {
        async function fetchPoliticalParties() {
            try {
                const response = await ApiService.getAllPoliticalParties();
                const politicalPartyList = response.partyList;
                setPoliticalParties(politicalPartyList);
                // console.log(politicalPartyList)
            } catch (e) {
                console.error(e)
            }
        }

        void fetchPoliticalParties();
    }, [party]);

    return (
        <>
            {politicalParties.length === 0 ? (
                <p>Er zijn nog geen politieke partijen aangemeld</p>
            ) : (
                <div className='party-list'>
                    {politicalParties.map((politicalParty) => (
                            <PoliticalPartyItem
                                politicalParty={politicalParty}
                                key={politicalParty.id} />
                    ))}
                </div>
            )}
        </>
    )
}