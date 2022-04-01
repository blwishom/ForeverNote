import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import EditForm from "../EditForm";
import DeleteModal from "./delete_modal";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";
import './index.css';

const SearchNotePage = ({ closeModal }) => {
    const [note, setNote] = useState('');
    const {noteId} = useParams();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deletedNoteId, setDeletedNoteId] = useState(-1);
    const [notes, setNotes] = useState([]);
    const [noteId2, setNoteId2] = useState(-1);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(false);
    const [editedContent, setEditedContent] = useState(false);
    const [noteCreated, setNoteCreated] = useState(false);
    const [noteDeleted, setNoteDeleted] = useState(false);
    const user = useSelector((state) => state.session.user);
    const history = useHistory();

// Get all notes
useEffect(() => {
    (async function notesFetch() {
        const res = await fetch(`/api/notes/${noteId}`);
        if (res.ok) {
            const noteData = await res.json();
            setNote(noteData);
            setTitle(noteData.title);
            setContent(noteData.content);
        }
    })()
}, [noteCreated, noteDeleted, editing, title, content, noteId, openDeleteModal]);


// Delete note
// async function deleteNote(noteId) {
//     const res = await fetch(`/api/notes/${noteId}`, {
//         method: "DELETE",
//     });
//     if (res.ok) {
//         const note = await res.json();
//             setNoteDeleted(!noteDeleted);
//             history.push('/notes');
//     } else {
//         return "No note has been retrieved"
//     }
//     return res;
// }

    if (!user) {
        return <Redirect to='/login' />;
        };

function modalFunction(noteId) {
    setDeletedNoteId(noteId);
    setOpenDeleteModal(true);
}


function editing_Note(noteNumber, noteTitle, noteContent) {
    setEditing(!editing);
    setTitle(noteTitle);
    setContent(noteContent);
    setNoteId2(noteNumber);
}


if (!user) {
    return <Redirect to='/login' />;
  }

    return (
        <>
        <div className='search-result-div'>
        {(!editing && note) &&
            <div>
            <div className='search-title-div'>
                {note?.title}
            </div>
        <br />
            <div className='search-content-div'>
                {note?.content}
                <div className='search-edit-delete-div'>
                    <button className="note-page-edit-btn" onClick={() => setEditing(!editing)}><FaRegEdit /></button>
                    <button className="note-page-delete-btn" onClick={() => modalFunction(note.id)}><FaTrashAlt /></button>
                    {(openDeleteModal && deletedNoteId===note.id) && <DeleteModal setOpenDeleteModal={setOpenDeleteModal} noteId={note.id} />}
                </div>
            </div>
        </div>}
            {(editing) && <EditForm title={title} content={content} setTitle={setTitle} setContent={setContent} setEditing={setEditing} editing={editing} editedTitle={editedTitle} setEditedTitle={setEditedTitle} setEditedContent={setEditedContent} noteId={noteId}/>}
        </div>
        </>
    )
}

export default SearchNotePage;
