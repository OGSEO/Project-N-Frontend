import './FeedPage.css'
import {useEffect, useState} from "react";
import ApiService from "../../service/ApiService.js";
import FeedIdeaItem from "../feedIdeaItem/FeedIdeaItem.jsx";
import TitleBox from "../../components/ui/titleBox/TitleBox.jsx";
import ContainerBox from "../../components/ui/containerBox/ContainerBox.jsx";
import NoIdeasYet from "../../components/noIdeasYet/NoIdeasYet.jsx";
import ResultBox from "../../components/ui/resultBox/ResultBox.jsx";
import SearchBox from "../../components/searchBox/SearchBox.jsx";

export default function FeedPage() {
    const [ideas, setIdeas] = useState([]);
    const [sortBy, setSortBy] = useState('likes');

    useEffect(() => {
        async function fetchIdeas() {
            try {
                const response = await ApiService.getAllIdeas();
                const ideaList = response.ideaList;
                setIdeas(ideaList);
            } catch (e) {
                console.error(e)
            }
        }

        void fetchIdeas();
    }, []);

    if (!ideas) {
        return <div className="feed-page-container-list"><span className="load-message">Ideeen aan het laden...</span>
        </div>
    }

    let sortedIdeas;

    if (sortBy === 'likes') sortedIdeas = ideas.slice()
        .sort((b,a) => Number(a.userLikes.length) - Number(b.userLikes.length));

    if (sortBy === 'supports') sortedIdeas = ideas.slice()
        .sort((b,a) => Number(a.politicalSupports.length) - Number(b.politicalSupports.length));

    console.log(sortedIdeas);

    return (
        <ContainerBox useCase='main'>
            <TitleBox>
                Ideeen van burgers
            </TitleBox>
            <ResultBox>
                <div>
                    <SearchBox />
                    <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                    >
                        <option value='likes'>Order by likes</option>
                        <option value='supports'>Order by supports</option>
                    </select>
                </div>
                {sortedIdeas.length > 0 ? (
                        <ul>
                            {sortedIdeas.map((idea) => (
                                <FeedIdeaItem idea={idea} key={idea.id}/>
                            ))}
                        </ul>
                ) : (
                    <NoIdeasYet
                        linkText='Plaats als eerste idee!'>
                        Er zijn nog geen ideeen geplaatst!
                    </NoIdeasYet>
                )}
            </ResultBox>
        </ContainerBox>
    )
}