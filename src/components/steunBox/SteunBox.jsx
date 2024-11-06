import {useAuth} from "../../context/AuthContext.jsx";
import IdeaItemActionButton from "../ui/ideaItemActionButton/IdeaItemActionButton.jsx";
import {BsSuitHeart, BsSuitHeartFill} from "react-icons/bs";
import ApiService from "../../service/ApiService.js";

export default function SteunBox({ideaId, ideaSupports, setIdeaSupports}) {
    const {user} = useAuth();

    const alreadySupported = ideaSupports.map((i) => i.toString()).includes(user.partyName);

    async function supportHandler() {

        try {
            const response = await ApiService.createSupport(ideaId)
            if (response.statusCode === 200) {
                setIdeaSupports(response.idea.politicalSupports)
            }
        } catch (error) {
        console.log(error)
        }
    }

    async function unSupportHandler() {

        try {
            const response = await ApiService.createUnSupport(ideaId)
            if (response.statusCode === 200) {
                setIdeaSupports(response.idea.politicalSupports)
            }
        } catch (error) {
            console.log(error)
        }
    }

        return (
            <>
                {alreadySupported ? (
                    <IdeaItemActionButton label="Steun" icon={<BsSuitHeartFill/>} clickEvent={unSupportHandler}
                                          className="liked"/>
                ) : (
                    <IdeaItemActionButton label="Steun" icon={<BsSuitHeart/>} clickEvent={supportHandler}/>

                )}
            </>
        )
    }