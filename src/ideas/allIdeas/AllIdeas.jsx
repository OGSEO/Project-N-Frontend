// import './AllIdeas.css'
// import {useEffect, useState} from "react";
// import ApiService from "../../service/ApiService.js";
// import {Link} from "react-router-dom";
//
// export default function AllIdeas() {
//     const [ideas, setIdeas] = useState([]);
//
//     useEffect(() => {
//         async function fetchIdeas() {
//             try {
//                 const response = await ApiService.getAllIdeas();
//                 const ideaList = response.ideaList;
//                 console.log(response);
//                 setIdeas(ideaList);
//             } catch (e) {
//                 console.error(e)
//             }
//         }
//
//         void fetchIdeas();
//     }, []);
//
//
//     console.log(ideas);
//
//     return (
//         <div className="all-ideas">
//             <h2>All Ideas</h2>
//             <ul>
//                 {ideas.map((idea) => (
//                     <Link to={`${idea.id}`} key={idea.id}>
//                         <li>
//                             <h1>{idea.title}</h1>
//                             <h3>idee van: {idea.user.name}</h3>
//                             <h3>{idea.description}</h3>
//                         </li>
//                     </Link>
//                 ))}
//             </ul>
//         </div>
//     )
// }