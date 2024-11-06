import {Link} from "react-router-dom";
import AvatarBlankImg from "../../../assets/avatar-blank.png";
import {useAuth} from "../../../context/AuthContext.jsx";
import {useEffect, useState} from "react";
import './AvatarBox.css';

export default function AvatarBox({image}) {
    const {user} = useAuth();
    const [profileImage, setProfileImage] = useState('')
    const userRole = user.role;

    useEffect(() => {
        setProfileImage(user.imgUrl)
    }, [image]);

    return (
        <>
        <div className={`sidebar-avatar ${userRole == 'CITIZEN' ? 'citizen' : 'politician'}`}>
        {profileImage ? (
                // <div className='sidebar-avatar'>
                    <div>
                        <img src={profileImage} alt={`Een profielfoto van ${user.username}`}/>
                    </div>
                // </div>
            ) : (
                // <div className='sidebar-avatar'>
                    <Link to={`/user/${user.id}/avatar`}>
                        <img src={AvatarBlankImg} alt="Een placeholder van de profielfoto"/>
                    </Link>
                // </div>
            )}
        </div>
        </>
    )
}