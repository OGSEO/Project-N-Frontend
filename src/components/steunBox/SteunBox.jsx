import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import IdeaItemActionButton from "../ui/ideaItemActionButton/IdeaItemActionButton.jsx";
import {BsSuitHeart, BsSuitHeartFill} from "react-icons/bs";
import ApiService from "../../service/ApiService.js";

export default function SteunBox({idea, setSupported, supported}) {
    const [supportedIdea, setSupportedIdea] = useState(false);
    const {user} = useContext(AuthContext);

    console.log(user);
    // console.log(supported);

    useEffect(() => {
        let result;
        if(supported.length > 0) {
            // result = (supported.some(i => i.toString() === user.username));
            result = (supported.some(i => i.toString() === user.partyName));
            setSupportedIdea(result)
        } else {
            result = false;
            setSupportedIdea(result)
        }
    }, []);


    async function supportHandler() {
        const ideaId = idea.id;

        try {
            const response = await ApiService.createSupport(ideaId)
            if (response.statusCode === 200) {
                if (response.statusMessage === 'Idea Supported Successfully') {
                    setSupportedIdea(true);
                    setSupported(response.idea.politicalSupports)
                } else if (response.statusMessage === 'Idea already Support') {
                    setSupportedIdea(false)
                    setSupported(response.idea.politicalSupports)
                }
            }
        } catch (error) {
        console.log(error)
        }
    }

    async function unSupportHandler() {
        const ideaId = idea.id;

        try {
            const response = await ApiService.createUnSupport(ideaId)
            if (response.statusCode === 200) {
                if (response.statusMessage === 'Idea unSupported Successfully')
                    setSupportedIdea(false);
                setSupported(response.idea.politicalSupports)
            } else if (response.statusMessage === 'Idea already unSupported') {
                setSupportedIdea(false)
                setSupported(response.idea.politicalSupports)
            }
        } catch (error) {
            console.log(error)
        }
    }

        return (
            <>
                {supported.length > 0 && supportedIdea ? (
                    <IdeaItemActionButton label="Steun" icon={<BsSuitHeartFill/>} clickEvent={unSupportHandler}
                                          className="liked"/>

                ) : (
                    <IdeaItemActionButton label="Steun" icon={<BsSuitHeart/>} clickEvent={supportHandler}/>

                )}
            </>
        )
    }