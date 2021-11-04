import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Creatable from "react-select/creatable";
import './index.css';

const EditForm = ({ title, content, setEditing, setEditedTitle, setEditedContent, setTitle, setContent, noteId, setNoteId }) => {
    const [notes, setNotes] = useState([]);
    const [errors, setErrors] = useState([]);
    const [noteCreated, setNoteCreated] = useState(false);
    const [noteContent, setNoteContent] = useState("");
    const [noteTitle, setNoteTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const user = useSelector((state) => state.session.user);
    const [notebookId, setNotebookId] = useState(-1);
    const dispatch = useDispatch();
    const history = useHistory();
    const notebooks = [
        {value: 'notebookId', label: 'Notebook'}
    ]

    console.log(title, '<-----EditForm Title')
    console.log(noteTitle, '<-----EditForm New Title')
    console.log(noteContent, '<-----EditForm New Content')
    console.log(content, '<-----EditForm Original Content')

    // Get all notes
    useEffect(() => {
        (async function notesFetch() {
        const res = await fetch("/api/notes/");
        if (res.ok) {
            const notes = await res.json();
            setNotes(notes.notes)
            }
        })()
    }, [noteCreated])

    // Get one note
async function oneNoteFetch(noteId) {
    const res = await fetch(`/api/notes/${noteId}`);
    if (res.ok) {
            const notes = await res.json();
            setNotes(notes.notes)
            }
        }


    // Edit note
async function editNote(e, noteId) {
    e.preventDefault();
    const newNote = {
        title,
        content,
        user_id: user.id
        }
        const res = await fetch(`/api/notes/${noteId}/edit/`, {
            method: "PUT",
            body: JSON.stringify({...newNote}),
            headers: {"Content-Type": "application/json"}
        });

        const note = await res.json();
        if (res.ok) {
            setEditing(false)
            setEditedTitle(-1)
            setEditedContent(-1)
            setNoteCreated(!noteCreated)
            return note;
        } else if (note.errors) {
            setErrors(note.errors)
        }
        return note
    }

    console.log(setEditing, '<----Editing')

    return (
        <>
        <form className="edit-note-form" onSubmit={editNote}>
            <div>
                <input
                    className="title-div"
                    type="text"
                    name="title"
                    placeholder="New Title"
                    onChange={(e) => {setNoteTitle(e.target.value)}}
                    value={title}
                ></input>
            </div>
            <div>
                <textarea
                    className="note-text-area"
                    type="text"
                    name="content"
                    placeholder="New Content"
                    onChange={(e) => {setNoteContent(e.target.value)}}
                    value={content}
                    ></textarea>
            </div>
            {/* <Creatable className="notebook-select" options={notebooks} /> */}
            <div>
            <Link to="/notes" type='submit' className="note-btn">Edit Note</Link>
            {errors.map((error, ind) => (<li key={ind}>{error}</li>))}
            </div>
        </form>
        </>
    )
}

export default EditForm;
