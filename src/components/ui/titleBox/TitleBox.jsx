import './TitleBox.css';
import {useAuth} from "../../../context/AuthContext.jsx";

export default function TitleBox({children}) {
    const { user } = useAuth();
    const userRole = user.role;

    return (
        <div className={`title-box ${userRole == 'CITIZEN' ? 'citizen' : 'politician'}`}>
            {children}
        </div>
    )
}