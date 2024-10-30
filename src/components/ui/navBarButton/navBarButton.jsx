import './navBarButton.css'

export default function NavBarButton({label, onClick, type}) {

    return (
        <div className="navbar-button-box">
                <button type={type} onClick={onClick}>
                    {label}
                </button>
        </div>
    )
}