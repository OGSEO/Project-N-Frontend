import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/homePage/HomePage.jsx";
import LoginPage from "./pages/loginPage/LoginPage.jsx";
import RegisterPage from "./pages/registerPage/RegisterPage.jsx";
import IdeasLayout from "./layouts/ideasLayout/IdeasLayout.jsx";
import AllIdeas from "./ideas/allIdeas/AllIdeas.jsx";
import CreateIdea from "./ideas/createIdea/CreateIdea.jsx";
import IdeaDetails from "./ideas/ideaDetails/IdeaDetails.jsx";
import EditIdea from "./ideas/editIdea/EditIdea.jsx";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage.jsx";
import UserLayout from "./layouts/userLayout/UserLayout.jsx";
import ProfilePage from "./pages/profilePage/ProfilePage.jsx";
import AddressPage from "./pages/addressPage/AddressPage.jsx";
import CreatePoliticalParty from "./politicalParties/createPoliticalParty/CreatePoliticalParty.jsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="register/:role" element={<RegisterPage />} />
                <Route path="login" element={<LoginPage />} />

                <Route path="user" element={<UserLayout />} >
                    <Route index element={<ProfilePage />} />
                    <Route path="add-address" element={<AddressPage />} />
                    <Route path="edit-address" element={<AddressPage />} />
                    <Route path="new-political-party" element={<CreatePoliticalParty />} />
                </Route>

                <Route path="ideas" element={<IdeasLayout />} >
                    <Route index element={<AllIdeas />} />
                    <Route path="new-idea" element={<CreateIdea />} />
                    <Route path=":ideaId" element={<IdeaDetails />} />
                    <Route path=":ideaId/edit" element={<EditIdea />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
