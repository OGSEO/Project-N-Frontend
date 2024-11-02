import './LoginPage.css'
import {Link, useNavigate, useParams} from "react-router-dom";
import {TextField} from "../../components/textField/TextField.jsx";
import ApiService from "../../service/ApiService.js";
import {useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

// import axios from "axios";

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, toggleError] = useState();
    const {login} = useContext(AuthContext);
    const params = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit, formState: {errors},
    } = useForm({
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

        } catch (e) {
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
        <div className='login-page-container'>
            <div className="login-form">
                <h2>Login</h2>
                <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
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
                        label="Password"
                        error={errors.password}
                        {...register('password', {
                            required: "Uw password is verplicht."
                        })}
                    />
                    <div className="register-link">
                        <button className={`btn ${submitBtn}`}>{isLoading ? "Aan het werk..." : "Log In"}</button>
                        <p>-of-</p>
                        <Link className={classesLogin} to="/">Heb je nog geen account?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Login;