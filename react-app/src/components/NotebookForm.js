import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getNotebooksThunk, addNotebookThunk } from "../store/notebook";
import Creatable from "react-select/creatable";

const NotebookForm = () => {
    const [title, setTitle] = useState("");
    const [noteId, setNoteId] = useState("");
    const user = useSelector((state) => state.session.user);
    // const notes = useSelector(store => store.notes)
    const dispatch = useDispatch();
    const history = useHistory();
    const notes = [
        {value: 'noteId', label: 'Note'}
    ]

    useEffect(() => {
        dispatch(getNotebooksThunk())
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(addNoteThunk())
    // }, [dispatch])

    const handleSubmit = async (e) => {
        const newNote = {
            title,
            // content,
            // user_id: user.id,
            // notebook_id: notebookId
        }
        const addNotebook = await dispatch(addNotebookThunk(newNote));
        history.push(`/notes/${addNotebook.id}`)
        e.preventDefault();
    }


    return (
        <form className="noteForm" onSubmit={handleSubmit}>
            <h1>Notebooks</h1>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    onChange={(e) => {setTitle(e.target.value)}}
                    value={title}
                ></input>
            </div>
            <Creatable options={notes} />
            <button type="submit">Save Note</button>
        </form>
    )
}

export default NotebookForm;
