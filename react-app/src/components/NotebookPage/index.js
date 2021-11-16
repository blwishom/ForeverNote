import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Creatable from "react-select/creatable";
import EditNotebookForm from "./edit_notebook_form";
import './index.css'

const NotebookPage = () => {
    const [notebooks, setNotebooks] = useState([]);
    const [notebookId, setNotebookId] = useState(-1);
    const [notebookId2, setNotebookId2] = useState(-1);
    const [title, setTitle] = useState("");
    const [editing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(false);
    const [notebookCreated, setNotebookCreated] = useState(false);
    const [notebookDeleted, setNotebookDeleted] = useState(false);
    const [notes, setNotes] = useState([]);
    const [noteCreated, setNoteCreated] = useState(false);
    const user = useSelector((state) => state.session.user);
    const history = useHistory();

    console.log(notebookId2, '<------NBs')
    console.log(notes, '<--------Notes')

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
        <div className="notebook-full-page-div">
        {notebooks.map((notebook) => {
            const filteredNotes = notes.filter(note => notebookId == notes.notebookId2);
            return (
            <div>
                <div className="notebook-page-div">
                    <div className="notebook-title-div">
                        {notebook.title}
                    </div>
                    {/* <p>Hello</p> */}
                    <div>
                    <div>
                        <div className='edit-delete-div'>
                            {(!editing) && <button className="edit-btn" onClick={() => editing_Title(notebook.id, notebook.title)}>Edit</button>}
                            {(!editing) && <button className="delete-btn" onClick={() => deleteNotebook(notebook.id)}>Delete</button>}
                        </div>
                    </div>
                    {(editing && notebookId===notebook.id) && <EditNotebookForm title={title} setEditing={setEditing} editing={editing} editedTitle={editedTitle} setTitle={setTitle} setEditedTitle={setEditedTitle} notebookId={notebookId} setNotebookId={setNotebookId} />}
                    <div>
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
