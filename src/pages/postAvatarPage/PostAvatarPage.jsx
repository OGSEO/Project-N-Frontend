import {useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

import './PostAvatarPage.css';

function PostAvatarPage() {
    const { userId } = useParams();
    const navigate = useNavigate();

    const initialMessages = {
        avatar: {success: false, error: false}
    };

    const [avatar, setAvatar] = useState('');
    const [previewUrlAvatar, setPreviewUrlAvatar] = useState('');
    // const [studentNumber, setStudentNumber] = useState(0);
    const [messages, setMessages] = useState(initialMessages);


    function handleAvatarChange(e) {
        e.preventDefault();
        const uploadedAvatar = e.target.files[0];
        setAvatar(uploadedAvatar);
        console.log(uploadedAvatar);

        setPreviewUrlAvatar(URL.createObjectURL(uploadedAvatar));

    }

    async function sendUpload(e) {
        e.preventDefault();
        setMessages(initialMessages)

        const formData = new FormData();
        formData.append("file", avatar);
        try {

            const token = localStorage.getItem("JWT_TOKEN");
            const result = await axios.post(`http://localhost:8080/user/${userId}/avatar`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
            });
            console.log(result);
            setMessages(prevMessages => ({
                ...prevMessages,
                avatar: {success: true, error: false}
            }));
            navigate("/user");
        } catch (e) {
            console.error(e);
            setMessages(prevMessages => ({
                ...prevMessages,
                avatar: {success: false, error: true}
            }));
        }
        setAvatar('');
        setPreviewUrlAvatar('');
    }

    return (
        <div className="post-avatar-page-container">
                <h1>Profiel foto uploaden</h1>
                <form onSubmit={(e) => sendUpload(e)}>

                    <label htmlFor="student-image">
                        {/*Kies afbeelding:*/}
                        <input type="file" name="image-field" id="student-image"
                               onChange={(e) => handleAvatarChange(e)}/>
                    </label>

                    {previewUrlAvatar &&

                        <label>
                            <div className='preview-box'>
                                <img src={previewUrlAvatar} alt="Voorbeeld van de afbeelding die zojuist gekozen is"
                                     className="image-preview"/>
                            </div>
                        </label>

                    }

                    <div className='post-avatar-buttons-box'>

                        <button type="submit">Uploaden</button>
                    </div>


                </form>
            {messages.avatar.success && <p>De foto is succesvol geüpload!</p>}
                {messages.avatar.error &&
                    <p>Er is iets misgegaan bij het uploaden van de foto. Probeer het
                        opnieuw.</p>}
        </div>
    );
}

export default PostAvatarPage;