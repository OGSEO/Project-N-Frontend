import './FeedIdeaCommenting.css';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ApiService from "../../service/ApiService.js";
import CreateComment from "../../comments/createComment/CreateComment.jsx";
import TitleBox from "../../components/ui/titleBox/TitleBox.jsx";
import ContainerBox from "../../components/ui/containerBox/ContainerBox.jsx";
import ContentBox from "../../components/ui/contentBox/ContentBox.jsx";
export default function FeedIdeaCommenting() {

    const [currentIdea, setCurrentIdea] = useState({
        "title" : "",
        "description" : ""
    })
    const { ideaId } = useParams();

    useEffect(() => {
        async function fetchCurrentIdea() {
            try {
                const response = await ApiService.getIdeaById({params: {
                        ideaId
                    }})
                // const idea = response.idea;
                console.log(response);
                setCurrentIdea(response.idea);
            } catch (e) {
                console.error(e)
            }
        }
        void fetchCurrentIdea();
    }, []);


    console.log(currentIdea);

    return (
        <ContainerBox useCase='main'>
            <TitleBox colorType='citizen'>
                Maak een opmerking!
            </TitleBox>
            <ContentBox>
                <div className='idea-commenting-title'>
                    {currentIdea.title}
                </div>
                <div className='idea-commenting-description'>
                    {currentIdea.description}
                </div>
                <div className='idea-commenting-comment-box'>
                    <CreateComment/>
                </div>
            </ContentBox>
        </ContainerBox>
)
}