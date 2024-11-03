import  './ContainerBox.css';

export default function ContainerBox({children, useCase}) {
    return (
        <div className={`container ${useCase}`}>
            {children}
        </div>
    )
}