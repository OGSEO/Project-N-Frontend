import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import ApiService from "../../service/ApiService.js";

import './EditIdea.css';
import FormLink from "../../components/ui/formLink/FormLink.jsx";
import FormButton from "../../components/ui/formButton/FormButton.jsx";
import {TextField} from "../../components/textField/TextField.jsx";
import ContainerBox from "../../components/ui/containerBox/ContainerBox.jsx";
import TitleBox from "../../components/ui/titleBox/TitleBox.jsx";
import ContentBox from "../../components/ui/contentBox/ContentBox.jsx";

export default function EditIdea() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {ideaId} = useParams();
    const [currentIdea, setCurrentIdea] = useState({
        "title": "",
        "description": ""
    })

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
            defaultValues: {
                title: `${currentIdea.title}`,
                description: ''
            },
            mode: "onTouched",
        }
    );

    useEffect(() => {
        async function fetchCurrentIdea() {
            try {
                const response = await ApiService.getIdeaById(ideaId);
                // const idea = response.idea;
                console.log(response);
                setCurrentIdea(response.idea);
            } catch (e) {
                console.error(e)
            }
        }

        void fetchCurrentIdea();
    }, [ideaId]);


    console.log(currentIdea);

    async function onSubmit(data) {
        setIsLoading(true);
        console.log(ideaId)
        try {
            const response = await ApiService.updateIdea(ideaId, data)
            console.log(response);
            if (response.statusCode === 200) {
                navigate('/ideas');
            }
        } catch (error) {
            console.error("Error submitting idea", error);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <ContainerBox useCase='main'>
            <TitleBox colorType='citizen'>
                Edit uw idee!
            </TitleBox>
            <ContentBox>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <TextField
                            label="Titel"
                            error={errors.title}
                            {...register('title', {
                                required: "Uw idee heeft een titel nodig!"
                            })}
                        />
                        <TextField
                            label="Beschrijving"
                            error={errors.description}
                            {...register('description', {
                                required: "Uw idee heeft een beschrijving nodig!"
                            })}
                        />
                    </div>
                    <div className='buttons-box'>

                        {/*<Link to="../.." relative="path">Cancel</Link>*/}
                        {/*<button>{isLoading ? "Submitting..." : "Edit Idea"}</button>*/}

                        <FormLink linkTo='..' relativeTo='root'>Cancel Edit</FormLink>
                        <FormButton type='submit' onSubmit={onSubmit}>Edit Idee</FormButton>


                    </div>
                </form>
            </ContentBox>
        </ContainerBox>
    )
}