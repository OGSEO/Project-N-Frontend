import './FormButton.css';

export default function FormButton({ children, handler, btnColor='default' }) {
    return (
        <button className={`form-button ${btnColor}`} type="submit" onClick={handler}>
            {children}
        </button>
    )
}