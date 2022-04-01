import React, { useState } from "react";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import './index.css';

function DeleteModal({ setOpenDeleteModal, noteId }) {
    const [noteDeleted, setNoteDeleted] = useState(false);
    const user = useSelector((state) => state.session.user);
    const history = useHistory();

    // Delete note
async function deleteNote(noteId) {
    const res = await fetch(`/api/notes/${noteId}`, {
        method: "DELETE",
    });
    if (res.ok) {
        const note = await res.json();
                setNoteDeleted(!noteDeleted);
                setOpenDeleteModal(false);
    } else {
        return "No note has been retrieved"
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
                    <h1>Are You Sure You Want To Delete This Note?</h1>
                </div>
                <div className='body'>
                    <p>
                        Clicking "continue" will delete this note.
                        <br />
                        Clicking "cancel" will keep this note.
                    </p>
                </div>
                <div className='footer'>
                    <button className='confirm-cancel-btn' onClick={() => setOpenDeleteModal(false)}>Cancel</button>
                    <button className='confirm-delete-btn' onClick={() => (history.goBack(), deleteNote(noteId))}>Continue</button>
                </div>
            </div>
        </div>
    </>
    )
}

export default DeleteModal;
