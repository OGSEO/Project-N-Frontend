import ApiService from "../../service/ApiService.js";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import './ProfilePage.css'
import {useAuth} from "../../context/AuthContext.jsx";
import TitleBox from "../../components/ui/titleBox/TitleBox.jsx";
import ContainerBox from "../../components/ui/containerBox/ContainerBox.jsx";

export default function ProfilePage() {

    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {user} = useAuth();

    const fetchUserInfo = async () => {

        try {
            const response = await ApiService.getLoggedUser();
            console.log(response.user);
            setUserInfo(response.user);
        } catch (error) {
            setError(error.response?.data?.message || error.message || "Unable to fetch user info");
            console.error(error);
        }
    }
    useEffect(() => {

        fetchUserInfo();
    }, []);

    if (!userInfo) {
        return <div className="profile-page-container"><span className="load-message">Profiel aan het laden...</span></div>
    }

    const handleAddressClick = () => {
        navigate(userInfo.address ? "edit-address" : "add-address")
    }

    return (
        <ContainerBox useCase='main'>
            <TitleBox>
                Uw profiel
            </TitleBox>
            {error ? (
                <p>{error}</p>
            ) : (
                <div className="profile-info">
                    <div className="profile-username">
                        <span>Hallo, {userInfo.name}</span>
                    </div>
                    <div className='user-info-title'>
                        <span>Uw Email:</span>
                    </div>
                    <span className='user-info-content'>{userInfo.email}</span>
                    <div className='user-info-title'>
                        <span>Uw Adres:</span>
                    </div>



                    {userInfo.address && (
                        <div className='user-info-content'>
                            <p><strong>Straat: </strong>{userInfo.address.street}</p>
                            <p><strong>Postcode: </strong>{userInfo.address.zipCode}</p>
                            <p><strong>Stad: </strong>{userInfo.address.city}</p>
                            <p><strong>Land: </strong>{userInfo.address.country}</p>
                        </div>
                    )}
                    <button className="profile-button" onClick={handleAddressClick}>
                        {userInfo.address ? "Edit je adres" : "Vul je adres in"}
                    </button>

                    <Link to={`/user/${user.id}/avatar`}>Verander uw profiel foto!</Link>
                </div>
            )}
        </ContainerBox>
    )
}