import './CreateComment.css';
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
// import {useAuth} from "../../context/AuthContext.jsx";
import ApiService from "../../service/ApiService.js";

export default function CreateComment() {
    const [isLoading, setIsLoading] = useState(false);
    // const navigate = useNavigate();
    // const auth = useAuth();
    const {ideaId} = useParams();
    const {register, handleSubmit} = useForm({
            defaultValues: {
                content: '',
            },
            mode: "onTouched",
        }
    );

    async function onSubmit(data) {
        setIsLoading(true);
        // const user = await ApiService.getLoggedUser();

        // const { content } = data;
        //
        // const newData = {
        //     content: content,
        //     tempUserId: user.user.email
        // }

        console.log(data);
        try {
            // const { content } = data;
            //
            // const newData = {
            //     content,
            //     name: idea.user.name,
            //     ideaId: idea.id
            // }
            // console.log(newData);
            const response = await ApiService.createComment(data, ideaId)
            console.log(response);
            // navigate("/ideas");
        } catch (error) {
            console.error("Error submitting comment", error.response.data);
        } finally {
            setIsLoading(false);
        }

    }

    return (
        // <div className='comment-section'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='comment-section'>
                <div>
                    {/*<label htmlFor="content"></label>*/}
                    <input
                        type="text"
                        id="content"
                        {...register('content')}
                    />
                </div>
                <button>{isLoading ? "Submitting..." : "Opmerking plaatsen"}</button>
            </div>

        </form>
        // </div>
    )
}