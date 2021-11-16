import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Creatable from "react-select/creatable";
import { notebooksFetch } from "./NotebookForm";
import './NoteForm.css'

const NoteForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [notes, setNotes] = useState([]);
    const [notebooks2, setNotebooks2] = useState([]);
    const [notebookId, setNotebookId] = useState('');
    const [noteCreated, setNoteCreated] = useState(false);
    const [errors, setErrors] = useState([]);
    const user = useSelector((state) => state.session.user);
    const notebooks = [{value: 'notebookId', label: 'Notebook'}];
    // const notebookSelector = useSelector((state) => state.notebooks);
    const [notebookCreated, setNotebookCreated] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    console.log(notebooks2, '<----------NBs2')

    // Get all notebooks
    useEffect(() => {
        (async function notebooksFetch() {
        const res = await fetch("/api/notebooks/");
        if (res.ok) {
            const notebooks = await res.json();
            setNotebooks2(notebooks.notebook);
            console.log(notebooks.notebook, '<----notebooks')
            }
        })()
    }, [notebookCreated, title, notebookId])

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

        // Create note
        async function createNote(e) {
            e.preventDefault();
// debugger
            const newNote = {
                title,
                content,
                notebookId,
                user_id: user.id
            }
            const res = await fetch("/api/notes/new", {
                method: "POST",
                body: JSON.stringify({...newNote}),
                headers: {"Content-Type": "application/json"}
            });
            const note = await res.json();
                if (res.ok) {
                setNoteCreated(!noteCreated)
                history.push("/notes")
                }
                else if (note.errors) {
                    setErrors(note.errors)
                }

    }


    return (
        <div className="create-note-page-div">
        <div className="note-page-backgound-img">

        </div>
        <form className="note-form-form" onSubmit={createNote}>
            <div className="note-form-div">
            <div>
                <input
                    className="title-div"
                    type="text"
                    name="title"
                    placeholder="Title"
                    onChange={(e) => {setTitle(e.target.value)}}
                    value={title}
                ></input>
                <textarea
                    className="note-textarea"
                    name="content"
                    placeholder="Write a new note here"
                    onChange={(e) => {setContent(e.target.value)}}
                    value={content}
                ></textarea>
                <div>
                    <select
                    className="notebook-select"
                    options={notebooks.id}
                    onChange={(e) => {
                        const selectNotebook = e.target.value;
                        setNotebookId(selectNotebook)
                    }}
                    value={notebookId}>
                     {notebooks2?.map((notebook) => (
                        <option key={notebook.id} value={notebook.id}>{notebook.title}</option>
                    ))}
                    </select>
                </div>
                <div>
                    <button className="note-btn" type="submit" onClick={() => {setNotebooks2(notebooks2)}}>Save Note</button>
                </div>
            </div>
            </div>
        </form>
        <div>
            {errors.map((error, ind) => (<li key={ind}>{error}</li>))}
        </div>
        <div className="displayed-notes-div">
            {notes.map((note) => {
                return (
                <div>
                    <div className="note-div">
                        <div className="note-form-title-div">{note.title}</div>
                        <br/>
                        <div className="note-form-content-div">{note.content}</div>
                    </div>
                </div>
                )
             })}
        </div>
        </div>
    )
}

export default NoteForm;
