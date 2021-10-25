import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Creatable from "react-select/creatable";

const NoteForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [notes, setNotes] = useState([]);
    const [notebookId, setNotebookId] = useState(-1);
    const [noteCreated, setNoteCreated] = useState(false);
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

    // Create note thunk
async function createNote(e) {
    e.preventDefault();
    console.log(user.id, 'USER ID <================')
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
        <form className="noteForm" onSubmit={createNote}>
            <h1>Create Note</h1>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    onChange={(e) => {setTitle(e.target.value)}}
                    value={title}
                ></input>
            </div>
            <div>
                <label>Content</label>
                <input
                    type="textarea"
                    name="content"
                    onChange={(e) => {setContent(e.target.value)}}
                    value={content}
                    ></input>
            </div>
            <Creatable options={notebooks} />
            <button type="submit">Save Note</button>
        </form>
        </>
    )
}

export default NoteForm;
