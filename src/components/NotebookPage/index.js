import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditNotebookForm from "./edit_notebook_form";
import DeleteModal from "./delete_modal";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Redirect } from "react-router";
import './index.css'

const NotebookPage = ({ closeModal }) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deletedNotebookId, setDeletedNotebookId] = useState(-1);
    const [notebooks, setNotebooks] = useState([]);
    const [notebookId, setNotebookId] = useState(-1);
    const [title, setTitle] = useState("");
    const [editing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(false);
    const [notebookCreated, setNotebookCreated] = useState(false);
    const [notebookDeleted, setNotebookDeleted] = useState(false);
    const [notes, setNotes] = useState([]);
    const [noteCreated, setNoteCreated] = useState(false);
    const user = useSelector((state) => state.session.user);

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
            const notebooks = await res.json();
            setNotebooks(notebooks.notebook)
            }
        })()
    }, [notebookCreated, notebookDeleted, editing, title, notebookId, openDeleteModal])


function modalFunction(notebookId) {
    setDeletedNotebookId(notebookId);
    setOpenDeleteModal(true);
}

function editing_Title(notebookNumber, notebookTitle) {
    setEditing(!editing);
    setTitle(notebookTitle);
    setNotebookId(notebookNumber)
}

if (!user) {
    return <Redirect to='/login' />;
  }

    return (
        <>
        <div className="notebook-full-page-div">
        {notebooks.map((notebook) => {
            const filteredNotes = notes.filter((note) => notebookId === note.notebookId2);
            return (
                <div>
                <div className="notebook-page-div">
                    <div className="notebook-title-div">
                        {notebook.title}
                    </div>
                        <a href={`/api/notebooks/${notebookId}`}>{filteredNotes.title}</a>
                    <div>
                    <div>
                        <div className='edit-delete-div'>
                        <button to={`notebooks/${notebook.id}/edit`} className="note-page-edit-btn" onClick={() => editing_Title(notebook.id, notebook.title, notebook.content)}><FaRegEdit /></button>
                        <button className="note-page-delete-btn" onClick={() => {modalFunction(notebook.id)}}><FaTrashAlt /></button>
                    {(openDeleteModal && deletedNotebookId===notebook.id) && <DeleteModal setOpenDeleteModal={setOpenDeleteModal} notebookId={notebook.id} />}
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
