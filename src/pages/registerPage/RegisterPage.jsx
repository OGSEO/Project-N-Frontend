import './RegisterPage.css'
import {TextField} from "../../components/textField/TextField.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import ApiService from "../../service/ApiService.js";

export default function RegisterPage() {
    const [sendRole, setSendRole] = useState("CITIZEN");
    const params = useParams();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
        mode: "onSubmit",
        reValidateMode: "onSubmit"
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (params.role === 'POLITICIAN') {
            setSendRole("POLITICIAN");
        }
    }, [params.role]);

    const onSubmit = async (data) => {
        setLoading(true);

        const {name, email, password} = data;
        const sendData = {
            name,
            email,
            password,
            role: sendRole
        };

        try {
            const response = await ApiService.registerUser(sendData)
            console.log(response);
            navigate(`/login/${params.role}`);
        } catch
            (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const onError = async (err) => {
        console.log(err);
    }

    let submitBtn;
    let classesLogin;

    if (params.role === 'CITIZEN') {
        submitBtn = "btn-citizen"
        classesLogin = "box-login-citizen box-login-citizen:hover"
    }
    if (params.role === 'POLITICIAN') {
        submitBtn = "btn-politician"
        classesLogin = "box-login-politician box-login-politician:hover"
    }

    return (
        <div className='registration-page-container'>
            <div className="registration-form">
                < h2> Registreren < /h2>
                <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit, onError)}>
                    <TextField
                        label="Naam"
                        error={errors.name}
                        {...register('name', {
                            minLength: {
                                value: 6,
                                message: "Uw naam moet minimaal 6 characters bevatten"
                            },
                            maxLength: {
                                value: 20,
                                message: "Uw naam mag max 20 characters bevatten"
                            },
                            required: "Uw naam is verplicht."
                        })}
                    />
                    <TextField
                        type="email"
                        label="Email"
                        error={errors.email}
                        {...register('email', {
                            required: "Uw email is verplicht.",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Vul een geldige email in.",
                            }
                        })}
                    />
                    <TextField
                        type="password"
                        label="Paswoord"
                        error={errors.password}
                        {...register('password', {
                            required: "Uw password is verplicht."
                        })}
                    />
                    <div className="register-link">
                        <button className={`btn ${submitBtn}`}>{loading ? "Aan het werk..." : "Registreren"}</button>
                        <p>-of-</p>
                        <Link className={classesLogin} to={`/login/${params.role}`}>Heb je al een account?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}