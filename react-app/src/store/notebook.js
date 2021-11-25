import { useDispatch } from "react-redux";

const GET_NOTEBOOKS = "notes/GET_NOTEBOOKS";
const GET_ONENOTEBOOK = "notes/GETONE_NOTEBOOK";
const CREATE_NOTEBOOK = "notes/CREATE_NOTEBOOK";

const getNotebooksAction = (notebooks) => ({
    type: GET_NOTEBOOKS,
    payload: notebooks
});

const getOneNotebookAction = (notebook) => ({
    type: GET_ONENOTEBOOK,
    payload: notebook
});

const createNotebookAction = (notebook) => ({
    type: CREATE_NOTEBOOK,
    payload: notebook
})

export const getNotebooksThunk = () => async (dispatch) => {
    const res = await fetch("/api/notebooks/");
    if (res.ok) {
        const notebooks = await res.json();
        dispatch(getNotebooksAction(notebooks));
    }
    return res;
};

export const getOneNotebookThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/notebooks/${id}`);
    if (res.ok) {
        const notebook = await res.json();
        dispatch(getNotebooksAction(notebook));
    } else {
        return "No notebook has been retrieved"
    };
    return res;
};

export const createNotebookThunk = (notebook) => async (dispatch) => {
    const res = await fetch("/api/notes/", {
        method: "POST",
        body: JSON.stringify(notebook),
        headers: {"Content-Type": "application/json"}
    });
    if (res.ok) {
        const notebook = await res.json();
        dispatch(getOneNotebookAction(notebook));
    } else {
        return "No note has been retrieved"
    }
    return res;
}

export const addNotebookThunk = (notebook) => async (dispatch) => {
    const res = await fetch("/api/notes/", {
        method: "POST",
        body: JSON.stringify(notebook),
        headers: {"Content-Type": "application/json"}
    });
    if (res.ok) {
        const notebook = await res.json();
        dispatch(createNotebookAction(notebook));
    } else {
        return "No notebook has been retrieved"
    }
    return res;
}

const initialState = {};
export default function notebooksReducer(state = initialState, action) {
    const newState = {...state};
    switch (action.type) {
        case GET_NOTEBOOKS:
            return {notebooks: action.payload};
        case GET_ONENOTEBOOK:
            return {
                notebooks: action.payload,
            }
        case CREATE_NOTEBOOK:
            return {
                newState,
                notebooks: action.payload,
            };
            default:
                return state;
        }
    }
