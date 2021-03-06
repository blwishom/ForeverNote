import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Redirect } from "react-router";
import './Notebook.css'

const NotebookForm = () => {
    const [title, setTitle] = useState("");
    const [notebooks, setNotebooks] = useState([]);
    const [errors, setErrors] = useState([]);
    const user = useSelector((state) => state.session.user);
    const [notebookCreated, setNotebookCreated] = useState(false);
    const history = useHistory();

    // Get all notebooks
    useEffect(() => {
        (async function notebooksFetch() {
        const res = await fetch("/api/notebooks/");
        if (res.ok) {
            const notebooks = await res.json();
            setNotebooks(notebooks.notebooks)
            }
        })()
    }, [notebookCreated])


    // Create notebook
async function createNotebook(e) {
    e.preventDefault();
    const newNotebook = {
        title,
        user_id: user.id
        }
        const res = await fetch("/api/notebooks/new", {
            method: "POST",
            body: JSON.stringify({...newNotebook}),
            headers: {"Content-Type": "application/json"}
        });
        const notebook = await res.json();
        if (res.ok) {
            setNotebookCreated(!notebookCreated)
            history.push("/notebooks")
            return notebook;
        } else if (notebook.errors) {
            setErrors(notebook.errors)
        }
    }

    if (!user) {
        return <Redirect to='/login' />;
      }

    return (
        <form className="notebook-form" onSubmit={createNotebook}>
            <div>
                <input
                    className="notebook-title"
                    type="text"
                    name="title"
                    placeholder="Notebook Title"
                    onChange={(e) => {setTitle(e.target.value)}}
                    value={title}
                ></input>
            </div>
            <button className="notebook-btn" type="submit">Save Notebook</button>
            <div>
            {errors.map((error, ind) => (<li key={ind}>{error}</li>))}
            </div>
        </form>
    )
}

export default NotebookForm;
