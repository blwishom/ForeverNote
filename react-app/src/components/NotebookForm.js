import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Creatable from "react-select/creatable";

const NotebookForm = () => {
    const [title, setTitle] = useState("");
    const [notebookId, setNotebookId] = useState("");
    const [notebooks, setNotebooks] = useState([]);
    const user = useSelector((state) => state.session.user);
    const [notebookCreated, setNotebookCreated] = useState(false);
    const notes = [{value: 'noteId', label: 'Note'}]
    const dispatch = useDispatch();
    const history = useHistory();

    // Get all notebooks
    useEffect(() => {
        (async function notebooksFetch() {
        const res = await fetch("/api/notebooks/");
        if (res.ok) {
            const notebooks = await res.json();
            setNotebooks(notebooks.notebooks)
            }
        })()
    }, [notebookCreated])


    // Get one note
async function oneNotebookFetch(notebookId) {
        const res = await fetch(`/api/notebooks/${notebookId}`);
        if (res.ok) {
            const notebooks = await res.json();
            setNotebooks(notebooks.notebooks)
            }
        }

    // Create notebook
async function createNotebook(e) {
    e.preventDefault();
    console.log(user.id, '<================USER ID')
    const newNotebook = {
        title,
        user_id: user.id
        }
        const res = await fetch("/api/notebooks/new", {
            method: "POST",
            body: JSON.stringify({...newNotebook}),
            headers: {"Content-Type": "application/json"}
        });
        if (res.ok) {
            const notebook = await res.json();
            setNotebookCreated(!notebookCreated)
            history.push("/notebooks")
            return notebook;
        } else {
            return "No notebook has been retrieved"
        }
    }


    return (
        <form className="notebook-form" onSubmit={createNotebook}>
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
            <button type="submit">Save Notebook</button>
        </form>
    )
}

export default NotebookForm;
