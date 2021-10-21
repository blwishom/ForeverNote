import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getNotesThunk } from "../store/note";

const NoteForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("")
    const [notebookId, setNotebookId] = useState("");
    const user = useSelector((state) => state.session.user);
    // const notebooks = useSelector(store => store.notebooks)
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getNotesThunk())
    }, [dispatch])

    const handleSubmit = async (e) => {
        const newNote = {
            title,
            content,
            user_id: user.id,
            notebook_id: notebookId
        }
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
            <button type="submit">Create Note</button>
        </form>
    )
}

export default NoteForm;
