import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ApiService from "../service/ApiService.js";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending"
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("JWT_TOKEN");

        if ( token ) {
            // const decoded = jwtDecode( token );
            // void fetchUserData( decoded.sub, token );
            void fetchUserData();
        } else {
          toggleIsAuth( {
              isAuth: false,
              user: null,
              status: "done"
          })
        }
    }, []);

    function login( data ) {
        // zet de token in de Local Storage
        console.log(data);
        localStorage.setItem("JWT_TOKEN", data.token );
        localStorage.setItem("USER_ROLE", data.role);
        // decode de token zodat we de ID van de gebruiker hebben en data kunnen ophalen voor de context
        // const decoded = jwtDecode( data.token );

        // geef de ID, token en redirect-link mee aan de fetchUserData functie (staat hieronder)
        void fetchUserData();
        // link de gebruiker door naar de profielpagina
        // navigate('/profile');
        // navigate("/user/feed")
    }

    function logout() {

        localStorage.clear();
        toggleIsAuth( {
            isAuth: false,
            user: null,
            status: 'done',
        } );

        navigate('/login')
        console.log( 'Gebruiker is uitgelogd!' );
    }

    // Omdat we deze functie in login- en het mounting-effect gebruiken, staat hij hier gedeclareerd!
    async function fetchUserData() {
        try {
            // haal gebruikersdata op met de token en id van de gebruiker
            const result = await ApiService.getLoggedUser();
            console.log(result);

            // zet de gegevens in de state
            toggleIsAuth( {
                ...isAuth,
                isAuth: true,
                user: {
                    username: result.user.name,
                    email: result.user.email,
                    id: result.user.id,
                    role: result.user.role,
                    hasParty: result.user.hasParty,
                    hasProfileImage: result.user.hasProfileImage
                },
                status: 'done',
            } );

            navigate("/user/feed");

            // als er een redirect URL is meegegeven (bij het mount-effect doen we dit niet) linken we hiernnaartoe door
            // als we de history.push in de login-functie zouden zetten, linken we al door voor de gebuiker is opgehaald!



        } catch ( e ) {
            console.error( e );
            // ging er iets mis? Plaatsen we geen data in de state
            toggleIsAuth( {
                isAuth: false,
                user: null,
                status: 'done',
            } );
        }
    }

    const contextData = {
        ...isAuth,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === "done" ? children : <p>Loading....</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;