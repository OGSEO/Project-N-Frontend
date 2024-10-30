import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";
import ApiService from "../../service/ApiService.js";
import {TextField} from "../../components/textField/TextField.jsx";
import './CreatePoliticalParty.css'

export default function CreatePoliticalParty() {
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
        } catch (error) {
            console.error("Error submitting idea", error);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className='create-party-container'>
            <h1>Aanmelden Politieke Partij</h1>
            <div className="create-party-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <TextField
                            label="Naam"
                            error={errors.name}
                            {...register('name', {
                                required: "This field is required."
                            })}
                        />
                        <TextField
                            label="Beschrijving"
                            error={errors.description}
                            {...register('description', {
                                required: "This field is required."
                            })}
                        />
                    </div>

                    <div className='buttons-box'>
                        <Link to="..">Cancel</Link>
                        <button>{isLoading ? "Submitting..." : "Aanmelden"}</button>
                    </div>
                </form>
            </div>
        </div>
    )

}