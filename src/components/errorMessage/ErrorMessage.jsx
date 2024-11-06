import './ErrorMessage.css';

export default function ErrorMessage({error}) {
    return (
        <div className='error'>
            <p className='error-text'>{error.message}</p>
        </div>
    )
}