import './FormButton.css';

export default function FormButton({type, children, onSubmit }) {
    return (
        <button className='form-button' type={type} onSubmit={onSubmit}>
            {children}
        </button>
    )
}