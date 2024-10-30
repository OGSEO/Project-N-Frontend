import {BsSuitHeart, BsSuitHeartFill} from "react-icons/bs";
import ApiService from "../../service/ApiService.js";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import IdeaItemActionButton from "../ui/ideaItemActionButton/IdeaItemActionButton.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";

export default function LikeBox({idea, setLiked, liked}) {
    const [likedIdea, setLikedIdea] = useState(false);
    // const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    console.log(user)

    console.log(liked);

    useEffect(() => {
        let result;
        if(liked.length > 0) {
            console.log(liked);
            console.log(liked.some(i=> i.toString() === user.username));

            console.log(liked.length);
            result = (liked.some(i=> i.toString() === user.username));

            console.log(result)
            console.log(idea)
                setLikedIdea(result);


        } else {
            result = false;
            setLikedIdea(result);
        }

        // Hier pak ik de array met objs om te kijken of de user deze idea al heeft geliked!
        // const userLikeId = idea.userLikes.id;
        // console.log("userlike van idee: " + userLikeId);

        // hier controleer ik of er al geliked is
        // let result = userLikes.some(i => i.user.id === user.id);

        // hier set ik de state van dit idea
        // setLikedIdea(result);

    }, []);

    async function likeHandler() {
        const ideaId = idea.id;

        try {
            const response = await ApiService.createLike(ideaId)
            console.log(response);
            if (response.statusCode === 200) {
                if(response.statusMessage === 'Idea Liked Successfully'){
                    setLikedIdea(true);
                    setLiked(response.idea.userLikes)
                    // navigate('/user/feed');
                }else if(response.statusMessage === 'Idea already Liked'){
                    setLikedIdea(false)
                    setLiked(response.idea.userLikes)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function unLikeHandler() {
        const ideaId = idea.id;

        try {
            const response = await ApiService.createUnLike(ideaId)
            console.log(response);
            if (response.statusCode === 200) {
                if(response.statusMessage === 'Idea unLiked Successfully')
                setLikedIdea(false);
                setLiked(response.idea.userLikes)
                // navigate('/user/feed');
            } else if (response.statusMessage === 'Idea already unLiked') {
                setLikedIdea(false)
                setLiked(response.idea.userLikes)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {liked.length > 0 && likedIdea ? (
                <IdeaItemActionButton label="Interessant" icon={<BsSuitHeartFill/>} clickEvent={unLikeHandler} className="liked"/>
            ) : (
                <IdeaItemActionButton label="Interessant" icon={<BsSuitHeart/>} clickEvent={likeHandler}/>
            )}
        </>
    )
}