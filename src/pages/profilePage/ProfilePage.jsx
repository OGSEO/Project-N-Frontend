import ApiService from "../../service/ApiService.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import './ProfilePage.css'

export default function ProfilePage() {

    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
        <div className="profile-page-container">

            {error ? (
                <p>{error}</p>
            ) : (
                <div className="profile-info">
                    <span className="profile-username">{userInfo.name} </span>
                    <span><strong>Email: </strong> {userInfo.email} </span>
                    <span><strong>Role: </strong> {userInfo.role} </span>
                    <span className="profile-title">Adres: </span>
                    {userInfo.address ? (
                        <div>
                            <p><strong>Street: </strong>{userInfo.address.street}</p>
                            <p><strong>Zip Code: </strong>{userInfo.address.zipCode}</p>
                            <p><strong>City: </strong>{userInfo.address.city}</p>
                            <p><strong>Country: </strong>{userInfo.address.country}</p>
                        </div>
                    ) : (
                        <div>
                            <p>Vul je adres in!</p>
                        </div>
                    )}
                    <button className="profile-button" onClick={handleAddressClick}>
                        {userInfo.address ? "Edit Address" : "Add Address"}
                    </button>
                </div>
            )}
        </div>
    )
}