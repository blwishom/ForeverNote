import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
// import Creatable from "react-select/creatable";

const SearchNotes = (props) => {
    const [userNotes, setUserNotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const notes = useSelector((state) => state.search?.notes);
    const user = useSelector((state) => state.session.user);
    const noteSearch = useSelector(state => state.search?.notes)
    const history = useHistory();

    console.log(notes, '<=====NOTES')
    console.log('OUTSIDE OF USE EFFECT')
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
        console.log(notes, 'note search')
        if (!search) {
            console.log('no search')
            return []
        }
        const searchResult = notes?.notes?.filter((note) => note.title.toLowerCase().includes(search.toLowerCase()))
        console.log(notes, 'notes')
        console.log(searchResult, '<----search result')
        return searchResult
    }


const result = filteredNotes(searchTerm, notes)
// console.log(result, 'RESULT')

    return (
        <div>
            <input
            type='text'
            placeholder='Search Notes'
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            />
            <ul>
                {result?.map((note) => <li onClick={() => {setUserNotes('')
                history.push(`/notes/${notes?.id}`)}} key={note.id}>{note?.title}</li>)}
            </ul>
        </div>
    )
}

export default SearchNotes
