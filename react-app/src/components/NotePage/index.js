import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Creatable from "react-select/creatable";
import './index.css'

const NotePage = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [notebookId, setNotebookId] = useState(-1);
    const [noteCreated, setNoteCreated] = useState(false);
    const [noteDeleted, setNoteDeleted] = useState(false);
    const user = useSelector((state) => state.session.user);
    const history = useHistory();

    // Get all notes
    useEffect(() => {
        (async function notesFetch() {
        const res = await fetch("/api/notes/");
        if (res.ok) {
            const notes = await res.json();
            setNotes(notes.notes)
            }
        })()
    }, [noteCreated, noteDeleted])

        // Edit note
async function editNote(noteId) {
    const newNote = {
        title,
        content,
        userId: user.id,
        notebookId: notebookId
        }

    const res = await fetch(`/api/notes/${noteId}/`, {
        method: "POST",
        body: JSON.stringify({...newNote}),
        headers: {"Content-Type": "application/json"}
    });
    if (res.ok) {
        const note = await res.json();
    } else {
        return "No note has been retrieved"
    }
    return res;
}

// Delete note
async function deleteNote(noteId) {
    const res = await fetch(`/api/notes/${noteId}`, {
        method: "DELETE",
    });
    if (res.ok) {
        const note = await res.json();
                setNoteDeleted(!noteDeleted);
    } else {
        return "No note has been retrieved"
    }
    return res;
}


    return (
        <>
        <h1>Notes Page</h1>
        {notes.map((note) => {
            return (
            <div className="note-page-div">
                Title:{note.title}<br/> Content:{note.content}
                <button className="note-page-btns" onClick={() => history.push(`/notes/${note.id}/edit`)}>Edit</button>
                <button className="note-page-btns" onClick={() => deleteNote(note.id)}>Delete</button>
            </div>)
        })}
        </>
    )
}

export default NotePage;
