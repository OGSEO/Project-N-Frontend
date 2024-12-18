import './CreateComment.css';
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ApiService from "../../service/ApiService.js";
import {TextField} from "../../components/textField/TextField.jsx";
import FormLink from "../../components/ui/formLink/FormLink.jsx";
import FormButton from "../../components/ui/formButton/FormButton.jsx";

export default function CreateComment() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {ideaId} = useParams();
    const {register, handleSubmit,
        formState: {errors}} = useForm({
            defaultValues: {
                content: '',
            },
            mode: "onTouched",
        }
    );

    async function onSubmit(data) {
        setIsLoading(true);

        console.log(data);
        try {
            const response = await ApiService.createComment(data, ideaId)
            console.log(response);
            navigate("/user/feed");
        } catch (error) {
            console.error("Error submitting comment", error.response.data);
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='comment-section'>
                <TextField
                    label="Opmerking"
                    error={errors.content}
                    {...register('content', {
                        required: "Dit veld is verplicht!"
                    })}
                />
                {/*<button>{isLoading ? "Submitting..." : "Opmerking plaatsen"}</button>*/}
                <div className='create-comment-buttons-box'>
                    <FormLink linkTo='..' relativeTo='path'>Cancel</FormLink>
                    <FormButton type='submit' onSubmit={onSubmit}>Plaats opmerking</FormButton>
                </div>
            </div>
        </form>
    )
}