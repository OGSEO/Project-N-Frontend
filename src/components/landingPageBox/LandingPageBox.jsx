import './LandingPageBox.css'
import {Link} from "react-router-dom";

export default function LandingPageBox({children, boxType, title, subTitle, registerLink, registerTitle}) {
    let classesCta;
    let classesLogin
    let loginTo

    if (boxType === 'citizen') {
        classesCta = "box-cta-citizen box-cta-citizen:hover"
        classesLogin = "box-login-citizen box-login-citizen:hover"
        loginTo = "/login/CITIZEN"
    }
    if (boxType === 'politician') {
        classesCta = "box-cta-politician .box-cta-politician:hover"
        classesLogin = "box-login-politician box-login-politician:hover"
        loginTo = "/login/POLITICIAN"
    }


    return (
        <div className={'landing-page-box'}>
            <span className='box-title'>{title}</span>
            <span className={'box-sub-title'}>{subTitle}</span>
            {children}
            <Link className={`box-cta ${classesCta}`} to={registerLink}>{registerTitle}</Link>
            <p>-of-</p>
            <Link className={classesLogin} to={loginTo}>Heb je al een account?</Link>
        </div>
    )
}