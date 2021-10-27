import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Creatable from "react-select/creatable";
import './index.css'

const NotebookPage = () => {
    const [notebooks, setNotebooks] = useState([]);
    const [title, setTitle] = useState("");
    const [notebookCreated, setNotebookCreated] = useState(false);
    const [notebookDeleted, setNotebookDeleted] = useState(false);
    const user = useSelector((state) => state.session.user);
    const history = useHistory();

    console.log(notebooks)

    // Get all notebooks
    useEffect(() => {
        (async function notebooksFetch() {
        const res = await fetch("/api/notebooks/");
        if (res.ok) {
            // console.log('RES<=============')
            const notebooks = await res.json();
            // console.log(notebooks, '<==========Inside res.ok')
            setNotebooks(notebooks.notebook)
            }
        })()
    }, [notebookCreated, notebookDeleted])

        // Edit notebook
async function editNotebook(notebookId) {
    const newNotebook = {
        title,
        // userId: user.id,
        // notebookId: notebookId
        }

    const res = await fetch(`/api/notebooks/${notebookId}/`, {
        method: "POST",
        body: JSON.stringify({...newNotebook}),
        headers: {"Content-Type": "application/json"}
    });
    if (res.ok) {
        const notebook = await res.json();
    } else {
        return "No notebook has been retrieved"
    }
    return res;
}

// Delete notebook
async function deleteNotebook(notebookId) {
    const res = await fetch(`/api/notebooks/${notebookId}`, {
        method: "DELETE",
    });
    if (res.ok) {
        const notebook = await res.json();
                setNotebookDeleted(!notebookDeleted);
    } else {
        return "No notebook has been retrieved"
    }
    return res;
}


    return (
        <>
        <h1>Notebooks Page</h1>
        {notebooks.map((notebook) => {
            return (<div>
                <div className="notebook-page-div">Title: {notebook.title}
                <button onClick={() => history.push(`/notebooks/${notebook.id}/edit`)}>Edit</button>
                <button onClick={() => deleteNotebook(notebook.id)}>Delete</button>
                </div>
                </div>)
        })}
        </>
    )
}

export default NotebookPage;
