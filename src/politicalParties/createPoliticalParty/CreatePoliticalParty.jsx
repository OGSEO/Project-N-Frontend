import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";
import ApiService from "../../service/ApiService.js";
import {TextField} from "../../components/textField/TextField.jsx";
import './CreatePoliticalParty.css'
import FormLink from "../../components/ui/formLink/FormLink.jsx";
import FormButton from "../../components/ui/formButton/FormButton.jsx";

export default function CreatePoliticalParty({toggleParty, party}) {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    // const auth = useAuth();

    const {register, handleSubmit, formState: {errors}} = useForm({
            defaultValues: {
                name: '',
                description: ''
            },
            mode: "onTouched",
        }
    );

    async function onSubmit(data) {
        setIsLoading(true);
        try {
            const response = await ApiService.createPoliticalParty(data)
            console.log(response);
            if (response.statusCode === 200) {
                navigate('/user/feed');
            }
            toggleParty(!party)
        } catch (error) {
            console.error("Error Creating Political Party", error);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className='create-party-container'>
            <h1>Aanmelden Politieke Partij</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <TextField
                            label="Naam"
                            error={errors.name}
                            {...register('name', {
                                required: "Uw Politieke Partij heeft een naam nodig!"
                            })}
                        />
                        <TextField
                            label="Beschrijving"
                            error={errors.description}
                            {...register('description', {
                                required: "Uw Politieke Partij heeft een beschrijving nodig!"
                            })}
                        />
                    </div>

                    <div className='buttons-box'>
                        <FormLink linkTo='..' relativeTo='path'>Cancel</FormLink>
                        <FormButton type='submit' onSubmit={onSubmit}>Partij Aanmaken</FormButton>
                    </div>
                </form>
        </div>
    )

}