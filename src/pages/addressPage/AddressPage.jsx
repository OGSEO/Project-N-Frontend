import './AddressPage.css';
import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import ApiService from "../../service/ApiService.js";
import {useForm} from "react-hook-form";
import {TextField} from "../../components/textField/TextField.jsx";


export default function AddressPage() {

    const [address, setAddress] = useState({
        street: 'Deveterweg',
        zipCode: '',
        city: '',
        country: ''
    });

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register, handleSubmit,
        formState: {errors},
    } = useForm({
            defaultValues: {
                street: `${address.street}`,
                zipCode: `${address.zipCode}`,
                city: `${address.city}`,
                country: `${address.country}`
            },
            mode: "onTouched",
        }
    );

    useEffect(() => {
        if (location.pathname === '/edit-address') {
            console.log("fetching");
            void fetchUserInfo();
        }
    }, [location.pathname])

    const fetchUserInfo = async () => {
        try {
            const response = await ApiService.getLoggedUser();
            console.log(response);
            console.log(response.statusCode);
            if (response.statusCode === 200) {
                setAddress(response.user.address)
            }
            console.log(address);
        } catch (error) {
            setError(error.response?.data?.message || error.message || "Unable to fetch user information ")
        }
    };

    async function onSubmit(data) {
        setIsLoading(true);
        try {
            const response = await ApiService.saveAddress(data);
            if (response.statusCode === 200) {
                navigate("/user");
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message || "Failed to save or update address")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='address-page'>
            <h2>{location.pathname === '/edit-address' ? 'Edit Address' : 'Add Address'}</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <TextField
                        label="Street"
                        error={errors.street}
                        {...register('street', {
                            required: "This field is required."
                        })}
                    />
                    <TextField
                        label="ZipCode"
                        error={errors.zipCode}
                        {...register('zipCode', {
                            required: "This field is required."
                        })}
                    />
                    <TextField
                        label="City"
                        error={errors.city}
                        {...register('city', {
                            required: "This field is required."
                        })}
                    />
                    <TextField
                        label="Country"
                        error={errors.country}
                        {...register('country', {
                            required: "This field is required."
                        })}
                    />
                </div>

                <div className='buttons-box'>
                    <Link to="..">Cancel</Link>
                    <button>{isLoading ? "Submitting..." : "Save Address"}</button>
                </div>
            </form>
        </div>
    )
}