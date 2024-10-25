import ApiService from "../../service/ApiService.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

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
        return <div>Loading....................</div>
    }

    const handleAddressClick = () => {
        navigate(userInfo.address ? "edit-address" : "add-address")
    }

    return (
        <div className="profile-page">
            <h2>Welcome {userInfo.name}</h2>

            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <p><strong>Name: </strong> {userInfo.name} </p>
                    <p><strong>Email: </strong> {userInfo.email} </p>
                    <p><strong>Role: </strong> {userInfo.role} </p>
                    <div>
                        <h3>Address</h3>
                        {userInfo.address ? (
                            <div>
                                <p><strong>Street: </strong>{userInfo.address.street}</p>
                                <p><strong>Zip Code: </strong>{userInfo.address.zipCode}</p>
                                <p><strong>City: </strong>{userInfo.address.city}</p>
                                <p><strong>Country: </strong>{userInfo.address.country}</p>
                            </div>
                        ) : (
                            <div>
                                <p>No Address Information available</p>
                            </div>
                        )}
                        <button className="profile-button" onClick={handleAddressClick}>
                            {userInfo.address ? "Edit Address" : "Add Address"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}