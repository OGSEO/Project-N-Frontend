import './LandingPage.css';
import LandingPageBox from "../../components/landingPageBox/LandingPageBox.jsx";

export default function LandingPage() {
    return (
        <div className="landing-page-container">
            <h1>Ons doel is burgers en politici dichter bij elkaar te brengen</h1>
            <div className='choice-box'>
                <LandingPageBox
                    title='Burgers'
                    boxType='citizen'
                    subTitle='Deel uw ideeen met burgers uit de stad'
                    registerTitle='Meld u aan als burger'
                    registerLink='register/CITIZEN'
                >
                </LandingPageBox>
                <LandingPageBox
                    title='Politici'
                    boxType='politician'
                    subTitle='Steun ideeen waar uw partij iets in ziet'
                    registerTitle='Direct aanmelden'
                    registerLink='register/POLITICIAN'
                >
                </LandingPageBox>
            </div>
        </div>
    )
}