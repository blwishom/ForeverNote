import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import './index.css';

const SearchNotes = (props) => {
    const [userNotes, setUserNotes] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const notes = useSelector((state) => state.search?.notes);
    const user = useSelector((state) => state.session.user);
    const noteSearch = useSelector(state => state.userNotes)
    const history = useHistory();

    console.log(userNotes, '<=====NOTES')
    console.log(user, '<=======USER')
    // console.log('TOP OF USE EFFECT')

    // Get all notes
    useEffect(() => {
        (async function notesFetch() {
        const res = await fetch("/api/notes/");
        if (res.ok) {
            const notes = await res.json();
            // console.log(notes, '<---notes')
            setUserNotes(notes.notes)
            // console.log(notes.notes, '<----notes.notes')
        }
    })()
}, [setUserNotes])

    const filteredNotes = (search, notes) => {
        // console.log(notes, 'note search')
        if (!search) {
            console.log('no search')
            return []
        }
        const searchResult = userNotes?.filter((notes) => notes.title.toLowerCase().includes(search.toLowerCase()))
        console.log(searchResult, '<----search result')
        return searchResult
    }


const result = filteredNotes(searchTerm, notes)
console.log(result, 'RESULT')

    return (
        <div>
            <input
            className='searchbar-input'
            type='text'
            placeholder='Search Notes'
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            />
            <ul className='search-result-dropdown'>
                {result?.map((note) => <li onClick={() => {setSearchTerm('')
                history.push(`/notes/${note?.id}`)}} key={note.id}>{note?.title}</li>)}
            </ul>

        </div>
    )
}

export default SearchNotes
