import './FormButton.css';

export default function FormButton({ children, handler }) {
    return (
        <button className='form-button' type="submit" onClick={handler}>
            {children}
        </button>
    )
}