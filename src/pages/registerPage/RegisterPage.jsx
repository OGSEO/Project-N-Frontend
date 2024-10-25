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
            navigate("/login");
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

    return (
        <div className="register-container">
            <h2>Registreren</h2>
            <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit, onError)}>
                <TextField
                    label="Name"
                    error={errors.name}
                    {...register('name', {
                        minLength: {
                            value: 6,
                            message: "Must be min 6 characters"
                        },
                        maxLength: {
                            value: 20,
                            message: "Must be max 20 characters"
                        },
                        required: "This field is required."
                    })}
                />
                <TextField
                    type="email"
                    label="Email"
                    error={errors.email}
                    {...register('email', {
                        required: "This field is required.",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Incorrect email format.",
                        }
                    })}
                />
                <TextField
                    type="password"
                    label="Password"
                    error={errors.password}
                    {...register('password', {
                        required: "This field is required."
                    })}
                />
                <div className="register-link">
                    <button className="btn">{loading ? "Submitting..." : "Registreren"}</button>
                    <small><Link className="btn-link" to="/login">Heb je al een account?</Link></small>
                </div>
            </form>
        </div>
    )
}