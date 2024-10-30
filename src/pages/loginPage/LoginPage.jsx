import './LoginPage.css'
import {Link, useNavigate} from "react-router-dom";
import {TextField} from "../../components/textField/TextField.jsx";
import ApiService from "../../service/ApiService.js";
import {useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
// import axios from "axios";

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, toggleError] = useState();
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const { register,
        handleSubmit, formState: {errors},} =useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: "onTouched",
    });

    // const source = axios.CancelToken.source();

    // mocht onze pagina ge-unmount worden voor we klaar zijn met data ophalen, aborten we het request
    // useEffect(() => {
    //     return function cleanup() {
    //         source.cancel();
    //     }
    // }, []);


    async function onSubmit(data) {
        toggleError(false);

        try {
            const response = await ApiService.loginUser(data);
            // const result = await axios.post('http://localhost:3000/login', {
            //     email: data.email,
            //     password: data.password
            // },{
            //     cancelToken: source.token,
            // });
            // log het resultaat in de console
            // console.log(response);
            console.log(response)

            // geef de JWT token aan de login-functie van de context mee
            login(response);

        } catch(e) {
            console.error(e);
            toggleError(true);
        }
    }




    // const onLoginHandler= async (data) => {
    //     setIsLoading(true);
    //     console.log(data);
    //     try {
    //         const response = await ApiService.loginUser(data);
    //         console.log(response);
    //         localStorage.setItem("JWT_TOKEN", response.token);
    //         localStorage.setItem("ROLE", response.role);
    //         // await ApiService.loginUser(data);
    //         navigate("/ideas");
    //     }catch(error) {
    //         console.log(error)
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }


    // useEffect(() => {
    //     if(auth.isAuthenticated) navigate('/');
    // }, [navigate, auth]);


    return (
        <div className="login-container">
            <h2>Login</h2>
            <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
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