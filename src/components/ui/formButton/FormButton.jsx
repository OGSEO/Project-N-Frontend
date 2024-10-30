import './FormButton.css'

export default function FormButton({styling, children, onBtnClick}) {

    function getButtonClass() {
        switch(styling) {
            case 'cancelBtn':
                return "cancelBtn"
            default:
                return "primaryBtn";
        }
    }



    return (
        <button className={`${getButtonClass()} button`} onClick={onBtnClick}>
            {children}
        </button>
    )
}