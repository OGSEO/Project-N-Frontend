import {BsSuitHeart, BsSuitHeartFill} from "react-icons/bs";
import ApiService from "../../service/ApiService.js";
import IdeaItemActionButton from "../ui/ideaItemActionButton/IdeaItemActionButton.jsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

export default function LikeBox({idea, ideaLikes, setIdeaLikes}) {
    const [ideaAlreadyLikedByUser, setideaAlreadyLikedByUser] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        let alreadyLikedByUserCheck;
        if (ideaLikes.length > 0) {
            alreadyLikedByUserCheck = (ideaLikes.some(i => i.toString() === user.username));
            setideaAlreadyLikedByUser(alreadyLikedByUserCheck);
        } else {
            setideaAlreadyLikedByUser(false);
        }
    }, []);

    async function likeHandler() {
        const ideaId = idea.id;

        try {
            const response = await ApiService.createLike(ideaId)
            console.log(response);
            if (response.statusCode === 200) {
                if (response.statusMessage === 'Idea Liked Successfully') {
                    setideaAlreadyLikedByUser(true);
                    setIdeaLikes(response.idea.userLikes)
                } else if (response.statusMessage === 'Idea already Liked') {
                    setideaAlreadyLikedByUser(false)
                    setIdeaLikes(response.idea.userLikes)
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
                if (response.statusMessage === 'Idea unLiked Successfully')
                    setideaAlreadyLikedByUser(false);
                setIdeaLikes(response.idea.userLikes)
                // navigate('/user/feed');
            } else if (response.statusMessage === 'Idea already unLiked') {
                setideaAlreadyLikedByUser(false)
                setIdeaLikes(response.idea.userLikes)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {ideaAlreadyLikedByUser ? (
                <IdeaItemActionButton label="Interessant" icon={<BsSuitHeartFill/>} clickEvent={unLikeHandler}
                                      className="liked"/>
            ) : (
                <IdeaItemActionButton label="Interessant" icon={<BsSuitHeart/>} clickEvent={likeHandler}/>
            )}
        </>
    )
}