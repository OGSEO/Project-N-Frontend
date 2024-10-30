import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/homePage/HomePage.jsx";
import LoginPage from "./pages/loginPage/LoginPage.jsx";
import RegisterPage from "./pages/registerPage/RegisterPage.jsx";
import FeedLayout from "./layouts/feedLayout/FeedLayout.jsx";
import CreateIdea from "./ideas/createIdea/CreateIdea.jsx";
import IdeaDetails from "./ideas/ideaDetails/IdeaDetails.jsx";
import EditIdea from "./ideas/editIdea/EditIdea.jsx";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage.jsx";
import RootLayout from "./layouts/rootLayout/RootLayout.jsx";
import ProfilePage from "./pages/profilePage/ProfilePage.jsx";
import AddressPage from "./pages/addressPage/AddressPage.jsx";
import CreatePoliticalParty from "./politicalParties/createPoliticalParty/CreatePoliticalParty.jsx";
import AllIdeasFromUser from "./ideas/allIdeasFromUser/AllIdeasFromUser.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import FeedPage from "./feeds/feedPage/FeedPage.jsx";
import FeedIdeaDetail from "./feeds/feedIdeaDetail/FeedIdeaDetail.jsx";
import PostAvatar from "./pages/PostAvatar.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import {useContext} from "react";

function App() {

    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    <Route index element={<HomePage/>}/>
                    <Route path="register/:role" element={<RegisterPage/>}/>
                    <Route path="login" element={<LoginPage/>}/>

                    <Route element={<ProtectedRoute/>}>
                        <Route path="user" element={<RootLayout/>}>
                            <Route index element={<ProfilePage/>}/>
                            <Route path="add-address" element={<AddressPage/>}/>
                            <Route path="edit-address" element={<AddressPage/>}/>
                            <Route path=":userId/avatar" element={<PostAvatar/>}/>
                            <Route path="new-political-party" element={<CreatePoliticalParty/>}/>
                            <Route path="ideas">
                                <Route index element={<AllIdeasFromUser/>}/>
                                <Route path="new-idea" element={<CreateIdea/>}/>
                                {/*<Route path=":ideaId" element={<IdeaDetails/>}/>*/}
                                <Route path=":ideaId/edit" element={<EditIdea/>}/>
                            </Route>
                            <Route path="feed" element={<FeedLayout/>}>
                                <Route index element={<FeedPage/>}/>
                                <Route path=":ideaId" element={<FeedIdeaDetail/>}/>
                            </Route>
                        </Route>
                    </Route>

                        <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>
)
}

export default App
