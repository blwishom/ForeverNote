import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
// import Creatable from "react-select/creatable";

const SearchNotes = () => {
    const [notes, setNotes] = useState([]);
    const user = useSelector((state) => state.session.user);
    const noteSearch = useSelector(state => state.search?.notes)
    const history = useHistory();

    const filteredNotes = (search, notesSearch) => {
        if (!search) {
            return []
        }
        const searchResult = notes?.notes?.filter(note => note.title.toLowerCase().includes(search.toLowerCase()))
        return searchResult
    }

    // Get all notes
    useEffect(() => {
        (async function notesFetch() {
        const res = await fetch("/api/notes/");
        if (res.ok) {
            const notes = await res.json();
            setNotes(notes.notes)
        }
    })()
}, [noteSearch])

const result = filteredNotes(notes, noteSearch)

    return (
        <div>
            <input
            type='text'
            placeholder='Search Notes'
            onChange={(e) => setNotes(e.target.value)}
            value={notes?.notes}
            />
            <ul>
                {result?.map((note) => <li onClick={() => {setNotes('')
                history.push(`/notes/${notes?.id}`)}} key={note.id}>{note?.title}</li>)}
            </ul>
        </div>
    )
}

export default SearchNotes
