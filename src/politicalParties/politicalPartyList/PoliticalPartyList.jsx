import {useEffect, useState} from "react";
import ApiService from "../../service/ApiService.js";
import PoliticalPartyItem from "../politicalPartyItem/PoliticalPartyItem.jsx";

export default function PoliticalPartyList() {
    const [politicalParties, setPoliticalParties] = useState([]);

    useEffect(() => {
        async function fetchPoliticalParties() {
            try {
                const response = await ApiService.getAllPoliticalParties();
                const politicalPartyList = response.partyList;
                console.log(response);
                setPoliticalParties(politicalPartyList);
            } catch (e) {
                console.error(e)
            }
        }

        void fetchPoliticalParties();
    }, []);


    console.log(politicalParties);

    return (
        <>
            <h1>Politieke Partijen</h1>
            {politicalParties.length === 0 ? (
                <p>Er zijn nog geen politieke partijen aangemeld</p>
            ) : (<>
                    {politicalParties.map((politicalParty) => (
                            <PoliticalPartyItem politicalParty={politicalParty} key={politicalParty.id} />
                    ))}
                </>
            )}
        </>
    )
}