import './SearchBox.css';
import {useState} from "react";

export default function SearchBox() {
    const [query, setQuery] = useState('');

    return (
        <input
            className='search'
            type='text'
            placeholder='Zoek ideeen op naam...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            />
    );
}