import './ResultBox.css';

export default function ResultBox({children}) {
   return (
       <div className='result-box'>
           {children}
       </div>
   )
}