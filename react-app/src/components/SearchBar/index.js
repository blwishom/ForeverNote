import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import EditForm from "../EditForm";
import { Redirect } from "react-router";
import './index.css';

const SearchNotes = (props) => {
    const [userNotes, setUserNotes] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [title, setTitle] = useState("");
    const [note, setNote] = useState([]);
    const [content, setContent] = useState("");
    const [noteId, setNoteId] = useState(-1);
    const [editing, setEditing] = useState(false);
    const [searching, setSearching] = useState(false);
    const [editedTitle, setEditedTitle] = useState(false);
    const [editedContent, setEditedContent] = useState(false);
    const [noteCreated, setNoteCreated] = useState(false);
    const [noteDeleted, setNoteDeleted] = useState(false);
    const notes = useSelector((state) => state.search?.notes);
    const user = useSelector((state) => state.session.user);
    const noteSearch = useSelector(state => state.userNotes);
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

    // Get one note
    async function oneNoteFetch(noteId) {
        const res = await fetch(`/api/notes/${noteId}`);
        if (res.ok) {
            const notes = await res.json();
            setNote(notes.notes)
            }
        }


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
