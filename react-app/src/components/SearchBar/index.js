import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Redirect } from "react-router";
import './index.css';

const SearchNotes = () => {
    const [userNotes, setUserNotes] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [title, setTitle] = useState("");
    const [note, setNote] = useState([]);
    const [content, setContent] = useState("");
    const [noteId, setNoteId] = useState(-1);
    const [searching, setSearching] = useState(false);
    const notes = useSelector((state) => state.search?.notes);
    const user = useSelector((state) => state.session.user);
    const history = useHistory();

// Get all notes
useEffect(() => {
    (async function notesFetch() {
        const res = await fetch("/api/notes/");
        if (res.ok) {
            const notes = await res.json();
            setUserNotes(notes.notes)
        }
    })()
}, [setUserNotes]);



const filteredNotes = (search, notes) => {
        if (!search) {
            return [];
        }
        const searchResult = userNotes?.filter((notes) => notes.title.toLowerCase().includes(search.toLowerCase()));
        return searchResult
    }

    function searching_Note(noteNumber, noteTitle, noteContent) {
        setSearching(!searching);
        setTitle(noteTitle);
        setContent(noteContent);
        setNoteId(noteNumber);
}


const result = filteredNotes(searchTerm, notes);

if (!user) {
    return <Redirect to='/login' />;
  }

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
