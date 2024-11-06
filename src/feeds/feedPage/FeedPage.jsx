import './FeedPage.css'
import {useEffect, useState} from "react";
import ApiService from "../../service/ApiService.js";
import FeedIdeaItem from "../feedIdeaItem/FeedIdeaItem.jsx";
import TitleBox from "../../components/ui/titleBox/TitleBox.jsx";
import ContainerBox from "../../components/ui/containerBox/ContainerBox.jsx";
import NoIdeasYet from "../../components/noIdeasYet/NoIdeasYet.jsx";
import SearchBox from "../../components/searchBox/SearchBox.jsx";
import Loader from "../../components/loader/Loader.jsx";
import ErrorMessage from "../../components/errorMessage/ErrorMessage.jsx";
import ContentBox from "../../components/ui/contentBox/ContentBox.jsx";

export default function FeedPage() {
    const [ideas, setIdeas] = useState([]);
    const [sortBy, setSortBy] = useState('likes');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchIdeas() {
            try {
                setIsLoading(true)
                setError('');
                const response = await ApiService.getAllIdeas();

                if (response.statusCode !== 200) {
                    throw new Error("Er is iets mis gegaan met het laden van ideeen")
                }

                const ideaList = response.ideaList;
                setIdeas(ideaList);
                setError('') //weet nog niet precies waarom!!
            } catch (e) {
                console.log(e.message);
                setError(e.message);
            } finally {
                setIsLoading(false);
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

    return (
        <ContainerBox useCase='main'>
            <TitleBox>
                Ideeen van burgers
            </TitleBox>
            <div>
                <SearchBox/>
                <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                >
                    <option value='likes'>Order by likes</option>
                    <option value='supports'>Order by supports</option>
                </select>
            </div>
            <ContentBox paddingAndBg={false}>

                {isLoading && <Loader/>}
                {!isLoading && !error && (
                    sortedIdeas.length > 0 ? (
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
                    )
                )}
                {error && <ErrorMessage message={error}/>}
            </ContentBox>
        </ContainerBox>
    )
}