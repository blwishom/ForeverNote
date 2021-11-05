import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Creatable from "react-select/creatable";
import EditForm from "../EditForm";
import { Link } from "react-router-dom";
import './index.css';
import '../images/old-school-maro.jpg';

const NotePage = () => {
    const [notes, setNotes] = useState([]);
    const [noteId, setNoteId] = useState(-1);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    // const [noteContent, setNoteContent] = useState("");
    const [editing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(false);
    const [editedContent, setEditedContent] = useState(false);
    const [noteCreated, setNoteCreated] = useState(false);
    const [noteDeleted, setNoteDeleted] = useState(false);
    const user = useSelector((state) => state.session.user);
    const history = useHistory();

    console.log(title, '<======NotePage Title')
    console.log(content, '<======NotePage Content')

    // Get all notes
    useEffect(() => {
        (async function notesFetch() {
        const res = await fetch("/api/notes/");
        if (res.ok) {
            const notes = await res.json();
            setNotes(notes.notes)
            }
        })()
    }, [noteCreated, noteDeleted, editing, title, content, noteId])

    // Edit note
    async function editNote(noteId) {
        const newNote = {
            title,
            content,
            // userId: user.id,
        }

        const res = await fetch(`/api/notes/${noteId}/edit`, {
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

function editing_Note(noteNumber, noteTitle, noteContent) {
    setEditing(!editing);
    setTitle(noteTitle);
    setContent(noteContent);
    setNoteId(noteNumber);
}

console.log(notes)

    return (
        <>
        <div>
        <h1 className="h1">NOTES</h1>
        {notes.map((note) => {
            return (
            <div>
            {(!editing) && <div className="note-page-div">
                <div className="note-page-title-div">
                    <div className="note-content-div">
                    {note.title}
                    </div>
                    <br/>
                    {note.content}
                </div>
                <div>
                <div>
                    <button to={`notes/${note.id}/edit`} className="note-page-edit-btn" onClick={() => editing_Note(note.id, note.title, note.content)}>Edit</button>
                    <button className="note-page-delete-btn" onClick={() => deleteNote(note.id)}>Delete</button>
                </div>
                </div>
            </div>}
            {(editing && noteId===note.id) && <EditForm title={title} content={content} setContent={setContent} setEditing={setEditing} editing={editing} editedTitle={editedTitle} setTitle={setTitle} setEditedTitle={setEditedTitle} setEditedContent={setEditedContent} noteId={noteId} setNoteId={setNoteId}/>}
        </div>)
        })}
        </div>
        </>
    )
}

export default NotePage;
