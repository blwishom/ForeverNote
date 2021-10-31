import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import Creatable from "react-select/creatable";
import './index.css'

const EditNotebookForm = ({ title, setEditing, setEditedTitle, setTitle, notebookId, setNotebookId }) => {
    const [notebooks, setNotebooks] = useState([]);
    const [errors, setErrors] = useState([]);
    const [notebookCreated, setNotebookCreated] = useState(false);
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    // Get all notebooks
    useEffect(() => {
        (async function notesFetch() {
        const res = await fetch("/api/notebooks/");
        if (res.ok) {
            const notebooks = await res.json();
            setNotebooks(notebooks.notebooks)
            }
        })()
    }, [notebookCreated])


    // Get one notebook
async function oneNoteFetch(notebookId) {
        const res = await fetch(`/api/notebooks/${notebookId}`);
        if (res.ok) {
            const notebooks = await res.json();
            setNotebooks(notebooks.notebooks)
            }
        }

    // Edit notebook
async function editNotebook(e) {
    e.preventDefault();
    const newNotebook = {
        title,
        user_id: user.id
        }
        const res = await fetch(`/api/notebooks/${notebookId}/edit`, {
            method: "PUT",
            body: JSON.stringify({...newNotebook}),
            headers: {"Content-Type": "application/json"}
        });

        const notebook = await res.json();
        if (res.ok) {
            setEditing(false)
            setEditedTitle(-1)
            setNotebookCreated(!notebookCreated)
            return notebook;
        } else if (notebook.errors) {
            setErrors(notebook.errors)
        }
    }

    return (
        <>
        <form className="notebookForm" onSubmit={editNotebook}>
            <div>
                <label>Title</label>
                <input
                    className="notebook-title"
                    type="text"
                    name="title"
                    // placeholder={notebook?.title}
                    onChange={(e) => {setTitle(e.target.value)}}
                    value={title}
                ></input>
            </div>
            <button className="notebook-btn" type="submit">Edit Notebook</button>
            <div>
            {errors.map((error, ind) => (<li key={ind}>{error}</li>))}
            </div>
        </form>
        </>
    )
}

export default EditNotebookForm;
