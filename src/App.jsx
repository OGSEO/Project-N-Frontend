import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/homePage/HomePage.jsx";
import LoginPage from "./pages/loginPage/LoginPage.jsx";
import RegisterPage from "./pages/registerPage/RegisterPage.jsx";
import CreateIdea from "./ideas/createIdea/CreateIdea.jsx";
import EditIdea from "./ideas/editIdea/EditIdea.jsx";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage.jsx";
import RootLayout from "./layouts/rootLayout/RootLayout.jsx";
import ProfilePage from "./pages/profilePage/ProfilePage.jsx";
import AddressPage from "./pages/addressPage/AddressPage.jsx";
import CreatePoliticalParty from "./politicalParties/createPoliticalParty/CreatePoliticalParty.jsx";
import IdeasFromUserPage from "./ideas/ideasFromUserPage/IdeasFromUserPage.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import FeedPage from "./feeds/feedPage/FeedPage.jsx";
import PostAvatarPage from "./pages/postAvatarPage/PostAvatarPage.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import FeedIdeaCommenting from "./feeds/feedIdeaCommenting/FeedIdeaCommenting.jsx";
import {useState} from "react";


function App() {

    const [image, toggleImage] = useState(false);
    const [party, toggleParty] = useState(false);

    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    <Route index element={<HomePage/>}/>
                    <Route path="register/:role" element={<RegisterPage/>}/>
                    <Route path="login" element={<LoginPage/>}/>

                    <Route element={<ProtectedRoute/>}>
                        <Route path="user" element={<RootLayout image={image} party={party}/>}>
                            <Route index element={<ProfilePage/>}/>
                            <Route path="add-address" element={<AddressPage/>}/>
                            <Route path="edit-address" element={<AddressPage/>}/>
                            <Route path=":userId/avatar" element={<PostAvatarPage image={image} toggleImage={toggleImage}/>}/>
                            <Route path="new-political-party" element={<CreatePoliticalParty party={party} toggleParty={toggleParty}/>}/>
                            <Route path="ideas">
                                <Route index element={<IdeasFromUserPage/>}/>
                                <Route path="new-idea" element={<CreateIdea/>}/>
                                {/*<Route path=":ideaId" element={<IdeaDetails/>}/>*/}
                                <Route path=":ideaId/edit" element={<EditIdea/>}/>
                            </Route>
                            <Route path="feed" element={<FeedPage/>}/>
                            <Route path="feed/:ideaId" element={<FeedIdeaCommenting />}/>


                            {/*<Route path="feed" element={<FeedLayout/>}>*/}
                            {/*    <Route index element={<FeedPage/>}/>*/}
                            {/*    <Route path=":ideaId" element={<FeedIdeaCommenting/>}/>*/}
                            {/*</Route>*/}
                        </Route>
                    </Route>

                        <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>
)
}

export default App
