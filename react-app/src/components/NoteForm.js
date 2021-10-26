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
        <form className="note-form-form" onSubmit={createNote}>
            <div className="note-form-div">
            <h1>Create Note</h1>
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
                <Creatable className="notebook-select" options={notebooks.title} />
                <button type="submit">Save Note</button>
            </div>
            </div>
        </form>
        </>
    )
}

export default NoteForm;
