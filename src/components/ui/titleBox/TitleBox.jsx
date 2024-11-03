import './TitleBox.css';
import {useContext} from "react";
import {AuthContext} from "../../../context/AuthContext.jsx";

export default function TitleBox({children}) {
    const { user } = useContext(AuthContext);
    const userRole = user.role;

    return (
        <div className={`title-box ${userRole == 'CITIZEN' ? 'citizen' : 'politician'}`}>
            {children}
        </div>
    )
}