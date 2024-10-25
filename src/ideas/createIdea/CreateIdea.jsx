import {Link, useNavigate} from "react-router-dom";
import {TextField} from "../../components/textField/TextField.jsx";
import ApiService from "../../service/ApiService.js";
import {useState} from "react";
import {useForm} from "react-hook-form";

export default function CreateIdea() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    // const auth = useAuth();

    const {register, handleSubmit, formState: {errors}} = useForm({
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
                navigate('/ideas');
            }
        } catch (error) {
            console.error("Error submitting idea", error);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className='create-idea-container'>
            <h1>Create Idea</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <TextField
                        label="Title"
                        error={errors.title}
                        {...register('title', {
                            required: "This field is required."
                        })}
                    />
                    <TextField
                        label="Description"
                        error={errors.description}
                        {...register('description', {
                            required: "This field is required."
                        })}
                    />
                </div>

                <div className='buttons-box'>
                    <Link to="..">Cancel</Link>
                    <button>{isLoading ? "Submitting..." : "Create Idea"}</button>
                </div>
            </form>
        </div>
    )

}