import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import EditForm from "../EditForm";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import './index.css';

const SearchNotePage = () => {
    const [note, setNote] = useState('');
    const {noteId} = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(false);
    const [editedContent, setEditedContent] = useState(false);
    const [noteDeleted, setNoteDeleted] = useState(false);
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
                // console.log(notes.notes, '<----notes.notes')
            }
        })()
    }, [noteId, editing]);


    // Delete note
    async function deleteNote(noteId) {
        const res = await fetch(`/api/notes/${noteId}`, {
            method: "DELETE",
        });
        if (res.ok) {
            const note = await res.json();
                    setNoteDeleted(!noteDeleted);
                    history.push('/notes');
        } else {
            return "No note has been retrieved"
        }
        return res;
    }

    console.log(title, '<====TITLE')
    console.log(content, '<====content')



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
                        <button className="note-page-delete-btn" onClick={() => deleteNote(note.id)}><FaTrashAlt /></button>
                    </div>
                </div>
            </div>}
                {(editing) && <EditForm title={title} content={content} setTitle={setTitle} setContent={setContent} setEditing={setEditing} editing={editing} editedTitle={editedTitle} setEditedTitle={setEditedTitle} setEditedContent={setEditedContent} noteId={noteId}/>}
            </div>
            </>
        )
}

export default SearchNotePage;
