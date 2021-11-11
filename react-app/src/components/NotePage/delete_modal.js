import React, { useState } from "react";
import { Modal } from "../../Modal/Modal";
import NotePage from ".";
import './index.css';

function DeleteModal({ closeModal }) {
    const [showModal, setShowModal] = useState(false);
    const [notes, setNotes] = useState([]);
    const [noteDeleted, setNoteDeleted] = useState(false);

    // Delete note
async function deleteNote(noteId) {
    const res = await fetch(`/api/notes/${noteId}`, {
        method: "DELETE",
    });
    if (res.ok) {
        const note = await res.json();
                setNoteDeleted(!noteDeleted);
    } else {
        return "No note has been retrieved"
    }
    return res;
}

return (
    <>
        <div className='modal-background'>
            <div className='modal-container'>
                <button className='close-btn' onClick={() => closeModal(false)}>X</button>
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
    {notes.map((note) => {
        return (
            <div>
            <div>
            </div>
    </div>)
    })}
    <button className='confirm-delete-btn' onClick={() => closeModal(false)}>Cancel</button>
    <button className='confirm-delete-btn' onClick={() => deleteNote()}>Continue</button>
                </div>
                <button className='delete-btn-modal' onClick={() => setShowModal(true)}>
                    Modal
                </button>
                {/* {showModal && (<Modal onclose={() => setShowModal(false)}>
                    <NotePage />
                </Modal>)} */}
            </div>
        </div>
    </>
    )
}

export default DeleteModal;
