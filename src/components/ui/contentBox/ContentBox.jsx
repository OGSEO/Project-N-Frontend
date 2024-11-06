import './ContentBox.css';

export default function ContentBox({children, paddingAndBg= true}) {

    let pClass;

    if (paddingAndBg) {
        pClass = 'contentBoxWithPadAndBg'
    }

    return (
        <div className={`content-box ${pClass}`}>
            {children}
        </div>
    )
}