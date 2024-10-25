import {useEffect, useState} from "react";
import ApiService from "../../service/ApiService.js";
import {Link} from "react-router-dom";

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
            <ul>
                {politicalParties.map((politicalParty) => (
                    <Link to={`${politicalParty.id}`} key={politicalParty.id}>
                        <li>
                            <h1>{politicalParty.name}</h1>
                            <h3>partij van: {politicalParty.user.name}</h3>
                            <h3>{politicalParty.description}</h3>
                        </li>
                    </Link>
                ))}
            </ul>
        </>
    )
}