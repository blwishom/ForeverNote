import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Redirect } from "react-router";
import './index.css';

const EditForm = ({ title, content, setEditing, setEditedTitle, setEditedContent, setTitle, setContent, noteId }) => {
    const [note, setNote] = useState([]);
    const [errors, setErrors] = useState([]);
    const [noteCreated, setNoteCreated] = useState(false);
    const user = useSelector((state) => state.session.user);
    const [notebookId, setNotebookId] = useState(-1);
    const dispatch = useDispatch();

    // Get all notes
    useEffect(() => {
        (async function notesFetch() {
        const res = await fetch(`/api/notes/${noteId}`);
        if (res.ok) {
            const noteData = await res.json();
            setNote(noteData)
            }
        })()
    }, [noteCreated]);

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

    if (!user) {
        return <Redirect to='/login' />;
      }

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
            <button className="note-btn">Edit Note</button>
            <div>
            {errors.map((error, ind) => (<li key={ind}>{error}</li>))}
            </div>
        </form>
        </>
    )
}

export default EditForm;
