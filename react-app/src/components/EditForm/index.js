import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import Creatable from "react-select/creatable";
import './index.css';

const EditForm = () => {
    const { noteId } = useParams();
    console.log(noteId, '<---------ID')
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [notes, setNotes] = useState([]);
    const [notebookId, setNotebookId] = useState(-1);
    const [noteCreated, setNoteCreated] = useState(false);
    const [errors, setErrors] = useState([]);
    const user = useSelector((state) => state.session.user);
    // const notebooks = useSelector(store => store.notebooks)
    const dispatch = useDispatch();
    const history = useHistory();
    const notebooks = [
        {value: 'notebookId', label: 'Notebook'}
    ]

    // Get all notes thunk
    useEffect(() => {
        (async function notesFetch() {
        const res = await fetch("/api/notes/");
        if (res.ok) {
            const notes = await res.json();
            setNotes(notes.notes)
            }
        })()
    }, [noteCreated])


    // Get one note thunk
async function oneNoteFetch(noteId) {
        const res = await fetch(`/api/notes/${noteId}`);
        if (res.ok) {
            const notes = await res.json();
            setNotes(notes.notes)
            }
        }

    // Edit note thunk
async function editNote(e) {
    e.preventDefault();
    console.log(user.id, 'USER ID <================')
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
            setNoteCreated(!noteCreated)
            history.push("/notes")
            return note;
        } else if (note.errors) {
            setErrors(note.errors)
        }
    }

    return (
        <>
        <form className="edit-note-form" onSubmit={editNote}>
            <h1>Edit Note</h1>
            <div>
                <label>Title</label>
                <input
                    className="title-div"
                    type="text"
                    name="title"
                    placeholder=""
                    onChange={(e) => {setTitle(e.target.value)}}
                    value={title}
                ></input>
            </div>
            <div>
                <label>Content</label>
                <input
                    className="note-textarea"
                    type="textarea"
                    name="content"
                    placeholder=""
                    onChange={(e) => {setContent(e.target.value)}}
                    value={content}
                    ></input>
            </div>
            <Creatable className="notebook-select" options={notebooks} />
            <button className="note-btn" type="submit">Edit Note</button>
            <div>
            {errors.map((error, ind) => (<li key={ind}>{error}</li>))}
            </div>
        </form>
        </>
    )
}

export default EditForm;
