import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Creatable from "react-select/creatable";
import './NoteForm.css'

const NoteForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [notes, setNotes] = useState([]);
    const [notebookId, setNotebookId] = useState(-1);
    const [noteCreated, setNoteCreated] = useState(false);
    const user = useSelector((state) => state.session.user);
    const notebooks = [{value: 'notebookId', label: 'Notebook'}]
    const dispatch = useDispatch();
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
    console.log(user.id, '<================USER ID')
    const newNote = {
        title,
        content,
        user_id: user.id
        }
        const res = await fetch("/api/notes/new", {
            method: "POST",
            body: JSON.stringify({...newNote}),
            headers: {"Content-Type": "application/json"}
        });
        if (res.ok) {
            const note = await res.json();
            setNoteCreated(!noteCreated)
            history.push("/notes")
            return note;
        } else {
            return "No note has been retrieved"
        }
    }

    return (
        <>
        <div className="displayed-notes-div">
            {notes.map((note) => {
                return (
                <div>
                    <div className="note-div">{note.title}<br/>{note.content}</div>
                </div>
                )
             })}
        </div>

        <form className="note-form-form" onSubmit={createNote}>
            <div className="note-form-div">
            <h1>Create Note</h1>
            <div>
<<<<<<< HEAD
                {/* <div role="toolbar"></div> */}
                <input
                    className="title-input"
=======
                <input
                    className="title-div"
>>>>>>> 73e39dcd8fc58a9efb6ba0ba5e8db2ee4ce9f5e3
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
<<<<<<< HEAD
                <Creatable className="notebook-select" options={notebooks} />
=======
                <Creatable className="notebook-select" options={notebooks.title} />
>>>>>>> 73e39dcd8fc58a9efb6ba0ba5e8db2ee4ce9f5e3
                <button type="submit">Save Note</button>
            </div>
            </div>
        </form>
        </>
    )
}

export default NoteForm;
