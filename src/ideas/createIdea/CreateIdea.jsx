import {useNavigate} from "react-router-dom";
import {TextField} from "../../components/textField/TextField.jsx";
import ApiService from "../../service/ApiService.js";
import {useState} from "react";
import {useForm} from "react-hook-form";
import './CreateIdea.css';
import FormButton from "../../components/ui/formButton/FormButton.jsx";
import FormLink from "../../components/ui/formLink/FormLink.jsx";
import ContainerBox from "../../components/ui/containerBox/ContainerBox.jsx";
import TitleBox from "../../components/ui/titleBox/TitleBox.jsx";

export default function CreateIdea() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
            defaultValues: {
                title: '',
                description: ''
            },
            mode: "onTouched",
        }
    );

    async function onSubmit(data) {
        setIsLoading(true);
        try {
            const response = await ApiService.createIdea(data)
            console.log(response);
            if (response.statusCode === 200) {
                navigate('/user/feed');
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
                Deel uw idee met de stad!
            </TitleBox>
            <div className='create-idea-intro'>
                <p>Heeft u een idee? En u wilt deze delen met uw medeburgers om extra draagvlak te verkrijgen?
                    Of wilt u uw idee onder de ogen van politici krijgen? Deel snel uw idee zodat al deze dingen
                door een druk op de knop mogelijk zijn.</p>
            </div>
            <div className='create-idea-form'>
                <p>Wat is uw idee?</p>
                <form autoComplete='false' onSubmit={handleSubmit(onSubmit)}>
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
                        <FormLink linkTo='..' relativeTo='path'>Cancel Idee</FormLink>
                        <FormButton type='submit' onSubmit={onSubmit}>Deel Idee</FormButton>
                    </div>
                </form>
            </div>
        </ContainerBox>
    )

}