import './AddressPage.css';
import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import ApiService from "../../service/ApiService.js";
import {useForm} from "react-hook-form";
import {TextField} from "../../components/textField/TextField.jsx";
import ContainerBox from "../../components/ui/containerBox/ContainerBox.jsx";
import TitleBox from "../../components/ui/titleBox/TitleBox.jsx";
import ContentBox from "../../components/ui/contentBox/ContentBox.jsx";


export default function AddressPage() {

    const [address, setAddress] = useState({
        street: '',
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
        <ContainerBox useCase='main'>
            <TitleBox colorType='citizen'>
                {location.pathname === '/edit-address' ? 'Wijzig uw adres' : 'Voeg uw adres toe'}
            </TitleBox>
            <ContentBox>
                <div className='create-address-intro'>
                    <p>Voor een betere verwerking van uw ideeen hebben we uw adres nodig. U bent hier natuurlijk helemaal
                        vrij in om gebruik van te maken, we respecteren te aller tijden uw privacy.</p>
                </div>
                {error && <p className="error-message">{error}</p>}
                <div className='create-address-form'>
                    <p>Vul hier uw adres gegevens in..</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <TextField
                                label="Straatnaam"
                                error={errors.street}
                                {...register('street', {
                                    required: "Uw straatnaam is verplicht."
                                })}
                            />
                            <TextField
                                label="Postcode"
                                error={errors.zipCode}
                                {...register('zipCode', {
                                    required: "Postcode is verplicht."
                                })}
                            />
                            <TextField
                                label="Plaatsnaam"
                                error={errors.city}
                                {...register('city', {
                                    required: "Plaatsnaam is verplicht."
                                })}
                            />
                            <TextField
                                label="Land"
                                error={errors.country}
                                {...register('country', {
                                    required: "Land is verplicht."
                                })}
                            />
                        </div>

                        <div className='buttons-box'>
                            <Link to="..">Cancel</Link>
                            <button>{isLoading ? "Submitting..." : "Save Address"}</button>
                        </div>
                    </form>
                </div>
            </ContentBox>
        </ContainerBox>
)
}