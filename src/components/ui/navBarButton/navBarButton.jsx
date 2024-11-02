import './navBarButton.css'

export default function NavBarButton({label, onClick, type, icon}) {

    return (
        <div className='navbar-button-box'>
            <div className='button-icon'>
                {icon}
            </div>
            <div>
                <button type={type} onClick={onClick}>
                    {label}
                </button>
            </div>
        </div>
    )
}