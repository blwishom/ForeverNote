import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getNotesThunk, addNoteThunk } from "../store/note";
import Creatable from "react-select/creatable";

const NoteForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("")
    const [notebookId, setNotebookId] = useState("");
    const user = useSelector((state) => state.session.user);
    // const notebooks = useSelector(store => store.notebooks)
    const dispatch = useDispatch();
    const history = useHistory();
    const notebooks = [
        {value: 'notebookId', label: 'Notebook'}
    ]

    useEffect(() => {
        dispatch(getNotesThunk())
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(addNoteThunk())
    // }, [dispatch])

    const handleSubmit = async (e) => {
        const newNote = {
            title,
            content,
            user_id: user.id,
            notebook_id: notebookId
        }
        const addNote = await dispatch(addNoteThunk(newNote));
        history.push(`/notes/${addNote.id}`)
        e.preventDefault();
    }


    return (
        <form className="noteForm" onSubmit={handleSubmit}>
            <h1>Notes</h1>
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
    )
}

export default NoteForm;