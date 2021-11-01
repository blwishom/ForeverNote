import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Creatable from "react-select/creatable";
import EditForm from "../EditForm";
import './index.css';
import '../images/old-school-maro.jpg';

const NotePage = () => {
    const [notes, setNotes] = useState([]);
    const [noteId, setNoteId] = useState(-1);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(false);
    const [editedContent, setEditedContent] = useState(false);
    const [noteCreated, setNoteCreated] = useState(false);
    const [noteDeleted, setNoteDeleted] = useState(false);
    const user = useSelector((state) => state.session.user);
    const history = useHistory();




    // const [editedNoteTitle,  setEditedNoteTitle] = useState(false);
    // const [editedTitle, setEditedTitle] = useState(false);
    // const [editedContent, setEditedContent] = useState(false);
    // const [editedNoteContent, setEditedNoteContent] = useState(false);
    // const [notebookId, setNotebookId] = useState(-1);

    // Get all notes
    useEffect(() => {
        (async function notesFetch() {
        const res = await fetch("/api/notes/");
        if (res.ok) {
            const notes = await res.json();
            setNotes(notes.notes)
            }
        })()
    }, [noteCreated, noteDeleted, editing])

        // Edit note
async function editNote(noteId) {
    const newNote = {
        title,
        content,
        userId: user.id,
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

function editing_Note(noteNumber, noteTitle, noteContent, editedContent) {
    setEditing(!editing);
    setTitle(noteTitle);
    setContent(noteContent)
    setNoteId(noteNumber);
    // setEditedContent(editedContent)
}

console.log(editing, '<-------EDITING')

    return (
        <>
        <div>
        <h1>NOTES</h1>
        {notes.map((note) => {
            return (
            <div>
            <div className="note-page-div">
                <div className="note-page-title-div">
                    <div className="note-content-div">
                    {note.title}
                    </div>
                    <br/>
                    {note.content}
                </div>
                <div>
                <div>
                    {(!editing) && <button className="edit-delete-btn" onClick={() => editing_Note(note.id, note.title, note.content)}>Edit</button>}
                </div>
                {(editing && noteId===note.id) && <EditForm title={title} setEditing={setEditing} editing={editing} editedTitle={editedTitle} editedContent={editedContent} setEditedContent={setEditedContent} setTitle={setTitle} setEditedTitle={setEditedTitle} setTitle={setTitle} setContent={setContent} noteId={noteId} setNoteId={setNoteId}/>}
                <div>
                {(!editing) && <button className="edit-delete-btn" onClick={() => deleteNote(note.id)}>Delete</button>}
                </div>
                </div>
            </div>
            </div>)
        })}
        </div>
        </>
    )
}

export default NotePage;
