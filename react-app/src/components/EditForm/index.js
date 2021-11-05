import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import Creatable from "react-select/creatable";
import './index.css';

const EditForm = ({ title, content, setEditing, setEditedTitle, setEditedContent, setTitle, setContent, noteId, setNoteId }) => {
    const [notes, setNotes] = useState([]);
    const [errors, setErrors] = useState([]);
    const [noteCreated, setNoteCreated] = useState(false);
    const [noteContent, setNoteContent] = useState("");
    const user = useSelector((state) => state.session.user);
    const [notebookId, setNotebookId] = useState(-1);
    const dispatch = useDispatch();
    const history = useHistory();
    const notebooks = [
        {value: 'notebookId', label: 'Notebook'}
    ]

    // console.log(setNoteContent, '<-----Set Content')
    console.log(setTitle, '<-----Set Title')

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

        console.log(title, '<-----TITLE')
        console.log(content, '<-----CONTENT')

    // Edit note
async function editNote(e) {
    e.preventDefault();
    const newNote = {
        title,
        content,
        user_id: user.id
        }
        const res = await fetch(`/api/notes/${noteId}/edit`, {
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
    console.log(noteContent, '<-----EditForm Content')
    console.log(title, '<-----EditForm Content')

    return (
        <>
        <form id="edit-form" className="edit-note-form" onSubmit={editNote}>
            <div>
                <input
                    className="title-div"
                    type="text"
                    name="title"
                    placeholder="New Title"
                    onChange={(e) => {setTitle(e.target.value)}}
                    value={title}
                ></input>
            </div>
            <div>
                <textarea
                    form="edit-form"
                    className="note-textarea"
                    type="textarea"
                    name="content"
                    placeholder="New Content"
                    onChange={(e) => {setContent(e.target.value)}}
                    value={content}
                    ></textarea>
            </div>
<<<<<<< HEAD
            <Creatable className="notebook-select" options={notebooks} />
            <Link to="/notes" className="note-btn">Edit Note</Link>
=======
            {/* <Creatable className="notebook-select" options={notebooks} /> */}
            <button className="note-btn">Edit Note</button>
>>>>>>> 349c757871bf19030a5a031befa6d1914e081e89
            <div>
            {errors.map((error, ind) => (<li key={ind}>{error}</li>))}
            </div>
        </form>
        </>
    )
}

export default EditForm;
