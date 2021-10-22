import { useDispatch } from "react-redux";

const GET_NOTES = "notes/GET_NOTES";
const GET_ONENOTE = "notes/GETONE_NOTE";
const CREATE_NOTE = "notes/CREATE_NOTE";

const getNotesAction = (notes) => ({
    type: GET_NOTES,
    payload: notes
});

const getOneNoteAction = (note) => ({
    type: GET_ONENOTE,
    payload: note
});

const createNoteAction = (note) => ({
    type: CREATE_NOTE,
    payload: note
})

console.log("Hello")
export const getNotesThunk = () => async (dispatch) => {
    const res = await fetch("/api/notes");
    console.log("Hello 2")
    if (res.ok) {
        console.log("Hello 3")
        const notes = await res.json();
        dispatch(getNotesAction(notes));
    }
    console.log("Hello 4")
    return res;
};

export const getOneNoteThunk = (id) => async (dispatch) => {
    console.log("Get one note thunk 1")
    const res = await fetch(`/api/notes/${id}`);
    console.log("Get one note thunk 2")
    if (res.ok) {
        const note = await res.json();
        dispatch(getNotesAction(note));
    } else {
        return "No note has been retrieved"
    };
    return res;
};

export const createNoteThunk = (note) => async (dispatch) => {
    const res = await fetch("/api/notes/", {
        method: "POST",
        body: JSON.stringify(note),
        headers: {"Content-Type": "application/json"}
    });
    if (res.ok) {
        const note = await res.json();
        dispatch(getOneNoteAction(note));
    } else {
        return "No note has been retrieved"
    }
    return res;
}

export const addNoteThunk = (note) => async (dispatch) => {
    const res = await fetch("/api/notes/", {
        method: "POST",
        body: JSON.stringify(note),
        headers: {"Content-Type": "application/json"}
    });
    if (res.ok) {
        const note = await res.json();
        dispatch(createNoteAction(note));
    } else {
        return "No note has been retrieved"
    }
    return res;
}

const initialState = {};
export default function notesReducer(state = initialState, action) {
    const newState = {...state};
    switch (action.type) {
        case GET_NOTES:
            return {notes: action.payload};
        case GET_ONENOTE:
            return {
                notes: action.payload,
            }
        case CREATE_NOTE:
            return {
                newState,
                notes: action.payload,
            };
            default:
                return state;
        }
    }
