import React, { useState } from "react";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";
import './index.css';

function DeleteModal({ setOpenDeleteModal, notebookId }) {
    const [notebookDeleted, setNotebookDeleted] = useState(false);
    const user = useSelector((state) => state.session.user);

    // Delete notebook
async function deleteNotebook(notebookId) {
    const res = await fetch(`/api/notebooks/${notebookId}`, {
        method: "DELETE",
    });
    if (res.ok) {
        const notebook = await res.json();
                setNotebookDeleted(!notebookDeleted);
                setOpenDeleteModal(false);
    } else {
        return "No notebook has been retrieved"
    }
    return res;
}

if (!user) {
    return <Redirect to='/login' />;
  }

return (
    <>
        <div className='modal-background'>
            <div className='modal-container'>
                <button className='close-btn' onClick={() => setOpenDeleteModal(false)}>X</button>
                <div className='title'>
                    <h1>Are You Sure You Want To Delete This Notebook?</h1>
                </div>
                <div className='modal-body'>
                    <p>
                        Clicking "continue" will delete this notebook.
                        <br />
                        Clicking "cancel" will keep this notebook.
                    </p>
                </div>
                <div className='footer'>
                    <button className='confirm-cancel-btn' onClick={() => setOpenDeleteModal(false)}>Cancel</button>
                    <button className='confirm-delete-btn' onClick={() => deleteNotebook(notebookId)}>Continue</button>
                </div>
            </div>
        </div>
    </>
    )
}

export default DeleteModal;
