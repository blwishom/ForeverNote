import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Creatable from "react-select/creatable";
import EditNotebookForm from "./edit_notebook_form";
import './index.css'

const NotebookPage = () => {
    const [notebooks, setNotebooks] = useState([]);
    const [notebookId, setNotebookId] = useState(-1)
    const [title, setTitle] = useState("");
    const [editing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(false);
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
    }, [notebookCreated, notebookDeleted, editing, title, notebookId])

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

function editing_Title(notebookNumber, notebookTitle) {
    setEditing(!editing);
    setTitle(notebookTitle);
    setNotebookId(notebookNumber)
}


    return (
        <>
        <div>
        <h1>NOTEBOOKS</h1>
        {notebooks.map((notebook) => {
            return (<div>
                {/* {const notebookTitle = notebook.title} line 87 and 68 */}
                <div className="notebook-page-div">
                    <div className="notebook-title-div">
                        {notebook.title}
                    </div>
                    <div>
                    <div>
                        {(!editing) && <button className="edit-delete-btn" onClick={() => editing_Title(notebook.id, notebook.title)}>Edit</button>}
                    </div>
                    {(editing && notebookId===notebook.id) && <EditNotebookForm title={title} setEditing={setEditing} editing={editing} editedTitle={editedTitle} setTitle={setTitle} setEditedTitle={setEditedTitle} setTitle={setTitle} notebookId={notebookId} setNotebookId={setNotebookId} />}
                    <div>
                        {(!editing) && <button className="edit-delete-btn" onClick={() => deleteNotebook(notebook.id)}>Delete</button>}
                    </div>
                    </div>
                </div>
                </div>)
        })}
        </div>
        </>
    )
}

export default NotebookPage;
