import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Creatable from "react-select/creatable";
import EditForm from "../EditForm";
import './index.css';
import '../images/old-school-maro.jpg';

const NotePage = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [noteId, setNoteId] = useState(-1)
    const [content, setContent] = useState("");
    const [editing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(false);
    const [editedContent, setEditedContent] = useState(false);
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

function editing_Note(noteNumber, noteTitle, editedContent) {
    setEditing(!editing);
    setTitle(noteTitle);
    setNoteId(noteNumber);
    setEditedContent(editedContent)
}

    return (
        <>
        <div>
        <h1>NOTES</h1>
        {notes.map((note) => {
            return (
            <div className="note-page-div">
                <div className="note-page-title-div">
                    {note.title}
                    <br/>
                    {note.content}
                </div>

                {/* <div>
                    {(!editing) && <button className="edit-delete-btn" onClick={() => editing_Note(note.id, note.title)}>Edit</button>}
                </div> */}

                <div>
                    {(!editing) && <button className="edit-delete-btn" onClick={() => editing_Note(note.id, note.title)}>Edit</button>}
                </div>

                {(editing && noteId===note.id) && <EditForm title={title} setEditing={setEditing} editing={editing} editedTitle={editedTitle} setTitle={setTitle} setEditedTitle={setEditedTitle} setTitle={setTitle} noteId={noteId} setNoteId={setNoteId}/>}


                {/* <div>
                <button className="note-page-btns" onClick={() => history.push(`/notes/${note.id}/edit`)}>Edit</button>
                </div> */}


                <div>
                {(!editing) && <button className="edit-delete-btn" onClick={() => deleteNote(note.id)}>Delete</button>}
                </div>
            </div>)
        })}
        </div>
        </>
    )
}

export default NotePage;
