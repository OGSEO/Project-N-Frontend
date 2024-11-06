import {BsSuitHeart, BsSuitHeartFill} from "react-icons/bs";
import ApiService from "../../service/ApiService.js";
import IdeaItemActionButton from "../ui/ideaItemActionButton/IdeaItemActionButton.jsx";
import {useAuth} from "../../context/AuthContext.jsx";

export default function LikeBox({ideaId, ideaLikes, setIdeaLikes}) {
    const { user } = useAuth();

    const alreadyLiked = ideaLikes.map((i) => i.toString()).includes(user.username);

    async function likeHandler() {

        try {
            const response = await ApiService.createLike(ideaId)
            if (response.statusCode === 200) {
                    setIdeaLikes(response.idea.userLikes)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function unLikeHandler() {

        try {
            const response = await ApiService.createUnLike(ideaId)
            if (response.statusCode === 200) {
                setIdeaLikes(response.idea.userLikes)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {alreadyLiked ? (
                <IdeaItemActionButton label="Interessant" icon={<BsSuitHeartFill/>} clickEvent={unLikeHandler}
                                      className="liked"/>
            ) : (
                <IdeaItemActionButton label="Interessant" icon={<BsSuitHeart/>} clickEvent={likeHandler}/>
            )}
        </>
    )
}