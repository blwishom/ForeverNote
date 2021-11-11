import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Creatable from "react-select/creatable";
import EditForm from "../EditForm";
import { Link } from "react-router-dom";
import SearchNotes from "../SearchBar";
import './index.css';

const SearchNotePage = () => {
    const [userNotes, setUserNotes] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [noteId, setNoteId] = useState(-1);
    const [editing, setEditing] = useState(false);
    const [searching, setSearching] = useState(false);
    const [editedTitle, setEditedTitle] = useState(false);
    const [editedContent, setEditedContent] = useState(false);
    const [noteCreated, setNoteCreated] = useState(false);
    const [noteDeleted, setNoteDeleted] = useState(false);
    const note = useSelector((state) => state.search?.notes);
    const user = useSelector((state) => state.session.user);
    const noteSearch = useSelector(state => state.userNotes);
    const history = useHistory();

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
                setNotes(notes.notes)
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

    const result = filteredNotes(searchTerm, notes)
    console.log(result, 'RESULT')
    console.log(result?.title, '<========Notes')
    console.log(noteId, '<======NoteID')

    return (
        <>
        <div>
        <h1 className="h1">NOTE {noteId}</h1>
        Note
        {notes.map((note) => {
            return (
        <div>
            {noteId}
            {note.content}
            {(searching && noteId===note.id) && <EditForm title={title} content={content} setContent={setContent} setEditing={setEditing} editing={editing} editedTitle={editedTitle} setTitle={setTitle} setEditedTitle={setEditedTitle} setEditedContent={setEditedContent} noteId={noteId} setNoteId={setNoteId}/>}
        </div>)
        })}
        </div>
        </>
    )
}

export default SearchNotePage
