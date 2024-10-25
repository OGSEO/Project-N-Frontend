import './LoginPage.css'
import {Link, useNavigate} from "react-router-dom";
import {TextField} from "../../components/textField/TextField.jsx";
import ApiService from "../../service/ApiService.js";
import {useForm} from "react-hook-form";
import {useState} from "react";

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { register,
        handleSubmit, formState: {errors},} =useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: "onTouched",
    });

    const onLoginHandler= async (data) => {
        setIsLoading(true);
        console.log(data);
        try {
            const response = await ApiService.loginUser(data);
            console.log(response);
            localStorage.setItem("JWT_TOKEN", response.token);
            localStorage.setItem("ROLE", response.role);
            // await ApiService.loginUser(data);
            navigate("/ideas");
        }catch(error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }


    // useEffect(() => {
    //     if(auth.isAuthenticated) navigate('/');
    // }, [navigate, auth]);


    return (
        <div className="login-container">
            <h2>Login</h2>
            <form autoComplete="off" noValidate onSubmit={handleSubmit(onLoginHandler)}>
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
                    <button className="btn">{isLoading ? "Submitting..." : "Log In"}</button>
                    <small><Link className="btn-link" to="/">Heb je nog geen account?</Link></small>
                </div>
            </form>
        </div>
    )
}


export default Login;