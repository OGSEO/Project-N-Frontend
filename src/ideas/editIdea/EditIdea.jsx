import {Link, useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import ApiService from "../../service/ApiService.js";

import './EditIdea.css';

export default function EditIdea() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { ideaId} = useParams();
    const [currentIdea, setCurrentIdea] = useState({
        "title" : "",
        "description" : ""
    })

    const {register, handleSubmit} = useForm({
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
                const response = await ApiService.getIdeaById(ideaId)
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
            if(response.statusCode === 200) {
                navigate('/ideas');
            }
        }catch (error) {
            console.error("Error submitting idea", error);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className='edit-idea-container'>
            <h1>Edit Idea</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        {...register('title')}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        {...register('description')}
                    />
                </div>
                <div className='buttons-box'>

                    <Link to=".." relative="path">Cancel</Link>
                    <button>{isLoading ? "Submitting..." : "Edit Idea"}</button>
                </div>
            </form>
        </div>
    )
}